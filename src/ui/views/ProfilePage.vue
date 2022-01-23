<template>
  <n-card>
    <template #header>
      <n-space justify="center">
        <profile-page-menu :username="profileUsername" :isMyPage="isMyPage"></profile-page-menu>
      </n-space>
      <h2 v-if="!isMyPage">{{profileUsername}}'s profile</h2>
      <h2 v-else>My profile</h2>
    </template>
    <template #default>
      <n-spin :show="loading">
        <n-space v-if="!empty" justify="center">
          <span>CONTENT 1</span>
          <span>CONTENT 2</span>
          <span>CONTENT 3</span>
        </n-space>
      </n-spin>
      <n-empty v-if="empty" class="empty" description="This profile cannot be fetched">
        <template #icon>
          <n-icon>
            <offline-icon/>
          </n-icon>
        </template>
      </n-empty>
    </template>
  </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import {NCard, NSpace, NButton, useMessage, NEmpty, NSpin, NIcon} from 'naive-ui';
  import { CloudOfflineSharp as OfflineIcon } from '@vicons/ionicons5';
  import ProfilePageMenu from "../components/profile/ProfilePageMenu";
  import {useRoute} from "vue-router";
  import dataService from "../services/DataService";

  export default defineComponent({
    name: "ProfilePage",
    components: {
      ProfilePageMenu,
      NCard,
      NSpace,
      NButton,
      NEmpty,
      NSpin,
      NIcon,
      OfflineIcon,
    },
    setup() {
      const route = useRoute();
      const message = useMessage();
      const profileUsername = route.params.username;

      return {
        profileUsername,
        displayErrorMessage(msg) {
          message.error(msg, {duration: 5000});
        }
      }
    },
    data() {
      return {
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
        isMyPage: this.$store.state?.user?.username === this.profileUsername,
        profile: null,
        empty: false,
        loading: true,
      }
    },
    created() {
      dataService.profile.get(this.username).then((res) => {
        this.loading = false;
        this.profile = res.data;
      }).catch((error) => {
        this.loading = false;
        this.empty = true;
        this.displayErrorMessage('An error occurred while fetching this profile.')
      });

    }
  })
</script>

<style scoped>

  .n-card {
    width: 750px;
    min-height: 610px;
  }

  h2 {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .empty {
    padding: 50px;
  }

</style>
