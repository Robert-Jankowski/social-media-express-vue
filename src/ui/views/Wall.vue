<template>
  <section>
    <h1>Wall</h1>
    <Post v-for="post in posts" :post="post"></Post>
  </section>
</template>

<script>
  import Post from '../components/wall/Post.vue';
  import { defineComponent } from 'vue';
  import {DataService} from "../services/DataService";
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'Wall',
    components: {
      Post,
    },
    setup() {
      const route = useRoute();
      this.userId = route.params.userId;
      this.wallType = route.params.wallType;
    },
    data() {
      return ({
        posts: null,
        dataService: new DataService('https://localhost:8080'),
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

</style>
