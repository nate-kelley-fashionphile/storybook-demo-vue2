import * as components from "./components/index";

const plugin = {
  install(Vue: any) {
    Object.entries(components).forEach(([componentName, component]) => {
      console.log(componentName, component);
      Vue.component(componentName, component);
    });
  },
};

export default plugin;
export * from "./components/index";
