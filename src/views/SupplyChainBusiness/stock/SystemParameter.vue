<template>
  <div>
    <el-card>
            <el-row :gutter="10">

      <el-col>
        <el-form inline>
          <el-form-item>
            <label slot="label" style="margin-left: 40px">参数名称 </label>
            <el-input v-model="searchParam.parameterName"></el-input>
          </el-form-item>
          <el-form-item>
            <label slot="label"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参数编码:</label
            >
            <el-input v-model="searchParam.parameterCode"></el-input>
          </el-form-item>

          <el-form-item>
            <label slot="label"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;参数值:</label
            >
            <el-input v-model="searchParam.parameterValue"></el-input>
          </el-form-item>

          <el-form-item inline>
            <el-button type="primary" @click="searchList"
              >&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button
            >
            <el-button type="warning" @click="clearList">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
            </el-row>

    </el-card>

        <el-card style="margin-top: 10px">



    <el-table
      border
      :data="dataList"
      v-loading="tableLoading"
      class="resource-table"
    >
      <el-table-column
        type="selection"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        label="参数名称"
        col="8"
        prop="parameterName"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="参数代码"
        col="8"
        prop="parameterCode"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="参数值"
        col="8"
        prop="parameterValue"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <el-pagination
      style="float: right; margin: 10px 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[10, 15, 20, 70]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      :total="totalRows"
    >
    </el-pagination>
      </el-card>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import SystemParameterApi from "@/api/stock/SystemParameterApi";
export default {
  name: "home",

  data() {
    return {
      searchParam: {
        parameterName: "", //资源名称
        parameterCode: "", //账号
        parameterValue: "", //站点
      },
      activeName: "N", //页面资源 -- N是api资源
      name: "",
      code: "",
      tableLoading: false,
      dataList: [],
      page: 1, //当前页面
      pageSize: 10, // 当前页数
      totalRows: 0, // 总条数
      companyId: "",
      isShowDataAddEdit: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取表格数据源

    getData() {
      let http = new SystemParameterApi();
      this.tableLoading = true;
      let data = {
        parameterName: this.searchParam.parameterName,
        parameterCode: this.searchParam.parameterCode,
        parameterValue: this.searchParam.parameterValue,
        pageSize: this.pageSize,
        page: this.current,
      };
      http.queryList(data).then((res) => {
        this.dataList = res.data.rows;
        this.page = res.data.page;
        this.pageSize = res.data.pageSize;
        this.totalRows = res.data.totalRows;
        this.tableLoading = false;
      });
    },
    // 当前页码修改时
    handleCurrentChange(page) {
      this.page = page;
      this.getData();
    },
    // 当前页数修改时
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },

    searchList() {
      this.page = 1;
      this.getData();
    },
    //清空搜索
    clearList() {
      (this.searchParam.parameterCode = ""), //资源名称
        (this.searchParam.parameterValue = ""), //账号
        (this.searchParam.parameterName = ""), //站点
        this.getData();
    },
    //切换tab标签
    handleClick(val) {
      this.clearList();
      this.page = 1;
      this.getData();
    },
  },
};
</script>

<style lang="scss" scoped>
.home-img {
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 200px;
  img {
    display: block;
    margin: 0px auto;
  }
}
</style>
