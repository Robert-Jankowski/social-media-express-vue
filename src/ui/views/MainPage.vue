<template>
  <div>
    <n-page-header>
      Hello {{username ?? 'guest'}}
    </n-page-header>
    <n-card>
      <template #header>

      </template>
      <template #default>
        <div v-if="username">
          <button @click="goToWall(userId, false)">My public wall</button>
          <button @click="goToWall(userId, true)">My private wall</button>
        </div>
      </template>
    </n-card>
  </div>
</template>

<script>
  import {defineComponent} from "vue";
  import Wall from "./Wall.vue";
  import {NCard, NPageHeader} from 'naive-ui';

  export default defineComponent({
    name: 'MainPage',
    components: {
      Wall,
      NCard,
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
