<template>
  <n-card>
    <template #header>
      <h1>MicroWall</h1>
    </template>
    <login-form :registerView="registerView" @onSubmit="handleSubmit">
    </login-form>
    <n-space justify="end">
      <n-space vertical>
        <span>register</span>
        <n-switch v-model:value="registerView" size="large"></n-switch>
      </n-space>
    </n-space>
  </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import {DataService} from "../services/DataService";
  import LoginForm from "../components/login/LoginForm";
  import {NSwitch, NCard, NSpace} from 'naive-ui';

  export default defineComponent({
    name: 'LoginPage',
    components: {
      LoginForm,
      NCard,
      NSwitch,
      NSpace,
    },
    data() {
      return {
        registerView: false,
        dataService: new DataService(),
      }
    },
    methods: {
      handleSubmit({login, password}) {
        if (this.registerView) {
          this.dataService.registerUser(login, password)
            .then((res) => {
              this.$store.commit('SET_USER', res.data.user)
              this.$router.push({name: 'MainPage'})
            })
            .catch(console.log)
          return;
        }

        this.dataService.loginUser(login, password)
          .then((res) => {
            this.$store.commit('SET_USER', res.data.user)
            this.$router.push({name: 'MainPage'})
          })
          .catch(console.log)
      },
    },
  });
</script>

<style scoped>

  .n-card {
    width: 800px;
  }

  h1 {
    text-align: center;
  }

</style>
