<template>
  <section>
    <h1>Wall</h1>
    <Post v-for="post in posts" :post="post"></Post>
  </section>
</template>

<script lang="ts">
  import Post from './wall/Post.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Wall',
    components: {
      Post,
    },
    props: ['posts'],
  })
</script>

<style scoped>

</style>
