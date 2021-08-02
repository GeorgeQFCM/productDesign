<template>
  <div>
    <div ref="TopAssembly">
      <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
      <el-card>
        <el-row :gutter="10">
          <el-col :span="23">
            <el-steps :active="active" direction="horizontal" process-status="finish" finish-status="success"
              :align-center="true" :space="280" style="margin-top: 0px;cursor: pointer;">
              <el-step title="运营申请" @click.native="CurryStep(0)">
                <template slot="description">
                  <TimeCon :itemTime="mytime"></TimeCon>
                  <el-alert style="display: block;margin-top: 5px;" title="超时默认【不备货】" type="warning" :closable="false">
                  </el-alert>

                </template>
              </el-step>
              <el-step title="产品线负责人审核" @click.native="CurryStep(1)">
                <template slot="description">
                  <TimeCon :itemTime="mytime2"></TimeCon>
                  <el-alert style="display: block;margin-top: 5px;" title="超时默认【不备货】" type="warning" :closable="false">
                  </el-alert>
                </template>
              </el-step>
              <el-step title="Team审核" @click.native="CurryStep(2)">
                <template slot="description">
                  <TimeCon :itemTime="mytime3"></TimeCon>
                  <el-alert style="display: block;margin-top: 5px;" title="超时默认【不备货】" type="warning" :closable="false">
                  </el-alert>
                </template>
              </el-step>
              <el-step title="事业部审核" @click.native="CurryStep(3)">
                <template slot="description">
                  <TimeCon :itemTime="mytime4"></TimeCon>
                  <el-alert style="display: block;margin-top: 5px;" title="超时默认【不备货】" type="warning" :closable="false">
                  </el-alert>
                </template>
              </el-step>
            </el-steps>
          </el-col>
          <el-col :span="1">
            <div class="title-right-box">
              <div class="even-box">事业部: 事业一部</div>
              <div class="recommend-box">{{`推荐日期: ${parseTime(new Date()) }`}}</div>
            </div>
          </el-col>

        </el-row>
      </el-card>
    </div>

    <el-card style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" size="small" v-if="active==0">保存</el-button>
        <el-button type="success" size="small">提交</el-button>
        <el-button style="float:right" type="warning" size="small">下载</el-button>
      </div>
      <div v-if="active==0">
        <el-table border :data="dataList" v-loading="tableLoading" @select="checkChange" @select-all="selectAll"
          :height="tableHeight" ref="multipleTable" size="mini">
          <el-table-column type="selection" width="55" fixed="left"> </el-table-column>
          <el-table-column label="物料编码" width="120" prop="matcode" align="center" show-overflow-tooltip
            :filters="[{text: 'ATC210398', value: 'ATC210398'}]" :filter-method="filterHandler">
            <template slot-scope="scope">
              <el-button type="text" @click.stop="showExplain(scope.row)">{{scope.row.matcode}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="运营大类" width="150" prop="matOperateCate" align="center" show-overflow-tooltip
            :filters="[{text: '平板电脑保护套', value: '平板电脑保护套'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="组合属性" width="150" prop="matGroup" align="center" show-overflow-tooltip
            :filters="[{text: '组合属性', value: '组合属性'}]" :filter-method="filterHandler">
          </el-table-column>
          <el-table-column label="首单日期" width="120" prop="firstDate" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="Team" width="120" prop="Team" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="平台" width="90" prop="plat" align="center" show-overflow-tooltip
            :filters="[{text: 'Amazon', value: 'Amazon'}]" :filter-method="filterHandler"></el-table-column>
          <el-table-column label="区域" width="90" prop="area" align="center" show-overflow-tooltip
            :filters="[{text: 'EU', value: 'EU'},{text: 'UK', value: 'UK'},{text: 'CA', value: 'CA'}]"
            :filter-method="filterHandler"></el-table-column>
          <el-table-column label="7、14、30天销量" width="130" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{scope.row.sevenSales}}，</span>
              <span>{{scope.row.forteenSales}}，</span>
              <span>{{scope.row.thirtySales}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Amazon店铺即时库存总数" width="100" prop="amazonALLNum" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="国内仓已调拨未发货数量" width="100" prop="notFaNum" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="海外仓库存数量" width="130" prop="seaStockNum" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="海外仓在途数量" width="120" prop="onWayNum" align="center" show-overflow-tooltip>
          </el-table-column>

          <el-table-column label="推荐运输方式" width="100" prop="transporttype" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="推荐备货数量" width="110" prop="recommendStockNum" align="center" show-overflow-tooltip>
            <template slot="header">
              <div>
                <span>推荐备货数量</span>
                <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                  <el-input v-model="ApplyNumberQuery1" style="width:150px"></el-input>
                  <span>至</span>
                  <el-input v-model="ApplyNumberQuery2" style="width:150px"></el-input>
                  <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                    style=" background-color: #e9f1f6;padding: 0;">
                  </el-button>
                </el-popover>
              </div>
            </template>
            <template slot-scope="scope">
              <el-button type="text" @click="showRecomendInfo">
                {{scope.row.recommendStockNum}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="申请备货数量" width="100" align="center" fixed="right">
            <template slot-scope="scope">
              <el-input v-model="scope.row.applyNum"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="申请备货原因" align="center" width="130" fixed="right">
            <template slot-scope="scope">
              <el-select v-model="scope.row.reason" clearable="">
                <el-option label="原因A" value="原因A"></el-option>
                <el-option label="原因B" value="原因B"></el-option>
                <el-option label="原因C" value="原因C"></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]"
          :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页"
          :total="totalRows">
        </el-pagination>
      </div>
      <NodeApproval ref="NodeApproval" v-else :tableHeight="tableHeight" :active="active"></NodeApproval>
    </el-card>


    <MaterialInfo ref="MaterialInfo"></MaterialInfo>
    <RecommendInfo ref="RecommendInfo"></RecommendInfo>


  </div>
</template>

<script>
  import {
    parseTime
  } from '@/utils/index'
  import MaterialInfo from './components/materialInfo.vue'
  import RecommendInfo from './components/RecommendInfo.vue'
  import TimeCon from "./components/timeCon.vue";
  import NodeApproval from './components/NodeApproval.vue'
  export default {
    components: {
      TimeCon,
      MaterialInfo,
      RecommendInfo,
      NodeApproval,
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-25",
          endTime: "2021-06-29",
          describe: "第四版;7.29增加期望交期需求",
        },
        active: 0,
        message: 1212132,
        tableHeight: this.tableHeight,
        ApplyNumberQuery1: "",
        ApplyNumberQuery2: "",
        mytime: "",
        mytime2: "",
        mytime3: "",
        mytime4: "",
        OptOperateCate: [],
        OptMatProName: [],
        OptMatStyle: [],
        OptMatMainMaterial: [],
        OptMatPattern: [],
        OptMatComBrand: [],
        OptMatBrand: [],
        OptMatModel: [],
        OptMatColor: [],
        OptMatSize: [],
        OptMatPackQty: [],
        OptMatCompatibleModel: [],
        OptMatVerson: [],
        matSPUCode: "",
        matTableData: [{
          Asin: "B0953B6SSL",
          matcode: "ATC210398",
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
          Team: 'Team1',
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
            matcode: "ATC210398",
            plat: "Amazon",
            department: "事业一部",
            team: "Team1",
            area: "EU",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            matStyle: "电压款-三折半透",
            firstDate: "2020-01-01",
            Team: 'Team1',
            notFaNum: 100,
            amazonALLNum: 500,
            onWayNum: 300,
            seaStockNum: 500,
            sevenSales: 50,
            forteenSales: 100,
            thirtySales: 200,
            transporttype: "空运",
            recommendStockNum: 500,
            applyNum: 500,
            isCheck: false,
            reason: ""
          },
          {
            id: 2,
            matcode: "ATC210398",
            plat: "Amazon",
            department: "事业一部",
            team: "Team1",
            area: "UK",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            matStyle: "电压款-三折半透",
            firstDate: "2020-01-01",
            Team: 'Team1',
            notFaNum: 100,
            amazonALLNum: 500,
            onWayNum: 300,
            seaStockNum: 500,
            sevenSales: 50,
            forteenSales: 100,
            thirtySales: 200,
            transporttype: "空运",
            recommendStockNum: 500,
            applyNum: 500,
            isCheck: false,
            reason: ""
          },
          {
            id: 3,
            matcode: "ATC210398",
            plat: "Amazon",
            department: "事业一部",
            team: "Team1",
            area: "CA",
            matOperateCate: "平板电脑保护套",
            matGroup: "平板皮套PC电压款-三折半透无亚马逊Fire HD 10 & 10 Plus 2021",
            matStyle: "电压款-三折半透",
            firstDate: "2020-01-01",
            Team: 'Team1',
            notFaNum: 100,
            amazonALLNum: 500,
            onWayNum: 300,
            seaStockNum: 500,
            sevenSales: 50,
            forteenSales: 100,
            thirtySales: 200,
            transporttype: "空运",
            recommendStockNum: 500,
            applyNum: 500,
            isCheck: false,
            reason: ""
          },
        ],
        tableList: [],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: '',
        multipleSelection: [],
        infoList: [{
            id: 1,
            site: "UK",
            asin: "B0953B6SSL",
            transporttype: "空运",
            recommendStockNum: 130,
            prePurchase: 130
          },
          {
            id: 3,
            site: "UK",
            asin: "B093WXMPDX",
            transporttype: "空运",
            recommendStockNum: 120,
            prePurchase: 120
          },
        ],
        isShowCompanyAddEdit: false,
        isShowCompanyDetail: false,
        isShowConfigApp: false,
        recommendInfo: Object,
      }
    },

    created() {
      this.setOverTime()
      this.mytime = this.setOverTime()
      this.mytime2 = this.setOverTime2()
      this.mytime3 = this.setOverTime3()
      this.mytime4 = this.setOverTime4()

    },
    methods: {
      CurryStep(val) {
        if (val !== 0) {
          this.$nextTick(() => {
            this.$refs.NodeApproval.changeData(val)
          })

        }
        this.active = val

      },
      calcuTableHeight() {
        this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 230) +
          "px"; //其中230是除头部组件和表格之外的高度
        window.onresize = () => {
          return (() => {
            this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 230) + "px";
          })();
        }
      },
      showRecomendInfo() {
        this.$refs.RecommendInfo.initData()
      },
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      setOverTime() {
        var myDate = new Date();
        //2021-06-11 23:59:59
        var month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`
        var date = myDate.getDate() >= 10 ? myDate.getDate() : `0${myDate.getDate()}`
        var OverData = `${myDate.getFullYear()}-${month}-${date} 16:00:00`
        return OverData
      },
      setOverTime2() {
        var myDate = new Date();
        var month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`
        var date = myDate.getDate() >= 10 ? myDate.getDate() : `0${myDate.getDate()}`
        var OverData = `${myDate.getFullYear()}-${month}-${date} 18:30:00`
        return OverData
      },
      setOverTime3() {
        var myDate = new Date();
        var month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`
        var date = myDate.getDate() >= 10 ? myDate.getDate() + 1 : `0${myDate.getDate()+1}`
        var OverData = `${myDate.getFullYear()}-${month}-${date} 11:00:00`
        return OverData
      },
      setOverTime4() {
        var myDate = new Date();
        var month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : `0${myDate.getMonth()+1}`
        var date = myDate.getDate() >= 10 ? myDate.getDate() + 1 : `0${myDate.getDate()+1}`
        var OverData = `${myDate.getFullYear()}-${month}-${date} 16:00:00`
        return OverData
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
        this.$refs.MaterialInfo.initData()
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
        // http.queryListPage(data).then(res => {
        //   this.dataList = res.data.rows
        //   this.page = res.data.page
        //   this.pageSize = res.data.pageSize
        //   this.totalRows = res.data.totalRows
        //   this.tableLoading = false
        // })
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
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 ||
          columnIndex === 5) {
          if (rowIndex % 4 === 0) {

            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        } else if (columnIndex === 6) {
          if (rowIndex % 2 === 0) {

            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
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
      stateFormat(row, column, cellValue) {
        cellValue += '';
        if (!cellValue.includes('.')) cellValue += '.';
        return cellValue.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ',';
        }).replace(/\.$/, '');
      },
      tranmem() {
        let sel = sessionStorage.getItem("id");
        let anel = document.getElementById("member");
        if (sel) {
          anel.scrollIntoView();
        }
      }
    },
    mounted() {
      this.tableList = Object.assign(this.dataList)
      this.calcuTableHeight()
    }
  }
</script>

<style lang="scss">
  .popverClass {
    background-color: #eeeeee !important;
    color: #393e46 !important;

    .el-popper[x-placement^=top] .popper__arrow::after {
      border-top-color: #393e46 !important;
    }

    .el-popper[x-placement^=bottom] .popper__arrow::after {

      border-bottom-color: #393e46;
    }
  }
</style>

<style lang="scss" scoped>
  /deep/.el-table__column-filter-trigger {
    margin-left: 10px;
    display: inline-block;
    line-height: 20px;
    cursor: pointer;
    background-color: #e9f1f6;
  }

  .resource-table {
    transition: all .5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
  }

  .title-right-box {
    display: flex;
    justify-content: space-around;
    position: absolute;
    right: 1em;
  }

  .title-box {
    display: flex;
    justify-content: space-around;
    position: absolute;
  }

  .even-box {
    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 30px;
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
    margin-right: 5px;
    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 30px;
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

  .HotDate {
    height: 50px;
  }

  /deep/ .EformClass {
    .el-form-item {
      margin-bottom: 5px;

      .el-form-item__label {
        color: #0b3d50;
        font-weight: lighter;

      }

      .spanItemClass {
        color: #203744;
        display: flex;
        width: 240px;
        line-height: 30px;
      }
    }
  }

  .colClass {
    //border: 1px solid #6c848d;
    height: 290px;
    margin-left: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #f3f0e945;
  }

  .colClass2 {
    //border: 1px solid #6c848d;
    height: 400px;
    margin-left: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #f3f0e945;
  }

  .mat-title {
    margin-bottom: 15px;
    margin-left: 5px;
    border-bottom: 2px solid #00a381;
  }

  .design_position {
    width: 40px;
    height: 100px;
    border-radius: 3px;
    font: 12 "微软雅黑";
    color: black;
    background-color: #FFEBC8;
    /*右侧中间定位*/
    position: fixed;
    top: 45vh;
    right: 1px;
    /*垂直水平居中*/
    text-align: center;
    line-height: 30px;
    -webkit-writing-mode: vertical-rl;
    writing-mode: vertical-rl;
    /* 鼠标移动到div变小手*/
    cursor: pointer;
    z-index: 9999;
  }
</style>