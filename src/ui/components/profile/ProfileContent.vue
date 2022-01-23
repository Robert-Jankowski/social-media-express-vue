<template>
  <n-thing v-if="user.username">
    <template #avatar>
      <n-avatar :size="90" :src="user.imageUrl">
      </n-avatar>
    </template>
    <template #header>
      <h3 v-if="user">{{user.realName ?? user.username}}</h3>
    </template>
    <template #description>
      <span v-if="user" class="status">{{user.status ?? '---------------'}}</span>
    </template>
    <span v-if="user" class="description">{{user.description}}</span>
    <template #footer>
      <n-space v-if="user">
        <n-tag v-for="tag in user.tags">{{tag}}</n-tag>
      </n-space>
    </template>
  </n-thing>
</template>

<script>
    import {defineComponent} from 'vue';
    import {NThing, NIcon, NAvatar, NSpace, NTag} from 'naive-ui';
    import {Person as PersonIcon} from '@vicons/ionicons5';

  export default defineComponent({
    name: "ProfileContent",
    components: {
      NThing, NIcon, NAvatar, NSpace, NTag,
      PersonIcon,
    },
    props: ['user'],
  })
</script>

<style scoped>

  h3 {
    margin: 0;
    padding: 0;
    font-size: 25px;
  }

  .status {
    font-size: 20px;
    font-style: italic;
  }

  .description {
    font-size: 18px;
  }

</style>
