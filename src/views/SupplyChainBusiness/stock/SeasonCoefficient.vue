<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
            <el-form-item>
              <label slot="label" style="margin-left: 38px">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台
              </label>
              <el-select v-model="searchParam.platformName" filterable placeholder="请选择平台">
                <el-option v-for="(item, index) in platformNameList" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事业部:</label>

              <el-select v-model="searchParam.department" filterable placeholder="请选择事业部">
                <el-option v-for="(item, index) in departmentList" :key="index" :label="item.Department"
                  :value="item.Department"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team:</label>
              <el-select v-model="searchParam.Team" filterable placeholder="请选择Team">
                <el-option v-for="(item, index) in teamList" :key="index" :label="item.Team" :value="item.Team">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区域:</label>
              <el-select v-model="searchParam.area" filterable placeholder="请选择区域">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.Area" :value="item.Area">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运营大类:</label>

              <el-select v-model="searchParam.category" filterable placeholder="请选择运营大类" @change="selectCategoryOne">
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.category"
                  :value="item.category"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品名称:</label>
              <el-select v-model="searchParam.productName" filterable placeholder="选择产品名称" no-data-text="请先选择上级(运营大类)"
                @change="selectProductNameOne">
                <el-option v-for="(item, index) in productNameList" :key="index" :label="item.product_name"
                  :value="item.product_name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left: 18px">
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月份:</label>
              <el-select v-model="searchParam.mon" filterable placeholder="选择月份">
                <el-option v-for="(item, index) in monsList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;季节:</label>
              <el-select v-model="searchParam.season" filterable placeholder="选择季节">
                <el-option v-for="(item, index) in seasonsList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
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

      <el-table ref="multipleTable" border :data="dataList" v-loading="tableLoading" class="resource-table"
        @selection-change="handleSelectionChange" size="mini" height="565">
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="平台" width="135" prop="platformName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="事业部" width="135" prop="department" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Team" width="135" prop="team" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" width="135" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="运营大类" width="135" prop="category" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品名称" width="135" prop="productName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="季节" width="135" prop="season" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="月份" width="135" prop="mon" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="季节系数" width="135" prop="coefficient" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="优先级" width="135" prop="priority" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">编辑
            </el-button>
            <el-button type="text" style="color: red" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right; margin: 10px 0" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 70]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <SeasonCoefficientAddEdit v-if="isShowDataAddEdit" :id="dataId" @close="closeDataAddEdit"
      :platformNameList="this.platformNameList" :areaList="this.areaList" :categoryList="this.categoryList"
      :productNameList="this.productNameList" :departmentList="this.departmentList" :teamList="this.teamList"
      :monsList="this.monsList" :seasonsList="this.seasonsList"></SeasonCoefficientAddEdit>
    <ExcelImport v-if="isShowImport" @close="closeImport" :title="this.$route.meta.title" :propname="this.$route.name">
    </ExcelImport>
  </div>
</template>

<script>
  export default {
    components: {
      SeasonCoefficientAddEdit: (resolve) =>
        require(["./components/SeasonCoefficientAddEdit"], resolve),
      ExcelImport: (resolve) => require(["./components/ExcelImport"], resolve),
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
        monsList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        seasonsList: [1, 2, 3, 4],
        platformNameList: [],
        departmentList: [],
        teamList: [],
        areaList: [],
        categoryList: [],
        productNameList: [],

        searchParam: {
          platformName: "", //资源名称
          department: "", //账号
          Team: "", //站点
          area: "", //开始时间
          category: "", //结束时间
          productName: "", //汇款银行
          mon: "", //结束时间
          season: "", //汇款银行
        },
        dataId: "",
        activeName: "N", //页面资源 -- N是api资源
        name: "",
        code: "",
        tableLoading: false,
        dataList: [{
          platformName: "Amazon",
          department: "事业二部",
          team: "Team4",
          area: "US",
          category: "水上运动",
          productName: "",
          season: "",
          mon: "12",
          coefficient: "0.88",
          priority: "1",
        }, {
          platformName: "Amazon",
          department: "事业二部",
          team: "Team4",
          area: "US",
          category: "水上运动",
          productName: "",
          season: "",
          mon: "11",
          coefficient: "0.79",
          priority: "1",
        }, {
          platformName: "Amazon",
          department: "事业二部",
          team: "Team4",
          area: "US",
          category: "水上运动",
          productName: "",
          season: "",
          mon: "10",
          coefficient: "0.86",
          priority: "1",
        }, ],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: "",
        isShowDataAddEdit: false,
        isShowImport: false,
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
            let http = new SeasonCoefficientApi();
            http
              .delete({
                id
              })
              .then((res) => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                loading.close();
                this.getData();
              })
              .catch((e) => {
                loading.close();
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
          console.log('val :>> ', val);

          if (
            confirm(
              `请确认当前有${val.length}项物料将被永久删除:\n     `
            )) {
            // Save it!
            console.log(`选中物料删除`)
          } else {
            // Do nothing!
            console.log("取消切换");
            return
          }

          let http = new SeasonCoefficientApi();
          val.forEach(async function (item) {
            await http.delete(item)
          })
          this.getData();

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

      async selectCategoryOne(category) {
        let http = new SysMaterialApi();
        const resProductName = await http.getProductName({
          category
        });
        this.productNameList =

          [...resProductName.data] || [];
      },

      async selectProductNameOne(product) {
        console.log("product :>> ", product);
      },

      async getData() {
        let http = new SeasonCoefficientApi();
        let httpSelect = new BaseSelectApi();
        let httpSelect1 = new SysMaterialApi();

        let httpDict = new DictApi();

        this.tableLoading = true;
        let data = {
          area: this.searchParam.area,
          department: this.searchParam.department,
          platformName: this.searchParam.platformName,
          Team: this.searchParam.Team,
          area: this.searchParam.area,
          category: this.searchParam.category,
          productName: this.searchParam.productName,
          season: this.searchParam.season,
          mon: this.searchParam.mon,
          pageSize: this.pageSize,
          page: this.current,
        };
        const res = await http.queryList(data);

        this.dataList = res.data.rows;
        console.log("dataList :>> ", this.dataList);
        this.page = res.data.page;
        this.pageSize = res.data.pageSize;
        this.totalRows = res.data.totalRows;

        const dictTypeCodePlatform = "PLATFORM";
        const dictResPlatform = await httpDict.getDictListByTypeCode({
          dictTypeCode: dictTypeCodePlatform,
        });

        const resArea = await httpSelect.getAreaSelect();
        const resDepartment = await httpSelect.getDepartmentSelect();
        const resTeam = await httpSelect.getTeamSelect();
        const resCategory = await httpSelect1.getCategory();
        const resApplicableModels = await httpSelect1.getType();
        const resPlatform = await httpSelect.getPlatformSelect();

        this.areaList = [...resArea.data];
        this.platformNameList = dictResPlatform.data.map((i) => i.dictName);

        this.departmentList = [...resDepartment.data];
        this.teamList = [...resTeam.data];
        this.categoryList = [...resCategory.data];
        this.tableLoading = false;
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
        console.log("this.searchParam :>> ", this.searchParam);
        this.getData();
      },
      //清空搜索
      clearList() {
        (this.searchParam.platformName = ""), //资源名称
        (this.searchParam.department = ""), //账号
        (this.searchParam.Team = ""), //站点
        (this.searchParam.area = ""), //开始时间
        (this.searchParam.category = ""), //结束时间
        (this.searchParam.productName = ""), //汇款银行
        (this.searchParam.season = ""), //结束时间
        (this.searchParam.mon = ""), //汇款银行
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