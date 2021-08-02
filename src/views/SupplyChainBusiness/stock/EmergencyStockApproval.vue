<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form :inline="true" :model="query" ref="queryMat" size="small">
            <el-row>
              <el-form-item>
                <el-input placeholder="物料编码" v-model="query.matSPUCode" clearable>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-autocomplete class="inline-input" style="width:1100px" v-model="state1"
                  :fetch-suggestions="querySearch" placeholder="请输入物料属性" @select="handleSelect"></el-autocomplete>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <el-input placeholder="请输入平台/区域" v-model="query.matSPUCode" clearable></el-input>
              </el-form-item>
              <el-form-item>
                <el-input placeholder="请输入事业部/Team" v-model="query.matSPUCode" clearable></el-input>
              </el-form-item>
              <el-form-item style="margin-left:12px ">
                <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
                <el-button type="warning" @click="clearList">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>

        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 10px">
      <el-steps :active="active" direction="horizontal" process-status="finish" finish-status="success"
        :align-center="true" :space="100" style="margin-top: 0px;cursor: pointer;">
        <el-step title="事业部审批" @click.native="CurryStep(0)"></el-step>
        <el-step title="计划部审批" @click.native="CurryStep(1)"></el-step>
      </el-steps>
      <div style="margin: 10px 0px">
        <el-popconfirm title="确定审批通过么?">
          <el-button type="success" size="medium" slot="reference">通过</el-button>
        </el-popconfirm>
        <el-button type="warning" style="margin-left:10px" size="medium" @click="reject('不通过')">不通过</el-button>
        <el-button v-if="active==0" type="danger" style="margin-left:10px" size="medium" @click="reject('驳回')">驳回
        </el-button>
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" @select="checkChange" @select-all="selectAll" stripe
        class="resource-table" :span-method="ObjectSpanMethod" height="500" ref="multipleTable">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="申请类型" sortable width="100" prop="applyType" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="物料编码" sortable width="100" prop="matcode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="物料属性" sortable width="300" prop="MaterialProperties" align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="事业部-Team" width="130" prop="BusinessTeam" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="ShowBusiness(scope.row)">{{scope.row.BusinessTeam}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="平台-区域" width="130" prop="PlatformArea" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请数量" width="80" prop="ApplyNumber" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="合计" width="80" prop="AllApplyNumber" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.AllApplyNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请日期" width="100" prop="ApplyDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="运输方式" width="90" prop="transporttype" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请说明" align="center" prop="ApplyReason" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="事业部审批日期" v-if="active==1||active==2" align="center" prop="BusinessTime">
        </el-table-column>
        <el-table-column label="事业部审批人" v-if="active==1||active==2" align="center" prop="BusinessPerson">
        </el-table-column>
        <el-table-column label="计划部审批日期" v-if="active==2" align="center" prop="PlaneTime">
        </el-table-column>
        <el-table-column label="计划部审批人" v-if="active==2" align="center" prop="PlanePerson">
        </el-table-column>
        <el-table-column label="审批记录" align="center" width="70">
          <template slot-scope="scope">
            <el-button type="text" title="查看审批记录" icon="el-icon-view" @click="WatchExamine(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <InventoryQuantityBuess ref="InventoryQuantityBuess"></InventoryQuantityBuess>
  </div>
</template>

