<template>
  <div>
    <SliderToggles class="app-image-slider" :widthOfCard="imageSizes.width" :marginOfCard="5">
      <AppImage
        v-for="(image, index) in formattedImages"
        class="app-image-slider__image"
        :key="image + index"
        :bgImage="image"
      />
    </SliderToggles>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import AppImage from './AppImage.vue';
import AppIcon from '../Icon';
import SliderToggles from '../Slider';
import { AppImageBG } from './interfaces';

@Component({ components: { AppImage, AppIcon, SliderToggles } })
export default class AppImageGallery extends Vue {
  @Prop() images: string[];
  @Prop() useLighbox: boolean;
  @Prop({ default: () => ({ width: 140, height: 140 }) }) imageSizes: { width: number; height: number };

  get formattedImages(): AppImageBG[] {
    return this.images.map(src => ({
      src,
      width: `${this.imageSizes.width}px`,
      height: `${this.imageSizes.height}px`,
      onClick: () => this.onImageClick(src),
      bgSize: 'contain',
    }));
  }

  @Emit('onImageClick')
  onImageClick(src: string) {
    return src;
  }
}
</script>

<style lang="scss" scoped>
.app-image-slider {
  &__image {
    padding: 5px;
    cursor: pointer;
    transition: 200ms all ease;
    &:hover {
      opacity: 0.85;
    }
  }
}
</style>
