<template>
  <BasicOverlay :isOpen="isOpen" @onExitClick="onExitClick">
    <div class="image-gallery">
      <div class="image-gallery__container">
        <div v-if="showLeftToggle && hasMultipleImages" class="paddle paddle__left" @click="changeImage(false)">
          <ToggleIcon direction="left" type="glass" />
        </div>
        <div v-if="showRightToggle && hasMultipleImages" class="paddle paddle__right" @click="changeImage(true)">
          <ToggleIcon direction="right" type="glass" />
        </div>

        <div class="d-flex flex-column justify-content-center align-items-center">
          <div>
            <AppImage
              class="d-flex justify-content-center image-gallery__primary-image"
              :ref="imageRefName"
              :class="dragClass"
              :src="internalCurrentImage"
              :style="imageStyle"
              @onClick="zoomImage({ zoom: true })"
            />
          </div>
        </div>
      </div>

      <div class="image-gallery__interactions">
        <div v-if="useZoom" class="d-flex align-items-center justify-content-center mb-3">
          <div class="paddle" @click="zoomImage({ zoom: false })">
            <ToggleIcon class="" icon="minus" type="glass" />
          </div>
          <div class="paddle" @click="zoomImage({ zoom: true })">
            <ToggleIcon class="ml-2" icon="plus" type="glass" />
          </div>
        </div>
        <div v-if="title" class="image-gallery__title">{{ title }}</div>
        <div v-if="buttons" class="image-gallery__buttons d-flex align-items-center justify-content-center">
          <AppButton
            v-for="(button, index) in buttons"
            :key="index"
            v-bind="button"
            class="mx-2"
            @onClick="button.onClick"
          />
        </div>
      </div>
    </div>

    <div v-if="hasMultipleImages" class="cached-images">
      <AppImage :src="preloadedArray[0]" />
      <AppImage :src="preloadedArray[1]" />
    </div>
  </BasicOverlay>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Mixins } from 'vue-property-decorator';
import BasicOverlay from '../Overlays';
import AppImage from './AppImage.vue';
import AppIcon from '../Icon';
import first from 'lodash/first';
import last from 'lodash/last';
import { ImageLightboxImage } from './interfaces';
import isEqual from 'lodash/isEqual';
import { extractLightboxImage } from './helpers';
import AppButton from '../Button';
import isEmpty from 'lodash/isEmpty';
import { getElementPosition, nextInArray, previousInArray, timeout } from '../../helpers';
import { ToggleIcon } from '../Slider';
import { KeyboardKeys } from '../../config';
import Draggable from '../../mixins/draggable';
import { CardButton } from '../Card/interfaces';

const IMAGE_SCALE_STEPS = [1, 1.5, 2, 3, 4];

@Component({ components: { BasicOverlay, AppImage, AppIcon, AppButton, ToggleIcon } })
export default class AppImageLightbox extends Mixins(Draggable) {
  @Prop() isOpen: boolean;
  @Prop({ default: () => [] }) images: ImageLightboxImage[] | string[];
  @Prop({ default: true }) loop?: boolean;
  @Prop() currentImage?: ImageLightboxImage | string;
  @Prop() useZoom: boolean;
  @Prop({ default: true }) useArrowKeys: boolean;

  internalCurrentImage: null | string = null;
  imageScale = 1;
  imageRefName = 'imageRefName';

  get hasMultipleImages() {
    return this.images.length > 1;
  }

  get showRightToggle() {
    //@ts-ignore
    return !isEqual(this.internalCurrentImage, last(this.images)) || this.loop;
  }

  get showLeftToggle() {
    //@ts-ignore
    return !isEqual(this.internalCurrentImage, first(this.images)) || this.loop;
  }

  get preloadedArray() {
    const prevImage = this.getNextImage(false);
    const nextImage = this.getNextImage(true);
    return [prevImage, nextImage];
  }

  get currentImageObject(): ImageLightboxImage {
    return (
      this.images &&
      //@ts-ignore
      this.images.find(image => isEqual(extractLightboxImage(image as ImageLightboxImage), this.internalCurrentImage))
    );
  }

