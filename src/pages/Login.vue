<template>
  <div class="col body">
    <div class="row text-center justify-start text-white logo-icon">
      <div class="logo"><img alt="logo" src="crudapi-mini.png" /></div>
    </div>
    <div class="row justify-center login">
      <div class="left">
        <div class="title">crudapi管理员后台</div>
        <div class="sub-title"></div>
        <div class="logo"><img src="crudapi.png" /></div>
      </div>
      <div class="right">
        <div class="title text-h6 text-center">
          <q-item-label>登录</q-item-label>
        </div>
        <div class="mobile row justify-center">
          <q-input
            placeholder="请输入用户名"
            v-model="username"
            style="width: 336px;"
          >
            <template v-slot:prepend>
              <q-item-label>用户名</q-item-label>
            </template>
          </q-input>
        </div>
        <div class="yzm row justify-center">
          <q-input
            placeholder="请输入密码"
            v-model="password"
            style="width: 336px;"
            :type="isPwd ? 'password' : 'text'"
            v-on:keyup.enter="submit"
          >
            <template v-slot:prepend>
              <q-item-label>密码</q-item-label>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="row justify-center">
          <q-btn
            unelevated
            class="login-btn"
            color="primary"
            label="登 录"
            :disable="!username || !password"
            @click="submit"
          />
        </div>
      </div>
    </div>

    <div class="row text-center justify-center copyright">
      Copyright © 2020-present crudapi &nbsp;<a target="_blank" href="http://beian.miit.gov.cn/">苏ICP备15043861号-2</a> &nbsp; All Rights Reserved 版权所有
      &nbsp;&nbsp;<a target="_blank" href="https://crudapi.cn">首页</a>
      &nbsp;&nbsp;<a target="_blank" href="https://help.crudapi.cn">帮助</a>

    </div>
  </div>
</template>

<style lang="stylus" scoped>
.body
  height: 100%;

.logo-icon
  height:145px;

  .logo
    margin-top: 36px;
    margin-left: 54px;
    width:165px;
    height:48px;
    //background:rgba(61,63,75,1);
    //border: 1px rgba(61,63,75,1) solid;
    img
      width:64px;
      height:64px;

.copyright
  margin-top: 36px;
  height:17px;
  font-size:12px;
  font-family:Helvetica;
  color:rgba(153,153,153,1);
  line-height:14px;

.login
  height: 490px;
  min-width: 1030px;
  //border 1px solid rgba(215, 215, 215, 1)
  .left
    width: 400px;
    height: 490px;
    background: #3D3F4B;
    border-radius:12px 0px 0px 12px;
    .title
      margin-top: 58px;
      margin-left: 31px;
      width:216px;
      height:33px;
      font-size:24px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(255,255,255,1);
      line-height:33px;
    .sub-title
      margin-top: 8px;
      margin-left: 31px;
      width:285px;
      height:34px;
      font-size:15px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:34px;
    .logo
      img
        //margin-top: 26px;
        margin-left: 31px;
        // border: 1px red solid;
        width:320px;
        height:320px;

  .right
    width: 560px;
    height: 490px;
    //background: red;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 24px 0px rgba(172,178,192,0.15);
    border-radius:0px 12px 12px 0px;
    .title
      margin-top: 74px;
      font-size:22px;
      font-family:PingFangSC-Semibold,PingFang SC;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:30px;
    .mobile
      margin-top: 74px;
      .q-item__label
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:20px;
    .yzm
      margin-top: 34px;
      .q-item__label
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:20px;
      .yzm-action
        height:20px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(52,200,231,1);
        line-height:20px;
    .login-btn
      margin-top:38px;
      width:336px;
      height:54px;
      background:rgba(52,200,231,1);
      border-radius:27px;
</style>

<script>
import { userService } from "../service";

export default {
  name: "Login",
  data() {
    return {
      username: "superadmin",
      isPwd: true,
      password: "1234567890"
    };
  },

  created() {
    console.info("login->created");

    this.init();
  },

  methods: {
    init() {
      console.info("login->init");
    },

    submit() {
      if (!this.username) {
        this.$q.notify("用户名不能为空！");
        return;
      }

      if (!this.password) {
        this.$q.notify("密码不能为空！");
        return;
      }

      this.$q.loading.show({
        message: "登录中"
      });

      this.$store
        .dispatch("user/login", {
          username: this.username,
          password: this.password,
        })
        .then(async (data) => {
          this.$router.push("/");
          this.$q.loading.hide();
        })
        .catch(e => {
          this.$q.loading.hide();
          console.error(e);
        });
    }
  }
};
</script>
