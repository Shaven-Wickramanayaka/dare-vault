import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { VueFire, VueFireAuth } from "vuefire";
import firebaseApp, { db, auth } from "./firebase/firebase";
import "@mdi/font/css/materialdesignicons.css";
import { registerSW } from "virtual:pwa-register";
const app = createApp(App);
// This registers the service worker and handles updates
const updateSW = registerSW({
  onNeedRefresh() {
    // Show a notification or prompt to the user to reload
    if (confirm("New content available. Reload?")) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("App is ready for offline use!");
  },
});

app.use(router);
app.use(createPinia());
app.use(VueFire, { firebaseApp, modules: [VueFireAuth()] });
app.mount("#app");
