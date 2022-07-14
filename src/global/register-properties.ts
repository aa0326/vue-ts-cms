import { App } from "vue";
import { formatUtcString } from "@/utils/data-format";
export default function registerProperites(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUtcString(value);
    }
  };
}
