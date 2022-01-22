<template>
  <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
</template>

<script>
  import { defineComponent, h, ref } from 'vue';
  import { RouterLink } from 'vue-router';
  import { NIcon, NMenu } from 'naive-ui';
  import {
    ReaderSharp as PublicWallIcon,
    ShieldSharp as PrivateWallIcon,
    ListCircleSharp as WallIcon,
    PersonSharp as PersonIcon,
    PeopleSharp as PeopleIcon,
  } from '@vicons/ionicons5';

  function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const menuOptions = (username) => [
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
              path: `/user/${username}/profile`
            }
          },
          'My profile'
        ),
      key: 'my-profile',
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
    name: 'HomePageMenu',
    components: {
      NMenu,
    },
    props: ['username'],
    setup (props, context) {
      console.log(props.username)
      return {
        activeKey: ref(null),
        menuOptions: menuOptions(props.username),
      }
    }
  })
</script>

<style scoped>

</style>
