<template>
  <Portal v-if="isOpen" to="overlay">
    <transition name="fade-medium">
      <div v-if="isOpen" class="overlay__container">
        <div class="overlay__blur" @click.self="onExitClick"></div>
        <div class="overlay__content">
          <slot></slot>
        </div>
        <AppIconButton class="close-icon" icon="times" type="glass" @onClick="onExitClick" />
      </div>
    </transition>
  </Portal>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { AppIconButton } from '../Button';

@Component({ components: { AppIconButton } })
export default class BasicOverlay extends Vue {
  //TODO resolve bug that causes newest component to superceed old component. Most likely a portal issue.
  @Prop({ default: true }) useExitButton: boolean;
  @Prop() isOpen!: boolean;

  @Emit('onExitClick')
  onExitClick() {
    return true;
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
.overlay {
  &__container {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: var(--overlay-container);
    //  display: flex;
    //  align-items: center;
    //  justify-content: center;
  }

  &__blur {
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(3px);
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
  }

  &__content {
    max-height: 100vh;
    z-index: var(--overlay-blur);
  }
}

.close-icon {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(30px, 30px);
  z-index: var(--overlay-buttons);
  transition: 200ms all ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.35);
  }
}
</style>
