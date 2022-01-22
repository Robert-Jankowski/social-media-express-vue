<template>
  <div class="app-wrapper">
    <n-message-provider>
      <router-view></router-view>
    </n-message-provider>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import {NMessageProvider} from 'naive-ui';


  export default defineComponent({
    components: {
      NMessageProvider,
    }
  })
</script>

<style lang="scss">

  .app-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: aliceblue;
    max-width: 100vw;
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

</style>
