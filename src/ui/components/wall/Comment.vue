<template>
  <li>
    {{comment}}
  </li>
</template>

<script lang="ts">
  import Comment from './wall/Comment.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Comment',
    props: ['comment'],
  })
</script>

<style scoped>

</style>
