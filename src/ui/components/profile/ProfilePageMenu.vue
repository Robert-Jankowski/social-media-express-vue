<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
  import { defineComponent, h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon, NMenu } from 'naive-ui';
  import {
    HomeSharp as HomeIcon,
    ListCircleSharp as WallIcon,
    PeopleSharp as PeopleIcon,
    ReaderSharp as PublicWallIcon,
    ShieldSharp as PrivateWallIcon,
  } from '@vicons/ionicons5';

  function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const menuOptions = (username) => [
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
        label: 'Wall',
        key: 'wall',
        icon: renderIcon(WallIcon),
        children: [
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
        ]
      },
    ];

  const friendsOption = {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: `/friends`
          }
        },
        'Friends'
      ),
    key: 'friends',
    icon: renderIcon(PeopleIcon),
  };

  export default defineComponent({
    name: 'ProfilePageMenu',
    components: {
      NMenu,
    },
    props: ['username', 'isMyPage'],
    setup (props, context) {
      return {
        activeKey: ref(null),
        menuOptions: props.isMyPage ?
          [...menuOptions(props.username), friendsOption] :
          menuOptions(props.username),
      }
    }
  })
</script>

<style scoped>

</style>
