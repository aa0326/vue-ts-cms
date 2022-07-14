import { App } from "vue";
// import {
//   ElButton,
//   ElTable,
//   ElAlert,
//   ElAside,
//   ElAutocomplete,
//   ElAvatar,
//   ElBacktop,
//   ElBadge
// } from "element-plus";
import {
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  Fold,
  ArrowDown,
  CloseBold,
  EditPen,
  DeleteFilled
} from "@element-plus/icons-vue";
const components = [
  // ElButton,
  // ElTable,
  // ElAlert,
  // ElAside,
  // ElAutocomplete,
  // ElAvatar,
  // ElBacktop,
  // ElBadge,
  UserFilled,
  Iphone,
  Monitor,
  Setting,
  Goods,
  ChatLineRound,
  Expand,
  Fold,
  ArrowDown,
  CloseBold,
  EditPen,
  DeleteFilled
];

export default function (app: App) {
  for (const item of components) {
    app.component(item.name, item);
  }
}
