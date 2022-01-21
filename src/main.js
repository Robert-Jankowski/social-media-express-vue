import store from './ui/store/index'
import App from './ui/App.vue'
import { createApp } from 'vue';
import router from "./ui/router";
import axios from "axios";

const app = createApp(App)
  .use(router)
  .use(store);

app.provide('axios', axios.defaults.withCredentials = true);

app.mount('#app');
