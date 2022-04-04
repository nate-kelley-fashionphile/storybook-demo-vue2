<template>
  <div class="app-image" :class="appImageClass" @click="clickHandler">
    <img class="image" v-if="src" :src="src" :class="dynamicClass" :alt="alt" @load="onImageLoaded" />
    <div v-else class="bgImage" :style="bgImageStyle" :class="dynamicClass"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { AppImageBG } from './interfaces';

interface ImageDimensions {
  height: string | null;
  width: string | null;
}

@Component
export default class AppImage extends Vue {
  @Prop() src: string;
  @Prop() alt: string;
  @Prop() bgImage: AppImageBG;
  @Prop() fluid: boolean; //width 100%
  @Prop({ default: false }) useDropshadow: boolean;

  isLoaded = false;
  imageDimensions: ImageDimensions = {
    height: null,
    width: null,
  };

  get appImageClass() {
    return {
      dropshadow: this.useDropshadow,
    };
  }

  get dynamicClass() {
    return {
      'img-fluid': this.fluid,
      'image-pulse': !this.isLoaded,
    };
  }

  get bgWidthHeight() {
    return this.bgImage?.correctDimensionsOnLoad && this.isLoaded
      ? this.imageDimensions
      : { width: this.bgImage.width, height: this.bgImage.height };
  }

  get bgImageStyle() {
    return (
      this.bgImage && {
        ...this.bgWidthHeight,
        backgroundPosition: 'center center',
        backgroundColor: this.isLoaded && this.bgImage.bgColor,
        backgroundImage: `url(${this.bgImage.src})`,
        backgroundSize: this.bgImage.bgSize || 'contain',
      }
    );
  }

  clickHandler() {
    if (this.bgImage?.onClick) return this.bgImageOnClick();
    this.onClick();
  }

  bgImageOnClick() {
    this.bgImage.onClick && this.bgImage.onClick();
  }

  async bgImageLoadingState() {
    if (this.bgImage) {
      const src = this.bgImage.src;
      const image = new Image();
      image.addEventListener('load', () => {
        this.imageDimensions = {
          height: `${image.height}px`,
          width: `${image.width}px`,
        };
        this.onImageLoaded();
      });
      image.src = src;
      this.bgImageReady();
    }
  }

  @Emit('onLoaded')
  onImageLoaded() {
    this.isLoaded = true;
    return;
  }

  @Emit('bgImageReady')
  bgImageReady() {
    return;
  }

  @Emit('onClick')
  onClick() {
    return;
  }

  mounted() {
    this.bgImageLoadingState();
  }

  @Watch('bgImage')
  @Watch('src')
  imageChanged() {
    this.isLoaded = false;
    this.imageDimensions = {
      height: null,
      width: null,
    };
    this.bgImageLoadingState();
  }
}
</script>

<style lang="scss" scoped>
.app-image {
  &.dropshadow {
    box-shadow: 1px 3px 10px #00000012;
  }
  .image {
    max-width: 100%;
    pointer-events: none;
  }
  .image-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  .bgImage {
    &.image-pulse {
      background-color: rgb(39, 39, 39);
    }
    background-repeat: no-repeat;
    background-color: var(--transparent);
    pointer-events: none;
  }
}
</style>
