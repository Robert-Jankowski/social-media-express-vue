<template>
  <div>
    <n-card>
      <template v-if="username" #header>
        <n-space justify="center">
          <main-page-menu :userId="userId"></main-page-menu>
        </n-space>
      </template>
      <template #default>
        <h1>Hello {{username ?? 'guest'}}</h1>
        <h2>What's in your mind today?</h2>
        <post-form v-if="username" @onSubmit="handleSubmit"></post-form>
        <n-space justify="center">
          <n-alert v-if="errorContent"
                   closable
                   title="Error"
                   type="error">
            {{errorContent}}
          </n-alert>
        </n-space>
      </template>
    </n-card>
  </div>
</template>

<script>
  import {defineComponent} from "vue";
  import MainPageMenu from "../components/main-page/MainPageMenu";
  import PostForm from "../components/main-page/PostForm";
  import {NCard, NMenu, NSpace, NAlert } from 'naive-ui';
  import {mainPageErrorMapper as errorMapper} from "../utils/error-mapper/main-page-error-mapper";
  import {DataService} from "../services/DataService";

  export default defineComponent({
    name: 'MainPage',
    components: {
      PostForm,
      MainPageMenu,
      NCard,
      NMenu,
      NSpace,
      NAlert,
    },
    data() {
      return {
        username: this.$store.getters.username,
        userId: this.$store.getters.userId,
        dataService: new DataService(),
        errorContent: null,
      }
    },
    methods: {
      handleSubmit(value) {
        this.dataService.post(value, this.userId)
          .then((res) => {
            // this.$store.commit('SET_USER', res.data.user)
            // this.$router.push({name: 'MainPage'})
            console.log('success')
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      }
    },
  });
</script>

<style scoped>

  .n-card {
    width: 750px;
  }

  h1, h2 {
    text-align: center;
  }

  .n-alert {
    margin-top: 20px;
    width: 700px;
  }

</style>
