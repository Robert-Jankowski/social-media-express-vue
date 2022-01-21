<template>
  <article>
    <h2>{{post.title}}</h2>
    <span>{{post.content}}</span>
    <CommentForm></CommentForm>
    <ul>
      <Comment v-for="comment in post.comments" :comment="comment"></Comment>
    </ul>
  </article>
</template>

<script>
  import { defineComponent } from 'vue';
  import Comment from "./Comment.vue";
  import CommentForm from "./CommentForm.vue";

  export default defineComponent({
    name: 'Post',
    components: {
      Comment,
      CommentForm,
    },
    props: ['post'],
  })
</script>

<style scoped>

</style>
