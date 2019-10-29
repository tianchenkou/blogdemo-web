<template>
  <!-- 主界面 -->
  <div class="home">
   <div class="main-blogContext">
     <mavon-editor
      class="md"
     :value="articleDetail.context"
     :subfield = "prop.subfield"
     :defaultOpen = "prop.defaultOpen"
     :toolbarsFlag = "prop.toolbarsFlag"
     :editable="prop.editable"
     :scrollStyle="prop.scrollStyle"
  ></mavon-editor>
   </div>
  </div>
</template>

<script>
export default {
 data() {
    return {
      articleDetail: {"context":"## Java中常见的运行时异常\r\n* 空指针异常 NullPointerException\r\n操作空对象\r\n* 数组下标越界异常 IndexOutOfBoundsException\r\n操作数组的时候\r\n* 类型转换异常 ClassCastException\r\nTreeSet或者TreeMap等需要排序的几个方法"}
    };
  },
  computed: {
    prop() {
      let data = {
        subfield: false, // 单双栏模式
        defaultOpen: "preview", //edit： 默认展示编辑区域 ， preview： 默认展示预览区域
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true
      };
      return data;
    }
  }
}
</script>

<style lang="scss" scoped>
.main-blogContext{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}
</style>
