<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
            <el-form-item>
              <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</label>
              <el-input v-model="searchParam.platformName" ></el-input>
            </el-form-item>
            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</label>
              <el-input v-model="searchParam.area"></el-input>
            </el-form-item>
            <el-form-item>
              <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;物流方式:</label>
              <el-input v-model="searchParam.logisticsMode"></el-input>
            </el-form-item>

            <el-form-item   style="margin-left:72px ">
              <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
              <el-button type="warning" @click="clearList">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

                  <el-form inline>


            <el-form-item   style="margin-top:10px ">
              <el-button type="primary" @click="addData">新增</el-button>
              <el-button type="primary" @click="editData">修改</el-button>
              <el-button type="primary" @click="clearList">删除</el-button>
              <el-button type="primary" @click="clearList">导入</el-button>
            </el-form-item>
          </el-form>
      </el-row>
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table">

        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="id" width="200" prop="id" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="平台" width="200" prop="platformName" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" width="200" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="物流方式" width="200" prop="logisticsMode" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="运输天数" width="200" prop="logisticsDays" align="center" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="editData(scope.row.id)"
            >编辑 {{scope.row.id}}</el-button
          >
          <el-button
            type="text"
            style="color: red"
            @click="deleteData(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      </el-table>
      <el-pagination
        style="float:right; margin: 10px 0;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="totalRows">
      </el-pagination>

    <DataAddEdit
      v-if="isShowDataAddEdit"
      :id="dataId"
      @close="closeDataAddEdit"
    ></DataAddEdit>

    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import LogisticsDayApi from '@/api/stock/LogisticsDayApi'
export default {
  name: 'home',
  components: {
    DataAddEdit: (resolve) =>
      require(["./components/dataAddEdit"], resolve),
  },
data(){
  return{
    searchParam:{
      platformName:'', //资源名称
      area:'', //账号
      logisticsMode:'', //站点
      // logisticsDays:0, //开始时间
      // createUser:0, //结束时间
      // createTime:'', //汇款银行
      // updateBy:0, //结束时间
      // updateTime:'', //汇款银行
    },
    activeName:'N',//页面资源 -- N是api资源
    name:'',
    code:'',
    tableLoading:false,
    dataList:[],
    page: 1, //当前页面
    pageSize: 10, // 当前页数
    totalRows: 0, // 总条数
    companyId:'',
    isShowDataAddEdit:false,
  }
},
  created(){
    this.getData()
  },
  methods:{
    //获取表格数据源
    addData(){
      this.isShowDataAddEdit = true
    },

    editData(id){
        // console.log('传入的id :>> ', id);
        this.dataId = id
        this.isShowDataAddEdit = true
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
          let http = new LogisticsDayApi();
          http
            .delete({ id })
            .then((res) => {
              this.$message({ type: "success", message: "删除成功!" });
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
    closeDataAddEdit(){
        this.isShowDataAddEdit = false
        this.dataId = ''
        this.getData()
      },

    getData(){
      let http = new LogisticsDayApi()
      this.tableLoading = true
      let data = {
        id:this.searchParam.id,
        area:this.searchParam.area,
        platformName:this.searchParam.platformName,
        logisticsMode:this.searchParam.logisticsMode,
        // logisticsDays:this.searchParam.logisticsDays,
        // createUser:this.searchParam.createUser,
        // createTime:this.searchParam.createTime,
        pageSize:this.pageSize,
        page:this.page,
      }
      http.queryList(data).then(res => {
        this.dataList = res.data.rows
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.totalRows = res.data.totalRows
        this.tableLoading = false
      })
    },
    // 当前页码修改时
    handleCurrentChange(page){
      this.page = page
      this.getData()
    },
    // 当前页数修改时
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.getData()
    },

    searchList() {
      this.page = 1
      this.getData()
    },
    //清空搜索
    clearList() {


      this.searchParam.id='', //应用id
      this.searchParam.platformName='', //资源名称
      this.searchParam.area='', //账号
      this.searchParam.logisticsMode='', //站点
      this.searchParam.logisticsDays=0, //开始时间
      this.searchParam.createUser=0, //结束时间
      this.searchParam.createTime='', //汇款银行
      this.searchParam.updateBy=0, //结束时间
      this.searchParam.updateTime='', //汇款银行
      this.getData()
    },
    //切换tab标签
    handleClick(val){
      this.clearList()
      this.page = 1
      this.getData()
    },

}
}
</script>

<style lang="scss" scoped>
.home-img{
  width: 100%;
  height: 100%;
  background: #fff;
  padding-top: 200px;
  img{
    display: block;
    margin: 0px auto;
  }
}
</style>
