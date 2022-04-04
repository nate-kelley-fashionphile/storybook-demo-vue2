import { ImageLightboxImage } from './interfaces';

export const extractLightboxImage = (currentImage?: ImageLightboxImage | string): string => {
  return (currentImage as ImageLightboxImage)?.src || (currentImage as string);
};
