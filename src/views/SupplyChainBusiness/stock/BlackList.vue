<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
            <el-form-item>
              <label slot="label" style="margin-left: 40px">物料编码 </label>
              <el-input v-model="searchParam.materialCode"></el-input>
            </el-form-item>
            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ASIN:</label>
              <el-input v-model="searchParam.asin"></el-input>
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
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table" height="630px">
        <el-table-column type="selection" align="center" width="80"></el-table-column>
        <el-table-column label="物流方式" width="100" prop="logisticsMode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="物料编码" width="100" prop="materialCode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="ASIN" width="100" prop="asin" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="运营大类" width="100" prop="category" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品类型" width="100" prop="productType" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品名称" width="100" prop="productName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品款式" width="100" prop="style" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="主材料" width="100" prop="mainMaterial" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="图案" width="100" prop="pattern" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="公司品牌" width="100" prop="companyBrand" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="适用品牌" width="100" prop="brand" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="型号" width="100" prop="model" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="type" width="100" prop="type" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="颜色" width="100" prop="color" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="尺寸" width="100" prop="sizes" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="物料创建日期" width="100" prop="createDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="版本描述" width="100" prop="versionDes" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="品牌是否可替" width="100" prop="brandReplace" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="禁止状态" width="100" prop="forbidstatus" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="首单日期" width="100" prop="firstOrderDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="最小生产周期" width="100" prop="minProductionCycle" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="最大生产周期" width="100" prop="maxProductionCycle" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="最后更新日期" width="100" prop="lastupdateTime" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购人" width="100" prop="buyer" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="开发人" width="100" prop="developer" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="包装数量" width="100" prop="packing" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="版本" width="100" prop="version" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="nbdu" width="100" prop="nbdu" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="spu" width="100" prop="spu" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="季节标签" width="100" prop="seasonLabel" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="acctgDate" width="100" prop="acctgDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row.id)">编辑 </el-button>
            <el-button type="text" style="color: red" @click="deleteData(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right; margin: 10px 0" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 70]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <BlackListAddEdit v-if="isShowDataAddEdit" :id="dataId" @close="closeDataAddEdit"></BlackListAddEdit>

    <ExcelImport v-if="isShowImport" @close="closeImport" :title=this.$route.meta.title :propname=this.$route.name>
    </ExcelImport>
  </div>
</template>

<script>
  export default {
    name: "home",
    components: {
      BlackListAddEdit: (resolve) =>
        require(["./components/BlackListAddEdit"], resolve),
      ExcelImport: (resolve) =>
        require(["./components/ExcelImport"], resolve),
    },
    data() {
      return {
        RecordForm: {
             product:"刘润涛",
          author: "庄全发",
          startTime: "2021-06-30",
          endTime: "2021-06-30",
          describe: "从MCMS系统转移",
        },
        searchParam: {
          materialCode: "", //资源名称
          asin: "", //账号
          // logisticsDays:0, //开始时间
          // createUser:0, //结束时间
          // createTime:'', //汇款银行
          // updateBy:0, //结束时间
          // updateTime:'', //汇款银行
        },
        activeName: "N", //页面资源 -- N是api资源
        name: "",
        code: "",
        dataId: "",
        tableLoading: false,
        dataList: [{
          logisticsMode: "海运",
          materialCode: "P00LE401",
          asin: "ASIN1",
          category: "电子",
          productType: "汽车配件",
          productName: "汽车应急启动电源",
          style: "12000ma ",
          mainMaterial: "塑料",
          pattern: "无",
          companyBrand: "中性",
          brand: "通用",
          model: "U9",
          type: "无",
          color: "黄色",
          sizes: "英规",
          createDate: "2019-04-14",
          versionDes: "标准版",
          brandReplace: "是",
          forbidstatus: "A",
          firstOrderDate: "2019-04-14",
          minProductionCycle: "35",
          maxProductionCycle: "35",
          lastupdateTime: "",
          buyer: "",
          developer: "",
          packing: "(1pack)",
          version: "",
          nbdu: "",
          spu: "",
          seasonLabel: "2015-12-23",
          acctgDate: "",
        }, {
          logisticsMode: "海运",
          materialCode: "P00LE401",
          asin: "ASIN1",
          category: "电子",
          productType: "汽车配件",
          productName: "汽车应急启动电源",
          style: "12000ma ",
          mainMaterial: "塑料",
          pattern: "无",
          companyBrand: "中性",
          brand: "通用",
          model: "U9",
          type: "无",
          color: "黄色",
          sizes: "英规",
          createDate: "2019-04-14",
          versionDes: "标准版",
          brandReplace: "是",
          forbidstatus: "A",
          firstOrderDate: "2019-04-14",
          minProductionCycle: "35",
          maxProductionCycle: "35",
          lastupdateTime: "",
          buyer: "",
          developer: "",
          packing: "(1pack)",
          version: "",
          nbdu: "",
          spu: "",
          seasonLabel: "2015-12-23",
          acctgDate: "",
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
            let http = new BlackListApi();
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
      closeDataAddEdit() {
        this.isShowDataAddEdit = false;
        this.dataId = "";
        this.getData();
      },
      closeImport() {
        this.isShowImport = false;
        this.getData();
      },
      getData() {
        let http = new BlackListApi();
        this.tableLoading = true;
        let data = {
          materialCode: this.searchParam.materialCode,
          asin: this.searchParam.asin,
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
        (this.searchParam.materialCode = ""), //资源名称
        (this.searchParam.asin = ""), //账号
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