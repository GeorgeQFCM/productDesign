template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
            <el-form-item>
              <label slot="label">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号!!!:</label>
              <el-input v-model="searchData.shopname" ></el-input>
            </el-form-item>
            <el-form-item>
              <label slot="label">站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</label>
              <el-input v-model="searchData.site"  suffix-icon="el-icon-location-outline"></el-input>
            </el-form-item>
            <el-form-item label="开始时间:">
              <el-date-picker v-model="searchData.startdate" placeholder="选择时间" type="datetime" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker v-model="searchData.enddate" placeholder="选择时间" type="datetime"  value-format="yyyy-MM-dd HH:mm:ss" default-time="23:59:59"></el-date-picker>
            </el-form-item>
          </el-form>
          <el-form inline>
            <el-form-item>
              <label slot="label">币&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;种:</label>
              <el-input v-model="searchData.currency"></el-input>
            </el-form-item>
            <el-form-item>
              <label slot="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</label>
              <el-select v-model="searchData.status" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="无数据" value="0"></el-option>
                <el-option label="Data Range数据" value="1"></el-option>
                <el-option label="Settlement数据" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="解析状态:">
              <el-select v-model="searchData.handlestatus" placeholder="请选择解析状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="解析完成" value="1"></el-option>
                <el-option label="解析失败" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单据类型:">
              <el-select v-model="searchData.tasktype" placeholder="请选择单据类型">
                <el-option label="全部" value=""></el-option>
                <el-option label="Standard" value="Standard"></el-option>
                <el-option label="COD" value="COD"></el-option>
                <el-option label="LLC" value="LLC"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-left:94px ">
              <el-button type="primary" @click="searchList">搜索</el-button>
              <el-button type="warning" @click="clearList">清空搜索</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      </el-card>
      <el-card style="margin-top: 10px">
        <div style="margin-bottom: 10px">
          <el-button type="primary" size="medium" @click="abnormalAdd">初始新增</el-button>
          <el-button type="warning" size="medium" @click="abnormalDeal">异常处理</el-button>
        </div>
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table" ref="multipleTable"  @selection-change="handleSelectionChange"
       :row-class-name="tableRowClassName">
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <el-table-column label="平台" prop="platname" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="账号" prop="shopname" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="站点" prop="site" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="单据类型" prop="tasktype" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="开始时间"  prop="startdate" align="center" :formatter="dateFormatter" show-overflow-tooltip></el-table-column>
        <el-table-column label="结束时间"  prop="enddate" align="center" :formatter="dateFormatter" show-overflow-tooltip></el-table-column>
        <el-table-column label="汇款日期" prop="depositdate" align="center" :formatter="dateFormatter" show-overflow-tooltip></el-table-column>
        <el-table-column label="币种" prop="currency" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="data range路径" prop="fileuploadpath" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="数据状态" prop="status" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="解析状态" prop="handlestatus" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="失败原因" prop="remark" align="center" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
        style="text-align: right; margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 15, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        prev-text="上一页"
        next-text="下一页"
        :total="total">
      </el-pagination>
    </el-card>
  <abnormal-addEdit v-if="isShowAddEdit" @getData="getData"
                      :userId="userId"
  @close="closeAddEdit"></abnormal-addEdit>
  <abnormal-deal v-if="isShowDeal" @getData="getData"
                      :userId="userId" :multipleSelection="multipleSelection" :shopcode="shopcode"
  @close="closeDeal"></abnormal-deal>
  </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
<script>
import { mapGetters } from 'vuex'

