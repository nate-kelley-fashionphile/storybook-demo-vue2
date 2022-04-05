import AppTextAreaInputComponent from "./AppTextAreaInput.vue";
import { InputTypes } from "./interfaces";

export default {
  title: "Inputs",
  component: AppTextAreaInputComponent,
  argTypes: {
    //
  },
};

export const AppTextAreaInput = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppTextAreaInputComponent },
  template: `<AppTextAreaInputComponent v-bind="$props" />`,
});
