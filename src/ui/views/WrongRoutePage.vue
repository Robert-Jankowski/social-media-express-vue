<template>
  <n-card>
      <n-result
        status="404"
        title="404 Not Found"
        description="There is no more to see here."
      >
        <template #footer>
          <n-button>Go back</n-button>
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
    justify-content: center;
  }
</style>
