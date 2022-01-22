<template>
  <n-space vertical class="wall-container">
    <n-card>
      <n-space justify="center">
        <wall-header-menu :username="wallOwnerUsername"></wall-header-menu>
      </n-space>
      <h1 v-if="username !== wallOwnerUsername">{{wallOwnerUsername}}'s Wall</h1>
      <h1 v-else>My Wall</h1>
    </n-card>
    <n-space vertical>
      <Post v-for="post in posts" :post="post"></Post>
    </n-space>
  </n-space>
</template>

<script>
  import Post from '../components/wall/Post.vue';
  import WallHeaderMenu from '../components/wall/WallHeaderMenu';
  import { defineComponent } from 'vue';
  import {DataService} from "../services/DataService";
  import { useRoute } from 'vue-router';
  import { NSpace, NCard } from 'naive-ui';

  export default defineComponent({
    name: 'WallPage',
    components: {
      Post, WallHeaderMenu,
      NSpace, NCard,
    },
    props: ['isPrivate'],
    setup() {
      const route = useRoute();
      const wallOwnerUsername = route.params.username;

      return {
        wallOwnerUsername,
      }
    },
    data() {
      return {
        posts: null,
        dataService: new DataService(),
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
      }
    },

    created () {
      this.dataService.wall.get(this.wallOwnerUsername, this.isPrivate ? 'PRIVATE' : 'PUBLIC').then((res) => {
        this.posts = res.data;
      }).catch(error => {
        console.log(error);
      })
    }
  })
</script>

<style scoped>

  .wall-container {
    margin-bottom: 20px;
  }

  h1 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .n-card {
    width: 750px;
  }

</style>
