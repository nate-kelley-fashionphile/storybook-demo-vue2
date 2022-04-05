import AppSignaturePadComponent from "./AppSignaturePad.vue";

export default {
  title: "Inputs",
  component: AppSignaturePadComponent,
  argTypes: {
    //
  },
};

export const AppSignaturePad = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppSignaturePadComponent },
  template: `<AppSignaturePadComponent v-bind="$props" :style="{border: '1px solid black'}" />`,
});
