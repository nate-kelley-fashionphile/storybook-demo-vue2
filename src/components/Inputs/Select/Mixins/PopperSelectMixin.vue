<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BasePlacement, createPopper, top, bottom } from "@popperjs/core";

@Component({ components: {} })
export default class PopperSelectMixin extends Vue {
  placement: BasePlacement = top;

  //@ts-ignore
  withPopper(dropdownList, component, { width }) {
    /**
     * We need to explicitly define the dropdown width since
     * it is usually inherited from the parent with CSS.
     */
    dropdownList.style.width = width;

    /**
     * Here we position the dropdownList relative to the $refs.toggle Element.
     *
     * The 'offset' modifier aligns the dropdown so that the $refs.toggle and
     * the dropdownList overlap by 1 pixel.
     *
     * The 'toggleClass' modifier adds a 'drop-up' class to the Vue Select
     * wrapper so that we can set some styles for when the dropdown is placed
     * above.
     */
    const popper = createPopper(component.$refs.toggle, dropdownList, {
      placement: this.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -1],
          },
        },
        {
          name: "toggleClass",
          enabled: true,
          phase: "write",
          fn({ state }) {
            component.$el.classList.toggle(
              "drop-up",
              state.placement === "top"
            );
          },
        },
      ],
    });

    /**
     * To prevent memory leaks Popper needs to be destroyed.
     * If you return function, it will be called just before dropdown is removed from DOM.
     */
    return () => popper.destroy();
  }
}
</script>
