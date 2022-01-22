<template>
  <n-space vertical class="wall-container">
    <n-card>
      <n-space justify="center">
        <wall-header-menu :userId="wallOwnerId"></wall-header-menu>
      </n-space>
      <h2 v-if="userId !== wallOwnerId">{{wallOwnerId}}'s Wall</h2>
      <h2 v-else>My Wall</h2>
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
      const wallOwnerId = route.params.userId;

      return {
        wallOwnerId,
      }
    },
    data() {
      return ({
        posts: null,
        dataService: new DataService(),
        userId: this.$store.state?.user?.id,
      })
    },

    created () {
      this.dataService.getWall(this.userId, this.isPrivate ? 'PRIVATE' : 'PUBLIC').then((res) => {
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

  h2 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .n-card {
    width: 750px;
  }

</style>
