<template>
  <n-card>
    <template #header>
      <n-space justify="center">
        <friends-header-menu></friends-header-menu>
      </n-space>
      <h2>My friends</h2>
    </template>
    <template #default>
      <n-space justify="center">
        <n-input v-model:value="userToInvite" placeholder="Friend's username"/>
        <n-button type="primary" @click="handleInviteFriend">Invite user</n-button>
      </n-space>
      <n-space vertical>
        <n-collapse>
          <n-collapse-item>
            <template #header>
              Friend requests ({{requestsCount}})
            </template>
            <template #default>
              <friends-requests-list @accept="handleAcceptFriend" @deny="handleDenyFriend" :requests="requests"></friends-requests-list>
            </template>
          </n-collapse-item>
          <n-collapse-item>
            <template #header>
              Friends ({{friendsCount}})
            </template>
            <template #default>
              <friends-list @remove="handleRemoveFriend" :friends="friends"></friends-list>
            </template>
          </n-collapse-item>
        </n-collapse>
        <n-alert v-if="errorContent"
                 closable
                 title="Error"
                 type="error">
          {{errorContent}}
        </n-alert>
      </n-space>
    </template>
  </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import HomePageMenu from "../components/home-page/HomePageMenu.vue";
  import PostForm from "../components/home-page/PostForm";
  import FriendsList from "../components/friends/FriendsList";
  import FriendsRequestsList from "../components/friends/FriendsRequestsList";
  import FriendsHeaderMenu from "../components/friends/FriendsHeaderMenu";
  import {NCard, NMenu, NSpace, NAlert, NInput, NButton, NCollapse, NCollapseItem} from 'naive-ui';
  import {friendsPageErrorMapper as errorMapper} from "../utils/error-mapper/friends-page-error-mapper";
  import {DataService} from "../services/DataService";

  export default defineComponent({
    name: 'FriendsPage',
    components: {
      PostForm, HomePageMenu, FriendsList, FriendsRequestsList, FriendsHeaderMenu,
      NCard, NMenu, NSpace, NAlert, NInput, NButton, NCollapse, NCollapseItem
    },
    data() {
      return {
        username: this.$store.getters.username,
        userId: this.$store.getters.userId,
        friends: null,
        requests: null,
        userToInvite: '',
        dataService: new DataService(),
        errorContent: null,
      }
    },
    methods: {
      handleInviteFriend(value) {
        this.dataService.inviteFriend(value, this.userId)
          .then((res) => {
            // this.$store.commit('SET_USER', res.data.user)
            // this.$router.push({name: 'HomePage'})
            console.log('success')
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleRemoveFriend(value) {
        this.dataService.removeFriend(value, this.userId)
          .then((res) => {
            // this.$store.commit('SET_USER', res.data.user)
            // this.$router.push({name: 'HomePage'})
            console.log('success')
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleAcceptFriend(value) {
        this.dataService.acceptFriend(value, this.userId)
          .then((res) => {
            // this.$store.commit('SET_USER', res.data.user)
            // this.$router.push({name: 'HomePage'})
            console.log('success')
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleDenyFriend(value) {
        this.dataService.denyFriend(value, this.userId)
          .then((res) => {
            // this.$store.commit('SET_USER', res.data.user)
            // this.$router.push({name: 'HomePage'})
            console.log('success')
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      }
    },
    computed: {
      requestsCount() {
        return this.requests?.length ?? 0;
      },
      friendsCount() {
        return this.friends?.length ?? 0;
      }
    },
    created() {
      this.dataService.getFriends(this.userId).then((res) => {
        this.friends = res.data;
      }).catch(error => {
        console.log(error)
      })

      this.dataService.getFriendsRequests(this.userId).then((res) => {
        this.requests = res.data;
      }).catch(error => {
        console.log(error)
      })
    }
  });
</script>

<style scoped>

  .n-card {
    width: 750px;
    min-height: 610px;
  }

  .n-alert {
    margin-top: 20px;
    width: 700px;
  }


  h2 {
    margin: 0;
    padding: 0;
    text-align: center;
  }
</style>
