<template>
  <div class="app-text-input">
    <label v-if="label">{{ label }}</label>
    <div
      class="app-text-input__container"
      :class="{ focused, error, disabled }"
    >
      <input
        ref="input"
        class="app-text-input__input"
        :type="type"
        :class="textClass"
        :value="value"
        :disabled="disabled"
        :placeholder="placeholder"
        :style="inputStyle"
        @focus="onFocus"
        @blur="onLeave"
        @input="onChange"
        @keyup.enter="onEnterPress"
      />
      <div v-if="loading" class="loading-bar">
        <AppIconSpinner />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { AppIconSpinner } from "../Loader";
import { InputTypes } from "./interfaces";

@Component({ components: { AppIconSpinner } })
export default class AppTextInput extends Vue {
  @Prop({ default: "" }) label: string;
  @Prop({ default: "" }) value!: string;
  @Prop({ default: false }) disabled: boolean;
  @Prop({ default: false }) error: boolean;
  @Prop({ default: false }) loading: boolean;
  @Prop({ default: "" }) placeholder: string;
  @Prop({ default: InputTypes.Text }) type: InputTypes;
  @Prop() autofocus: boolean;
  @Prop() background: string;

  focused = false;

  get textClass() {
    return {
      "app-text-input__focused": this.focused,
    };
  }

  get inputStyle() {
    return {
      background: this.background,
    };
  }

  @Emit("input")
  onChange(e: Event) {
    return (e.target as HTMLInputElement).value;
  }

  @Emit("onFocus")
  onFocus() {
    this.focused = true;
    return;
  }

  @Emit("onLeave")
  onLeave() {
    this.focused = false;
  }

  @Emit("onEnterPress")
  onEnterPress(e: Event) {
    return (e.target as HTMLInputElement).value;
  }

  mounted() {
    if (this.autofocus) {
      (this.$refs["input"] as HTMLElement).focus();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-text-input {
  &__container {
    position: relative;
  }
  &__focused {
    border: 1px solid #f09;
    border-color: #f09 !important;
    outline: 0;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(255 0 153 / 60%);
  }
  input {
    height: 45px;
    width: 100%;
    padding: 10px 10px;
    line-height: 20px;
    border-color: none;
    border: 1px solid var(--input-border-color);
    background: var(--white-color);
    &:disabled {
      background: #f5f5f5;
    }
  }
}
.loading-bar {
  position: absolute;
  right: 10px;
  top: 0;
  transform: translateY(45%);
  color: var(--black-color);
}
</style>
