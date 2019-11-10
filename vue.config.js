//vue.config.json
const path = require('path');
const publicPath = process.env.NODE_ENV === "production" ? "/static/" : "/"; //font scss资源路径 不同环境切换控制

//判断当前环境是否为生产环境
const baseUrl = process.env.NODE_ENV === 'production' ? './' : '/';
// vue.config.js
module.exports = {
  //基本路径
  publicPath: './',

  //输出文件目录
  outputDir: 'dist',
  
  //是否在保存的时候检查
  lintOnSave: false,
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  //以多页模式构建应用程序。
    pages: undefined,
  //是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: false,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: false,
  //是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建，在适当的时候开启几个子进程去并发的执行压缩
  parallel: require('os').cpus().length > 1,
  css: {
        // 启用 CSS modules
        modules: false,
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps，一般不建议开启
        sourceMap: false,
    },
  // 选项...
  devServer: {
    host: 'localhost',
    //host: "0.0.0.0",
        // https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器  http://172.16.1.12:7071/rest/mcdPhoneBar/ 
    hotOnly: true, // 热更新
    port: 8092,
    proxy:{
      '/TestForWoss': {
          target: 'http://localhost:8081/TestForWoss',
          changeOrigin: true, //是否跨域
          pathRewrite: {
          '^/TestForWoss': '' //规定请求地址以什么作为开头
          }
      },
      //将来打包需要在Nginx上配置
      '/uploadImg': {
        target: 'https://sm.ms/api/v2/upload',
        changeOrigin: true, //是否跨域
        pathRewrite: {
        '^/uploadImg': '' //规定请求地址以什么作为开头
        }
      },
    }
  },
}