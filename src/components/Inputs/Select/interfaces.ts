export interface SelectData {
  label: string;
  code: string | number;
}

export interface SelectDataColor extends SelectData {
  hexCode: string;
}

export interface SelectDataDynamic extends SelectData {
  image?: string;
}
