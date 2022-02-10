<template>
  <n-space>
    <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <n-button @click="logout" :bordered="false">
      <n-icon size="20">
        <log-out-icon/>
      </n-icon>
    </n-button>
    <n-icon v-if="newRequests" size="20" color="red">
      <person-add-icon/>
    </n-icon>
  </n-space>
</template>

<script>
  import { defineComponent, h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon, NMenu, NSpace, NButton } from 'naive-ui';
  import {
    HomeSharp as HomeIcon, ListCircleSharp as WallIcon, PeopleSharp as PeopleIcon,
    PersonSharp as PersonIcon, ReaderSharp as PublicWallIcon, ShieldSharp as PrivateWallIcon,
    PersonAddOutline as PersonAddIcon, LogOut as LogOutIcon,
  } from '@vicons/ionicons5';
  import WebsocketService from "../../services/WebsocketService";
  import {isNil} from "lodash";
  import {mapGetters} from "vuex";

  function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const menuOptions = (username) => {
    return [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: `/home`
              }
            },
            'Main page'
          ),
        key: 'home-page',
        icon: renderIcon(HomeIcon)
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: `/user/${username}/profile`
              }
            },
            'My profile'
          ),
        key: 'user-profile',
        icon: renderIcon(PersonIcon)
      },
      {
        label: 'My Wall',
        key: 'wall',
        icon: renderIcon(WallIcon),
        children: [
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: `/wall/${username}`
                  }
                },
                'Public Wall'
              ),
            key: 'public-wall',
            icon: renderIcon(PublicWallIcon),
          },
          {
            label: () =>
              h(
                RouterLink,
                {
                  to: {
                    path: `/wall/${username}/private`
                  }
                },
                'Private Wall'
              ),
            key: 'private-wall',
            icon: renderIcon(PrivateWallIcon),
          },
        ]
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: `/friends`
              },
            },
            'Friends'
          ),
        key: 'friends',
        icon: renderIcon(PeopleIcon),
      },
    ]
  }

  export default defineComponent({
    name: 'NavBar',
    components: {
      NMenu,
      NSpace,
      NIcon,
      NButton,
      PersonAddIcon,
      LogOutIcon,
    },
    props: ['username'],
    setup (props, context) {
      return {
        socketService: new WebsocketService(),
        activeKey: ref(null),
        menuOptions: menuOptions(props.username, props.newRequests),
      }
    },
    computed: {
      ...mapGetters([
        'username',
        'userId',
        'newRequests',
      ]),
    },
    methods: {
      logout() {
        sessionStorage.removeItem('microwall-jwt');
        window.location.href = '/login';
      },
    },
    created() {
      if(!isNil(this.userId)) {
        this.socketService.connect(true);

        this.socketService.socket.on(`user/${this.userId}/requests`, () => {
          this.$store.commit('SET_NEW_REQUESTS', true);
        });
      }

    },
    beforeUnmount() {
      this.socketService.disconnect();
    },
  })
</script>

<style scoped>
  .n-space {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
