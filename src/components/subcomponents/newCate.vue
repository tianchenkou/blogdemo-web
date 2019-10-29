<template>
<!-- 创建目录的对话框 -->
<div>
  <el-dialog width="30%" title="新建目录" :visible.sync="vis" append-to-body @close='closeDialog' :show-close='true'>
  <el-form :model="cateruleForm" :rules="caterules" ref="cateruleForm" label-width="100px" >
    <!-- 一级目录选择或创建 -->
  <el-form-item label="一级目录" prop="topcate">
    <el-select
    v-model="cateruleForm.topcate"
    filterable
    allow-create
    default-first-option
    placeholder="请选择文章标签">
    <el-option
      v-for="item in cates"
      :key="item.id"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  </el-form-item>

<!-- 二级目录创建 -->
  <el-form-item label="二级目录" prop="subcate">
    <el-input v-model="cateruleForm.subcate"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="submitForm('cateruleForm')">立即创建</el-button>
    <el-button @click="resetForm('cateruleForm')">重置</el-button>
  </el-form-item>
</el-form>
        </el-dialog>

</div>
  
</template>

<script>
import {requestCates} from '../../api/api'
import {setNewCate} from '../../api/api'

export default {
  props:['innerVisible','cates'],
  data() {
      return {
        vis : false,
        navInfos:[],
        cateruleForm: {
          topcate: '',
          subcate: '',
        },
        caterules: {
          subcate: [
            { required: true, message: '请输入二级目录名称', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          topcate: [
            { required: true, message: '请选择一级目录名称', trigger: 'change' }
          ],
        },
      };
    },
    watch: {
      innerVisible (newValue, oldValue) {
        this.vis = newValue
      },
      cates(newValue, oldValue) {
        this.navInfos = newValue
      },
    },
    methods: {
      submitForm(cateruleForm) {
        var _this=this;
        //是否是新创建的一级目录
        var isNew;
        //一级目录的id
        var id;

        this.$refs[cateruleForm].validate((valid) => {
          // 提交数据不为空
          if (valid) {
             // 二级目录不重复
            let subInfos;
            _this.navInfos.some(item=>{//一级目录对应的二级目录集合
              if(item.name==_this.cateruleForm.topcate){
                id = item.id;
                subInfos = item['sonCate'];
              } 
            });
            
            var condition = false;
            if (subInfos) {//如果该一级目录不是新创建的
              isNew = false; 
              //遍历数组，判断是否与已有二级目录重名
              condition = subInfos.some(item=>{
                if(item.name==_this.cateruleForm.subcate){
                  return true; 
                } 
              }); 
            }else isNew = true;

            if (condition) {//存在重复
              _this.$message.error('二级目录名已存在!');
              return false

            }else{//不存在重复值
                let cateInfos = {"topCate":_this.cateruleForm.topcate,"isNew":isNew,"subCate":_this.cateruleForm.subcate,"subid":id}
                //消息提交
                setNewCate(cateInfos).then(data => {
                  let{code,msg} = data;
                  if (code == 200) {
                      //查询成功,绑定数据
                      _this.$message.success('创建分类成功!');
                      //每次创建完目录的时候才会有更新,在这里重新获取一遍
                      _this.getCates();
                  } else {
                    //针对恶意发包造成后台异常的
                    _this.$message.error('操作异常');
                    //后台发生异常
                    this.$router.push({ path: "/404" });
                  }
                });
            }
        
          } else {
            // this.$message.error('信息为填写完整');
            return false;
          }

        });
      },
      resetForm(cateruleForm) {
        this.$refs[cateruleForm].resetFields();
        this.cateruleForm.topcate='';
        this.cateruleForm.subcate='';

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
      closeDialog(){
        console.log("navInfos"+this.navInfos);
        this.$emit('close-catesInfo', this.navInfos);
      }
    }
}
</script>

<style>

</style>