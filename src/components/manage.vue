<template>
  <div class="block" v-html="jnj">
    
  </div>
</template>

<script>

export default {
   data(){
            return {
            };
        },
        computed: {
            options(){
                return this.$store.state.options;
            }
        }
}
</script>

<style lang="scss">
.block .el-tabs__nav-wrap{
  width: 240px;
    height: 239px;
    margin-top: 200px;
.el-tabs__item{
  margin-top: 10px;
  font-size: 20px;
}
}
</style>