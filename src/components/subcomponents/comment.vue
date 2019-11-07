
<!--评论模块-->
<template>
<!-- 功能完成 -->
  <div class="container">
    <div class="out-wrapper" v-if="isComment">
      <el-input
        class="gray-bg-input"
        v-model="inputComment"
        type="textarea"
        :rows="3"
        autofocus
        placeholder="写下你的评论"
      ></el-input>
      <div class="btn-control">
        <el-button class="btn" type="success" round @click="commitComment">发表评论</el-button>
      </div>
    </div>
    <div class="comment" v-for="item in comments" :key="item.id">
      <div class="info">
        <div v-if="item.fromAvatar">
          <img class="avatar" :src="item.fromAvatar" width="36" height="36" />
        </div>
        <div v-else>
          <img class="avatar" src="../../assets/tou.jpg" width="36" height="36" />
        </div>
        <div class="right">
          <div class="name">{{item.fromName | defalutUser}}</div>
          <div class="createdTime">{{item.createdTime | formatDate}}</div>
        </div>
      </div>
      <div class="content">{{item.content}}</div>
      <div class="control">
        <span class="like" :class="{active: item.isLike}" @click="likeClick(item)">
          <i class="iconfont icon-like"></i>
          <span class="like-num">{{item.likeNum > 0 ? item.likeNum + '人赞' : '赞'}}</span>
        </span>
        <span class="comment-reply" @click="showCommentInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <!-- 子评论模块 -->
      <div class="reply">
        <div class="item" v-for="reply in item.replys" :key="reply.id">
          <div class="reply-content">
            <span class="from-name">{{reply.fromName | defalutUser}}</span>
            <span>:</span>
            <span class="to-name" v-if="reply.toName">@{{reply.toName}}</span>
            <span>{{reply.content}}</span>
          </div>
          <div class="reply-bottom">
            <span>{{reply.createdTime | formatDate}}</span>
            <span class="reply-text" @click="showCommentInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" v-if="item.replys.length > 0" @click="showCommentInput(item)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新评论</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input
              class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论"
            ></el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="success" round @click="commitComment">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {setComment,setReply} from '../../api/api';

