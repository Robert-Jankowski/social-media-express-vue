<template>
  <n-list-item>
    <router-link :to="`/user/${comment.author}/profile`" class="link">
      <h3>{{comment.author}}</h3>
    </router-link>
    <span v-html="linkifyHtml(comment.content)"></span>
  </n-list-item>
</template>

<script>
  import { defineComponent } from 'vue';
  import {NListItem} from "naive-ui";
  import linkifyHtml from "linkify-html";


  export default defineComponent({
    name: 'Comment',
    props: ['comment'],
    components: [
      NListItem,
    ],
    methods: {
      linkifyHtml,
    }
  })
</script>

<style scoped>

  .link {
    text-decoration: none;
    color: black;
  }

</style>
