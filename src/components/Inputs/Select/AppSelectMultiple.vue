<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import AppSelectInput from '../AppSelectInput.vue';

@Component({})
export default class AppSelectMultiple extends Vue {
  @Prop({ default: () => null }) onChange: (newValue: {}) => void;
  @Prop({ default: () => [] }) options: AppSelectInput[];
  @Prop() value: AppSelectInput;
  @Prop({ default: () => null }) label: string;
  @Prop({ default: () => null }) placeholder: string;
  @Prop() disabled: boolean;
  @Prop() loading: boolean;
}
</script>
