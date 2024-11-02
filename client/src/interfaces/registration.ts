export interface IRegForm {
  email: string;
  password1: string;
  password2: string;
}

export interface IRegData {
  email: string;
  password?: string;
  sub?: string;
  loggedWith: "credentials" | "google" | "yandex";
  avatar?: string;
  name?: string;
}

export interface IRegHandler {
  data: IRegData;
}
