import { CardButton } from '../Card/interfaces';

export interface AppImageBG {
  width?: string | number;
  height?: string | number;
  src: string;
  bgColor?: string;
  bgSize?: string;
  correctDimensionsOnLoad?: boolean;
  onClick?: () => void;
}

export interface ImageLightboxImage {
  src: string;
  title?: string;
  buttons?: CardButton[];
}
