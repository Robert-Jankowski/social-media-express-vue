<template>
  <li>
    <h3>{{comment.author.username}}</h3>
    <span>{{comment.content}}</span>
  </li>
</template>

<script>
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Comment',
    props: ['comment'],
  })
</script>

<style scoped>

</style>