import CompanyManageApi from '@/api/orgBuild/CompanyManageApi';
export default {
  name: 'home',
  components:{
      AbnormalAddEdit: resolve => require(['./components/abnormal_addEdit'], resolve),
      AbnormalDeal: resolve => require(['./components/abnormal_deal'], resolve),
  },
  data(){
    return{
      searchData:{
        appId:'', //应用id
        resourceName:'', //任务名称
        shopname:'', //账号
        site:'', //站点
        startdate:'', //开始时间
        enddate:'', //结束时间
        currency:'', //汇款银行
        status:'', //审核状态
        handlestatus:'', //解析状态
        tasktype:'' //单据状态
      },
      userId:'',
      isShowDeal:false,
      isShowAddEdit:false,
      isLoading:false,
      activeName:'N',//页面资源 -- N是api资源
      name:'',
      dwdailytaskname:'',
      code:'',
      tableLoading:false,
      dataList:[],
      page: 1, //当前页面
      pageSize: 10, // 当前页数
      totalRows: 0, // 总条数
      companyId:'',
      isShowCompanyAddEdit:false,
      isShowCompanyDetail:false,
      isShowConfigApp:false,
      current: 1, //当前页面
      total: 0, // 总条数
      multipleSelection: [

      ],
      ids:'',
      shopcode:''
    }
  },
  created(){
    this.getData()
  },
  methods:{
      tableRowClassName({row, rowIndex}) {
        var nowdate = new Date()
        var edate = new Date(row.enddate)

        var dateSpan = nowdate-edate;
        var iDays = Math.floor(dateSpan / (24 * 3600 * 1000));

        if (iDays >=30 && row.status=="无数据") {
          return 'warning-row';
        }
        return '';
      },
    //获取表格数据源
    getData(){
      let http = new CompanyManageApi()
      this.tableLoading = true
      let data = {
        dwdailytaskname:this.searchData.resourceName,
        code:this.code,
        shopname:this.searchData.shopname,
        site:this.searchData.site,
        startdate:this.searchData.startdate,
        enddate:this.searchData.enddate,
        currency:this.searchData.currency,
        status:this.searchData.status,
        handlestatus:this.searchData.handlestatus,
        tasktype:this.searchData.tasktype,
        pageSize:this.pageSize,
        page:this.current,
      }
      http.queryAbnormalList(data).then(res => {
        this.dataList = res.data.rows
        this.page = res.data.page
        this.pageSize = res.data.pageSize
        this.total = res.data.totalRows
        this.tableLoading = false
      })
    },
    // 当前页码修改时
    handleCurrentChange(pageNo) {
      this.current = pageNo
      this.getData()
    },
    handleSelectionChange(val){
      var that = this
      this.multipleSelection = val
      if(this.multipleSelection.length==1){
            this.shopcode=val[0].shopcode
      }
      if(this.multipleSelection.length !=0 && val[this.multipleSelection.length-1].shopcode!=this.shopcode ){
            this.$refs.multipleTable.toggleRowSelection(val[this.multipleSelection.length-1]);
      }
      if(this.multipleSelection.length !=0  && val[this.multipleSelection.length-1].status!="无数据"){
            this.$refs.multipleTable.toggleRowSelection(val[this.multipleSelection.length-1]);
      }
      this.multipleSelection.forEach(function (item) {
        that.ids= that.ids + item.id+",";
        console.log(that.ids)
    });
    },
    // 当前页数修改时
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getData()
    },
    //搜索
    searchList() {
      this.current = 1
      this.getData()
    },
    //清空搜索
    clearList() {
      this.searchData.appId = ''
      this.searchData.shopname = ''
      this.searchData.site = ''
      this.searchData.startdate = ''
      this.searchData.enddate = ''
      this.searchData.currency = ''
      this.searchData.status = ''
      this.searchData.handlestatus = ''
      this.searchData.tasktype=''
      this.getData()
    },

    dateFormatter (row, column) {
      let datetime = row[column.property];
      if(datetime){
        datetime = new Date(datetime);
        let y = datetime.getFullYear() + '-';
        let mon = datetime.getMonth()+1 + '-';
        let d = datetime.getDate();
        return y + mon + d;
      }
      return ''
    },

    //切换tab标签
    handleClick(val){
      this.clearList()
      this.current = 1
      this.getData()
    },
    //关闭人员新增弹窗
    closeAddEdit(){
        this.userId = ''
        this.isShowAddEdit = false
    },
    closeDeal(){
        this.userId = ''
        this.isShowDeal = false
    },
    abnormalAdd(){
      this.isShowAddEdit = true
    },

    abnormalDeal(){
      if(this.multipleSelection.length !=0)
      {
        this.isShowDeal = true
      }
      else{
        this.$message.warning('请勾选记录上传！')
      }

    }
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

