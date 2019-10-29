<template>
  <div class="main-upload">
      <el-upload
  class="upload-demo"
  :action="doUploadUrl"
  :on-success="handleSuccess"
  :limit="1"
  :before-upload="beforeUpload"
  :on-exceed="handleExceed"
  :on-progress="handleProgress"
>
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传Markdown文件，且不超过3mb</div>
</el-upload>
  </div>
</template>

<script>
import {doUploadMD} from '../../api/api.js'
export default {
data() {
      return {
        doUploadUrl:doUploadMD
      };
    },
    methods: {
      handleSuccess(file) {
        this.$message.success("上传成功")
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleProgress(){
        //上传过程中
        
        
      },
      beforeUpload(file){
        let FileExt = file.name.replace(/.+\./, "");
        // console.log(FileExt)

        //验证文件类型
        if (['md','markdown'].indexOf(FileExt.toLowerCase()) === -1) {
            this.$message.error('文件类型必须为.md结尾的MarkDown文件')
            return false
        }
        // 限制上传文件的大小
        const isLt = file.size / 1024 / 1024  <= 1
        if (!isLt) {
            this.$message.error('上传文件大小不得大于1MB!')
            return false
        }
        return isLt
      }
    }
}
</script>

<style>

</style>