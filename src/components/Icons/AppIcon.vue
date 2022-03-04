<template>
  <i :class="iconClass"></i>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component
export default class AppIcon extends Vue {
  @Prop() icon!: string;

  get iconClass() {
    return `fa fa-${this.icon}`;
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
