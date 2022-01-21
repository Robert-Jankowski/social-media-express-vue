<template>
  <div>
    <h1>Login</h1>
<form @submit.prevent="handleSubmit">
  <label for="login">Login</label><br>
  <input id="login" type="text" v-model="login"><br>
  <label for="password">Password</label><br>
  <input id="password" type="password" v-model="password"><br>
  <button type="submit">Submit</button>
</form>
  <router-link to="/welcome">Continue without logging</router-link>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {DataService} from "../services/DataService";

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
      dataService: new DataService(),
    }
  },
  methods: {
    handleSubmit() {
      this.dataService.logIn(this.login, this.password).then((res) => {
        this.$store.commit('SET_USER', res.data.user)
        this.$router.push({ name: 'MainPage' })
      }).catch(alert)
    }
  },
});
</script>

<style scoped>

</style>
