<template>
  <Portal to="shelf">
    <transition name="slide-vertical">
      <div class="shelf-overlay" v-if="isOpen" v-click-outside="close">
        <slot></slot>
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';

@Component({})
export default class ShelfOverlay extends Vue {
  @Prop() isOpen: boolean;

  @Emit('close')
  close() {
    return;
  }

  @Watch('isOpen')
  isOpenChanged() {
    const appElement = document.getElementById('showroom-assistant-app');
    const styleOfOverflow = this.isOpen ? 'hidden' : 'initial';
    //@ts-ignore
    appElement?.style['overflow'] = styleOfOverflow;
  }
}
</script>

<style lang="scss" scoped>
.shelf-overlay {
  background: var(--white-color);
  min-height: 55vh;
  max-height: 80vh;
  position: fixed;
  bottom: 0;
  overflow: auto;
  z-index: 99;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0px -4px 30px #0000006b;
  width: 100%;
}
</style>
