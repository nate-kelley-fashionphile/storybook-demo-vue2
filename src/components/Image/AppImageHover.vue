<template>
  <div>
    <div
      class="hover-image"
      ref="refImageName"
      @mouseenter="mouseEnter"
      @mousemove="mouseMove"
      @mouseleave="mouseLeave"
    >
      <AppImage :bgImage="internalBgImage" />
      <transition name="fade">
        <div v-if="useLoader && !hideLoader" class="loader-progress" :style="loadingStyle"></div>
      </transition>
    </div>
    <div class="cache-images">
      <AppImage v-for="img in images" :key="img" :src="img" @onLoaded="onLoadedImage" />
    </div>

    <AppImageLightbox
      v-if="useLightbox && hasImages"
      :images="__removeThisWhenBEIsReady"
      :isOpen="openLightbox"
      @onExitClick="toggleLightbox(false)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { AppImageBG } from './interfaces';
import AppImage from './AppImage.vue';
import AppImageLightbox from './AppImageLightbox.vue';
import isEmpty from 'lodash/isEmpty';

@Component({ components: { AppImage, AppImageLightbox } })
export default class AppImageHover extends Vue {
  @Prop() bgImage: AppImageBG;
  @Prop({ default: () => [] }) images: string[];
  @Prop({ default: true }) useLightbox: boolean;
  @Prop({ default: true }) useLoader: boolean;

  refImageName = 'refImageName';
  isHovering = false;
  imageOffsetWidth = 100;
  hoverImage = '';
  openLightbox = false;
  numberOfImagesLoaded = 0;

  get hasImages() {
    return !isEmpty(this.images);
  }

  get internalBgImage(): AppImageBG {
    return {
      ...this.bgImage,
      src: this.isHovering ? this.hoverImage : this.bgImage.src,
      bgColor: 'var(--white-color)',
      onClick: () => {
        this.bgImage?.onClick?.();
        this.toggleLightbox(true);
      },
    };
  }

  get numberOfImages() {
    return this.images?.length || 1;
  }

  get percentIncrements() {
    return 100 / this.numberOfImages;
  }

  get loadingStyle() {
    return {
      width: `${(this.numberOfImagesLoaded / this.numberOfImages) * 100}%`,
    };
  }

  get hideLoader() {
    return this.loadingStyle.width === '100%';
  }

  onLoadedImage() {
    this.numberOfImagesLoaded++;
  }

  toggleLightbox(value: boolean) {
    this.openLightbox = value;
  }

  mouseEnter(e: MouseEvent) {
    this.isHovering = true;
  }

  mouseMove(e: MouseEvent) {
    const percentMoved = (e.offsetX / this.imageOffsetWidth) * 100;
    const imageIndex = Math.round(percentMoved / this.percentIncrements);
    this.hoverImage = this.images[imageIndex] || this.bgImage.src;
  }

  mouseLeave(e: MouseEvent) {
    this.isHovering = false;
  }

  mounted() {
    const refElement = this.$refs[this.refImageName] as HTMLElement;
    this.imageOffsetWidth = refElement.offsetWidth;
  }
}
</script>

<style lang="scss" scoped>
.cache-images {
  opacity: 0.001;
  display: none;
}

.hover-image {
  position: relative;
  .loader-progress {
    height: 2px;
    background: rgb(20, 182, 20);
    width: 0%;
    transition: 150ms all linear;
    opacity: 0.25;
    position: absolute;
    bottom: 0;
  }
}
</style>
