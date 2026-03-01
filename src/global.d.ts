import { Api } from "./interfaces/Api";

export {};
declare global {
  interface Window {
    api: Api;
  }
}
