<template>
  <view class="content">
    <u--form labelPosition="left" :model="model" ref="from" :rules="rules" class='form' :labelWidth="150">
      <u-form-item label="手机号:" prop="loginForm.phone" :borderBottom='true'>
        <u--input v-model="model.loginForm.phone" border="none" maxlength='11' type='text'></u--input>
      </u-form-item>
      <u-form-item label="密码:" prop="loginForm.password" :borderBottom='true'>
        <u--input v-model="model.loginForm.password" border="none" type='password'></u--input>
      </u-form-item>
      <u-form-item label="验证码:" prop="loginForm.code" :borderBottom='true'>
        <u--input v-model="model.loginForm.code" border="none"></u--input>
        <view>
          <u-button :disabled='disable' v-if="flag">{{seconds}}s</u-button>
          <u-button v-if="!flag" @click='getCode'>获取验证码</u-button>
        </view>
      </u-form-item>
    </u--form>
    <u-button type="primary" text="提交" style='margin-top: 30rpx;' @click='login'></u-button>
  </view>
</template>

<script setup>
  import {loginHook,readSecound,loginActionHook} from "@/hook/loginHook.js"

  const { model, from,rules } = loginHook();

  const { countDownSecound,seconds, flag,disable, getCode } = readSecound(model.loginForm);
  
  const {loginUser} = loginActionHook();

  const login = async () => {
    try {
      await from.value.validate()
      await loginUser(model.loginForm);
    } catch (e) {
      console.log(e)
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 20rpx;
    padding-right: 20rpx;
    flex-direction: column;
    box-sizing: border-box;

    .form {
      border-radius: 20rpx;
      width: 100%;
      background-color: #ffffff;
    }
  }
</style>
