<template>
  <n-space vertical class="wall-container">
    <n-card>
      <template #header>
        <h3>{{wallOwnerId}}'s Wall</h3>
      </template>
      <template #default>
        <n-space justify="center">
          <wall-header-menu :userId="wallOwnerId"></wall-header-menu>
        </n-space>
      </template>
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
    name: 'Wall',
    components: {
      Post, WallHeaderMenu,
      NSpace, NCard,
    },
    setup() {
      const route = useRoute();
      const wallOwnerId = route.params.userId;
      const wallType = route.params.wallType ?? 'PUBLIC';

      return {
        wallOwnerId,
        wallType,
      }
    },
    data() {
      return ({
        posts: null,
        dataService: new DataService(),
        userId: null,
        wallType: null,
      })
    },

    created () {
      this.dataService.getWall(this.userId, this.wallType).then((res) => {
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

  h3 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .n-card {
    width: 750px;
  }

</style>
