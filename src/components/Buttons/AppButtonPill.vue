<template>
  <div class="app-button-pill" :class="dynamicClass" @click="onClick">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class AppButtonPill extends Vue {
  @Prop() text: string;
  @Prop() active: boolean;

  get dynamicClass() {
    return {
      //buttonTypeConfig[this.type]]: true,
      active: this.active,
    };
  }

  @Emit("onClick")
  onClick() {
    return;
  }
}
</script>

<style lang="scss" scoped>
.app-button-pill {
  transition: all 0.5s;
  background: var(--white-color);
  border: 2px solid black;
  color: var(--black-color);
  width: fit-content;
  padding: 10px 20px;
  border-radius: 10px;

  &.active {
    background: var(--black-color);
    color: var(--white-color);
  }
}
</style>
