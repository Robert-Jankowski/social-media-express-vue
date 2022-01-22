<template>
  <n-list bordered>
    <template v-for="friend in requests">
      <n-list-item>
        <n-space justify="space-between">
          <h4>{{friend}}</h4>
          <n-space>
            <n-button @click="onAccept(friend)" strong secondary type="success">Accept</n-button>
            <n-button @click="onDeny(friend)" strong secondary type="error">Deny</n-button>
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
    name: "FriendsRequestList",
    components: {
      NList, NListItem, NSpace, NButton,
    },
    props: ['requests'],
    emits: ['accept, deny'],
    methods: {
      onAccept(friendId) {
        this.$emit('accept', friendId);
      },
      onDeny(friendId) {
        this.$emit('deny', friendId);
      },
    },
  })
</script>

<style scoped>
  h4 {
    margin: 0;
    padding: 0;
  }
</style>