<script>
  import ExamineCompont from './components/ExamineCompont.vue'
  import InventoryQuantityBuess from './components/InventoryQuantityBuess.vue'
  export default {
    components: {
      ExamineCompont,
      InventoryQuantityBuess
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-11",
          endTime: "2021-06-12",
          describe: "第一版",
        },
        active: 0,
        restaurants: [],
        state1: '',
        matTableData: [{
          mainMateral: "塑料",
          matPattern: "无",
          comBrand: "中性",
          matBrand: "猫/狗",
          matModel: "XOOM 2 Droid XYBoard 8.2英寸",
          matColor: "黑色",
          matSize: "无",
          matPackQty: "(5pack+5pack)",
          matCompatibleModel: "Galaxy Tab A7 Lite 8.7",
          matVersonDesc: "标准版",
          matFestLabel: "端午节",
          matSeasonLabel: "夏季",
          MOQ: "132321",
          SPU: "132321",
          NBDU: "132321",
          useStock: "132321",
          stockCry: "132321",
          purchaseNum: "132321",
          AmaStockNum: "132321",
          preNum: "132321",
          preSendNum: "132321",
          AmaComeNum: "132321",
          yumComeNum: "132321",
          kaComeNum: "132321",
          haiwaiNum: "132321",
          AmaStockDateNum: "132321",
          stackDateNum: "132321",
          firstDate: "132321",
          amaSellNum: "132321",
          treeSellNum: "132321",
          foueSellNum: "132321",
          sevenSellNum: "132321",
          sellDateNum: "132321",
          curPre: "132321",
          yeCurPre: "132321",
          daliySell: "132321",
        }],
        hasSearch: true,
        activeNames: [],
        query: {},
        explainVisible: false,
        recommendLogVisble: false,
        searchData: {
          id: '', //应用id
          platform_name: '', //资源名称
          area: '', //账号
          logistics_mode: '', //站点
          logistics_days: '', //开始时间
          create_by: '', //结束时间
          create_at: '', //汇款银行
          update_by: '', //结束时间
          update_at: '', //汇款银行
        },
        haichecked: false,
        kongchecked: false,
        activeName: 'N', //页面资源 -- N是api资源
        name: '',
        code: '',
        tableLoading: false,
        dataList: [{
            id: 1,
            applyType: "项目备货",
            matcode: "P03K2J01",
            MaterialProperties: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
            PlatformArea: "Amazon-EU",
            BusinessTeam: "事业一部-Team1",
            ApplyNumber: "100",
            AllApplyNumber: "600",
            ApplyDate: "2021-06-11",
            transporttype: "空运",
            ApplyReason: "这是一段申请说明...",
            BusinessTime: "2021-06-12",
            BusinessPerson: "彭利莲",
            PlaneTime: "2021-06-13",
            PlanePerson: "于伟",
          },
          {
            id: 2,
            applyType: "项目备货",
            matcode: "P03K2J01",
            MaterialProperties: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
            PlatformArea: "Amazon-NA",
            BusinessTeam: "事业一部-Team1",
            ApplyNumber: "200",
            AllApplyNumber: "600",
            ApplyDate: "2021-06-11",
            transporttype: "空运",
            ApplyReason: "这是一段申请说明...",
            BusinessTime: "2021-06-12",
            BusinessPerson: "彭利莲",
            PlaneTime: "2021-06-13",
            PlanePerson: "于伟",
          },
          {
            id: 3,
            applyType: "项目备货",
            matcode: "P03K2J01",
            MaterialProperties: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
            PlatformArea: "Amazon-IN",
            BusinessTeam: "事业一部-Team1",
            ApplyNumber: "300",
            AllApplyNumber: "600",
            ApplyDate: "2021-06-11",
            transporttype: "空运",
            ApplyReason: "这是一段申请说明...",
            BusinessTime: "2021-06-12",
            BusinessPerson: "彭利莲",
            PlaneTime: "2021-06-13",
            PlanePerson: "于伟",
          },
        ],
        tableList: [],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: '',
        multipleSelection: [],
        isShowCompanyAddEdit: false,
        isShowCompanyDetail: false,
        isShowConfigApp: false,
        recommendInfo: Object,
      }
    },
    created() {
      this.restaurants = this.loadAll();
    },
    methods: {
      CurryStep(val) {
        this.active = val
        console.log(this.active);
      },
      ShowBusiness(row) {
        this.$nextTick(() => {
          this.$refs.InventoryQuantityBuess.initData()
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        console.log(results);
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [{
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+砂粉色-> -->(2pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->宝石绿色+砂粉色-> -->(2pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->MoKo->苹果->Airtags 2021->砂粉色+宝石绿色+新紫色-> -->(3pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->MoKo->苹果->Airtags 2021->2020蓝色+梅子色+暗绿色-> -->(3pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->TiMOVO->苹果->Airtags 2021->暗绿色+春浅兰-> -->(2pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->TiMOVO->苹果->Airtags 2021->宝石绿色+砂粉色-> -->(2pack)->Airtags 2021->V1",
          },
          {
            "value": "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->宝石绿色+砂粉色-> -->(2pack)->Airtags 2021->V1",
          },
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      WatchExamine() {
        const id = this.$layer.iframe({
          title: "查看审批意见",
          // area: 'auto',
          area: ["50vw", "50vh"],
          content: {
            content: ExamineCompont, //组件         
            parent: this, //vue实例 传入实例 弹窗组件内才能获取laydata
            data: {
              info: [{
                  sysAuditID: 1,
                  sysAuditCreateDate: '2021-06-11',
                  sysAuditPerName: '王美艳',
                  sysAuditContent: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                },
                {
                  sysAuditID: 2,
                  sysAuditCreateDate: '2021-06-11',
                  sysAuditPerName: '于伟',
                  sysAuditContent: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                }
              ],

            }
          },
          canmove: true, //true可以拖动 false不能拖动
          shade: false,
          resize: true, //是否允许拉伸，默认是不允许
          scrollbar: true, //是否允许浏览器出现滚动条:默认是允许
          maxmin: true, //开启最大化最小化
          tipsMore: false, //是否允许多个tips
          //弹窗成功 id弹窗的id
          success: (id) => {},
          //弹窗关闭/取消
          end: () => {},
          //弹窗关闭/取消之前，id弹窗的id close关闭弹窗, return false阻止关闭  return true不阻止
          // beforeClose:(id,close)=>{
          //   setTimeout(()=>{
          //      close(id)
          //    },2000)
          //    return false
          //  },
          //还原状态回调 id弹窗的id state：1 是由最小化还原 2是由最大化还原
          maxminiCallback: (id, state) => {},
          //最小化回调 id弹窗的id
          miniCallback: (id) => {},
          //最大化回调 id弹窗的id
          maxCallback: (id) => {},
        });
      },
      reject(val) {
        this.$prompt(`请输入${val}原因`, `${val}`, {
          inputType: "textarea",
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({
          value
        }) => {
          this.$message({
            type: 'success',
            message: `你的${val}原因是: ` + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });


      },
      checkChange(selection, row) {
        selection.forEach(e => {
          this.dataList.forEach(x => {
            if (x.id === e.id) {
              this.$set(x, "prePurchase", x.recommendStockNum)
            }
          });
        });
      },
      selectAll(selection) {
        this.dataList.forEach(v => {
          this.$set(v, "prePurchase", !!selection.length ? v.recommendStockNum : "")
        })
        console.log(selection, "selection");
      },
      handleChange(val) {
        this.hasSearch = !val.length
        console.log(val, "val");
      },
      showRecomendLog(row) {
        console.log(row, "row");
        this.recommendInfo = row
        this.recommendLogVisble = true
      },
      showExplain(row) {
        this.explainVisible = true
      },
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      //获取表格数据源
      getData() {
        let http = new StockRecommendationApi()
        this.tableLoading = true
        let data = {
          name: this.searchData.platform_name,
          code: this.code,
          area: this.searchData.area,
          logistics_mode: this.searchData.logistics_mode,
          logistics_days: this.searchData.logistics_days,
          create_by: this.searchData.create_by,
          handlestatus: this.searchData.handlestatus,
          create_at: this.searchData.create_at,
          tasktype: this.searchData.tasktype,
          pageSize: this.pageSize,
          page: this.page,
          auditstatus: 1
        }
      },
      save(row) {
        alert(row.auditnumber)
        let http = new StockRecommendationApi()
        this.tableLoading = true
        let data = {
          id: row.id,
          auditnumber: row.auditnumber
        }
        const loading = this.$loading({
          lock: true,
          text: '请耐心等待.....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        http.save(data).then(res => {
          loading.close()
          if (res.code === 200) {
            this.$message.success('保存成功!')
            loading.close()
          } else {
            this.$message.error('保存失败!')
            loading.close()
          }
        }).catch(e => {
          loading.close()
        })
      },
      FilterData() {
        let spanOneArr = [];
        let concatOne = 0;
        this.dataList.forEach((item, index) => {
          if (index == 0) {
            spanOneArr.push(1)
          } else {
            if (
              item.applyType === this.dataList[index - 1].applyType &&
              item.matcode === this.dataList[index - 1].matcode &&
              item.BusinessTeam === this.dataList[index - 1].BusinessTeam) {
              spanOneArr[concatOne] += 1
              spanOneArr.push(0)
            } else {
              spanOneArr.push(1)
              concatOne = index
            }
          }
        })
        return {
          one: spanOneArr,
        }
      },
      ObjectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex == 3 || columnIndex == 4 ||
          columnIndex == 7 || columnIndex == 8 || columnIndex == 9 || columnIndex == 10 || columnIndex == 11 ||
          columnIndex == 12 || columnIndex == 13) {
          const _row = (this.FilterData(this.dataList).one)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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
      CheckedKongChange(val) {
        this.dataList.forEach(v => {
          if (v.transporttype == '空运') {
            this.$set(v, "prePurchase", val ? v.recommendStockNum : "")
            this.$refs.multipleTable.toggleRowSelection(v, val);
          }
        })
      },
      CheckedHaiChange(val) {
        this.dataList.forEach(v => {
          if (v.transporttype == '海运') {
            this.$set(v, "prePurchase", val ? v.recommendStockNum : "")
            this.$refs.multipleTable.toggleRowSelection(v, val);
          }
        })
      },
      searchList() {
        this.page = 1
        if (this.query.notZero) {
          this.dataList = this.tableList.filter(x => x.recommendStockNum)
        } else {
          this.dataList = Object.assign(this.tableList)
        }
        this.getData()
      },
      //清空搜索
      clearList() {
        this.searchData.id = ''
        this.searchData.platform_name = ''
        this.searchData.area = ''
        this.searchData.logistics_mode = ''
        this.searchData.logistics_days = ''
        this.searchData.create_by = ''
        this.searchData.create_at = ''
        this.searchData.tasktype = ''
        this.getData()
      },
      //切换tab标签
      handleClick(val) {
        this.clearList()
        this.page = 1
        this.getData()
      },
      stateFormat(row, column, cellValue) {
        cellValue += '';
        if (!cellValue.includes('.')) cellValue += '.';
        return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ',';
        }).replace(/\.$/, '');
      },
    },
    mounted() {
      this.tableList = Object.assign(this.dataList)
      console.log(this.$store.getters, "getterss");
    }
  }
</script>

<style lang="scss">
  .el-step.is-horizontal {
    display: inline-block;
  }

  .popverClass {
    background-color: rgb(12, 12, 12) !important;
    color: #fff !important;

    .el-popper[x-placement^=top] .popper__arrow::after {
      border-top-color: #000 !important;

    }
  }
</style>

<style lang="scss" scoped>
  .resource-table {
    transition: all .5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }

  .title-right-box {
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: 5em;
  }

  .even-box {
    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 35px;
    padding: 0 5px;
    margin-right: 5px;
  }

  .team-box {
    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 35px;
    padding: 0 5px;
    margin-right: 5px;
  }

  .recommend-box {

    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 35px;
    padding: 0 5px;
  }

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

  >>>.el-input__inner {
    height: 30px;
  }

  .recomend-box {
    display: flex;
    justify-content: space-around;
    font-size: 16px;
  }

  .split {
    position: absolute;
    left: 50%;
    width: 2px;
    bottom: 0;
    height: 100%;
    border-right: 2px solid rgba($color: #499ddb, $alpha: 1);
    background-color: #499ddb;
  }

  .recomend-box ul {
    list-style-type: none;
    padding: 0 1.5em;

    li span {
      border-bottom: 2px solid rgba($color: #499ddb, $alpha: 1);
      padding-bottom: 2px;
      overflow-wrap: break-word;
    }
  }

  .mat-box {
    border-bottom: 1px solid #499ddb;
  }

  .mat-contain {
    display: flex;
    justify-content: space-around;
    overflow-wrap: break-word;

    ul {
      list-style-type: none;
      padding: 0;
    }
  }

  table {
    width: 100%;
    empty-cells: hide;
  }

  table tr {
    font-size: 14px;
    width: 100%;
    empty-cells: hide;
  }

  tr td:nth-child(even) {
    width: 15%;
    text-align: center;
  }

  tr td:nth-child(odd) {
    width: 10%;
    text-align: center;
  }

  .info-box tr td:nth-child(odd) {
    color: #499ddb;
    font-weight: bold;
  }
</style>