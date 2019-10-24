<template>
  <div class="main">
    <!--  这是登录界面的头部分 -->
    <login-header></login-header>
    <div class="main-inner">
      <div class="main-inner-wrap">
        <!-- 主要的登录子组件 -->
        <div class="main-news">
           <mian-news></mian-news>
        </div>
       
        <mian-login></mian-login>
      </div>
    </div>
    <div>
      <!-- 底部信息 -->
      <foot-header></foot-header>
    </div>
    <!--model:表单数据对象 rules：验证规则 ref:vue中，$refs.ruleForm2获取此标签 label-position：表单域标签的位置 label-width:域标签的宽度-->
  </div>
</template>

<script>
import mainLogin from "../components/subcomponents/mian_login";
import loginHeader from "../components/subcomponents/header";
import loginFoot from "../components/subcomponents/header";
import mainNews from "../components/subcomponents/news"


export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    // 用来注册子组件的节点
    "mian-login": mainLogin,
    "login-header": loginHeader,
    "foot-header":loginFoot,
    "mian-news":mainNews
  }
};
</script>

<style lang="scss" scoped>
.main {
  background: #fff;
  position: relative;
  min-width: 1100px;
  background-color:slategray;
  background-repeat: no-repeat;
  background-position: top;
  background-image: url("../assets/login-backgroud.jpg");
}
.main-inner {
  width: 100%;
  clear: both;

}
.main-inner-wrap {
  width: 1100px;
  height: 640px;
  margin: 0 auto;
  position: relative;
}
.main-news{
  border-radius: 5px;
  height: 500px;
  width:550px;
  position: absolute;
  padding: 35px 35px 15px 35px;
  top: 50px;
  left: 20px;
  background: #fff;
  border: 1px solid #eaeaea;
}
</style>
