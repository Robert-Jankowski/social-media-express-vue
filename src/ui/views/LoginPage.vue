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
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'LoginPage',
  data() {
    return {
      login: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {

    }
  },
});
</script>

<style scoped>

</style>
