<template>
  <!--关闭按钮-->
  <div class="main-upload">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="blog-descForm"
    >
      <el-form-item label="文章分类" prop="cates">
        <!-- 级联选择器，带搜索功能 -->
        <el-cascader
          v-model="ruleForm.cates"
          placeholder="试试搜索：java"
          :options="options"
          :props="sprops"
          filterable
        ></el-cascader>
        <el-button type="primary" style="margin-left:35px" @click='report()'>新建目录</el-button>
        <new-cate :cates='this.options' :innerVisible='innerVisible' @close-catesInfo='closeNewCate'></new-cate>
      </el-form-item>

      <el-form-item label="是否公开" prop="ispublic">
        <el-switch v-model="ruleForm.ispublic"></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import newCate from "./newCate";
import { requestCates } from "../../api/api";
import { saveMarkdownArticle } from "../../api/api";


export default {
  props: ['blogInfo'],
  data() {
    return {
      test:'',
      navdeInfos: [],
      //级联选择器的便利规则
      sprops: {
        value: "id",
        label: "name",
        children: "sonCate"
      },
      innerVisible: false,
      options: [],
      ruleForm: {
        cates: "",
        ispublic: false
      },
      rules: {
        cates: [
          { required: true, message: "请选择文章分类", trigger: "change" }
        ]
      }
    };
  },
  created() {
    this.getCates();
  },
  methods: {
    closeBtn() {
      //提交所有的信息
      var _this = this;

      // if(this.closeValue == "TypeBiome"){
      // console.log("son");
      this.$emit("closeMoule", "'sdcsdcsdc'");

      // }
    },
    submitForm(formName) {
      var _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //这里_this.ruleForm.cates[0]是一级目录id
          //这里_this.ruleForm.cates[1]是二级目录id

          //这里就不判断长度是否足够，交给后天判断
          let blogInfo = _this.blogInfo;
          let cateInfo = _this.ruleForm.cates;
          let desc = {
            "title": blogInfo.title,
            "content": blogInfo.content,
            "date": blogInfo.date,
            "author": blogInfo.author,
            //有没有要一级目录的必要?
            "catedeId":cateInfo[1]
          }
          //是否要改变blog表
          /**
           * 要加的选项:
           *        1、是否公开
           *        2、去掉url
           *        3、图片
           */
          // console.log(desc);

          saveMarkdownArticle(desc)
            .then(r => {
              let{code,msg} = r;
                  if (code == 200) {
                      //查询成功,绑定数据
                      _this.$message.success('保存博客成功!');
                      closeBtn();
                  } else {
                    //针对恶意发包造成后台异常的
                    _this.$message.error('操作异常');
                    //后台发生异常
                    this.$router.push({ path: "/404" });
                  }
            })
            .catch(e => {
              console.log(e);
            });


          // console.log(_this.ruleForm.cates);
          
          //alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.cates = "";
    },
    // closeCate(){
    //    this.innerVisible = false
    // }
    getCates() {
      var _this = this;
      requestCates().then(data => {
        let { code, info, msg } = data;
        if (code == 200) {
          if (!info) {
            //info为空
            this.$message({
              message: msg,
              type: "error"
            });
          } else {
            //查询成功,绑定数据
            _this.options = info;
          }
        } else {
          //后台发生异常
          this.$router.push({ path: "/404" });
        }
      });
    },
    closeNewCate(e){//监听组件的函数
      this.innerVisible = false;
      this.options = e;
    },
    report () {
      
      this.innerVisible = true
    }
  },
  components: {
    // 用来注册子组件的节点
    "new-cate": newCate
  }
};
</script>

<style lang="sass" scoped>

</style>