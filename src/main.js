import newStore from './ui/store/index'
import App from './ui/App.vue'
import { createApp } from 'vue';
import router from "./ui/router";
import axios from "axios";

const store = newStore;

const app = createApp(App)
  .use(router)
  .use(store);

app.provide('axios', axios.defaults.withCredentials = true);

app.mount('#app');

export {
  store,
}
