<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class AppSelectInput extends Vue {
  @Prop({ default: () => null }) onChange: (newValue: {}) => void;
  @Prop({ default: () => [] }) hintLocales: AppSelectInput[];
  @Prop() value: AppSelectInput;
  @Prop({ default: () => null }) label: string;
  @Prop({ default: () => null }) placeholder: string;
  @Prop() disabled: boolean;
  @Prop() loading: boolean;

  //native for mobile
  //stylized for not
}
</script>