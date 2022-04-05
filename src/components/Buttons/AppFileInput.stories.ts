import AppFileInputComponent from "./AppFileInput.vue";
import { ButtonTypes } from "./config";

export default {
  title: "Buttons",
  component: AppFileInputComponent,
  argTypes: {
    onClick: {},
    type: {
      options: [...Object.keys(ButtonTypes)],
      control: { type: "select" },
      defaultValue: Object.keys(ButtonTypes)[0],
    },
  },
};

export const AppFileInput = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppFileInputComponent },
  template: `<AppFileInputComponent v-bind="$props" />`,
});
AppFileInput.args = {
  text: "Testing 123",
};
