import { Tabs, Tab } from "vue3-tabs-component";

export default defineNuxtPlugin((ctx) => {
  ctx.vueApp.component("tabs", Tabs);
  ctx.vueApp.component("tab", Tab);
});
