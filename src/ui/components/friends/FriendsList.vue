<template>
  <n-list bordered>
    <template v-for="(friend, index) in friends">
      <n-list-item>
        <n-space justify="space-between">
          <h4>{{friend.username}}</h4>
          <n-space>
            <router-link :to="`/wall/${friend.id}`">
              <n-button secondary type="primary" ghost bordered>
                Public board
              </n-button>
            </router-link>
            <router-link :to="`/wall/${friend.id}/private`">
              <n-button secondary type="primary" ghost bordered>
                Private board
              </n-button>
            </router-link>
            <n-button @click="onRemove(friend.id)" strong secondary type="error">Remove friend</n-button>
          </n-space>
        </n-space>
      </n-list-item>
    </template>
  </n-list>
</template>

<script>
  import {defineComponent} from "vue";
  import {NListItem, NList, NSpace, NButton} from "naive-ui";

    export default defineComponent({
      name: "FriendsList",
      components: {
        NList, NListItem, NSpace, NButton,
      },
      props: ['friends'],
      emits: ['remove'],
      methods: {
        onRemove(friendId) {
          this.$emit('remove', friendId);
        }
      },
    })
</script>

<style scoped>
  h4 {
    margin: 0;
    padding: 0;
  }
</style>
