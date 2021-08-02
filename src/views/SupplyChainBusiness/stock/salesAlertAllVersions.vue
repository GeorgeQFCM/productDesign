<template>
  <div>
    <h4 style="margin-top:20px">销售预警各版本列表</h4>   
    <el-table :data="tableData" border style="width: 50%">
      <el-table-column type="index" align="center" label="#" width="100">
      </el-table-column>
      <el-table-column prop="name" align="center" label="名称" width="300">
      </el-table-column>
      <el-table-column prop="date" align="center" label="设计日期" width="300">
      </el-table-column>
      <el-table-column align="center" label="访问">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push(scope.row.url)" icon="el-icon-position"></el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [ {
          name: "销售预警V2",
          date: "2021-06-28",
          url: "/Stock/SalesAlertV2"
        }, {
          name: "销售预警V1",
          date: "2021-06-22",
          url: "/Stock/SalesAlert"
        }, ]
      }
    }
  }
</script>

<style>

</style>