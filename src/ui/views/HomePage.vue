<template>
  <div>
    <n-card>
      <template v-if="username" #header>
        <n-space justify="center">
          <home-page-menu :username="username"></home-page-menu>
        </n-space>
        <h2>Hello {{username ?? 'guest'}}</h2>
        <h3>What's in your mind today?</h3>
      </template>
      <template #default>

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
  import HomePageMenu from "../components/home-page/HomePageMenu.vue";
  import PostForm from "../components/home-page/PostForm";
  import {NCard, NMenu, NSpace, NAlert } from 'naive-ui';
  import {homePageErrorMapper as errorMapper} from "../utils/error-mapper/home-page-error-mapper";
  import {DataService} from "../services/DataService";

  export default defineComponent({
    name: 'HomePage',
    components: {
      PostForm, HomePageMenu,
      NCard, NMenu, NSpace, NAlert,
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
        this.dataService.user.post(value, this.userId)
          .then((res) => {
            this.$router.push(`/wall/${this.username}${res.data.isPrivate ? '/private' : ''}`)
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
    min-height: 610px;
  }

  h2, h3 {
    text-align: center;
    margin: 0;
    padding: 0;
  }

  .n-alert {
    margin-top: 20px;
    width: 700px;
  }

</style>
