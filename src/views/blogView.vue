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
   </div>
  </div>
</template>

<script>
import {requestBlog} from '../api/api';
export default {
 data() {
    return {
      blogInfo: {},
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
      return this.$route.params.id
    }
  },
  mounted(){
      this.getBlogs()
  },
  methods:{
      getBlogs(){
        var _this = this;
        
        requestBlog(this.bid).then(data => {
            let{code,info,msg} = data
            if (code == 200) {
            if (info.length == 0) {
                //info为空
                this.$message({
                message: msg,
                type: "error"
                });
            } else {
                //查询成功,绑定数据
                _this.blogInfo = info;
                console.log(info);
                
            }
            } else {
            //后台发生异常
            this.$router.push({ path: "/404" });
            }
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.main-blogContext{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>
