<template>
  <section>
    <el-popover :popper-class="flg?'MatPopover':'MatPopover2' " ref="popover1" placement="bottom" title="筛选物料" trigger="click" @after-leave="hidePopover">
      <el-form :inline="true" :model="QueryForm" ref="QueryForm">
        <el-form-item prop="searchKey">
          <el-autocomplete v-model="QueryForm.searchKey" placeholder="请输入物料属性" :trigger-on-focus="false" clearable @change="change($event)" @select="SelectedMat" :fetch-suggestions="querySearchAsync" style="width:800px;"></el-autocomplete>
        </el-form-item>
      </el-form>
    </el-popover>
    <el-button type="primary" icon="el-icon-search" size="mini" class="SelectMat" v-popover:popover1>选择物料</el-button>
  </section>
</template>

<script>
  import { QueryMate } from '@/api/Redis/RedisHelper'
  export default {
    data() {
      return {
        QueryForm: { searchKey: "" },
        ChildVisible: false,
        flg: false
      }
    },
    methods: {
      change(e) {
        this.$forceUpdate();
      },
      ChildHide() {
        this.$refs.popover1.doClose();
      },
      hidePopover() {
        this.$refs.QueryForm.resetFields();
      },
      querySearchAsync(queryString, cb) {
        try {
          QueryMate({ search: queryString }).then(res => {
            if (res.code === 0) {
              let restaurants = [];
              res.data.forEach(element => {
                element = { value: element };
                restaurants.push(element);
              });
              cb(restaurants); // 调用 callback 返回建议列表的数据
            } else this.$message.error(res.msg);
          });
        } catch (error) {
          this.$message.error(error);
        }
      },
      SelectedMat(item) {
        if (this.$listeners['cbFun']) {
          this.$emit('cbFun', item.value);
        }
        this.ChildHide();
      },
    }
  }
</script>
<style lang="scss">
.MatPopover{
  margin-right: 20px !important;
}
.MatPopover2{
  margin-right: 0px !important;
}
</style>