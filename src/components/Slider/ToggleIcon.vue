<template>
  <div class="toggle" :style="iconStyle" @click="onClick">
    <AppIconButton class="toggle-button" :icon="iconInternal" :round="true" :type="type" :shadow="true" />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import AppIcon from '../Icon';
import { AppIconButton, ButtonTypes } from '../Button';
import { ToggleDirection } from './interfaces';

@Component({ components: { AppIcon, AppIconButton } })
export default class ToggleIcon extends Vue {
  @Prop() direction: ToggleDirection;
  @Prop() toggleBackground: string;
  @Prop() toggleColor: string;
  @Prop() icon: string;
  @Prop({ default: 'white' }) type: ButtonTypes;

  get iconInternal() {
    return this.icon || `chevron-${this.direction}`;
  }

  get iconStyle() {
    return {
      color: this.toggleColor,
      backgroundColor: this.toggleBackground,
    };
  }

  @Emit('onClick')
  onClick() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.toggle-button {
  transform: scale(0.75);
}

.toggle {
  z-index: 1;
}
</style>
