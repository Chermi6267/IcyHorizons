export interface ILogForm {
  email: string;
  password1: string;
}

export interface ILogData {
  email: string;
  password1: string;
  loggedWith: "credentials" | "google" | "yandex";
}

export interface ILogHandler {
  data: ILogData;
}
