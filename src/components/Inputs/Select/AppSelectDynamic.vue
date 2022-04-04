<template>
  <div class="app-select-dynamic">
    <v-select
      append-to-body
      :value="value"
      :options="options"
      :clearable="false"
      :getOptionLabel="() => {}"
      :calculate-position="withPopper"
      @open="open"
      @close="close"
      @input="inputChanged"
    >
      <span slot="no-options">
        {{ noOptionsText }}
      </span>

      <template #option="{ image, label }">
        <div class="d-flex align-items-center">
          <AppImage v-if="image" class="app-select-dynamic__image" :src="image" />
          <div class="ml-2 app-select-dynamic__label">{{ label }}</div>
        </div>
      </template>
      <template #selected-option="{ image, label }">
        <div class="d-flex align-items-center pb-1 px-1">
          <AppImage v-if="image" class="app-select-dynamic__image" :src="image" />
          <div class="ml-2 app-select-dynamic__label">{{ label }}</div>
        </div>
      </template>
    </v-select>

    <div class="cache-images">
      <AppImage v-for="img in images" :key="img" :src="img" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Mixins, Prop, Vue } from 'vue-property-decorator';
import { SelectDataDynamic } from './interfaces';
import PopperSelectMixin from './Mixins/PopperSelectMixin.vue';
import AppImage from '../../Image';

@Component({ components: { AppImage } })
export default class AppSelectDynamic extends Mixins(PopperSelectMixin) {
  @Prop() value!: string;
  @Prop() options!: SelectDataDynamic[];
  @Prop({ default: 'Sorry, no matching options.' }) noOptionsText: string;
  @Prop({ default: () => true }) ignoreOverflow: boolean;

  isOpen = false;

  get images() {
    return this.options.map(({ image }) => image);
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  @Emit('input')
  inputChanged(selectedData: any) {
    return selectedData;
  }
}
</script>

<style lang="scss" scoped>
.app-select-dynamic {
  &__image {
    width: 85px;
    height: 85px;
  }
  &__label {
    font-size: 18px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .cache-images {
    display: none;
  }
}
</style>
