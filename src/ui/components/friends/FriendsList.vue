<template>
  <n-list bordered>
    <template v-for="friend in friends">
      <n-list-item>
        <n-space justify="space-between">
          <router-link :to="`/user/${friend}/profile`" class="link">
            <h4>{{friend}}</h4>
          </router-link>
          <n-space>
            <router-link :to="`/wall/${friend}`">
              <n-button type="primary" ghost>
                Public board
              </n-button>
            </router-link>
            <router-link :to="`/wall/${friend}/private`">
              <n-button type="primary" ghost>
                Private board
              </n-button>
            </router-link>
            <n-button @click="onRemove(friend)" strong secondary type="error">Remove friend</n-button>
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
        onRemove(friendUsername) {
          this.$emit('remove', friendUsername);
        }
      },
    })
</script>

<style scoped>

  h4 {
    margin: 0;
    padding: 0;
  }

  .link {
    text-decoration: none;
    color: black;
  }

</style>
