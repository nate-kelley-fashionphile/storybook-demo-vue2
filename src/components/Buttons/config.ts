export enum ButtonTypes {
  primary = 'primary',
  secondary = 'secondary',
  glass = 'glass',
  ghostWhite = 'ghost-white',
  white = 'white',
}

export enum ButtonSizes {
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export const buttonTypeConfig: Record<ButtonTypes, string> = {
  [ButtonTypes.primary]: 'btn-primary',
  [ButtonTypes.secondary]: 'btn-secondary',
  [ButtonTypes.glass]: 'btn-glass',
  [ButtonTypes.ghostWhite]: 'btn-ghost-white',
  [ButtonTypes.white]: 'btn-white',
};

//TODO consider moving main.scss button styles to component
export const buttonSizeConfig = {
  [ButtonSizes.sm]: 'btn-sm',
  [ButtonSizes.md]: 'btn-md',
  [ButtonSizes.lg]: 'btn-lg',
  [ButtonSizes.xl]: 'btn-xl',
};
