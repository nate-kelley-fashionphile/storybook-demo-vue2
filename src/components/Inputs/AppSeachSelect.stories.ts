import AppSearchSelectComponent from "./AppSearchSelect.vue";
import { InputTypes } from "./interfaces";
import axios from "axios";
import { SelectDataDynamic } from "../Inputs";

export default {
  title: "Inputs",
  component: AppSearchSelectComponent,
  argTypes: {
    //
  },
};

export const AppSearchSelect = (args: any, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppSearchSelectComponent },
  data() {
    return {
      selectOptions: [],
      searchValue: "",
      loadingOptions: false,
    };
  },
  methods: {
    async search() {
      this.loadingOptions = true;
      const { data } = await axios.get(
        "https://624cbd82d71863d7a80f30e7.mockapi.io/api/search"
      );
      this.selectOptions = data
        .map((item) => ({
          code: item.id,
          label: item.name,
          image: item.avatar,
        }))
        .filter((item) =>
          item.label.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      this.loadingOptions = false;
    },
  },
  template: `
  <div style="padding: 270px 00px 0px 0px">
    <AppSearchSelectComponent 
    v-bind="$props"
    v-model="searchValue"
    @input="search"
    :loading="loadingOptions"
    :options="selectOptions"
    />
  </div>
  `,
});
