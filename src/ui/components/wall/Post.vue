<template>
  <n-card>
    <template #header>
      <h4>{{post.title}}</h4>
    </template>

    <template #default>
      <span>{{post.content}}</span>
    </template>
    <template  v-if="isLogged" #action>
      <n-space vertical align="end">
        <n-input v-model:value="commentToSend" type="textarea" placeholder="Write your comment here!" />
        <n-button type="primary" @click="handleSubmit">Add comment</n-button>
      </n-space>
      <n-collapse>
        <n-collapse-item v-if="numberOfComments > 0">
          <template #header>
            <h4 class="expand-comments">Comments ({{numberOfComments}})</h4>
          </template>
          <template #default>
            <n-list bordered>
              <template v-for="(comment, index) in post.comments">
                <Comment :comment="comment"></Comment>
                <n-divider v-if="index !== numberOfComments - 1"></n-divider>
              </template>
            </n-list>
          </template>
        </n-collapse-item>
      </n-collapse>
    </template>
  </n-card>
</template>

<script>
  import {defineComponent} from 'vue';
  import Comment from "./Comment.vue";
  import {NCard, NList, NDivider, NSpace, NInput, NButton, NCollapse, NCollapseItem } from 'naive-ui';

  export default defineComponent({
    name: 'Post',
    components: {
      Comment,
      NCard, NList, NDivider, NSpace, NInput, NButton, NCollapse, NCollapseItem,
    },
    data() {
      return {
        commentToSend: '',
        isLogged: this.$store.getters.isLogged || true,
      }
    },
    computed: {
      numberOfComments() {
        return this.post.comments.length;
      },
    },
    methods: {
      handleClick() {

      }
    },
    props: ['post'],
  })
</script>

<style scoped>
  .n-card {
    width: 750px;
  }

  .n-input {
    width: 750px;
  }

  h4 {
    padding: 0;
    margin: 0;
  }

  .expand-comments {
    padding: 8px;
  }

</style>
