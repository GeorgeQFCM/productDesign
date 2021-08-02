<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="stock-tab">
    <el-tab-pane label="运营申请" name="StockRecommendation" lazy>
      <StockRecommendation ref="StockRecommendation"></StockRecommendation>
    </el-tab-pane>
    <el-tab-pane label="Team审核" name="PurchaseRequest" lazy>
      <PurchaseRequest ref="PurchaseRequest"></PurchaseRequest>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  import StockRecommendation from './components/StockRecommendation3.vue'
  import PurchaseRequest from './components/PurchaseRequest3.vue'
  export default {
    components: {
      StockRecommendation,
      PurchaseRequest
    },
    data() {
      return {
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
