<template>
  <div class="edit-container">
    <el-form
      :label-position="'left'"
      :model="markdownForm"
      :rules="rules"
      label-width="60px"
      ref="ruleForm"
    >
      <el-form-item label="标 题" prop="title">
        <el-input v-model="markdownForm.title"></el-input>
        <el-upload
          action
          class="upload-demo"
          ref="upload"
          :on-change="handleChange"
          :auto-upload="false"
          :limit="1"
          :show-file-list="false"
        >
          <el-button type="primary" style="float:right;margin-left:50px">导 入</el-button>
        </el-upload>
      </el-form-item>

      <mavon-editor
        ref="md"
        @save="save('ruleForm')"
        @imgAdd="imgAdd"
        @imgDel="imgDel"
        @change="change"
        v-model="markdownForm.contentMarkdown"
        :codeStyle="markdown.codeStyle"
        :toolbars="markdown.toolbars"
      />
      <br />
      <el-row>
        <el-col :span="2">
          <el-button @click="showUpdload">测 试</el-button>
        </el-col>
        <el-col :span="2" :offset="20">
          <el-button type="primary" style="float: right;" @click="save('ruleForm')">保 存</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog title="博客上传模块" :visible.sync="uploadVisible" width="50%">
      <!-- 定义一个事件监听子组件的变化，监听子组件的closeMoule函数, -->
      <main-upload :blogInfo="this.blogInfo" @closeMoule="closeUpload"></main-upload>
    </el-dialog>
  </div>
</template>
 
<script>
import { saveMarkdownArticle } from "../api/api.js";
import { uploadImg } from "../api/api.js";
import upload from "./subcomponents/mainupload";

export default {
  data() {
    return {
      uploadVisible: false,
      blogInfo:{},
      ruleForm: {
        title: ""
      },
      markdown: {
        codeStyle: "atom-one-dark",
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: false // 预览
        }
      },
      markdownForm: {
        articleId: null,
        title: "",
        contentMarkdown: "",
        contentHtml: "",
        type: 0
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 80, message: "长度在1到80个字符", trigger: "blur" }
        ]
      },
      lastSaveTime: null,
      timer: null
    };
  },
  created() {
    console.log(process.env.VUE_APP_BASE);
    this.getArticle();
  },
  mounted() {
    // this.timer = setInterval(this.intervalSave, 2 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getArticle() {
      //获取文章内容
      let id = this.$route.query.a;
      if (id == null) {
        this.markdownForm.contentMarkdown = "";
      } else {
        getMarkdownArticle(id)
          .then(r => {
            this.markdownForm.contentMarkdown =
              r.data.contentMarkdown == null ? "" : r.data.contentMarkdown;
            this.markdownForm.articleId = r.data.articleId;
            this.markdownForm.title = r.data.title;
            this.markdownForm.type = r.data.type;
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    save(formName) {
      //将数据保存
      var _this = this;
      console.log(_this.markdownForm);
      //判断是否正确提交
      this.$refs[formName].validate(valid => {
        if (valid && _this.markdownForm.contentMarkdown) {
          //保存文章内容
          _this.blogInfo = {
            "title": _this.markdownForm.title,
            "content": _this.markdownForm.contentMarkdown,
            "date": new Date(),
            "author": "koutianchen"
          };
          
          //传给子组件
          this.uploadVisible = true;

        } else {
          this.$message.error("请完整填写博客信息");
          return false;
        }
      });
    },
    intervalSave() {
      //自动保存
      let now = new Date();
      if (now - this.lastSaveTime >= 2 * 60 * 1000) {
        saveMarkdownArticle(this.markdownForm)
          .then(r => {
            this.$message.success("自动保存成功");
            this.lastSaveTime = new Date();
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    imgAdd(pos, file) {
      //添加图片，pos为位置
      let markdownImg = {},
      $vm = this.$refs.md;
      markdownImg.base64Data = file.miniurl;
      markdownImg.type = file.type;
      uploadImg(markdownImg)
        .then(r => {
          console.log(r);
          //将返回的url替换到文本原位置
          $vm.$img2Url(pos, process.env.VUE_APP_BASE + "/static/img" + r.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    imgDel(pos, url) {
      //删除图片，并不是修改就会触发，仅支持工具栏操作
      console.log(pos);
      console.log(url);
    },
    handleChange(file) {
      var _this = this;

      //验证文件类型
      let FileExt = file.name.replace(/.+\./, "");
      let fileName = file.name;

      if (["md", "markdown"].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message.error("文件类型必须为.md结尾的MarkDown文件");
        this.$refs["upload"].clearFiles();
        return false;
      }

      // 限制上传文件的大小
      const isLt = file.size / 1024 / 1024 <= 1;
      if (!isLt) {
        this.$message.error("上传文件大小不得大于1MB!");
        this.$refs["upload"].clearFiles();
        return false;
      }
      let reader = new FileReader();

      if (typeof FileReader === "undefined") {
        this.$message.error("您的浏览器不支持文件读取!");
        this.$refs["upload"].clearFiles();
        return;
      }

      //读取文件内容
      reader.readAsText(file.raw, "utf8");
      reader.onload = function(e) {
        _this.markdownForm.contentMarkdown = e.target.result;
        _this.markdownForm.title = fileName.substring(0,fileName.indexOf("."));
      };

      this.$refs["upload"].clearFiles();
    },
    showUpdload() {
      this.uploadVisible = true
    },
    closeUpload(e) {
      //e 是子组件传传上来的值
      console.log(e);
      
      this.uploadVisible = false
    },
    change(value, render){//绑定解析后的html代码
      // render 为 markdown 解析后的结果
      this.markdownForm.contentHtml = render;
    }

  },
  components: {
    // 用来注册子组件的节点
    "main-upload": upload
  }
};
</script>
 
<style lang="scss">
.v-note-panel.shadow {
  min-height: 440px; //设置编辑框最小高度
}
.edit-container {
  margin: 20px 20px 0px 20px;
}
.el-form-item__content {
  display: flex;
  padding: 5px;
}
</style>
 