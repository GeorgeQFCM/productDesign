<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <div ref="TopAssembly">
      <el-card>
        <el-row :gutter="10">
          <el-col :span="20">

            <!-- <el-form inline>
            <el-row>
              <el-form-item>
                <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台:</label>
                <el-input v-model="searchData.area"></el-input>
              </el-form-item>
              <el-form-item>
                <label
                  slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</label>
                <el-input v-model="searchData.logistics_mode"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;采购数大于:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item>
            <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事业部:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item> 
            </el-row>
            <el-row>
              <el-form-item>
                <label slot="label">物料编码:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;运用大类:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;产品名称:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;team:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item>

              <el-form-item style="margin-left:52px ">
                <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
                <el-button type="warning" @click="clearList">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>  -->

          </el-col>
          <el-col :span="4" style="height:35px">
            <div class="title-right-box">
              <div class="even-box">事业部: 事业一部</div>
              <div class="team-box">Team: Team1</div>
              <div class="recommend-box">{{`推荐日期: ${parseTime(new Date())}`}}</div>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </div>
    <el-card style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" size="medium">保存</el-button>
        <el-button type="success" size="medium">提交</el-button>
        <!-- <el-checkbox style="margin-left: 385px;" v-model="haichecked" @change="CheckedKongChange">批量空运</el-checkbox>
        <el-checkbox v-model="kongchecked" @change="CheckedHaiChange">批量海运</el-checkbox> -->
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table" :height="tableHeight"
        :span-method="ObjectSpanMethod" ref="multipleTable" @selection-change="handleSelectionChange" size="mini">
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="物料编码" width="100" prop="matcode" align="center" show-overflow-tooltip
          :filters="[{text: 'ATC210398', value: 'ATC210398'}]" :filter-method="filterHandler">
          <template slot-scope="scope">
            <el-button type="text" @click.stop="showExplain(scope.row)">{{scope.row.matcode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="运营大类" width="100" prop="matOperateCate" align="center" show-overflow-tooltip
          :filters="[{text: '平板电脑保护套', value: '平板电脑保护套'}]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column label="组合属性" width="150" prop="matGroup" align="center" show-overflow-tooltip
          :filters="[{text: '组合属性', value: '组合属性'}]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column label="首单日期" width="120" prop="firstDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购起订量" prop="sujustRemrk" align="center" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.sujustRemrk}}</span>
          </template>
        </el-table-column>
        <el-table-column label="MOQ" prop="MOQ" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.MOQ}}</span>
          </template>
        </el-table-column>

        <el-table-column label="平台" width="100" prop="plat" align="center" show-overflow-tooltip
          :filters="[{text: 'Amazon', value: 'Amazon'}]" :filter-method="filterHandler"></el-table-column>
        <el-table-column label="区域" width="100" prop="area" align="center" show-overflow-tooltip
          :filters="[{text: 'EU', value: 'EU'},{text: 'UK', value: 'UK'},{text: 'CA', value: 'CA'}]"
          :filter-method="filterHandler"></el-table-column>
        <el-table-column label="7、14、30天销量：" prop="localNum" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.sevenSales}},</span>
            <span style="color:#ff7500">{{scope.row.forteenSales}},</span>
            <span style="color:#ff7500">{{scope.row.thirtySales}},</span>
          </template>
        </el-table-column>
        <el-table-column label="推荐备货数量" width="100" prop="recommendStockNum" align="center" show-overflow-tooltip>
          <template slot="header">
            <div>
              <span>推荐备货数量</span>
              <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                <el-input v-model="ApplyNumberQuery1" style="width:150px"></el-input>
                <span>至</span>
                <el-input v-model="ApplyNumberQuery2" style="width:150px"></el-input>
              </el-popover>
            </div>
          </template>
          <template slot-scope="scope">
            <el-button type="text" @click="showRecomendInfo">
              {{scope.row.recommendStockNum}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="建议运输方式" width="130" prop="transporttype" align="center" show-overflow-tooltip
          :filters="[{text: '空运', value: '空运'},{text: '海运', value: '海运'}]" :filter-method="filterHandler">
        </el-table-column>
        <el-table-column label="申请备货数量" prop="applyNum" align="center" width="100" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请备货原因" width="150" align="center" prop="reason" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请备货合计" prop="preStockAllNum" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.preStockAllNum}}</span>
          </template>
        </el-table-column>

        <el-table-column label="国内可用库存" prop="localNum" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.localNum}}</span>
          </template>
        </el-table-column>
        <el-table-column label="国内仓已调拨未发货数量合计" prop="localNum" width="110" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.localNum1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="海外仓库存数量合计" prop="localNum" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.localNum2}}</span>
          </template>
        </el-table-column>
        <el-table-column label="海外仓在途数量合计" prop="localNum" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.localNum3}}</span>
          </template>
        </el-table-column>
        <el-table-column label="已申请采购数量合计" prop="localNum" width="100" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.localNum4}}</span>
          </template>
        </el-table-column>

        <el-table-column label="建议本次采购数量" prop="sujust" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.sujust}}</span>
          </template>
        </el-table-column>


        <el-table-column label="本次采购数量" prop="bcchsl" width="100" align="center" show-overflow-tooltip fixed="right">
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.bcchsl}}</span>
          </template>
        </el-table-column>
        <el-table-column class-name="columnClass" label="本次采购建议运输方式" width="100" prop="transporttype1" align="center"
          fixed="right">
          <template slot-scope="scope">
            <el-select v-model="scope.row.transporttype1" placeholder="">
              <el-option label="空运" value="空运"></el-option>
              <el-option label="海运" value="海运"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column class-name="columnClass" label="本次采购说明" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="申请数量审核" prop="sqslsh" align="center" show-overflow-tooltip fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sqslsh"></el-input>
          </template>
        </el-table-column>
        <el-table-column class-name="columnClass" label="申请审核说明" width="150" align="center" fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark"></el-input>
          </template>
        </el-table-column>

        <el-table-column class-name="columnClass" label="审核记录" width="50" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="WatchExamine(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <MaterialInfo ref="MaterialInfo"></MaterialInfo>
    <RecommendInfo ref="RecommendInfo"></RecommendInfo>


  </div>
