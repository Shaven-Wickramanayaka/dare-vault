import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import firebaseApp, { db, auth } from "./firebase/firebase";
import "./registerServiceWorker";
import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] });
app.mount("#app");
