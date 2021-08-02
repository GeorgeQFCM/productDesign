<template>
  <div>
    <h4 style="margin-top:20px">物料运输方式设置各版本列表</h4>
    <!-- <div>
      <el-button style="margin-left:30" type="text" @click="$router.push('/Stock/DaliyStock')">物料运输方式设置V1</el-button>
      <el-button style="margin-left:30" type="text" @click="$router.push('/Stock/DalitStockv2')">物料运输方式设置V2</el-button>
      <el-button style="margin-left:30" type="text" @click="$router.push('/Stock/DalitStockv3')">物料运输方式设置V3</el-button>
    </div> -->
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
        tableData: [, {
          name: "物料运输方式设置V2",
          date: "2021-07-26",
          url: "/Stock/MaterialTransportationModeV2"
        }, {
          name: "物料运输方式设置V1",
          date: "2021-06-22",
          url: "/Stock/MaterialTransportationMode"
        }, ]
      }
    }
  }
</script>

<style>

</style>