<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

@Component({})
export default class AppCalendarSelect extends Vue {
  @Prop() range: boolean;
  @Prop() date: Date;
  @Prop() dates: [Date, Date];
  @Prop() disabled: boolean;
  @Prop() loading: boolean;
  @Prop() label: string;

  //native for mobile
  //stylized for not
}
</script>