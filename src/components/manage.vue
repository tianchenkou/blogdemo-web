<template>
  <div>
    <el-upload
      action
      class="upload-demo"
      ref="upload"
      :on-change="handleChange"
      :auto-upload="false"
      :limit="1"
      :show-file-list="false"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <!-- <div slot="tip" class="el-upload__tip">只能上传Markdown文件，且不超过3mb</div> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textInfo:""
    };
  },
  methods: {
    handleChange(file) {
      var _this = this;

      //验证文件类型
      let FileExt = file.name.replace(/.+\./, "");
      if (["md", "markdown"].indexOf(FileExt.toLowerCase()) === -1) {
        this.$message.error("文件类型必须为.md结尾的MarkDown文件");
        return false;
      }

      // 限制上传文件的大小
      const isLt = file.size / 1024 / 1024 <= 1;
      if (!isLt) {
        this.$message.error("上传文件大小不得大于1MB!");
        return false;
      }
      let reader = new FileReader();

      if (typeof FileReader === "undefined") {
        this.$message.error("您的浏览器不支持文件读取!");
        return;
      }

      //读取文件内容
      reader.readAsText(file.raw, "utf8");
      reader.onload = function(e) {
        _this.textInfo = e.target.result;
      };
    }
  }
};
</script>

<style lang="scss">
</style>