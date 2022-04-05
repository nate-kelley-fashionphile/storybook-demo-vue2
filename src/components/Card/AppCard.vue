<template>
  <div class="app-card">
    <div v-if="hasImage" class="app-card__image">
      <AppImage :src="image" :bgImage="bgImage" @onLoaded="onImageLoaded()" />
    </div>
    <div v-if="text" class="app-card__text">{{ text }}</div>
    <div v-if="hasSlot" class="slot">
      <slot></slot>
    </div>
    <div v-if="hasButtons" class="app-card__buttons">
      <AppButton
        v-for="(button, index) in buttons"
        v-bind="button"
        :key="index"
        :block="true"
        @onClick="button.onClick"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import AppImage, { AppImageBG } from "../Image";
import AppButton from "../Buttons";
import isEmpty from "lodash/isEmpty";
import { CardButton } from "./interfaces";

@Component({ components: { AppImage, AppButton } })
export default class AppCard extends Vue {
  @Prop() text: string;
  @Prop() image: string;
  @Prop({ default: () => ({}) }) bgImage?: AppImageBG;
  @Prop() buttons: CardButton[];

  get hasImage() {
    return this.image || !isEmpty(this.bgImage);
  }

  get hasSlot() {
    return this.$slots.default;
  }

  get hasButtons() {
    return !isEmpty(this.buttons);
  }

  @Emit("onImageLoaded")
  onImageLoaded() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.app-card {
  border-radius: 10px;
  background: #f8f8f8; //TODO make css var
  position: relative;

  &__text {
    color: var(--black-color);
    margin: 15px 15px;
  }
  &__buttons {
    padding: 15px;
  }
  &__image {
    border-radius: 10px 10px 0px 0px;
    overflow: hidden;
  }
}
</style>
