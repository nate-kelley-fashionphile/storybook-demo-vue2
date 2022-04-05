import AppTextInputComponent from "./AppTextInput.vue";
import { InputTypes } from "./interfaces";

export default {
  title: "Inputs",
  component: AppTextInputComponent,
  argTypes: {
    type: {
      options: [...Object.keys(InputTypes)],
      control: { type: "select" },
      defaultValue: Object.keys(InputTypes)[0],
    },
  },
};

export const AppTextInput = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppTextInputComponent },
  template: `<AppTextInputComponent v-bind="$props" />`,
});
