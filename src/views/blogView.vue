<template>
  <!-- 主界面 -->
  <div class="home">
   <div class="main-blogContext">
     <mavon-editor
      class="md"
     :value="blogInfo.content"
     :subfield = "prop.subfield"
     :defaultOpen = "prop.defaultOpen"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
  ></mavon-editor>
  <comment :comments="commentData" :articleId="bid"></comment>
   </div>
  </div>
</template>

<script>
import {requestBlog,getAllCommentData} from '../api/api';
import comment from '../components/subcomponents/comment'

export default {
 data() {
    return {
      blogInfo: {},
      commentData: []
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
    },
    bid () {
      return this.$route.query.id
    }
  },
  components: {
    "comment":comment
  },
  mounted(){
      this.getBlogs()
      this.getCommentData(this.bid);
  },
  methods:{
    //博客正文获取
    getBlogs(){
      var _this = this;
      requestBlog(this.bid).then(data => {
          let{code,info,msg} = data
          if (code == 200) {
          if (info.length == 0) {
              //info为空
              _this.$message({
              message: msg,
              type: "error"
              });
          } else {
              //查询成功,绑定数据
              _this.blogInfo = info;
          }
          } else {
          //后台发生异常
          _this.$router.push({ path: "/404" });
          }
      })
    },
    //获取当前博客的评论
    getCommentData(id){
      var _this = this;
      getAllCommentData(id).then(res => {
        let { msg, code, data } = res;
        if (code != 200) {
          this.$message({
            message: msg,
            type: "error"
          });
        } else {
            _this.commentData = data.cmts;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.main-blogContext{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  width: 960px;
  margin: 0 auto;
  padding-top: 10px;
}

</style>
