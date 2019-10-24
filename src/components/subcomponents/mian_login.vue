<template>
  <el-form
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-position="left"
        label-width="0px"
        class="demo-ruleForm login-container"
      >
        <h3 class="title">token测试</h3>
        <!--prop：校验和重置关键属性-->
        <el-tabs v-model="activeName" :stretch="true">
          <el-tab-pane label="账号登录" name="first" class="mian-login">
            <el-form-item prop="account">
              <!--autocomplete属性：系统账户需要保密为off，否则数据会被自动记录-->
              <el-input
                type="text"
                v-model="ruleForm2.account"
                auto-complete="off"
                placeholder="账号"
                prefix-icon="el-icon-user"
                size="100px"
              ></el-input>
            </el-form-item>
            <el-form-item prop="checkPass">
              <el-input
                type="password"
                v-model="ruleForm2.checkPass"
                auto-complete="off"
                placeholder="密码"
                show-password
                prefix-icon="el-icon-lock"
              ></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
            <!-- 跳转到忘记密码界面 -->
            <el-link @click.native.prevent target="_blank" class="forget" :underline="false">忘记密码</el-link>

            <el-form-item style="width:100%;">
              <!--提交按钮 @click.native.prevent：用来阻止默认行为 :loading:？？？-->
              <el-button
                type="primary"
                style="width:100%;"
                @click.native.prevent="handleSubmit2"
                :loading="logining"
              >登录</el-button>

              <!-- <el-button type="primary"  style="width:30%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button> -->
              <!-- <el-button type="primary"  style="float:right;width:30%;" @click.native.prevent="handleReset2">重置</el-button> -->
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="免密登录" name="second">
            <el-form :model="Register" ref="RegisterForm" label-width="0" class="RegisterForm">
              <el-form-item prop="phone">
                <el-input v-model="Register.phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="验证码" class="code">
                <el-input v-model="Register.sendcode" placeholder="请输入验证码" class="sendcode"></el-input>
                <el-button
                  type="button"
                  @click="sendcode"
                  :disabled="disabled"
                  v-if="disabled==false"
                  class="sendcodeButton"
                >发送验证码</el-button>
                <el-button
                  type="button"
                  @click="sendcode"
                  :disabled="disabled"
                  v-if="disabled==true"
                >{{btntxt}}</el-button>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm" style="width:100%">提交</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-form>
</template>

<script>
import { requestLogin } from "../../api/api.js";
// import NProgress from 'nprogress'
export default {
  data() {
    return {
      logining: false /* 初始状态为不在登录进行时 */,
      ruleForm2: {
        /* 存放当前输入的用户名和密码 */
        account: "admin",
        checkPass: "123456"
      },
      rules2: {
        /* 校验规则 对象 */
        /* rule规则子项数组内对象属性 required：Boolean为true表示必须项 message：提示信息validator: 用于自定义 trigger:常见blur和change两种 */
        account: [
          /* 和prop属性名称一样 */
          { required: true, message: "请输入账号", trigger: "blur" }
          // { validator: validaePass }
        ],
        checkPass: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { validator: validaePass2 }
        ]
      },
      checked: true,
      activeName: "second",

      //免密登录模块
      Register: {
        phone: "",
        sendcode: ""
      },
      disabled: false,
      time: 0,
      btntxt: "重新发送"
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    handleSubmit2(ev) {
      var _this = this;
      /* 调用element-ui的表单方法validate校验。 */
      this.$refs.ruleForm2.validate(valid => {
        /* 回调函数（箭头函数），第一个参数为是否通过检验 */
        if (valid) {
          /* 校验成功的逻辑处理 */
          this.logining = true; /* 登录中，这个变量绑定了登录按钮的loading动画 */
          var loginParams = _this.$qs.stringify({
            username: this.ruleForm2.account,
            password: this.ruleForm2.checkPass
          });
          requestLogin(loginParams).then(data => {
            /* 发送登录请求，传入登录的用户对象。并根据响应回调，data为响应数据 */
            this.logining = false; /* 登录结束（状态码判断失败或者成功） */
            let { msg, code, usr } = data;

            if (code !== 200) {
              this.$message({
                message: msg,
                type: "error"
              });
            } else {
              /* 登陆成功，储存用户字符串对象。跳转到/table */
              sessionStorage.setItem("user", JSON.stringify(usr));
              this.$router.push({ path: "/home/test" });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //免密登录模块
    sendcode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
      if (this.Register.phone == "") {
        this.$message({
          message: "手机号不能为空",
          center: true
        });
        return;
      }
      if (!reg.test(this.Register.phone)) {
        this.$message({
          message: "请输入正确的手机号",
          center: true
        });
        return;
      } else {
        console.log(this.Register.phone);
        this.$message({
          message: "发送成功",
          type: "success",
          center: true
        });
        this.time = 60;
        this.disabled = true;
        this.timer();
      }
    },
    //60S倒计时
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    submitForm() {}
  }
};
</script>

<style lang="scss" scoped>

.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  width: 330px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
//   box-shadow: 0 0 25px #cac6c6;
  height: 500px;
  position: absolute;
  top: 50px;
  right: 50px;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 20px;
  }
  .forget {
    margin: 0px 0px 35px 20px;
    float: right;
  }
}
.sendcode {
  width: 55%;
  float: left;
}
.sendcodeButton {
  width: 40%;
  float: right;
}
.el-button--primary {
  width: 100%;
  float: right;
}
</style>