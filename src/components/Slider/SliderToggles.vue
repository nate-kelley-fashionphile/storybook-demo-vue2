<template>
  <div class="slider-container">
    <ToggleIcon direction="left" class="toggle-left" v-show="showLeftToggle" @onClick="handleClick(false)" />
    <div ref="sliderContentRefName" class="d-flex flex-nowrap slider-content" @scroll="onContainerScroll">
      <slot />
    </div>
    <ToggleIcon class="toggle-right" direction="right" v-show="showRightToggle" @onClick="handleClick(true)" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { calculateScrollDistance, distanceToScroll } from './helpers';
import AppIcon from '../Icon';
import ToggleIcon from './ToggleIcon.vue';

@Component({ components: { AppIcon, ToggleIcon } })
export default class SliderToggles extends Vue {
  @Prop() widthOfCard: number;
  @Prop() marginOfCard: number;

  sliderContentRefName = 'sliderContentRefName';
  sliderContainerReference: HTMLElement | null = null;
  containerWidth = 0;
  containerOffset = 0;
  distanceScrolled = 0;

  handleClick(forward: boolean) {
    const movement = calculateScrollDistance(forward, this.distanceToScroll, this.distanceScrolled);
    this.moveSlider(movement);
  }

  moveSlider(movement: number) {
    const container = this.sliderContainerReference;
    container?.scrollTo({
      left: movement,
      behavior: 'smooth',
    });
  }

  onContainerScroll(event: Event) {
    this.distanceScrolled = event.target ? (event.target as HTMLElement).scrollLeft : 0;
  }

  get distanceToScroll() {
    return distanceToScroll(this.containerOffset, this.widthOfCard, this.marginOfCard);
  }

  get distanceToEndOfContainer() {
    return this.containerWidth - this.containerOffset - this.distanceScrolled;
  }

  get showLeftToggle() {
    return !!this.distanceScrolled;
  }

  get showRightToggle() {
    return this.distanceToEndOfContainer > this.marginOfCard;
  }

  async mounted() {
    await this.$nextTick();
    this.sliderContainerReference = this.$refs[this.sliderContentRefName] as HTMLElement;
    this.containerWidth = this.sliderContainerReference.scrollWidth;
    this.containerOffset = this.sliderContainerReference.offsetWidth;
  }
}
</script>

<style lang="scss" scoped>
.toggle {
  position: absolute;
  position: absolute;
  top: 0;
  transform: translateY(90%);
  &-right {
    @extend .toggle;
    right: 5px;
  }
  &-left {
    @extend .toggle;
    left: 5px;
  }
}

.slider-content {
  overflow: auto;
  width: 100%;
}

.slider-container {
  position: relative;
}
</style>
