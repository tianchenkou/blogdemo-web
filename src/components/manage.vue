<template>
  <comment :comments="commentData"></comment>
</template>

<script>
  // import * as CommentData from '../assets/js/mockdata'
  import comment from './subcomponents/comment'
  import {getAllCommentData} from '../api/api'

  export default {
    components: {
      comment
    },
    data() {
      return {
        commentData: []
      }
    },
    created() {
      // this.commentData = CommentData.comment.data;
      this.getCommentData(1);
    },
    methods:{
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
