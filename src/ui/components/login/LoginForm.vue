<template>
    <n-form
      :model="formValue"
      :rules="rules"
      ref="formRef">

      <n-form-item label="Login" path="login">
        <n-input v-model:value="formValue.login"
                 placeholder="Input login" />
      </n-form-item>
      <n-form-item label="Password" path="password">
        <n-input v-model:value="formValue.password"
                 type="password"
                 placeholder="Input password" />
      </n-form-item>
      <n-form-item>
          <n-button size="large"
                    type="primary"
                    @click.prevent="handleSubmit(formValue)">{{registerView ? 'register' : 'login'}}</n-button>
      </n-form-item>
    </n-form>
</template>

<script>
  import { defineComponent, ref } from "vue";
  import { NForm, NFormItem, NInput, NCard, NButton, NSpace } from 'naive-ui';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      NForm, NCard, NFormItem, NInput, NButton, NSpace,
    },
    emits: ['onSubmit'],
    props: ['registerView'],
    setup(props, { emit }) {
      const formRef = ref(null);
      return {
        formRef,
        formValue: ref({
          login: '',
          password: ''
        }),
        size: ref('medium'),
        rules: {
          name: {
            required: true,
            message: 'Please input your login',
            trigger: ['input', 'blur']
          },
          password: {
            required: true,
            message: 'Please input your password',
            trigger: ['input', 'blur']
          },
        },
        handleSubmit (value) {
          formRef.value.validate((errors) => {
            if (errors) {
              console.log(errors);
              return;
            }
            emit("onSubmit", value);
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
