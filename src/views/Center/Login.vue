<template>
  <div>
    <div class="img">
      <img
        src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3954963792,172259759&fm=26&gp=0.jpg"
        alt=""
      />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern, message: '请填写正确的手机号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
  import Vue from "vue";
  import { Form, Field, Button, Toast } from "vant";

  Vue.use(Form);
  Vue.use(Field);
  Vue.use(Button);
  Vue.use(Toast);
  export default {
    data() {
      return {
        mobile: "",
        password: "",
        pattern: /^1[3-9]\d{9}$/,
      };
    },
    methods: {
      onSubmit(values) {
        // console.log("submit", values);
        console.log(123);
        this.$http
          .post(
            "/v1/login",
            `mobile=${values.mobile}&password=${values.password}`,
            {
              // headers: {
              //   "Content-Type": "application/x-www-form-urlencoded",
              // },
            }
          )
          .then((ret) => {
            if (ret.code == 0) {
              Toast.success(ret.msg);
              this.$store.commit("setJwt", ret.jwt);
              setTimeout(() => {
                this.$router.go(-1);
              }, 2000);
            } else {
              Toast.fail(ret.msg);
            }
          });
      },
    },
    created() {
      this.$store.commit("isShowFooterNav", false);
    },
    beforeDestroy() {
        this.$store.commit("isShowFooterNav", true);
    },
  };
</script>

<style lang="scss" scoped>
  .img {
    text-align: center;
    margin-top: 100px;
    margin-bottom: 100px;
    img {
      width: 200px;
    }
  }
</style>
