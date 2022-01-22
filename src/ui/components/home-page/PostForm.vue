<template>
  <n-form
    :model="formValue"
    :rules="rules"
    ref="formRef">

    <n-form-item label="Title" path="title">
      <n-input v-model:value="formValue.title"
               placeholder="A place for some creative title" />
    </n-form-item>
    <n-form-item label="Content" path="content">
      <n-input v-model:value="formValue.content"
               type="textarea"
               placeholder="Had an awesome day? Want to share some genius idea? Do it!" />
    </n-form-item>
    <n-form-item label="Visibility" path="type">
      <n-select
        placeholder="Who will be your audience?"
        :options="postTypes"
        v-model:value="formValue.type"
      />
    </n-form-item>
    <n-form-item>
      <n-button size="large"
                type="primary"
                @click.prevent="handleSubmit(formValue)">Post</n-button>
    </n-form-item>
  </n-form>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import { NForm, NFormItem, NInput, NCard, NButton, NSpace, NSelect } from 'naive-ui';
  import {isNil} from "lodash";

  export default defineComponent({
    name: 'LoginForm',
    components: {
      NForm, NCard, NFormItem, NInput, NButton, NSpace, NSelect,
    },
    emits: ['onSubmit'],
    props: ['registerView'],
    setup(props, { emit }) {
      const formRef = ref(null);
      return {
        formRef,
        formValue: ref({
          title: '',
          content: ''
        }),
        size: ref('medium'),
        rules: {
          title: {
            required: true,
            message: 'Title is required',
            trigger: ['input', 'blur'],
          },
          content: {
            required: true,
            message: 'Content is required',
            trigger: ['input', 'blur'],
          },
        },
        postTypes: ['Public', 'Private', 'General'].map(
          (v, i) => ({
            selected: i === 0,
            label: v,
            value: v.toUpperCase()
          })
        ),
        handleSubmit (value) {
          formRef.value.validate((errors) => {
            if (errors) {
              console.log(errors);
              return;
            }
            emit("onSubmit", {...value, type: !isNil(value.type) ? value.type : 'GENERAL'});
          })
        },
      }
    },
  });
</script>

<style scoped>

  .n-form-item:last-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .n-button {
    min-width: 150px;
    min-height: 60px;
    font-size: 25px;
  }

</style>
