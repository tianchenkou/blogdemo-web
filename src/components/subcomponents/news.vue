<template>
  <el-collapse v-model="activeName" accordion>
  <el-collapse-item title="体验须知" name="1">
    <div>本项目是<a href="https://gitee.com/koutianchen">@扣天辰</a>的个人学习项目，不用于任何商业目的</div>
  </el-collapse-item>
  <el-collapse-item title="如何登录" name="2">
    <div>为了让所有人都可以体验到我的项目，所以提供了一组账号和密码</div>
    <div>账号和密码都在右边,已经默认填好</div>
  </el-collapse-item>
  <el-collapse-item title="开放注册" name="3">
    <div>本项目暂时不开放任何注册渠道</div>
    <div>朋友请联系我获取账号</div>
  </el-collapse-item>
</el-collapse>
</template>
<script>
  export default {
    data() {
      return {
        activeName: '1'
      };
    }
  }
</script>

<style lang="scss">

</style>
