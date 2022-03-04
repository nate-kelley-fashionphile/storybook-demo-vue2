export enum ButtonTypes {
  primary = "primary",
  secondary = "secondary",
  glass = "glass",
}

export enum ButtonSizes {
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export const buttonTypeConfig = {
  [ButtonTypes.primary]: "btn-primary",
  [ButtonTypes.secondary]: "btn-secondary",
  [ButtonTypes.glass]: "btn-glass",
};

//TODO consider moving main.scss button styles to component
export const buttonSizeConfig = {
  [ButtonSizes.sm]: "btn-sm",
  [ButtonSizes.md]: "btn-md",
  [ButtonSizes.lg]: "btn-lg",
  [ButtonSizes.xl]: "btn-xl",
};
