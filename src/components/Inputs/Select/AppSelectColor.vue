<template>
  <div class="app-select-single">
    <v-select
      @input="inputChanged"
      :value="value"
      :options="options"
      :clearable="false"
      :getOptionLabel="() => {}"
      append-to-body
      :calculate-position="withPopper"
    >
      <span slot="no-options">
        {{ noOptionsText }}
      </span>
      <template #option="{ label, hexCode }">
        <div class="d-flex align-items-center">
          <div>{{ label }}</div>
          <div v-if="hexCode" class="color-box" :style="colorBoxStyle(hexCode)"></div>
        </div>
      </template>
      <template #selected-option="{ label, hexCode }">
        <div class="d-flex align-items-center">
          <div>{{ label }}</div>
          <div v-if="hexCode" class="color-box" :style="colorBoxStyle(hexCode)"></div>
        </div>
      </template>
    </v-select>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Vue } from 'vue-property-decorator';
import { SelectDataColor } from './interfaces';
import PopperSelectMixin from './Mixins/PopperSelectMixin.vue';

@Component({})
export default class AppSelectSingle extends Mixins(PopperSelectMixin) {
  @Prop() value!: string;
  @Prop() options!: SelectDataColor;
  @Prop({ default: 'Sorry, no matching options.' }) noOptionsText: string;

  colorBoxStyle(hexCode: string) {
    return {
      height: '18px',
      width: '18px',
      borderRadius: '6px',
      marginLeft: '8px',
      border: '1px solid #dddcdc',
      backgroundColor: hexCode,
    };
  }

  @Emit('input')
  inputChanged(selectedData: any) {
    return selectedData;
  }
}
</script>

<style lang="scss" scoped>
.app-select-single {
  ::v-deep .vs__dropdown-toggle {
    border: 1px solid #585858;
  }
  .color-box {
    height: 18px;
    width: 18px;
    border-radius: 6px;
    margin-left: 8px;
    border: 1px solid #dddcdc;
  }
}
</style>