  get scaleButtons() {
    return this.useZoom ? [] : [];
  }

  get buttons() {
    return !isEmpty(this.currentImageObject?.buttons) ? (this.currentImageObject.buttons as CardButton[]) : [];
  }

  get title() {
    return this.currentImageObject?.title;
  }

  get imageStyle() {
    return {
      transform: `scale(${this.imageScale})`,
      cursor: this.useZoom && 'zoom-in',
    };
  }

  listenForKeyboardEvents(event: any) {
    if (this.isOpen && this.useArrowKeys) {
      const eventMap = {
        [KeyboardKeys.left]: () => this.changeImage(false),
        [KeyboardKeys.right]: () => this.changeImage(true),
        [KeyboardKeys.escape]: () => this.onExitClick(),
      };
      const selectedFunction = eventMap[event.key];
      selectedFunction && selectedFunction();
    }
  }

  getNextImage(next = true) {
    const imageStrings = this.images.map(img => extractLightboxImage(img));
    const nextImage = nextInArray(imageStrings, this.internalCurrentImage, next);
    return extractLightboxImage(nextImage);
  }

  changeImage(next = true) {
    this.zoomImage({ reset: true });
    this.internalCurrentImage = this.getNextImage(next);
  }

  zoomImage({ reset = false, zoom = true }: { zoom?: boolean; reset?: boolean }) {
    if (reset || !this.useZoom) {
      this.imageScale = IMAGE_SCALE_STEPS[0];
      this.$_resetDrag();
      return;
    }
    if (!this.isInitialized) {
      //@ts-ignore
      this.$_dragInit(this.$refs[this.imageRefName].$el);
    }

    const hasDragged = !isEqual(this.originalPosition, getElementPosition(this.dragElement));
    if (this.useZoom && !hasDragged) {
      this.imageScale = zoom
        ? nextInArray(IMAGE_SCALE_STEPS, this.imageScale)
        : previousInArray(IMAGE_SCALE_STEPS, this.imageScale, false);
      if (isEqual(this.imageScale, first(IMAGE_SCALE_STEPS))) {
        this.$_resetDrag();
      }
    }
  }

  @Emit('onExitClick')
  onExitClick() {
    //wait for animation fade to finish before resetting
    timeout(450).then(() => {
      this.zoomImage({ reset: true });
    });
    return;
  }

  created() {
    //@ts-ignore
    this.internalCurrentImage = first(this.images) as ImageLightboxImage;
  }

  mounted() {
    document.addEventListener('keyup', this.listenForKeyboardEvents);
  }

  beforedDestory() {
    document.removeEventListener('keyup', this.listenForKeyboardEvents);
  }

  @Watch('currentImage')
  async currentImageChanged() {
    this.internalCurrentImage = extractLightboxImage(this.currentImage);
  }
}
</script>

<style lang="scss" scoped>
.image-gallery {
  height: 100vh;

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &__title {
    color: var(--white-color);
    text-align: center;
    padding: 10px;
    color: var(--white-color);
    text-align: center;
    padding: 10px;
    width: 100%;
    text-shadow: 1px 1px 10px black;
  }

  &__primary-image {
    ::v-deep .image {
      max-height: 70vh;
      max-width: 70vw;
    }
    cursor: zoom-in;
  }

  &__interactions {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 25px;
  }

  .paddle {
    color: rgba(255, 255, 255, 0.7);
    font-size: 40px;
    opacity: 0.75;
    cursor: pointer;
    transition: 200ms all ease;
    z-index: 1;
    &:hover {
      opacity: 0.95;
    }
    &__left {
      position: fixed;
      padding: 70px 70px 70px 10px;
      left: 0;
    }
    &__right {
      position: fixed;
      padding: 70px 10px 70px 70px;
      right: 0;
    }
  }
}

.cached-images {
  opacity: 0.01;
  z-index: -1;
  position: fixed;
  display: none;
}
</style>
