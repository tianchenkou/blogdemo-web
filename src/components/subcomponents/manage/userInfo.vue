<template>
  <div>
    <el-col  style="margin-bottom: 10px">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人信息</span>
        </div>
        <div>
          <div style="text-align: center">
            <el-upload
              :show-file-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
              :action="updateAvatarApi"
              :before-upload="beforeUpload"
              :headers="headers"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              list-type="picture"
              name = "smfile"
              class="avatar-uploader"
            >
              <img
                :src="user.avatar ? user.avatar : Avatar"
                title="点击上传头像"
                class="avatar"
              />
            </el-upload>
          </div>
          <ul class="user-info">
            <li>
              用户名称
              <div class="user-right">{{ user.username }}</div>
            </li>
            <li>
              手机号码
              <div class="user-right">{{ user.phone }}</div>
            </li>
            <li>
              用户邮箱
              <div class="user-right">{{ user.email }}</div>
            </li>
            <li>
              创建日期
              <div class="user-right">{{ parseTime(user.regdate) }}</div>
            </li>
            <!-- <li>
              安全设置
              <div class="user-right">
                <a @click="$refs.pass.dialog = true">修改密码</a>
                <a @click="$refs.email.dialog = true">修改邮箱</a>
              </div>
            </li> -->
          </ul>
        </div>
      </el-card>
    </el-col>
  </div>
</template>
<script>
import Avatar from '../../../assets/tou.jpg'
import {setAvatar } from '../../../api/api'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      Avatar: Avatar,
      headers: {
        'Authorization': localStorage.getItem('Authorization')
      },
      ico: 'el-icon-refresh',
      updateAvatarApi : '/api/fileUpload',
      user:{}
    }
  },
  inject:['reload'],
  computed: {
    // ...mapGetters([
    //   'user',
    // ]),
    // ...mapMutations(["changeUser"])
  },
  mounted(){
      this.user = JSON.parse(localStorage.getItem('user'))
  },
  methods: {
    parseTime(time) {
        if (time) {
            var date = new Date(time)
            var year = date.getFullYear()
            /* 在日期格式中，月份是从0开始的，因此要加0
            * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
            * */
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
            var seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
            // 拼接
            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
        } else {
            return ''
        }
    },
    beforeUpload(file){
        //获取文件后缀
        let FileExt = file.name.replace(/.+\./, "");

        const isLt = file.size / 1024 / 1024  <= 3
        if (!isLt) {
            this.$message.error('上传文件大小不得大于3MB!')
            return false
        }
        return isLt
    },
    handleSuccess(response) {
      var _this = this;      
      if (response.code==200) {
        //封装用户id和头像
        let data = {
          "avatar":response.data,
          "uid":this.user.uid
        };
        //回传信息到数据库
        setAvatar(data).then(res=>{
          let{code,msg} = res
          if (code == 200) {
            this.$notify({
              title: '头像修改成功',
              type: 'success',
              duration: 2500
            })
            //改变user的值
            this.user.avatar = response.data;
            localStorage.setItem("user", JSON.stringify(this.user));
            _this.reload();
          } else {
            //后台发生异常
            this.$notify({
              title: "头像修改失败"+msg,
              type: 'error',
              duration: 2500
            })
          }
        })
      }else{
        this.$notify({
        title: "上传失败",
        type: 'error',
        duration: 2500
      })
      }
    //   store.dispatch('GetInfo').then(() => {})
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message)
      this.$notify({
        title: msg.message,
        type: 'error',
        duration: 2500
      })
    },
  }
};
</script>
<style lang="scss" scoped>
  .avatar-uploader-icon {
    font-size: 28px;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center
  }

  .avatar {
    width: 120px;
    height: 120px;
    display: block;
    border-radius: 50%
  }
  .user-info {
    padding-left: 0px;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      border-top: 1px solid #F0F3F4;
      padding: 11px 0px;
      font-size: 13px;
    }
  }
</style>