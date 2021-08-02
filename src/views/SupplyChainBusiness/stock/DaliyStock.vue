<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="stock-tab">
      <el-tab-pane label="预采购" name="StockRecommendation" lazy>
        <StockRecommendation ref="StockRecommendation"></StockRecommendation>
      </el-tab-pane>
      <el-tab-pane label="采购申请" name="PurchaseRequest" lazy>
        <PurchaseRequest ref="PurchaseRequest"></PurchaseRequest>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import StockRecommendation from './StockRecommendation'
  import PurchaseRequest from './PurchaseRequest'
  export default {
    components: {
      StockRecommendation,
      PurchaseRequest
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-02",
          endTime: "2021-06-08",
          describe: "第一版",
        },
        activeName: 'StockRecommendation'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style lang="scss" scoped>
  /deep/ .el-tabs__item {
    background-color: #fff;
    font-weight: bolder;
    // font-family: monospace;
    user-select: none;
  }

  /deep/ .el-tabs__header {
    border-bottom: 1px solid #fff;
  }
</style>