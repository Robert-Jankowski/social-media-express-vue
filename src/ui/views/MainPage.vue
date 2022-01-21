<template>
  <div>
    <h1>Main page</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Wall from "./Wall.vue";

export default defineComponent({
  name: 'MainPage',
  components: {
    Wall,
  }
});
</script>

<style scoped>

</style>
