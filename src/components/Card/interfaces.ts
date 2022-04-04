import { ButtonTypes } from '../Button';
import { AppImageBG } from '../Image';

export interface CardButton {
  text: string;
  onClick: () => void;
  appendedIcon?: string;
  prependedIcon?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  active?: boolean;
}

export enum AlertBoxTypes {
  error = 'error',
}
