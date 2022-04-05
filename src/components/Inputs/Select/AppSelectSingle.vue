<template>
  <div class="app-select-single">
    <v-select
      @input="inputChanged"
      :value="value"
      :options="options"
      :clearable="clearable"
      append-to-body
      :calculate-position="withPopper"
    >
      <span slot="no-options">
        {{ noOptionsText }}
      </span>
      <template #option="{ label }">
        <div>{{ label }}</div>
      </template>
      <template #selected-option="{ label }">
        <div>{{ label }}</div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Vue } from "vue-property-decorator";
import { SelectData } from "./interfaces";
import PopperSelectMixin from "./Mixins/PopperSelectMixin.vue";
//@ts-ignore
import vSelect from "vue-select";

Vue.component("v-select", vSelect);

@Component({})
export default class AppSelectSingle extends Mixins(PopperSelectMixin) {
  @Prop() value!: string;
  @Prop() options!: SelectData[];
  @Prop({ default: "Sorry, no matching options." }) noOptionsText: string;
  @Prop({ default: false }) clearable: boolean;
  @Prop({ default: true }) preselectFirst: boolean;

  @Emit("input")
  inputChanged(selectedData: any) {
    return selectedData;
  }

  created() {
    if (this.preselectFirst) {
      this.inputChanged(this.options[0]);
    }
  }
}
</script>

<style lang="scss" scoped>
.app-select-single {
  ::v-deep .vs__dropdown-toggle {
    border: 1px solid var(--input-border-color); //TODO make a CSS variable
  }
}
</style>
