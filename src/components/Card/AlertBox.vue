<template>
  <div class="alert-box" :class="dynamicClass">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { AlertBoxTypes } from './interfaces';

@Component({})
export default class AlertBox extends Vue {
  @Prop() text: string;
  @Prop() appendedIcon: string;
  @Prop() prependedIcon: string;
  @Prop({ default: AlertBoxTypes.error }) type: AlertBoxTypes;

  get dynamicClass() {
    return {
      [`alert-box__${this.type}`]: true,
    };
  }
}
</script>

<style lang="scss" scoped>
.alert-box {
  &__error {
    color: #ff1117;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #ff1117;
    height: 45px; //TODO use css var for input height
  }
}
</style>
