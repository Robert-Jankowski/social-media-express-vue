import store from './ui/store'
import App from './ui/App.vue'
import { createApp } from 'vue';
import router from "./ui/router";

const app = createApp(App)
  .use(router)
  .use(store);

app.mount('#app');
