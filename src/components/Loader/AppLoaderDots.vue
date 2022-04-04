<template>
  <div class="dots">
    <span class="dot dot-1" :style="dotStyle"></span>
    <span class="dot dot-2" :style="dotStyle"></span>
    <span class="dot dot-3" :style="dotStyle"></span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class AppLoaderDots extends Vue {
  @Prop() loading: boolean;
  @Prop({ default: 'white' }) color: string;

  get dotStyle() {
    return {
      background: this.color,
    };
  }
}
</script>

<style lang="scss" scoped>
.dots {
  .dot {
    width: 6px;
    height: 6px;
    background: var(--white-color);
    display: inline-block;
    border-radius: 50%;
    right: 0px;
    bottom: 0px;
    margin: 0px 1px;
    position: relative;
    animation: jump 1s infinite;
  }
  .dot-1 {
    animation-delay: 100ms;
  }
  .dot-2 {
    animation-delay: 200ms;
  }
  .dot-3 {
    animation-delay: 300ms;
  }
}
</style>
