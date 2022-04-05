import * as components from "./components/index";
import "./stylesheets/variables.scss";
import "./stylesheets/fonts.scss";
import "bootstrap-vue/dist/bootstrap-vue.css";
import Vue from "vue";

//Bootstrap
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

const plugin = {
  install(Vue: any) {
    Object.entries(components).forEach(([componentName, component]) => {
      Vue.component(componentName, component);
    });
  },
};

export default plugin;
export * from "./components/index";
