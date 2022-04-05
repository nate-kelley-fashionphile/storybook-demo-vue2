import AppTextInputComponent from "./AppTextInput.vue";

export default {
  title: "Inputs",
  component: AppTextInputComponent,
  argTypes: {
    //
  },
};

export const AppTextInput = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppTextInputComponent },
  template: `<AppTextInputComponent v-bind="$props" />`,
});
