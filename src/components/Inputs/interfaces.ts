export interface AppSelectData {
  id: string | number;
  name: string;
}

export enum InputTypes {
  Text = "text",
  Number = "number",
  Email = "email",
  Password = "password",
  Date = "date",
  Select = "select",
}
