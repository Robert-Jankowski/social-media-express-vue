<template>
    <n-card>
      <template #header>
        <n-space justify="center">
          <nav-bar :username="username" :userId="userId" :newRequests="newRequests"></nav-bar>
        </n-space>
        <h2>My friends</h2>
      </template>
      <template #default>
        <n-space justify="center">
          <n-input v-model:value="userToInvite" placeholder="Friend's username"/>
          <n-button type="primary" @click="handleInviteFriend">Invite user</n-button>
        </n-space>
        <n-spin :show="loading">
        <n-space v-if="!empty" vertical>
          <n-collapse>
            <n-collapse-item>
              <template #header>
                Friend requests ({{requestsCount}})
              </template>
              <template #default>
                <friends-requests-list :requests="requests" @accept="handleAcceptFriend" @deny="handleDenyFriend"/>
              </template>
            </n-collapse-item>
            <n-collapse-item>
              <template #header>
                Friends ({{friendsCount}})
              </template>
              <template #default>
                <friends-list @remove="handleRemoveFriend" :friends="friends"/>
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
          <n-empty v-else  class="empty" description="Friends cannot be fetched">
            <template #icon>
              <n-icon>
                <offline-icon/>
              </n-icon>
            </template>
          </n-empty>
        </n-spin>
      </template>
    </n-card>
</template>

<script>
  import {defineComponent} from "vue";
  import PostForm from "../components/home-page/PostForm";
  import FriendsList from "../components/friends/FriendsList";
  import FriendsRequestsList from "../components/friends/FriendsRequestsList";
  import {
    NCard, NMenu, NSpace, NAlert, NInput, NButton, NCollapse, NCollapseItem, NEmpty, NIcon, NSpin,
    useMessage
  } from 'naive-ui';
  import { CloudOfflineSharp as OfflineIcon } from '@vicons/ionicons5'
  import {friendsPageErrorMapper as errorMapper} from "../utils/error-mapper/friends-page-error-mapper";
  import dataService from "../services/DataService";
  import NavBar from "../components/common/NavBar";
  import {mapGetters} from "vuex";
  import WebsocketService from "../services/WebsocketService";
  import {isNil} from "lodash";

  export default defineComponent({
    name: 'FriendsPage',
    components: {
      PostForm, FriendsList, FriendsRequestsList, NavBar,
      NCard, NMenu, NSpace, NAlert, NInput,
      NButton, NCollapse, NCollapseItem, NEmpty, NIcon,NSpin,
      OfflineIcon,
    },
    setup() {
      const message = useMessage();
      return {
        socketService: new WebsocketService(),
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
        friends: null,
        requests: null,
        userToInvite: '',
        errorContent: null,
        empty: false,
        loading: true,
      }
    },
    computed: {
      requestsCount() {
        return this.requests?.length ?? 0;
      },
      friendsCount() {
        return this.friends?.length ?? 0;
      },
      ...mapGetters([
        'username',
        'userId',
        'newRequests',
      ]),
    },
    methods: {
      handleInviteFriend() {
        if (this.userToInvite === this.username) {
          this.displayErrorMessage('Uh, inviting yourself does not make a lot of sense.');
          return;
        }

        dataService.friends.invite(this.userToInvite)
          .then((res) => {
            this.displayInfoMessage('Let\'s check out if this user likes you too!');
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleRemoveFriend(value) {
        dataService.friends.remove(value)
          .then((res) => {
            this.displayInfoMessage('You haven\'t liked them anyway.');
            this.friends = this.friends.filter((friend) => friend !== value);
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleAcceptFriend(value) {
        dataService.friends.accept(value)
          .then((res) => {
            this.displayInfoMessage('One more friend to your friends list!');
            this.requests = this.requests.filter((friend) => friend !== value);
            this.friends = [...this.friends, value];
            this.$store.commit('SET_NEW_REQUESTS', false)
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      },
      handleDenyFriend(value) {
        dataService.friends.deny(value)
          .then((res) => {
            this.displayInfoMessage('You denied friend request. But why?');
            this.requests = this.requests.filter((friend) => friend !== value);
            this.$store.commit('SET_NEW_REQUESTS', false)
          })
          .catch((error) => {
            this.errorContent = errorMapper(error);
          })
      }
    },
    created() {

      this.socketService.connect(!isNil(this.userId));
      this.socketService.socket.on(`user/${this.userId}/request`, (friend) => {
        this.requests = [friend.username, ...this.requests];
      });
      this.socketService.socket.on(`user/${this.userId}/friends`, (friend) => {
        this.friends = [...this.friends, friend.username];
      });

      dataService.friends.get().then((res) => {
        this.friends = res.data.friends;
        this.requests = res.data.requests;
        this.loading = false;
      }).catch(error => {
        this.empty = true;
        this.loading = false;
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

  .empty {
    padding: 50px;
  }
</style>