</template>

<script>
  import {
    parseTime
  } from '@/utils/index'
  import MaterialInfo from './materialInfo.vue'
  import RecommendInfo from './RecommendInfo.vue'
  import ExamineCompont from './ExamineCompont.vue'

  export default {
    components: {
      MaterialInfo,
      RecommendInfo,
      
    },

    data() {
      return {
        RecordForm: {
          author: "庄全发",
          startTime: "2021-06-09",
          endTime: "2021-06-24",
          describe: "",
        },
        tableHeight: this.tableHeight,
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
            reason: "",
            realCount: 20,
            realCountReason: "",
            reason: "原因C",
            localNum: 100,
            localNum1: 150,
            localNum2: 240,
            localNum3: 343,
            localNum4: 500,

            preStockNum: 60,
            preStockAllNum: 1500,
            preStockNum1: "",
            apply: 10,
            purcharse: 160,
            curApplyNum: 40,
            sujust: 1500,
            sujustTotal: 50,
            sujustRemrk: "1000",
            MOQ: 123456,
            remark: "",
            sqslsh: 500,
            transporttype1: "空运",
            bcchsl: 1500
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
            notFaNum: 100,
            amazonALLNum: 500,
            onWayNum: 300,
            seaStockNum: 500,
            sevenSales: 60,
            forteenSales: 120,
            thirtySales: 240,
            transporttype: "空运",
            recommendStockNum: 500,
            applyNum: 500,
            isCheck: false,
            reason: "",
            realCount: 20,
            realCountReason: "",
            reason: "原因C",
            localNum: 100,
            localNum1: 150,
            localNum2: 240,
            localNum3: 343,
            localNum4: 500,
            preStockNum: 60,
            preStockAllNum: 1500,
            preStockNum1: "",
            apply: 10,
            purcharse: 160,
            curApplyNum: 40,
            sujust: 1500,
            sujustTotal: 50,
            sujustRemrk: "1000",
            MOQ: 123456,
            remark: "",
            sqslsh: 500,
            transporttype1: "空运",
            bcchsl: 1500
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
            notFaNum: 100,
            amazonALLNum: 500,
            onWayNum: 300,
            seaStockNum: 500,
            sevenSales: 70,
            forteenSales: 140,
            thirtySales: 280,
            transporttype: "空运",
            recommendStockNum: 500,
            applyNum: 500,
            isCheck: false,
            reason: "",
            realCount: 20,
            realCountReason: "",
            reason: "原因C",
            localNum: 100,
            localNum1: 150,
            localNum2: 240,
            localNum3: 343,
            localNum4: 500,
            preStockNum: 60,
            preStockAllNum: 1500,
            preStockNum1: "",
            apply: 10,
            purcharse: 160,
            curApplyNum: 40,
            sujust: 1500,
            sujustTotal: 50,
            sujustRemrk: "1000",
            MOQ: 123456,
            remark: "",
            sqslsh: 500,
            transporttype1: "空运",
            bcchsl: 1500

          }

        ],
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
            id: 4,
            site: "UK",
            asin: "B093WXMPDX",

            transporttype: "空运",
            recommendStockNum: 140,
            prePurchase: 140
          }
        ],
        isShowCompanyAddEdit: false,
        isShowCompanyDetail: false,
        isShowConfigApp: false,
        recommendInfo: Object,
        ApplyNumberQuery1: "",
        ApplyNumberQuery2: "",
      }
    },
    created() {
      this.getData()
    },
    methods: {
      showRecomendInfo() {
        this.$refs.RecommendInfo.initData()
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      FilterData() {
        let spanOneArr = [];
        let concatOne = 0;
        this.dataList.forEach((item, index) => {
          if (index == 0) {
            spanOneArr.push(1)
          } else {
            if (
              item.matcode === this.dataList[index - 1].matcode
              // item.plat === this.dataList[index - 1].plat &&
              // item.area === this.dataList[index - 1].area &&          
              // item.transporttype1 === this.dataList[index - 1].transporttype1

            ) {
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
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 ||
          columnIndex === 5 ||
          columnIndex === 6 || columnIndex === 14 || columnIndex === 15 || columnIndex === 16 || columnIndex === 17 ||
          columnIndex === 18 || columnIndex === 19 || columnIndex === 20 || columnIndex === 21 || columnIndex === 22 ||
          columnIndex === 23) {
          const _row = (this.FilterData(this.dataList).one)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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
      showRecomendLog(row) {
        console.log(row, "row");
        this.recommendInfo = row
        this.recommendLogVisble = true
      },
      showExplain(row) {
        this.$refs.MaterialInfo.initData()
      },
      parseTime(data) {
        return parseTime(data)
      },
      //获取表格数据源
      getData() {

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
      handleSelectionChange(val) {
        var that = this
        val.forEach(function (val, index) {
          that.dataList.forEach((v, i) => {
            if (val.id === v.id) {
              if (that.dataList[i].proposalnumber > 0 && that.dataList[i].auditnumber == 0) {
                that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              }
            }
          })
        });
      },
      CheckedKongChange(val) {
        var that = this
        if (val) {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '空运' && that.dataList[i].proposalnumber > 0 && that.dataList[i]
              .auditnumber == 0) {
              that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i]);
            }
          })
        } else {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '空运' && that.dataList[i].auditnumber > 0) {
              that.dataList[i].auditnumber = ''
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i], false);
            }
          })
        }
      },
      CheckedHaiChange(val) {
        var that = this
        if (val) {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '海运' && that.dataList[i].proposalnumber > 0 && that.dataList[i]
              .auditnumber == 0) {
              that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i]);
            }
          })
        } else {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '海运' && that.dataList[i].auditnumber > 0) {
              that.dataList[i].auditnumber = ''
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i], false);
            }
          })
        }
      },
      searchList() {
        this.page = 1
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
      calcuTableHeight() {
        this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 290) +
          "px"; //其中290是除头部组件和表格之外的高度
        window.onresize = () => {
          return (() => {
            this.tableHeight = document.body.clientHeight - (this.$refs.TopAssembly.offsetHeight + 290) + "px";
          })();
        }
        console.log(this.tableHeight);
      },
    },
    mounted() {
      this.$refs.multipleTable.toggleAllSelection()
      this.calcuTableHeight()
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-table__column-filter-trigger {
    margin-left: 10px;
    display: inline-block;
    line-height: 20px;
    cursor: pointer;
    background-color: #e9f1f6;
  }

  .columnClass {
    background-color: #000000 !important;
  }

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
    line-height: 30px;
    padding: 0 5px;
    margin-right: 5px;
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
    line-height: 30px;
    padding: 0 5px;
    margin-right: 5px;
  }

  .recommend-box {

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
</style>