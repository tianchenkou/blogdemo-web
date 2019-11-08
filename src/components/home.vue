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
      articleDetail: {"context":
      "## 你好!欢迎浏览扣天辰的博客，本博客现在有以下功能\r\n* 编辑和上传博客 \r\n点击'<b>编辑博客</b>'\r\n* 博客分类\r\n点击'<b>我的博客</b>'\r\n* 博客评论\r\n\r\n## 技术栈\r\n* vue\r\n* element-ui\r\n* SpringBoot\r\n* mybatis\r\n* redis\r\n* jwt\r\n"}
    };
  },
  mounted(){
    // let _this = this;
    // requestBlog(0).then(data => {
    //   let{code,info,msg} = data
    //   if (code == 200) {
    //     if (info.length == 0) {
    //         //info为空
    //         _this.$message({
    //         message: msg,
    //         type: "error"
    //         });
    //     } else {
    //         //查询成功,绑定数据
    //         _this.articleDetail = info;
    //     }
    //   } else {
    //   //后台发生异常
    //   this.$router.push({ path: "/404" });
    //   }
    // });
    
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
