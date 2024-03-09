import { router } from "./router";
import { createApp } from "vue";
import App from "./App.vue";

import "v-dropdown-menu/css";
import DropdownMenu from "v-dropdown-menu";
import { OhVueIcon } from "./icons";

createApp(App)
  .use(router)
  .use(DropdownMenu)
  .component("v-icon", OhVueIcon)
  .mount("#app");
