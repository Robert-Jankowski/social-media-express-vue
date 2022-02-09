<template>
  <div>
    <n-card>
      <template v-if="username" #header>
        <n-space justify="center">
          <nav-bar :username="username" :userId="userId" :newRequests="newRequests"></nav-bar>
        </n-space>
        <h2>Hello {{username}}</h2>
        <h3>What's in your mind today?</h3>
      </template>
      <template #default>

        <post-form v-if="username" @onSubmit="handleSubmit"/>
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
  import PostForm from "../components/home-page/PostForm";
  import {NCard, NMenu, NSpace, NAlert } from 'naive-ui';
  import {homePageErrorMapper as errorMapper} from "../utils/error-mapper/home-page-error-mapper";
  import dataService from "../services/DataService";
  import NavBar from "../components/common/NavBar";
  import {mapGetters} from "vuex";

  export default defineComponent({
    name: 'HomePage',
    components: {
      PostForm, NavBar,
      NCard, NMenu, NSpace, NAlert,
    },
    data() {
      return {
        errorContent: null,
      }
    },
    computed: {
      ...mapGetters([
        'username',
        'userId',
        'newRequests',
      ]),
    },
    methods: {
      handleSubmit(value) {
        dataService.user.post(value, this.userId)
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
