<template>
  <n-card>
    <template #header>
      <h1>MicroWall</h1>
    </template>
    <login-form :registerView="registerView" @onSubmit="handleSubmit">
    </login-form>
    <n-space justify="center">
      <n-alert v-if="errorContent"
               closable
               title="Error"
               type="error">
        {{errorContent}}
      </n-alert>
    </n-space>
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
  import {NSwitch, NCard, NSpace, NAlert } from 'naive-ui';
  import { loginPageErrorMapper as errorMapper } from "../utils/error-mapper/login-page-error-mapper";

  export default defineComponent({
    name: 'LoginPage',
    components: {
      LoginForm,
      NCard, NSwitch, NSpace, NAlert,
    },
    data() {
      return {
        registerView: false,
        dataService: new DataService(),
        errorContent: null,
      }
    },
    methods: {
      handleSubmit({username, password}) {
        if (this.registerView) {
          this.dataService.user.register(username, password)
            .then((res) => {
              this.$store.commit('SET_USER', res.data.user)
              this.$router.push({name: 'HomePage'})
            })
            .catch((error) => {
              this.errorContent = errorMapper(error);
            })
          return;
        }

        this.dataService.user.login(username, password)
          .then((res) => {
            this.$store.commit('SET_USER', res.data.user)
            this.$router.push({name: 'HomePage'})
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
    },
  });
</script>

<style scoped>

  .n-card {
    width: 750px;
    min-height: 610px;
  }

  h1 {
    text-align: center;
  }

  .n-alert {
    margin-top: 20px;
    width: 700px;
  }

</style>
