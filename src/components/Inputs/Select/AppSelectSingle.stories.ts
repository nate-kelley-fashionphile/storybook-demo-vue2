import AppSelectSingleComponent from "./AppSelectSingle.vue";
import axios from "axios";

export default {
  title: "Inputs",
  component: AppSelectSingleComponent,
  argTypes: {
    //
  },
};

export const AppSelectSingle = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppSelectSingleComponent },
  data() {
    return {
      selectOptions: [],
    };
  },
  methods: {
    async search() {
      const { data } = await axios.get(
        "https://624cbd82d71863d7a80f30e7.mockapi.io/api/search"
      );
      this.selectOptions = data.map((item) => ({
        code: item.id,
        label: item.name,
      }));
    },
  },
  created() {
    this.search();
  },
  template: `
  <div style="padding: 270px 00px 0px 0px">
    <AppSelectSingleComponent 
    v-bind="$props"
    :options="selectOptions"
    />
  </div>
  `,
});
