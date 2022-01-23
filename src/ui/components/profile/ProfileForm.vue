<template>
  <n-form
    :model="formValue"
    :rules="rules"
    ref="formRef">

    <n-form-item label="Real name" path="realName">
      <n-input v-model:value="formValue.realName"
               placeholder="Your real name" />
    </n-form-item>
    <n-form-item label="Profile photo URL" path="imageUrl">
      <n-input v-model:value="formValue.imageUrl"
               placeholder="Your image URL" />
    </n-form-item>
    <n-form-item label="Status" path="status">
      <n-input v-model:value="formValue.status"
               placeholder="Your status" />
    </n-form-item>
    <n-form-item label="Description" path="description">
      <n-input v-model:value="formValue.description"
               type="textarea"
               placeholder="Describe yourself" />
    </n-form-item>
    <n-form-item label="Tags" path="tags">
      <n-dynamic-tags v-model:value="formValue.tags" />
    </n-form-item>
    <n-form-item>
      <n-space>
        <n-button size="large"
                  type="primary"
                  ghost
                  @click.prevent="handleSubmit(formValue)">Save</n-button>
        <n-button size="large"
                  type="error"
                  ghost
                  dashed
                  @click.prevent="handleExit()">Discard</n-button>
      </n-space>
    </n-form-item>
  </n-form>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import {NForm, NFormItem, NInput, NCard, NButton, NSpace, NSelect, NDynamicTags } from 'naive-ui';

  export default defineComponent({
    name: 'ProfileForm',
    components: {
      NForm, NCard, NFormItem, NInput, NButton, NSpace, NSelect, NDynamicTags
    },
    emits: ['onSubmit'],
    props: ['user'],
    setup(props, { emit }) {

      const formRef = ref(null);
      const dataBackup = {...props.user};

      return {
        formRef,
        formValue: ref(props.user),
        size: ref('medium'),
        rules: {},

        handleSubmit(value) {
          formRef.value.validate((errors) => {
            emit("save", value);
          })
        },
        handleExit() {
          emit("exit", dataBackup);
        }
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
