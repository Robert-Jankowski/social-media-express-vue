<template>
  <n-card>
      <n-result
        status="404"
        title="Bad route"
        description="That page does not exist... at least we don't know about it...">
        <template #footer>
          <router-link to="/">
            <n-button>Go back</n-button>
          </router-link>
        </template>
      </n-result>
  </n-card>
</template>

<script>
  import {defineComponent} from 'vue';
  import {NCard, NResult, NButton, NSpace } from "naive-ui";

  export default defineComponent({
    name: "WrongRoutePage",
    components: {
      NCard, NResult, NButton, NSpace,
    }
  });
</script>

<style scoped>
  .n-card {
    width: 750px;
    height: 610px;
    padding: 130px;
  }
</style>
