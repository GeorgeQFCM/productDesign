<!--
 * @Descripttion: 
 * @version: 
 * @Author: zj
 * @Date: 2021-03-15 11:14:30
 * @LastEditors: zj
 * @LastEditTime: 2021-03-29 15:23:29
-->
<template>
  <section>
    <el-form :inline="true" :model="QueryForm" ref="QueryForm">
      <el-form-item prop="searchKey">
        <!-- <el-autocomplete v-model="QueryForm.searchKey" value-key="value" placeholder="请输入物料属性" :trigger-on-focus="true" @change.native="ChangeMat" @select="SelectedMat" :fetch-suggestions="querySearchAsync" style="width:790px;"> -->
        <el-autocomplete v-model="QueryForm.searchKey" value-key="value" placeholder="请输入物料属性" :trigger-on-focus="true" @select="SelectedMat" :fetch-suggestions="querySearchAsync" style="width:790px;">
          <i class="el-icon-circle-close el-input__icon" slot="suffix" @click="handleIconClick"></i>
        </el-autocomplete>

      </el-form-item>
    </el-form>
  </section>
</template>

<script>
  import { QueryMate,QueryNewMate } from '@/api/Redis/RedisHelper'
  export default {
    data() {
      return {
        QueryForm: { searchKey: "" },
        ChildVisible: false,
        flg: false
      }
    },
    methods: {
      handleIconClick() {
        this.QueryForm.searchKey = ""
        this.$emit('cbFun', "");
      },
    //   ChangeMat() {
    //     // this.$forceUpdate()
    //     if (this.QueryForm.searchKey == "") {
    //       this.$emit('cbFun', "");
    //     }
    //     this.$nextTick(() => {
    //       if (this.QueryForm.searchKey == "") {
    //         //    this.$emit('cbFun', "");
    //       }
    //     })
    //   },
      querySearchAsync(queryString, cb) {
        try {
          QueryNewMate({ search: queryString }).then(res => {
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
      },
    }
  }
</script>
<style lang="scss">
  .MatPopover {
    margin-right: 20px !important;
  }

  .MatPopover2 {
    margin-right: 0px !important;
  }
</style>