<template>
  <n-card>
    <template #header>
      <n-space justify="center">
        <profile-page-menu :username="profileUsername"></profile-page-menu>
      </n-space>
      <h2 v-if="username !== profileUsername">{{profileUsername}}'s profile</h2>
      <h2 v-else>My profile</h2>
    </template>
    <template #default>

    </template>
  </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import { NCard, NSpace } from 'naive-ui';
  import ProfilePageMenu from "../components/profile/ProfilePageMenu";
  import {useRoute} from "vue-router";

  export default defineComponent({
    name: "ProfilePage",
    components: {
      ProfilePageMenu,
      NCard,
      NSpace,
    },
    setup() {
      const route = useRoute();
      const profileUsername = route.params.userId;

      return {
        profileUsername,
      }
    },
    data() {
      return {
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
      }
    },
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

</style>
