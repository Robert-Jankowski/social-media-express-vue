<template>
  <n-list-item>
    <h3>{{comment.author.username}}</h3>
    <span>{{comment.content}}</span>
  </n-list-item>
</template>

<script>
  import { defineComponent } from 'vue';
  import {NListItem} from "naive-ui";

  export default defineComponent({
    name: 'Comment',
    props: ['comment'],
    components: [
      NListItem,
    ]
  })
</script>

<style scoped>

</style>
