<template>
  <div>
    <Wall :posts="posts"></Wall>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DataService } from '../services/DataService'
import Wall from "../components/Wall.vue";

export default defineComponent({
  name: 'MainPage',
  components: {
    Wall,
  },
  data () {
    return {
      posts: [],
      dataService: new DataService('https://localhost:8080'),
    }
  },
  created () {
    this.dataService.getWall('61e8612f61cd1162c0442cd6', 'public').then((res) => {
      this.posts = res.data;
    }).catch(error => {
      console.log(error);
    })
  }
});
</script>

<style scoped>

</style>
