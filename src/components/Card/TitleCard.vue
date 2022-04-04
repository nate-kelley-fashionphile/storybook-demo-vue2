<template>
  <div data-qa="title-card" class="title-card-container">
    <div class="title-card">
      <div class="spacer"></div>
      <div class="primary">{{ primaryText }}</div>
      <div v-if="secondaryText" class="secondary">{{ secondaryText }}</div>
      <div class="spacer"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class TitleCard extends Vue {
  @Prop() primaryText: string;
  @Prop() secondaryText: string;
}
</script>

<style lang="scss" scoped>
.title-card-container {
  margin: 25px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  text-align: center;
  .title-card {
    width: 85%;
  }
  .spacer {
    border-top: 2px solid var(--black-color);
    margin: 15px 0px;
  }
  .primary {
    color: var(--black-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
  }
  .secondary {
    color: rgb(90, 90, 90);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
