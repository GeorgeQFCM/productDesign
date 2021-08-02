<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="tasktype" label="类型" align="center">
    </el-table-column>
    <el-table-column prop="area" label="区域" align="center">
    </el-table-column>
    <el-table-column prop="asin" label="Asin" align="center">
    </el-table-column>
    <el-table-column prop="num" label="数量" align="center">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'applyCompont',
    props: {
      //本弹窗的id
      layerid: {
        type: String,
        default: ""
      },
      //父组件的data
      laydata: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //父组件传值
      info: {
        type: Array,
        default: () => {
          return [];
        }
      },
    },
    data() {
      return {
        tableData: [{
            tasktype: "日常备货",
            area: "EU",
            asin: "ASIN1",
            num: 200,
          },
          {
            tasktype: "项目备货",
            area: "EU",
            asin: "ASIN1",
            num: 50,
          },
          {
            tasktype: "紧急备货",
            area: "EU",
            asin: "ASIN1",
            num: 100,
          }
        ]
      }
    }
  }
</script>

<style>

</style>