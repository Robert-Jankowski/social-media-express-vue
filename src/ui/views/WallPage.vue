<template>
  <n-space vertical class="wall-container">
    <n-card>
      <n-space v-if="userId" justify="center">
        <nav-bar :username="username"></nav-bar>
      </n-space>
      <h1 v-if="username !== wallOwnerUsername">{{wallOwnerUsername}}'s Wall</h1>
      <h1 v-else>My Wall</h1>
      <n-spin :show="loading">
          <n-empty v-if="empty"
                   class="empty"
                   description="This wall cannot be loaded. It's possible that you are not allowed to see it.">
            <template #icon>
              <n-icon>
                <offline-icon/>
              </n-icon>
            </template>
          </n-empty>
          <div v-else :style="(empty || loading) ?{height: '171px'} : {}"/>
      </n-spin>
    </n-card>
    <n-space vertical>
      <Post v-for="post in posts" :post="post" :userId="userId"></Post>
    </n-space>
  </n-space>
</template>

<script>
  import Post from '../components/wall/Post.vue';
  import { defineComponent } from 'vue';
  import dataService from "../services/DataService";
  import socketService from "../services/WebsocketService";
  import { useRoute } from 'vue-router';
  import { CloudOfflineSharp as OfflineIcon } from '@vicons/ionicons5';
  import {NSpace, NCard, useMessage, NSpin, NIcon, NEmpty} from 'naive-ui';
  import NavBar from "../components/common/NavBar";
  import {getUpdatedPosts} from "../utils/socket-utils/update-posts";

  export default defineComponent({
    name: 'WallPage',
    components: {
      Post, NavBar,
      NSpace, NCard, NSpin, NEmpty, NIcon,
      OfflineIcon,
    },
    props: ['isPrivate'],
    setup() {
      const route = useRoute();
      const message = useMessage();
      const wallOwnerUsername = route.params.username;

      return {
        wallOwnerUsername,
        displayErrorMessage(msg) {
          message.error(msg, {duration: 5000});
        },
        displayInfoMessage(msg) {
          message.info(msg, {duration: 5000});
        },
      }
    },
    data() {
      return {
        posts: null,
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
        loading: true,
        empty: false,
      }
    },
    created () {
      socketService.connect();
      socketService.socket.on(`wall/${this.wallOwnerUsername}/${this.isPrivate ? 'PRIVATE' : 'PUBLIC'}`, (post) => {
        const isNew = !this.posts.map((p) => p.id).includes(post.id);
        this.displayInfoMessage(isNew ? 'New post!' : 'New message!');
        if (isNew) {
          this.posts = [ post, ...this.posts];
        } else {
          const newPosts = getUpdatedPosts(this.posts, post);
          this.posts = [];
          this.$nextTick(() => {
            this.posts = [...newPosts];
          })
        }
      });

      dataService.wall.get(this.wallOwnerUsername, this.isPrivate).then((res) => {
        this.posts = res.data;
        this.loading = false;
      }).catch(error => {
        this.empty = true;
        this.loading = false;
        this.displayErrorMessage('An error occurred while fetching this wall.')
      })
    },

    beforeUnmount() {
      socketService.disconnect()
    }
  })
</script>

<style scoped>

  .wall-container {
    margin-bottom: 20px;
  }

  h1 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .n-card {
    width: 750px;
  }

  .empty {
    padding: 50px;
  }

</style>
