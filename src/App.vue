<template>
  <div id="app">
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}

</script>
<style lang="scss">
form, h1, h2, h3, img, li, p, ul {
    margin: 0;
    padding: 0;
    border: 0;
}
.el-scrollbar .el-scrollbar__wrap {overflow-x: hidden;}
</style>
