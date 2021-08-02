<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
            <el-form-item>
              <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台
              </label>
              <el-select v-model="searchParam.platformName" filterable placeholder="请选择平台">
                <el-option v-for="(item, index) in platformNameList" :key="index" :label="item.platform"
                  :value="item.platform"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <label
                slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</label>
              <el-select v-model="searchParam.area" filterable placeholder="请选择区域">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.Area" :value="item.Area">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;物流方式:</label>
              <el-input v-model="searchParam.logisticsMode"></el-input>
            </el-form-item>

            <el-form-item style="margin-left: 72px">
              <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
              <el-button type="warning" @click="clearList">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" size="medium" @click="addData">新增</el-button>
        <el-button type="warning" size="medium" @click="excelImport">导入</el-button>
        <el-button @click="delArray()" type="danger">批量删除</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

      <el-table ref="multipleTable" :data="dataList" border v-loading="tableLoading" class="resource-table"
        @selection-change="handleSelectionChange" height="600px" size="mini">
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <!-- <el-table-column label="id" width="200" prop="id" align="center" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="平台" prop="platformName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="区域" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="物流方式" prop="logisticsMode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="运输天数" prop="logisticsDays" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">编辑
            </el-button>
            <el-button type="text" style="color: red" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right; margin: 10px 0" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <LogDayAddEdit v-if="isShowDataAddEdit" :id="dataId" @close="closeDataAddEdit"></LogDayAddEdit>

    <!-- <LogDayImport v-if="isShowImport" @close="closeImport"></LogDayImport> -->
    <ExcelImport v-if="isShowImport" @close="closeImport" :title="this.$route.meta.title" :propname="this.$route.name">
    </ExcelImport>
  </div>
</template>

<script>
  export default {

    components: {
      LogDayAddEdit: (resolve) =>
        require(["./components/LogDayAddEdit"], resolve),

      ExcelImport: (resolve) =>
        require(["./components/ExcelImport"], resolve),
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-30",
          endTime: "2021-06-30",
          describe: "从MCMS系统转移",
        },
        searchParam: {
          platformName: "", //资源名称
          area: "", //账号
          logisticsMode: "", //站点
          // logisticsDays:0, //开始时间
          // createUser:0, //结束时间
          // createTime:'', //汇款银行
          // updateBy:0, //结束时间
          // updateTime:'', //汇款银行
        },
        activeName: "N", //页面资源 -- N是api资源
        name: "",
        code: "",
        tableLoading: false,
        dataList: [{
            platformName: "Amazon",
            area: "AU",
            logisticsMode: "海运",
            logisticsDays: "45",
          },
          {
            platformName: "Amazon",
            area: "AU",
            logisticsMode: "空运",
            logisticsDays: "10",
          },
          {
            platformName: "Amazon",
            area: "AE",
            logisticsMode: "空运",
            logisticsDays: "10",
          }
        ],
        areaList: [],
        selectedList: [],
        platformNameList: [],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: "",
        isShowDataAddEdit: false,
        isShowImport: false,
        dataId: "",
      };
    },
    created() {
      this.getData();
    },
    methods: {
      //获取表格数据源
      addData() {
        this.isShowDataAddEdit = true;
      },

      excelImport() {
        this.isShowImport = true;
      },

      editData(id) {
        // console.log('传入的id :>> ', id);
        this.dataId = id;
        this.isShowDataAddEdit = true;
      },

      deleteData(id) {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            const loading = this.$loading({
              lock: true,
              text: `删除中，请耐心等待.....`,
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });

          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },


      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      async delArray() {

        // 拿到选中的数据；
        const val = this.multipleSelection
        // 如果选中数据存在
        if (val) {



        } else {
          this.$confirm("选择为空")
        }
        this.$refs.multipleTable.clearSelection()

      },
      closeDataAddEdit() {
        this.isShowDataAddEdit = false;
        this.dataId = "";
        this.getData();
      },
      closeImport() {
        this.isShowImport = false;
        this.getData();
      },

      async getData() {

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
        (this.searchParam.platformName = ""), //资源名称
        (this.searchParam.area = ""), //账号
        (this.searchParam.logisticsMode = ""), //站点
        (this.searchParam.logisticsDays = 0), //开始时间
        (this.searchParam.createUser = 0), //结束时间
        (this.searchParam.createTime = ""), //汇款银行
        (this.searchParam.updateBy = 0), //结束时间
        (this.searchParam.updateTime = ""), //汇款银行
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