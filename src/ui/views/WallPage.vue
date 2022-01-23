<template>
  <n-space vertical class="wall-container">
    <n-card>
      <n-space v-if="userId" justify="center">
        <wall-header-menu :username="wallOwnerUsername"></wall-header-menu>
      </n-space>
      <h1 v-if="username !== wallOwnerUsername">{{wallOwnerUsername}}'s Wall</h1>
      <h1 v-else>My Wall</h1>
      <n-spin :show="loading">
          <n-empty v-if="empty" class="empty" description="This wall cannot be fetched">
            <template #icon>
              <n-icon>
                <offline-icon/>
              </n-icon>
            </template>
          </n-empty>
          <div v-else class="empty-placeholder" :style="(empty || loading) ?{height: '171px'} : {}"/>
      </n-spin>
    </n-card>
    <n-space vertical>
      <Post v-for="post in posts" :post="post" :userId="userId"></Post>
    </n-space>
  </n-space>
</template>

<script>
  import Post from '../components/wall/Post.vue';
  import WallHeaderMenu from '../components/wall/WallHeaderMenu';
  import { defineComponent } from 'vue';
  import {DataService} from "../services/DataService";
  import { useRoute } from 'vue-router';
  import { CloudOfflineSharp as OfflineIcon } from '@vicons/ionicons5';
  import {NSpace, NCard, useMessage, NSpin, NIcon, NEmpty} from 'naive-ui';

  export default defineComponent({
    name: 'WallPage',
    components: {
      Post, WallHeaderMenu,
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
        }
      }
    },
    data() {
      return {
        posts: null,
        dataService: new DataService(),
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
        loading: true,
        empty: false,
      }
    },
    created () {
      this.dataService.wall.get(this.wallOwnerUsername, this.isPrivate).then((res) => {
        this.posts = res.data;
        this.loading = false;
      }).catch(error => {
        this.empty = true;
        this.loading = false;
        this.displayErrorMessage('An error occurred while fetching this wall.')
      })
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
