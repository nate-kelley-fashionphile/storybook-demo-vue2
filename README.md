# Description

A demo project for fashionphile to showcase a common component library for Vue2

# How to Use

## Tree Shaking

```
<template>
  <div class="hello-world">
    <AppButton text="Howdy" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AppButton } from "@nate-kelley-fashionphile/vue2-common";

@Component({ components: { AppButton } })
export default class HelloWorld extends Vue {
  //
}
</script>
```

## Plugin

```
//main.ts file

import Plugin from "@nate-kelley-fashionphile/vue2-common";

Vue.use(Plugin)
```
