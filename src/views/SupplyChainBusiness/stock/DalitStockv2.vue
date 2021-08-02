<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card" class="stock-tab">
      <el-tab-pane label="运营申请" name="OperatApply" lazy>
        <OperatApply ref="OperatApply"></OperatApply>
      </el-tab-pane>
      <el-tab-pane label="Team审核" name="TeamCheck" lazy>
        <TeamCheck ref="TeamCheck"></TeamCheck>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import OperatApply from './components/OperatApply'
  import TeamCheck from './components/TeamCheck'
  export default {
    components: {
      OperatApply,
      TeamCheck
    },
    data() {
      return {
        activeName: 'OperatApply',
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-02",
          endTime: "2021-06-08",
          describe: "第一版",
        },
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