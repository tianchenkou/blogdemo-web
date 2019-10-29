<template>
  <!-- 主界面 -->
  <div class="home">
   <div class="main-blogContext">
     <mavon-editor
      class="md"
     :value="articleDetail.context"
     :subfield = "prop.subfield"
     :defaultOpen = "prop.defaultOpen"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
  ></mavon-editor>
   </div>
  </div>
</template>

<script>
// import marked from "marked";
export default {
  data() {
    return {
      articleDetail: {"context":"## 你好!欢迎浏览扣天辰的博客，本博客现在有以下功能\r\n* 编辑和上传博客 \r\n点击'<b>编辑博客</b>'\r\n* 博客分类\r\n点击'<b>我的博客</b>'\r\n"}
    };
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.main-blogContext{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>
