<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <div ref="TopAssembly">

      <el-card>
        <div style="float:right">

          <el-alert style="display: inline;margin-right: 5px;" title="日常审批倒计时" type="warning" :closable="false">
          </el-alert>
          <TimeCon :itemTime="mytime"></TimeCon>
          <el-alert style="display: inline;margin-left: 5px;" title="超时默认【通过】" type="warning" :closable="false">
          </el-alert>
        </div>
        <el-form :inline="true" :model="query" ref="queryMat" size="small">
          <el-row>
            <el-form-item>
              <el-input placeholder="物料编码" v-model="query.matSPUCode" clearable>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="请输入事业部" v-model="query.matSPUCode" clearable></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入Team" v-model="query.matSPUCode" clearable></el-input>
            </el-form-item>
            <el-form-item style="margin-left:12px ">
              <button class='bttn-fill bttn-md bttn-primary'>
                <svg-icon icon-class="search" />&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</button>
            </el-form-item>
          </el-row>
        </el-form>

      </el-card>

    </div>
    <div style="margin-top:10px">
      <el-card>
        <el-table border :data="dataList" :height="tableHeight" ref="multipleTable" size="mini">
          <el-table-column label="物料编码" width="120" prop="matcode" align="center"
            :filters="[{text: 'ATC210398', value: 'ATC210398'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="运营大类" width="150" prop="matOperateCate" align="center"
            :filters="[{text: '平板电脑保护套', value: '平板电脑保护套'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="组合属性" prop="matGroup" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="首单日期" width="120" prop="firstDate" align="center">
          </el-table-column>
          <el-table-column label="事业部" width="120" prop="department" align="center"
            :filters="[{text: '事业一部', value: '事业一部'},{text: '事业二部', value: '事业二部'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="Team" width="120" prop="Team" align="center"
            :filters="[{text: 'Team1', value: 'Team1'},{text: 'Team4', value: 'Team4'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="申请合计" width="120" prop="number" align="center">
          </el-table-column>
          <el-table-column label="期望交期" prop="deliverydate" header-align="center" width="100px">
            <template slot-scope="scope">
              <span>{{scope.row.deliverydate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80" align="center">
            <template slot-scope="scope">
              <button class='bttn-stretch bttn-md bttn-primary' @click="Approval(scope.row,scope.$index)">审批</button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页"
          :total="totalRows">
        </el-pagination>
      </el-card>
    </div>
    <DailyApprovalPlannDep ref="DailyApprovalPlannDep"></DailyApprovalPlannDep>
  </div>
</template>


<script>
  import DailyApprovalPlannDep from './components/DailyApprovalPlannDep.vue'
  import TimeCon from "./components/timeCon.vue";
  export default {
    components: {
      DailyApprovalPlannDep,
      TimeCon
    },
    data() {
      return {
        mytime: "",
        query: {},
        tableHeight: null,
        dataList: [{
            id: 1,
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            firstDate: "2020-01-01",
            department: "事业一部",
            Team: 'Team1',
            number: 500,
            deliverydate: "2021-07-29"

          },
          {
            id: 2,
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            firstDate: "2020-01-01",
            department: "事业二部",
            Team: 'Team4',
            number: 300,
            deliverydate: "2021-07-29"

          },
          {
            id: 3,
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            firstDate: "2020-01-01",
            department: "事业三部",
            Team: 'Team6',
            number: 200,
            deliverydate: "2021-07-29"

          },
        ],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-28",
          endTime: "2021-06-28",
          describe: "第一版；7.29增加期望交期需求",
        },
      }
    },
    methods: {
      setOverTime() {
        var myDate = new Date();
        //2021-06-11 23:59:59
        var month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`
        var date = myDate.getDate() >= 10 ? myDate.getDate() : `0${myDate.getDate()}`
        var OverData = `${myDate.getFullYear()}-${month}-${date} 18:00:00`
        return OverData
      },
      Approval(row, index) {
        this.$refs.DailyApprovalPlannDep.initData()
      },
      calcuTableHeight() {
        this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 200) +
          "px"; //其中200是除头部组件和表格之外的高度
        window.onresize = () => {
          return (() => {
            this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 200) + "px";
          })();
        }
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      // 当前页码修改时
      handleCurrentChange(page) {
        this.page = page
        this.getData()
      },
      // 当前页数修改时
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.getData()
      },
    },
    created() {
      this.mytime = this.setOverTime()

    },
    mounted() {
      this.calcuTableHeight()
    }

  }
</script>

<style>

</style>