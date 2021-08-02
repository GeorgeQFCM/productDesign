<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline label-width="100">
            <el-col>
              <el-form-item>
                <label slot="label" style="margin-left: 40px">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台 :
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
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Team:</label>
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
            </el-col>
            <el-col>
              <el-form-item>
                <label
                  slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运营大类:&nbsp;&nbsp;</label>
                <el-select v-model="searchParam.category" filterable placeholder="请选择运营大类" @change="selectCategoryOne">
                  <el-option v-for="(item, index) in categoryList" :key="index" :label="item.category"
                    :value="item.category"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品名称:</label>
                <el-select v-model="searchParam.productName" filterable placeholder="选择产品名称" no-data-text="请先选择上级(运营大类)"
                  @change="selectProductNameOne">
                  <el-option v-for="(item, index) in productNameList" :key="index" :label="item.product_name"
                    :value="item.product_name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;适用机型:</label>
                <el-select v-model="searchParam.applicableModels" filterable placeholder="选择适用机型"
                  no-data-text="请先选择上级(产品名称)">
                  <!-- :label="item?item.type:''"
                  :value="item?item.type:''" -->
                  <el-option v-for="(item, index) in applicableModelsList" :key="index" :label="item ? item.type : ''"
                    :value="item ? item.type : ''"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;颜色:</label>
                <el-input v-model="searchParam.color" style="width:220px"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item>
                <label
                  slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;生命周期:</label>
                <el-input v-model="searchParam.lifeCycle" style="width:220px"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;前7天销量:</label>
                <el-input v-model="searchParam.safeSaleDays"></el-input>
              </el-form-item>
              <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
              <el-button type="warning" @click="clearList">重置</el-button>
              <el-form-item style="margin-left: 72px"> </el-form-item>
            </el-col>

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
        @selection-change="handleSelectionChange" size="mini" height="500px">
        <el-table-column type="selection" align="center" width="40"></el-table-column>
        <el-table-column label="id" width="60" prop="id" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="平台" width="100" prop="platformName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="事业部" width="100" prop="department" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Team" width="100" prop="team" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" width="100" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="运营大类" width="100" prop="category" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品" width="100" prop="productName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="适用机型" width="100" prop="applicableModels" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="颜色" width="100" prop="color" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="7天销售数量大于" width="100" prop="salesVolume" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="生命周期" width="100" prop="lifeCycle" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="前7天销量" width="100" prop="safeSaleDays" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="订货天数" width="100" prop="orderGoodsDays" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="优先级" width="100" prop="priority" align="center" show-overflow-tooltip></el-table-column>

        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">编辑{{scope.row.id}}
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

    <LifeCycleParameterRuleAddEdit v-if="isShowDataAddEdit" :id="dataId" @close="closeDataAddEdit"
      :areaList="this.areaList" :platformNameList="this.platformNameList" :teamList="this.teamList"
      :categoryList="this.categoryList" :departmentList="this.departmentList"
      :applicableModelsList="this.applicableModelsList"></LifeCycleParameterRuleAddEdit>

    <ExcelImport v-if="isShowImport" @close="closeImport" :title="this.$route.meta.title" :propname="this.$route.name">
    </ExcelImport>
  </div>
</template>

<script>
  export default {
    components: {
      LifeCycleParameterRuleAddEdit: (resolve) =>
        require(["./components/LifeCycleParameterRuleAddEdit"], resolve),

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
        areaList: [],
        selectedList: [],
        platformNameList: [],
        productNameList: [],

        categoryList: [],
        departmentList: [],
        applicableModelsList: [],
        teamList: [],
        areaList: [],
        searchParam: {
          platformName: "", //资源名称
          department: "",
          Team: "",
          area: "", //账号
          category: "",
          productName: "",
          applicableModels: "",
          color: "",
          lifeCycle: "",
          safeSaleDays: "",
          orderGoodsDays: "",
          priority: "",

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
          platformName: "Rakuten",
          department: "事业二部",
          team: "Team4",
          area: "SG",
          category: "皮套",
          productName: "手机壳",
          applicableModels: "IPhone10",
          color: "无",
          salesVolume: "88",
          lifeCycle: "10",
          safeSaleDays: "10",
          orderGoodsDays: "100",
          priority: "10",
        }, {
          platformName: "Rakuten",
          department: "事业二部",
          team: "Team4",
          area: "SG",
          category: "皮套",
          productName: "手机壳",
          applicableModels: "IPhone10",
          color: "无",
          salesVolume: "10",
          lifeCycle: "10",
          safeSaleDays: "10",
          orderGoodsDays: "100",
          priority: "10",
        }, {
          platformName: "Rakuten",
          department: "事业二部",
          team: "Team4",
          area: "SG",
          category: "皮套",
          productName: "手机壳",
          applicableModels: "IPhone10",
          color: "无",
          salesVolume: "10",
          lifeCycle: "10",
          safeSaleDays: "10",
          orderGoodsDays: "10",
          priority: "10",
        }],
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
        this.dataId = id;
        this.isShowDataAddEdit = true;
      },

      deleteData(id) {

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

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      async delArray() {
        // 拿到选中的数据；
        const val = this.multipleSelection;
        // 如果选中数据存在
        if (val) {
          console.log("val :>> ", val);

          if (confirm(`请确认当前有${val.length}项物料将被永久删除:\n     `)) {
            // Save it!
            console.log(`选中物料删除`);
          } else {
            // Do nothing!
            console.log("取消切换");
            return;
          }

          let http = new LifeCycleParameterRuleApi();
          val.forEach(async function (item) {
            await http.delete(item);
          });
          this.getData();
        } else {
          this.$confirm("选择为空");
        }
        this.$refs.multipleTable.clearSelection();
      },

      toggleSelection(rows) {
        if (rows) {
          rows.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      async selectCategoryOne(category) {

      },

      async selectProductNameOne(product) {
        console.log("product :>> ", product);
      },

      async getData() {},

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
        (this.searchParam.department = ""), //资源名称
        (this.searchParam.Team = ""), //资源名称
        (this.searchParam.area = ""), //账号
        (this.searchParam.category = ""), //资源名称
        (this.searchParam.productName = ""), //资源名称
        (this.searchParam.applicableModels = ""), //资源名称
        (this.searchParam.color = ""), //资源名称
        (this.searchParam.lifeCycle = ""), //资源名称
        (this.searchParam.safeSaleDays = ""), //资源名称
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