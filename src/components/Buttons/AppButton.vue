<template>
  <button
    @click="onClick"
    class="app-button btn d-flex align-items-center"
    :class="dynamicClass"
    :disabled="disabled || loading"
  >
    <AppIcon v-if="prependedIcon" class="mr-1" :icon="prependedIcon" />
    {{ text }}
    <AppIcon class="ml-1" v-if="appendedIcon" :icon="appendedIcon" />
    <AppIcon v-show="loading" class="ml-1" icon="spinner" :spin="true" />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import {
  buttonTypeConfig,
  buttonSizeConfig,
  ButtonTypes,
  ButtonSizes,
} from "./config";
import AppIcon from "../Icon";

@Component({ components: { AppIcon } })
export default class AppButton extends Vue {
  @Prop() text: string;
  @Prop() disabled: boolean;
  @Prop() loading: boolean;
  @Prop() active: boolean;
  @Prop() block: boolean;
  @Prop({ default: ButtonTypes.primary }) type: ButtonTypes;
  @Prop({ default: ButtonSizes.sm }) size: ButtonSizes;
  @Prop() appendedIcon: string;
  @Prop() prependedIcon: string;

  get dynamicClass() {
    return {
      [buttonTypeConfig[this.type]]: true,
      [buttonSizeConfig[this.size]]: true,
      loading: this.loading,
      active: this.active,
      "btn-block": this.block,
    };
  }

  onClick() {
    if (!this.disabled) {
      this.$emit("onClick");
    }
  }
}
</script>

<style lang="scss">
//unscoped because there are multiple button component that use this style
.app-button.btn {
  transition: 200ms all ease;
  text-align: center;
  justify-content: center;
  line-height: 30px;

  &-primary {
    color: var(--white-color);
    background-color: var(--black-color);
    border-color: var(--black-color);
    line-height: 30px;
  }
  &-secondary {
    color: var(--emperor-gray);
    background: var(--mercury-gray);
    border: none;
  }
  &-white {
    background-color: rgb(255, 255, 255);
    color: var(--black-color);
    border: none;
  }
  &-ghost-white {
    border: 2px solid var(--white-color);
    background: var(--transparent);
    color: var(--white-color);
    &:hover {
      color: var(--black-color);
      background: var(--white-color);
      border-color: var(--transparent);
    }
    &:disabled {
      border-color: var(--scorpion-gray);
      color: var(--scorpion-gray);
    }
  }
  &-glass {
    background-color: rgba(109, 109, 109, 0.15);
    border: 1px solid rgba(216, 216, 216, 0.35);
    backdrop-filter: blur(30px);
    color: rgba(255, 255, 255, 0.85);
  }
}
</style>
