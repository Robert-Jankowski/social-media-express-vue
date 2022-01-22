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

  const menuOptions = (userId) => [
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
              path: `/user/${userId}/profile`
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
    props: ['userId'],
    setup (props, context) {
      console.log(props.userId)
      return {
        activeKey: ref(null),
        menuOptions: menuOptions(props.userId),
      }
    }
  })
</script>

<style scoped>

</style>
