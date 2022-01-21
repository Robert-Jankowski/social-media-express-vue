<template>
  <form @submit.prevent="handleSubmit">
    <input id="post-content" type="text" v-model="content"><br>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
  export default {
    name: "CommentForm",
    data() {
      return {
        content: '',
      }
    },
    methods: {
      handleSubmit() {
        console.log(this.content)
      }
    },
  }
</script>

<style scoped>

</style>
