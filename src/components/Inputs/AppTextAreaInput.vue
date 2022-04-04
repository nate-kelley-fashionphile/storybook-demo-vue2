<template>
  <div class="app-textarea-input">
    <div class="app-textarea-input__container">
      <label v-if="label">{{ label }}</label>
      <textarea
        class="textarea"
        :rows="rows"
        :maxlength="useMaxLength"
        :autofocus="autofocus"
        :disabled="disabled"
        @input="onChange"
        @blur="onLeave"
        @focus="onFocus"
      ></textarea>
      <div v-if="useCharCount" class="limit-wrapper">
        <span class="limit" :class="{ 'limit-achieved': limitAchieved }">
          {{ this.charsLeftText }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component({})
export default class AppTextAreaInput extends Vue {
  @Prop({ default: '' }) label: string;
  @Prop({ default: 7 }) rows: string;
  @Prop({ default: 500 }) maxChars: number;
  @Prop({ default: 0 }) minChars: number;
  @Prop({ default: '' }) value: string;
  @Prop({ default: true }) useCharCount: boolean;
  @Prop({ default: 'white' }) background: string;
  @Prop() disabled: boolean;
  @Prop() autofocus: boolean;

  focused = false;

  get useMaxLength() {
    return this.useCharCount && this.maxChars;
  }

  get charsEntered() {
    return this.value.length;
  }

  get charsLeftText() {
    return `${this.charsEntered}/${this.maxChars}`;
  }

  get limitAchieved() {
    return this.charsEntered >= this.maxChars;
  }

  get inputStyle() {
    return {
      background: this.background,
    };
  }

  @Emit('onFocus')
  onFocus() {
    this.focused = true;
    return;
  }

  @Emit('input')
  onChange(e: Event) {
    return (e.target as HTMLInputElement).value;
  }

  @Emit('onLeave')
  onLeave() {
    this.focused = false;
  }

  @Emit('onEnterPress')
  onEnterPress(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
}
</script>

<style lang="scss" scoped>
.app-textarea-input {
  &__container {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
  }
}

.textarea {
  width: 100%;
  padding: 7.5px;
  &:disabled {
    background: #f5f5f5;
  }
}
</style>
