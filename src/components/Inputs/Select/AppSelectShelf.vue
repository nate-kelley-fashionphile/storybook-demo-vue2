<template>
  <div class="app-select-shelf">
    <div class="app-select-shelf__selected" :class="{ 'select-disabled': this.disabled }" @click="open">
      <div
        class="w-100 d-flex justify-content-between align-items-center"
        :class="{ 'no-options': !this.hasValueOptions }"
        v-if="multiple || removeable"
      >
        <div v-if="hasValueOptions">
          <div class="app-select-shelf__selected-option mb-1" v-for="selected in value" :key="selected.code">
            <AppImage v-if="selected.image" class="app-select-shelf__image" :src="selected.image" />
            <div class="ml-3 app-select-shelf__label">{{ selected.label }}</div>
          </div>
        </div>
        <div class="app-select-shelf__caret">
          <AppIcon icon="chevron-up" />
        </div>
      </div>

      <div
        v-else
        class="w-100 d-flex justify-content-between align-items-center"
        :class="{ 'no-options': !this.hasValueOptions }"
      >
        <div class="app-select-shelf__selected-option">
          <AppImage v-if="value && value.image" class="app-select-shelf__image" :src="value.image" />
          <div class="ml-3 app-select-shelf__label">{{ selectedText }}</div>
        </div>
        <div class="app-select-shelf__caret">
          <AppIcon icon="chevron-up" />
        </div>
      </div>
    </div>

    <ShelfOverlay :isOpen="isOpen" @close="close">
      <div class="app-select-shelf__container">
        <div
          class="app-select-shelf__option"
          v-for="option in options"
          :key="option.code"
          :class="{ selected: isSelected(option) }"
          @click.self="onClick(option)"
        >
          <div v-if="removeable" class="app-select-shelf__remove" @click="remove(option)">
            <AppIconButton icon="times" type="primary" :round="true" />
          </div>
          <div v-if="option.image" class="app-select-shelf__image">
            <AppImage :src="option.image" />
            <div class="app-select-shelf__image-overlay" :class="{ selected: isSelected(option) }">
              <transition name="bounce">
                <div v-if="isSelected(option)">
                  <AppIcon class="app-select-shelf__image-overlay-icon" icon="check" />
                </div>
              </transition>
            </div>
          </div>
          <div class="ml-3 app-select-shelf__label">{{ option.label }}</div>
        </div>
        <div class="app-select-shelf__spacer"></div>
      </div>
      <div v-if="multiple || removeable" class="app-select-shelf__multiple-button">
        <AppButton class="mr-3" text="cancel" type="secondary" @onClick="reset" />
        <AppButton :block="multiple && !removeable" :text="multipleButtonText" @onClick="onClickFinish" />
      </div>
    </ShelfOverlay>

    <div v-if="hasImages" v-show="false" class="cache-images">
      <AppImage v-for="(img, index) in images" :key="index" :src="img" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AppImage from '../../Image';
import { ShelfOverlay } from '../../Overlays';
import AppButton, { AppIconButton } from '../../Button';
import isEmpty from 'lodash/isEmpty';
import { timeout, toggleItemInArray } from '../../../helpers';
import AppIcon from '../../Icon';
import isArray from 'lodash/isArray';
import { SelectDataDynamic } from './interfaces';

@Component({ components: { AppImage, ShelfOverlay, AppButton, AppIcon, AppIconButton } })
export default class AppSelectShelf extends Vue {
  @Prop({ default: () => ({}) }) value!: SelectDataDynamic | SelectDataDynamic[] | null;
  @Prop() options!: SelectDataDynamic[];
  @Prop({ default: 'Sorry, no matching options.' }) noOptionsText: string;
  @Prop({ default: true }) preselectFirst: boolean;
  @Prop() multiple: boolean;
  @Prop() disabled: boolean;
  @Prop() removeable: boolean;
  @Prop() autoOpen: boolean;

  isOpen = false;

  get images() {
    return this.options.map(({ image }) => image);
  }

  get hasImages() {
    return !isEmpty(this.images.filter(img => img));
  }

  get hasValueOptions() {
    return !isEmpty(this.value);
  }

  get hasOptions() {
    return !isEmpty(this.options);
  }

  get selectedText() {
    if (!this.value) {
      return 'No option selected';
    }

    if (!this.hasOptions) {
      return this.noOptionsText;
    }

    return (this.value as SelectDataDynamic)?.label;
  }

  get multipleButtonText() {
    if (this.removeable) {
      return 'Finish';
    }
    return `Finish - ${(this.value as SelectDataDynamic[])?.length} selected`;
  }

  isSelected(option: SelectDataDynamic) {
    if (this.removeable) return;
    if (this.multiple && isArray(this.value)) {
      return (this.value as SelectDataDynamic[])?.some(({ code }) => code === option.code);
    }
    return (this.value as SelectDataDynamic)?.code === option.code;
  }

  open() {
    this.isOpen = true && !this.disabled;
  }

  @Emit('close')
  close() {
    this.isOpen = false;
  }

  @Emit('onClickFinish')
  onClickFinish() {
    this.close();
    return;
  }

  onClick(data: SelectDataDynamic) {
    if (this.multiple || this.removeable) {
      this.input(toggleItemInArray(this.value as SelectDataDynamic[], data));
      return;
    }
    timeout(50).then(() => {
      this.close();
    });
    this.input(data);
  }

  @Emit('input')
  input(data: SelectDataDynamic | SelectDataDynamic[]) {
    return data;
  }

  @Emit('remove')
  remove(data: SelectDataDynamic) {
    return data;
  }

  @Emit('reset')
  reset() {
    this.close();
    return;
  }

  created() {
    if (this.removeable) {
      this.input(this.options);
    } else if (this.preselectFirst && !this.multiple) {
      this.input(this.options[0]);
    } else if (this.preselectFirst && this.multiple) {
      this.input([this.options[0]]);
    }
  }

  mounted() {
    if (this.autoOpen) {
      this.open();
    }
  }
}
</script>

<style lang="scss" scoped>
.app-select-shelf {
  &__container {
    position: relative;
    overflow: auto;
  }
  &__selected {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 7.5px;
    padding: 10px;
    background: var(--white-color);
    border: 1px solid #b8b8b8;
    border-radius: 10px;
  }
  &__selected-option {
    display: flex;
    align-items: center;
    width: 100%;
  }
  &__image {
    width: 100%;
    min-width: 70px;
    max-width: 95px;
    min-height: 40px;
    height: auto;
    border-radius: 10px;
    overflow: hidden;
    pointer-events: none;
    position: relative;
  }
  &__image-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(130, 240, 120, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 200ms ease all;
    &.selected {
      background: rgba(130, 240, 120, 0.3);
    }
  }

  &__image-overlay-icon {
    color: #67b567;
    transform: scale(1.5);
    background: var(--white-color);
    padding: 5px;
    border-radius: 100%;
  }
  &__label {
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
    pointer-events: none;
  }
  &__option {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #dedede;
    transition: 200ms all ease;
    &.selected {
      background: #f6fff5;
    }
  }
  &__multiple-button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 7.5px;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: var(--white-color);
    border-top: 1px solid rgb(99, 99, 99);
  }
  &__caret {
    margin-left: 10px;
    margin-right: 5px;
    transform: scale(1.2);
  }
  &__spacer {
    height: 65px;
  }
  &__remove {
    margin-right: 10px;
    margin-left: 0px;
    transform: scale(0.7);
  }
  .no-options {
    justify-content: flex-end !important;
    width: 100%;
  }
  .select-disabled {
    background: #f4f4f4;
    cursor: not-allowed;
  }
}
</style>
