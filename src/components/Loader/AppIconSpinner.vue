<template>
  <div>
    <AppIcon icon="spinner" :spin="true" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import AppIcon from "../Icon";

@Component({ components: { AppIcon } })
export default class AppIconSpinner extends Vue {
  //
}
</script>
