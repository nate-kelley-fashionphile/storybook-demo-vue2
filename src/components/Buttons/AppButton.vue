<template>
  <button
    @click="onClick"
    class="app-button btn"
    :class="dynamicClass"
    :disabled="disabled"
  >
    <AppIcon v-if="prependedIcon" :icon="prependedIcon" />
    {{ text }}
    <AppIcon v-if="appendedIcon" :icon="appendedIcon" />
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
import { AppIcon } from "../Icons";

@Component({ components: { AppIcon } })
export default class AppButton extends Vue {
  @Prop() text!: string;
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

<style lang="scss" scoped>
.app-button.btn {
  &-secondary {
    color: rgb(79, 79, 79);
    background: rgb(229, 229, 229);
    border: none;
  }
}
</style>
