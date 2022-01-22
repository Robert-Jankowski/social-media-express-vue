<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
  import { defineComponent, h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon, NMenu } from 'naive-ui';
  import {
    HomeSharp as HomeIcon, ListCircleSharp as WallIcon,
    PersonSharp as PersonIcon, ReaderSharp as PublicWallIcon, ShieldSharp as PrivateWallIcon,
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
                  path: `/wall/${userId}`
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
                  path: `/wall/${userId}/private`
                }
              },
              'Private Wall'
            ),
          key: 'private-wall',
          icon: renderIcon(PrivateWallIcon),
        },
      ]
    },
  ]

  export default defineComponent({
    name: 'ProfilePageMenu',
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
