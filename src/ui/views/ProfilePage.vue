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
        <n-space v-if="!empty">
          <div v-if="!loading && !empty">
            <profile-form v-if="editing"
                          class="profile-form"
                          :user="profile"
                          @save="onSubmit"
                          @exit="onEditorExit"></profile-form>
            <profile-content v-else :user="profile"></profile-content>
          </div>
          <div v-else class="empty-placeholder" :style="(empty || loading) ?{height: '171px'} : {}"></div>
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
    <template #footer>
      <n-space justify="end">
        <n-button v-if="username === profileUsername" strong secondary type="success" size="large"
                  :disabled="!profile"
                  @click="onEditButtonClick">Edit info</n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import {NCard, NSpace, NButton, useMessage, NEmpty, NSpin, NIcon} from 'naive-ui';
  import { CloudOfflineSharp as OfflineIcon } from '@vicons/ionicons5';
  import ProfilePageMenu from "../components/profile/ProfilePageMenu";
  import ProfileForm from "../components/profile/ProfileForm";
  import {useRoute} from "vue-router";
  import dataService from "../services/DataService";
  import ProfileContent from "../components/profile/ProfileContent";

  export default defineComponent({
    name: "ProfilePage",
    components: {
      ProfilePageMenu,
      ProfileContent,
      ProfileForm,
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
        },
        displayInfoMessage(msg) {
          message.info(msg, {duration: 5000});
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
        editing: false,
      }
    },
    created() {
      dataService.profile.get(this.profileUsername).then((res) => {
        this.profile = res.data;
        this.loading = false;
      }).catch((error) => {
        this.loading = false;
        this.empty = true;
        this.displayErrorMessage('An error occurred while fetching this profile.');
      });

    },
    methods: {
      onEditButtonClick() {
        this.editing = true;
      },
      onSubmit(value) {
        dataService.profile.edit(this.userId, value).then((res) => {
          this.profile = value;
          this.editing = false;
          this.displayInfoMessage('Your new profile is amazing!');
        }).catch((error) => {
          this.displayErrorMessage('Something went wrong, your amazing profile wasn\'t saved!');
        })
        this.editing = false;
      },
      onEditorExit(value) {
        this.profile = value;
        this.editing = false;
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

  .empty {
    padding: 50px;
  }

  .profile-form {

    min-width: 700px;
  }

</style>
