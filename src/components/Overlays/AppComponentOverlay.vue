<template>
  <div class="component-overlay" :class="componentClass">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { ComponentOverlayType } from './interfaces';

@Component({ components: {} })
export default class AppComponentOverlay extends Vue {
  @Prop({ default: ComponentOverlayType.default }) type: string;

  get componentClass() {
    return { [this.type]: true };
  }
}
</script>

<style lang="scss" scoped>
.component-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  &.glass {
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
  }

  &.default {
    background-image: radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.45));
  }
}
</style>
