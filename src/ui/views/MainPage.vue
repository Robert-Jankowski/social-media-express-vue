<template>
  <div>
    <h1>Main page</h1>
    <span>Hello {{username ?? 'guest'}}</span><br>
    <div v-if="username">
      <button @click="goToWall(userId, false)">My public wall</button>
      <button @click="goToWall(userId, true)">My private wall</button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Wall from "./Wall.vue";

export default defineComponent({
  name: 'MainPage',
  components: {
    Wall,
  },
  data() {
    return {
      username: this.$store.getters.username,
      userId: this.$store.getters.userId,
    }
  },
  methods: {
    goToWall(userId, isPrivate) {

      const url = `/wall/${userId}${isPrivate ? '/private' : ''}`;

      this.$router.push(url);
    },
  },
});
</script>

<style scoped>

</style>