export default {
  props: {
    comments: {
      type: Array,
      required: true
    },
    articleId:{
      type: String,
      required: true
    }
  },
  filters: {//过滤器，主要是为了限制显示字数
    formatDate (value) {  
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '年' + MM + '月' + d +'日  '+h+':'+m+':'+s;
      },
      defalutUser(value){
        if (!value) {
          value = "匿名用户"
        }
        return value
      },
  },
  components: {},
  data() {
    return {
      inputComment: "",
      showItemId: "",
      isComment: true, //表示当前评论是否是对文章的评论
      pcmt: '',   //表示父评论对象,在添加子评论的时候才会有数值
      commentee: '', //被评论者的对象,在@评论者名字的时候才有
    };
  },
  methods: {
    // 点赞
    likeClick(item) {
      if (item.isLike === null) {
        Vue.$set(item, "isLike", true);
        item.likeNum++;
      } else {
        if (item.isLike) {
          item.likeNum--;
        } else {
          item.likeNum++;
        }
        item.isLike = !item.isLike;
      }
    },
    //点击取消按钮
    cancel() {
      this.showItemId = "";
      this.commentee = ''//   使用结束将被评论对象置空
      this.pcmt = ''
      this.isComment = true;
    },
    //提交评论
    commitComment() {
      
      // console.log(this.comments[0]);
      
      if (this.inputComment.trim().length === 0) {//保证评论内容不为空
        return this.$message.error("评论内容不能为空！");
      }
      //获取当前用户名
      let user = JSON.parse(localStorage.getItem('user'));
      user.username = user.uid=='0' ? '匿名用户': user.username;
      
      //这个cmt是前端自己处理，将用户的数据默认加入评论的最前面
      //连接数据库，生成评论id，在成功的回调中获取评论id

      //验证评论是否是顶级评论
      let cmt;  //要传给数据库的评论对象
      if (!this.isComment) {
        if (this.commentee) {
          cmt = {
            id:'',  //子评论id    数据库生成，到时候不用提交这一项到数据库
            commentId: this.pcmt.id,  //父评论id，即父亲的id
            fromId: user.uid,  //评论者id
            fromName: user.username,  //评论者昵称
            fromAvatar: user.avatar, //评论者头像
            toId: this.commentee.id,  //被评论者id   被评论者是子评论的一条
            toName: this.commentee.fromName,  //被评论者昵称
            toAvatar: this.commentee.avatar,  //被评论者头像
            content: this.inputComment.trim().substring(this.commentee.fromName.length+2),  //评论内容 ,后面的内容是，截取除了除了用户名的文本内容
            createdTime: Date.now()   //评论时间
          }
        }else{
          cmt = {
            id:'',  //子评论id    数据库生成，到时候不用提交这一项到数据库
            commentId: this.pcmt.id,  //父评论id，即父亲的id
            fromId: user.uid,  //评论者id
            fromName: user.username,  //评论者昵称
            fromAvatar: user.avatar, //评论者头像
            // toId: this.commentee.id,  //被评论者id   被评论者是子评论的一条
            // toName: this.commentee.fromName,  //被评论者昵称
            // toAvatar: 'http://ww4.sinaimg.cn/bmiddle/006DLFVFgy1ft0j2pddjuj30v90uvagf.jpg',  //被评论者头像
            content: this.inputComment.trim(),  //评论内容 ,后面的内容是，截取除了除了用户名的文本内容
            createdTime: Date.now()   //评论时间
          }
        }
        //回复发送
        this.sendReply(cmt);

      }else{
        cmt = {
          id:'',  //数据库生成，到时候不用提交这一项到数据库
          createdTime: Date.now(),
          articleId: this.articleId,
          fromId: user.uid,  //评论者id
          fromName: user.username,  //评论者昵称
          fromAvatar: user.avatar, //评论者头像
          likeNum: 0,
          content: this.inputComment.trim(),
          replys: []
        };
        let rr = this.sendComment(cmt);
        if (rr) {
          cmt.id = rr;
          this.comments.unshift(cmt);
        }
      }
      this.inputComment = "";
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showCommentInput(item, reply) {
      this.pcmt = item;  //父评论对象
      if (reply) {//如果是评论子评论，加上@
        this.inputComment = "@" + reply.fromName + " ";
        this.commentee = reply;
        
      } else {//如果是评论 一级评论 直接评论
        this.inputComment = "";
      }
      this.isComment = false;
      this.showItemId = item.id;
    },
    /*
     * 发送评论
     */
    sendComment(cmt){
      var _this = this
      setComment(cmt).then(res => {
          let { msg, code, data } = res;
            if (code == 200) {
                _this.$message.success('评论成功');
                cmt.id = data.cid;
                this.comments.unshift(cmt);
              } else {
                _this.$message({
                  message: msg,
                  type: "error"
                });
            }
      })
    },
    sendReply(cmt){
      var _this = this
      setReply(cmt).then(res=>{
        let { msg, code, data } = res;
        if (code == 200) {
          _this.$message.success("评论成功");
          cmt.id = data.rid;
          _this.pcmt.replys.push(cmt);
        } 
        else {
          _this.$message({
            message: msg,
            type: "error"
          });
        }
      })
    }
  },
  created() {
    // console.log(this.comments);
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/index.scss";

.container {
  padding: 0 10px;
  box-sizing: border-box;
  .comment {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-bottom: 1px solid $border-fourth;
    .info {
      display: flex;
      align-items: center;
      .avatar {
        border-radius: 50%;
      }
      .right {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .name {
          font-size: 16px;
          color: $text-main;
          margin-bottom: 5px;
          font-weight: 500;
          display: flex;
        }
        .date {
          font-size: 12px;
          color: $text-minor;
        }
      }
    }
    .content {
      font-size: 16px;
      color: $text-main;
      line-height: 20px;
      padding: 10px 0;
      text-align: left;
    }
    .control {
      display: flex;
      align-items: center;
      font-size: 14px;
      color: $text-minor;
      .like {
        display: flex;
        align-items: center;
        margin-right: 20px;
        cursor: pointer;
        &.active,
        &:hover {
          color: $color-main;
        }
        .iconfont {
          font-size: 14px;
          margin-right: 5px;
        }
      }
      .comment-reply {
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
        .iconfont {
          font-size: 16px;
          margin-right: 5px;
        }
      }
    }
    .reply {
      margin: 10px 0;
      border-left: 2px solid $border-first;
      .item {
        margin: 0 10px;
        padding: 10px 0;
        border-bottom: 1px dashed $border-third;
        .reply-content {
          display: flex;
          align-items: center;
          font-size: 14px;
          color: $text-main;
          .from-name {
            color: $color-main;
          }
          .to-name {
            color: $color-main;
            margin-left: 5px;
            margin-right: 5px;
          }
        }
        .reply-bottom {
          display: flex;
          align-items: center;
          margin-top: 6px;
          font-size: 12px;
          color: $text-minor;
          .reply-text {
            display: flex;
            align-items: center;
            margin-left: 10px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
            .icon-comment {
              margin-right: 5px;
            }
          }
        }
      }
      .write-reply {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: $text-minor;
        padding: 10px;
        cursor: pointer;
        &:hover {
          color: $text-main;
        }
        .el-icon-edit {
          margin-right: 5px;
        }
      }
      .fade-enter-active,
      fade-leave-active {
        transition: opacity 0.5s;
      }
      .fade-enter,
      .fade-leave-to {
        opacity: 0;
      }
      .input-wrapper {
        padding: 10px;
        .gray-bg-input,
        .el-input__inner {
          background-color: #67c23a;
        }
        .btn-control {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-top: 10px;
          .cancel {
            font-size: 16px;
            color: $text-normal;
            margin-right: 20px;
            cursor: pointer;
            &:hover {
              color: $text-333;
            }
          }
          .confirm {
            font-size: 16px;
          }
        }
      }
    }
  }
  .out-wrapper {
    padding: 10px;
    .gray-bg-input,
    .el-input__inner {
      background-color: #67c23a;
    }
    .btn-control {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-top: 10px;
      text-align: right;
      .cancel {
        font-size: 16px;
        color: $text-normal;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: $text-333;
        }
      }
    }
  }
}
</style>
