import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// pinia config
import { createPinia } from "pinia";

// Emitter config
import mitt from "mitt";
const Emitter = mitt();

// Swiper Config
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// mdi font
import "@mdi/font/css/materialdesignicons.css";

// Components

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
app.use(vuetify);
app.provide("Emitter", Emitter);
app.use(createPinia());
app.use(router);
app.mount("#app");
