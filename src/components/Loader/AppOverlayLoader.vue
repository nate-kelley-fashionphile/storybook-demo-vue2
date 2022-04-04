<template>
  <div>
    <transition name="fade-fast">
      <AppComponentOverlay v-if="show">
        <div class="d-flex flex-column align-items-center justify-content-center">
          <AppImage
            v-if="!hasSlot || useSpinner"
            class="loading-icon"
            src="https://www.fashionphile.com/images/white-knot.svg"
          />
          <slot name="loader"></slot>
        </div>
      </AppComponentOverlay>
    </transition>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { AppComponentOverlay } from '../Overlays';
import AppIconSpinner from './AppIconSpinner.vue';
import AppImage from '../Image';

@Component({ components: { AppComponentOverlay, AppIconSpinner, AppImage } })
export default class AppOverlayLoader extends Vue {
  @Prop() show: boolean;
  @Prop({ default: true }) useSpinner: boolean;

  hasSlot = false;

  @Watch('show')
  toggleShow() {
    this.hasSlot = !!this.$slots.default;
  }
}
</script>

<style lang="scss" scoped>
.loading-icon {
  max-width: 100px;
  animation: spin 1.5s infinite linear;
  filter: drop-shadow(1px 1px 5px rgba(0, 0, 0, 0.4));
}
</style>
