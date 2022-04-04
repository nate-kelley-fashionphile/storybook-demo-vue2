<template>
  <div class="app-search-select">
    <transition name="fade-fast">
      <div v-if="showOptions && !disabled" class="options-container">
        <div class="app-search-select__options">
          <div
            v-for="option in options"
            :key="option.code"
            class="app-search-select__option"
            @click="optionClick(option)"
          >
            <div class="app-search-select__image" v-if="someOptionsHaveImage">
              <AppImage :src="option.image" />
            </div>
            <div class="app-search-select__label">{{ option.label }}</div>
          </div>
        </div>
      </div>
    </transition>
    <div>
      <AppTextInput
        @input="input"
        :value="value"
        :placeholder="placeholder"
        :autofocus="true"
        :loading="loading && !selected"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { SelectDataDynamic } from '../Inputs';
import AppTextInput from './AppTextInput.vue';
import AppImage from '../Image';
import isEmpty from 'lodash/isEmpty';

@Component({ components: { AppTextInput, AppImage } })
export default class AppSearchSelect extends Vue {
  @Prop() value: string;
  @Prop() options: SelectDataDynamic[];
  @Prop() loading: boolean;
  @Prop() placeholder: string;
  @Prop() label: string;
  @Prop() allowNonSelectOption: boolean;
  @Prop() disabled: boolean;

  useIgnoreOverflow = false;
  selected: SelectDataDynamic | null = null;

  get someOptionsHaveImage() {
    return this.options.some(option => option.image);
  }

  get showOptions() {
    return !isEmpty(this.options) && this.selected === null;
  }

  async runOverflowIgnore() {
    await this.$nextTick(); //ensure that component is rendered
    this.useIgnoreOverflow = this.showOptions;
  }

  @Emit('optionClick')
  optionClick(option: SelectDataDynamic) {
    this.input(option.label);
    this.selected = option;
    return option;
  }

  @Emit('input')
  input(value: string) {
    this.selected = null;
    return value;
  }

  @Watch('options')
  onOptionsChanged() {
    this.runOverflowIgnore();
  }
}
</script>

<style lang="scss" scoped>
.app-search-select {
  position: relative;
  &__options {
    max-height: 320px;
    overflow: auto;
    padding: 5px;
  }
  &__option {
    display: flex;
    align-items: center;
    padding: 7.5px;
    border-bottom: 1px solid rgb(212, 212, 212);
  }
  &__label {
    font-size: 18px;
  }
  &__image {
    margin-right: 7.5px;
    height: 85px;
    width: 85px;
    background: rgb(235, 235, 235);
    display: flex;
    align-items: center;
  }
}

.options-container {
  position: absolute;
  bottom: 100%;
  left: 0;
  background: var(--white-color);
  width: 100%;
  border: 1px solid rgb(196, 196, 196);
  z-index: 11;
  box-shadow: 0px -3px 15px #00000075;
  margin-bottom: 4px;
}
</style>
