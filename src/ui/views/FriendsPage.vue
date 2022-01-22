<template>
    <n-card>
      <template #header>
        <n-space justify="center">
          <friends-header-menu :username="username"></friends-header-menu>
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
                <friends-requests-list @accept="handleAcceptFriend"
                                       @deny="handleDenyFriend"
                                       :requests="requests">
                </friends-requests-list>
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
  import {
    NCard, NMenu, NSpace, NAlert, NInput, NButton, NCollapse, NCollapseItem,
    useMessage
  } from 'naive-ui';
  import {friendsPageErrorMapper as errorMapper} from "../utils/error-mapper/friends-page-error-mapper";
  import {DataService} from "../services/DataService";

  export default defineComponent({
    name: 'FriendsPage',
    components: {
      PostForm, HomePageMenu, FriendsList, FriendsRequestsList, FriendsHeaderMenu,
      NCard, NMenu, NSpace, NAlert, NInput, NButton, NCollapse, NCollapseItem,
    },
    setup() {
      const message = useMessage();
      return {
        displayErrorMessage(msg) {
          message.error(msg, { duration: 5000 });
        },
        displayInfoMessage(msg) {
          message.info(msg, { duration: 5000 });
        }
      }
    },
    data() {
      return {
        username: this.$store.state?.user?.username,
        userId: this.$store.state?.user?.id,
        friends: null,
        requests: null,
        userToInvite: '',
        dataService: new DataService(),
        errorContent: null,
      }
    },
    methods: {
      handleInviteFriend() {
        if (this.userToInvite === this.username) {
          this.displayErrorMessage('Uh, inviting yourself does not make a lot of sense.');
          return;
        }

        this.dataService.friends.invite(this.userToInvite, this.userId)
          .then((res) => {
            this.displayInfoMessage('Let\'s check out if this user likes you too!');
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleRemoveFriend(value) {
        this.dataService.friends.remove(value, this.userId)
          .then((res) => {
            this.displayInfoMessage('You haven\'t liked them anyway.');
            this.friends = this.friends.filter((friend) => friend !== value);
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleAcceptFriend(value) {
        this.dataService.friends.accept(value, this.userId)
          .then((res) => {
            this.displayInfoMessage('One more friend to your friends list!');
            this.requests = this.requests.filter((friend) => friend !== value);
            this.friends = [...this.friends, value];
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleDenyFriend(value) {
        this.dataService.friends.deny(value, this.userId)
          .then((res) => {
            this.displayInfoMessage('You denied friend request. But why?');
            this.requests = this.requests.filter((friend) => friend !== value);
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
      this.dataService.friends.get(this.userId).then((res) => {
        this.friends = res.data.friends;
        this.requests = res.data.requests;
      }).catch(error => {
        this.displayErrorMessage('An error occurred while fetching your friends.');
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
