<template>
  <n-list-item>
    <router-link :to="`/user/${comment.author.userId}/profile`" class="link">
      <h3>{{comment.author.username}}</h3>
    </router-link>
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

  .link {
    text-decoration: none;
    color: black;
  }

</style>
