<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
  import { defineComponent, h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon, NMenu } from 'naive-ui';
  import {
    HomeSharp as HomeIcon,
    PeopleSharp as PeopleIcon,
    PersonSharp as PersonIcon,
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
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: `/user/${username}/profile`
            }
          },
          'User profile'
        ),
      key: 'user-profile',
      icon: renderIcon(PersonIcon)
    },
    {
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
    },
  ]

  export default defineComponent({
    name: 'WallHeaderMenu',
    components: {
      NMenu,
    },
    props: ['username'],
    setup (props, context) {
      return {
        activeKey: ref(null),
        menuOptions: menuOptions(props.username),
      }
    }
  })
</script>

<style scoped>

</style>
