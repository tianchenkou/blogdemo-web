<template>
  <div id="test">

    测试专用界面
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>
    <h1>test</h1><br>

    <br>
  </div>
  
</template>

<script>
export default {
     data() {
      return {
        dynamicValidateForm: {
          domains: [{
            value: ''
          }],
          email: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: Date.now()
        });
      }
    }
}
</script>

<style>

</style>