<template>
  <div class="blog-home">
    <!-- 这是blog Demo的主要界面 -->
    <div class="main-blog">
      <div class="blog-flow">
        <!-- flow布局显示数据 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
        <div class="blog-show" v-for="info in blogInfos" :key="info.id">
          <a :underline="false" class="blog-title" :href="info.url">{{info.title}}</a>
          <div class="blog-context">
            <div class="desc-context">
              摘要:{{info.content}}
              <a
                :href="info.url"
                class="desc_readmore"
              >阅读全文</a>
            </div>
          </div>
          <div class="blog-desc">posted @{{info.date}} {{info.author}}</div>
          <!-- <div class="text item" >二氧化碳浓度:{{statistics['co2']}}</div> -->
        </div>
      </div>
    </div>

    <!-- blog的导航 -->
    <div class="slideBar" style="display:block">
      <div class="slideBarMain">
        <div class="img-tou"><el-avatar :size="150" :src="imgUrl"></el-avatar></div>
        <div class="nav-item">
          <!-- 一级目录分类 -->
          <div class="nav-group" v-for="navInfo in navInfos" :key="navInfo.id">
            <!-- 一级目录标题 -->
              <div class="nav-group_title">{{navInfo.name}}</div>
                <!-- 二级目录 -->
                <ul  class="sub-nav-list" style="height:auto;">
                  <li class="nav-item" v-for="subNavInfo in navInfo.sonCate" :key="subNavInfo.id" >
                    <el-link :underline="false" v-on:click="getBlogs(subNavInfo.id)">{{subNavInfo.name}}</el-link>
                    <!-- <a :href=subNavInfo.url class="nav-a">{{subNavInfo.name}}</a> -->
                  </li>
                </ul>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { requestCates } from "../api/api.js";
import { requestBlogs } from "../api/api.js";

export default {
  data() {
    return {
      imgUrl:"https://avatars1.githubusercontent.com/u/31175877?s=460&v=4",
      blogInfos: [
        {
          id: 1,
          url:"",
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 2,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 3,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 4,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 5,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 6,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        },
        {
          id: 7,
          dayTitle: "",
          blogTitle:
            "[置顶] 基于令牌桶算法实现的分布式无锁限流框架（SnowJena）",
          blogCon:
            "SnowJena What 基于令牌桶算法实现的分布式无锁限流框架，支持熔断降级，支持动态配置规则，支持可视化监控，开箱即用。 Noun 限流 当我们设计了一个函数，准备上线，这时候这个函数会消耗一些资源，处理上限是1秒服务3000个QPS，但如果实际情况遇到高于3000的QPS该如何解决呢？本项目擦除的少年农村的时刻那棵树的第三次开始了超难看了才能十多年死菜鸟支持你可能是的是哪款的承诺咳嗽您是",
          blogDesc: "posted @ 2019-04-21 20:14 薛勤 阅读 (1263) 评论 (3) 编辑"
        }
      ],
      navInfos:[
        {
          id:1,
          name:"Java核心",
          subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        },{
          id:2,
          name:"数据库",
          subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        },{
          id:3,
          name:"Java核心",
          subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        },{
          id:4,
          name:"Java核心",
           subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        }, {
          id:5,
          name:"Java核心",
          subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        }, {
          id:6,
          name:"Java核心",
          subNavInfos:[
            {
              id:11,
              name:"java虚拟机",
              url:""
            },
            {
              id:12,
              name:"集合",
              url:""
            },            
            {
              id:13,
              name:"java中的继承",
              url:""
            },
            {
              id:14,
              name:"java数据类型",
              url:""
            },
            {
              id:15,
              name:"java内部类",
              url:""
            },
          ]
        },
      ]
    };
  },
  mounted(){
    this.getCates()
  },
  methods: {
    hello(){
      console.log(1);
    },
    getCates(){
      var _this = this;
      requestCates().then(data => {
        let{code,info,msg} = data
        if (code == 200) {
          if (!info) {
            //info为空
            this.$message({
            message: msg,
            type: "error"
            });
          } else {
            //查询成功,绑定数据
            _this.navInfos = info
          }
         
        } else {
          //后台发生异常
          this.$router.push({ path: "/404" });
        }
      })
    },
    
    //获取博客，参数是二级目录的id
    getBlogs(id){
      var _this = this;
      requestBlogs(id).then(data => {
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
            _this.blogInfos = info
          }
         
        } else {
          //后台发生异常
          this.$router.push({ path: "/404" });
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-home {
  width: 960px;
  margin: 0 auto;
  padding-top: 10px;
}
.blog-home .main-blog {
  background-color: transparent;
  float: right;
  padding: 0 0 10px 0;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-left: -25em;
  width: 100%;
  min-height: 200px;
  /* border: 1px solid blue; */
}
.blog-flow {
  /* border: 1px solid red; */
  margin-left: 16em;
  float: none;
  width: auto;
}
.blog-show {
  height: 235px;
  padding: 10px 0 15px 0;
  text-align: justify;
  border-bottom: 1px solid #eef2f8;
  min-height: 10px;
  margin-bottom: 20px;
  padding-bottom: 5px;
}
.blog-title {
  height: 30px;
  font-size: 20px;
  font-family: inherit;
  padding-left: 0;
  border-bottom: none;
  font-weight: bold;
  float: right;
  line-height: 1.5em;
  width: 100%;
  clear: both;
}
.blog-context {
  height: 156px;
  font-size: 16px;
  font-family: inherit;
  padding-left: 0;
  float: right;
  line-height: 1.5em;
  width: 100%;
  clear: both;
  padding: 10px 0;
}
.blog-desc {
  height: 16px;
  font-size: 13px;
  padding-right: 0;
  line-height: 0;
  color: #314659 !important;
  float: right;
  width: 100%;
  clear: both;
  text-align: right;
  padding-right: 5px;
  color: #666;
  margin-top: 5px;
}
.desc-context {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  line-height: 1.5;
}
.desc_readmore {
  border: 1px solid;
  border-radius: 3px;
  padding: 2px 9px;
  font-size: 13px;
  margin-top: 10px;
  text-decoration: none;
  display: table;
  color: #314659;
  border-color: #314659;
}

/* 导航栏的边框 */
.slideBar {
  border-right: 1px solid #eef2f8;
  width: 230px;
  float: left;
  padding: 0 0 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  /*display: none;*/
  /* 这个min-height是控制边框长度的 */
  min-height: 750px;
  padding: 0;
}
.slideBar .slideBarMain {
  margin: 0;
  padding: 0;
}
.nav-group .nav-group_title{
    font-size: 12px;
    color: #999;
    line-height: 26px;
    margin-top: 15px;
    ul{
      padding: 0;
      margin: 0;
      overflow: hidden;
    }
}
.nav-item .el-link {
  // display: block;
  line-height: 50px;
}
.blog-flow a:hover{
  color: #303133;
}
.blog-flow a{
  color: #303133;
  text-decoration:none;
}
</style>