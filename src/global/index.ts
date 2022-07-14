import { App } from "vue";
import registerProperites from "./register-properties";
import registerElement from "./register-element";
export function registerApp(app: App): void {
  registerElement(app);
  registerProperites(app);
}
