import Vue from "vue";
import VSelect from "./VSelect.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(VSelect)
}).$mount("#app");
