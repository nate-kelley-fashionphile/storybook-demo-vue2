<template>
  <button class="app-button app-icon-button" :class="dynamicClass" :disabled="disabled" @click="onClick">
    <AppIcon :icon="icon" />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { buttonTypeConfig, buttonSizeConfig, ButtonTypes, ButtonSizes } from './config';
import AppIcon from '../Icon';

@Component({ components: { AppIcon } })
export default class AppIconButton extends Vue {
  @Prop({ default: 'times' }) icon!: string;
  @Prop({ default: false }) disabled: boolean;
  @Prop({ default: false }) loading: boolean;
  @Prop({ default: ButtonSizes.sm }) size: ButtonSizes;
  @Prop({ default: ButtonTypes.glass }) type: ButtonTypes;
  @Prop({ default: false }) round: boolean;
  @Prop() shadow: boolean;

  get dynamicClass() {
    return {
      [buttonSizeConfig[this.size]]: true,
      [buttonTypeConfig[this.type]]: true,
      loading: this.loading,
      round: this.round,
      ['button-shadow']: this.shadow,
    };
  }

  onClick() {
    if (!this.disabled) {
      this.$emit('onClick');
    }
  }
}
</script>

<style lang="scss" scoped>
.app-button.app-icon-button {
  padding: 14px 22px;
  border-radius: 15px;
  font-size: 17px;
  text-transform: uppercase;

  &.round {
    border-radius: 100%;
  }

  &.button-shadow {
    box-shadow: 0px 0px 8px #00000066;
  }
}
</style>
