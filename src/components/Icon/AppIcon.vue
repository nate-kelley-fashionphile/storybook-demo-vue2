<template>
  <i class="fa" :class="iconClass"></i>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class AppIcon extends Vue {
  @Prop() icon!: string;
  @Prop() spin: boolean;

  get iconClass() {
    return { [`fa-${this.icon}`]: true, "fa-spin": this.spin };
  }

  @Emit("onClick")
  onClick() {
    return;
  }
}
</script>

<style lang="scss" scoped>
//
</style>
