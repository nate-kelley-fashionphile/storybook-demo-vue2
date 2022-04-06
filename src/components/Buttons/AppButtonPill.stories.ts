import AppButtonPillComponent from "./AppButtonPill.vue";
import { ButtonTypes } from "./config";

export default {
  title: "Buttons",
  component: AppButtonPillComponent,
  argTypes: {
    onClick: {},
    //
  },
};

export const AppButtonPill = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppButtonPillComponent },
  template: `<AppButtonPillComponent v-bind="$props" />`,
});
AppButtonPill.args = {
  text: "Testing 123",
};
