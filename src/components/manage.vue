<template>
<!-- 管理模块，管理用户信息和博客信息 -->
  <div class="b-manage">
    <div class="manage-header"></div>
    <!-- 限制管理模块的大小 -->
    <div class="manage-main">
      <el-tabs :tab-position="tabPosition">
        <!-- 用户更改个人信息 -->
        <el-tab-pane label="用户信息管理"><user-info class="manage-user"></user-info></el-tab-pane>
        <!-- 对博客的删除和设置是否公开 -->
        <el-tab-pane label="博客管理" disabled>角色管理</el-tab-pane>
        <!-- 查看用户的所有评论，提供删除和定位博客 -->
        <el-tab-pane label="评论管理" disabled>定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
    <div class="manage-header"></div>
  </div>
  <!-- <comment :comments="commentData"></comment> -->
</template>

<script>
  // import * as CommentData from '../assets/js/mockdata'
  import userInfo from './subcomponents/manage/userInfo'
  // import {getAllCommentData} from '../api/api'

export default {
 data() {
    return {
      tabPosition: 'left'
    };
  },
  components:{
    "user-info":userInfo
  }
}
</script>

<style lang="scss" scoped>
.manage-main {
  overflow: hidden;
  width: 980px;
  height: 100%;
  margin: 10px auto 100px;
  border: 1px solid #e1e2e5;
  box-shadow: 0 2px 4px rgba(0,0,0,.14);
  background: #fafafa;
  // background:wheat;
  border-radius: 4px;

}
.manage-user{
  margin: 10px auto;
  width: 480px;
}
</style>