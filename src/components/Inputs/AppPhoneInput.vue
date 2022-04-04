<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class AppPhoneInput extends Vue {
  @Prop() areacode: number;
  @Prop() value: number;
  @Prop() loading: boolean;
  @Prop() disabled: boolean;
  @Prop({ default: () => null }) label: string;
  @Prop({ default: () => null }) placeholder: string;

  @Emit("input")
  onChange(e: Event) {
    return (e.target as HTMLInputElement).value;
  }
}
</script>