<template>
  <article>
    <h2>{{post.title}}</h2>
    <span>{{post.content}}</span>
    <ul>
      <Comment v-for="comment in post.comments" :comment="comment"></Comment>
    </ul>
  </article>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Comment from "./Comment.vue";

  export default defineComponent({
    name: 'Post',
    components: {
      Comment,
    },
    props: ['post'],
  })
</script>

<style scoped>

</style>
