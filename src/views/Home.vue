<template>
  <div id="app-container">
    <el-container ref="homePage">
      <el-header>
        <el-menu
          :default-active="this.$router.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item>
            <i class="el-icon-s-unfold" @click="drawer = true" type="primary"></i>
          </el-menu-item>
          <el-menu-item index="/home/main">
            <i class="el-icon-house"></i>
          </el-menu-item>
          <el-menu-item index="/home/editblog">编辑博客</el-menu-item>
          <el-menu-item index="/home/myblog">我的博客</el-menu-item>

          <el-menu-item index="/home/manage" disabled>管理</el-menu-item>
          <!-- <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">数据管理</a>
          </el-menu-item> -->
        </el-menu>
      </el-header>
      <el-main>
        <el-scrollbar style="height:100%;overflow-x:hidden;" id="xxx">
          <el-backtop target=".el-scrollbar__wrap" :bottom="100">
            <div
              style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
            >UP</div>
          </el-backtop>
          <!-- 中间的区域 -->
          <transition>
            <router-view></router-view>
          </transition>
        </el-scrollbar>
      </el-main>
    </el-container>

    <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>
<style lang="scss" scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0;
}
.el-main {
  color: #333;
  text-align: center;
  // line-height: 160px;
  padding: 0px;
}


</style>

<script>
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      drawer: false,
      direction: "ltr",
      clientHeight: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    changeFixed(clientHeight) {
      //动态修改样式
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
      this.$refs.homePage.$el.style.height = clientHeight + "px";
    }
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`;
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function() {
      this.changeFixed(this.clientHeight);
    }
  }
};
</script>