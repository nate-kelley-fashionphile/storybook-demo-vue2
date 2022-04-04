<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class AppProgressBar extends Vue {
  @Prop({ default: 0 }) value: number;
  @Prop() error: boolean;
  @Prop() indeterminate: boolean;
  @Prop({ default: 5 }) height: number;
}
</script>