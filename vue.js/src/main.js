import Vue from "vue";
import App from "./App.vue";

import { defineCustomElements } from "wc-stock-info/loader";
import { defineCustomElements as devStatsDefineCustomElements } from "wc-dev-stats/loader";

Vue.config.productionTip = false;
Vue.config.ignoredElements = [/wc-\w*/];

defineCustomElements(window);
devStatsDefineCustomElements(window);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
