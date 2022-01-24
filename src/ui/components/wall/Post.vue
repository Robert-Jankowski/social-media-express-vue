<template>
  <n-card :key="post.id">
    <template #header>
      <h4>{{post.title}}</h4>
    </template>

    <template #default>
      <span v-html="linkifyHtml(post.content)"></span>
    </template>
    <template v-if="userId" #action>
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
              <template v-for="(comment, index) in comments">
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
  import {NCard, NList, NDivider, NSpace, NInput, NButton, NCollapse, NCollapseItem, useMessage } from 'naive-ui';
  import dataService from "../../services/DataService";
  import linkifyHtml from 'linkify-html';

  export default defineComponent({
    name: 'Post',
    components: {
      Comment,
      NCard, NList, NDivider, NSpace, NInput, NButton, NCollapse, NCollapseItem,
    },
    props: ['post', 'userId'],
    setup() {
      const message = useMessage();

      return {
        displayErrorMessage(msg) {
          message.error(msg);
        }
      }
    },
    data() {
      return {
        commentToSend: '',
        comments: this.post.comments,
        userId: this.userId,
      }
    },
    computed: {
      numberOfComments() {
        return this.comments.length;
      },
    },
    methods: {
      linkifyHtml,
      handleSubmit() {
        dataService.post.comment(this.post.id, this.userId, this.commentToSend).then((res) => {
          console.log('yay')
        })
        .catch((error) => {
          this.displayErrorMessage('Something gone wrong, your comment was not posted.')
        })
      },
    },
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
