<template>
  <div class="rotate-image">
    <AppImage :style="rotateStyle" v-bind="$props" />
    <AppIconButton
      class="rotate-image__icon"
      :round="true"
      :shadow="true"
      type="white"
      icon="redo fa-solid"
      @onClick="rotateImage"
    ></AppIconButton>
  </div>
</template>

<script lang="ts">
//TODO add tooltip prop for button

import { Vue, Component, Prop, Emit, Watch } from "vue-property-decorator";
import AppImage from "./AppImage.vue";
import { AppImageBG } from "./interfaces";
import { AppIconButton } from "../Buttons";

@Component({ components: { AppImage, AppIconButton } })
export default class AppImageRotate extends Vue {
  @Prop() src: string;
  @Prop() alt: string;
  @Prop() bgImage: AppImageBG;
  @Prop() fluid: boolean; //width 100%
  @Prop({ default: false }) useDropshadow: boolean;

  @Prop() rotate: number;

  internalRotate = 0;

  get rotateStyle() {
    return {
      transform: `rotate(${this.internalRotate}deg)`,
    };
  }

  @Emit("onRotate")
  rotateImage() {
    this.internalRotate = this.internalRotate + 90;
  }

  @Watch("rotate")
  rotateChanged() {
    this.internalRotate = this.rotate;
  }
}
</script>

<style lang="scss" scoped>
.rotate-image {
  overflow: hidden;
  position: relative;

  &__icon {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    transform: scale(0.75);
  }
}
</style>
