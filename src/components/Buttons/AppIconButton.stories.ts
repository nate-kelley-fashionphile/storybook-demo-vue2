import AppIconButtonComponent from "./AppIconButton.vue";
import { ButtonTypes } from "./config";

export default {
  title: "Buttons",
  component: AppIconButtonComponent,
  argTypes: {
    onClick: {},
    type: {
      options: [...Object.keys(ButtonTypes)],
      control: { type: "select" },
      defaultValue: Object.keys(ButtonTypes)[0],
    },
  },
};

export const AppIconButton = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppIconButtonComponent },
  template: `<AppIconButtonComponent v-bind="$props" />`,
});
