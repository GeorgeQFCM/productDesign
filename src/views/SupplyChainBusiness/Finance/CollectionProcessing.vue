<template>
  <div>
    <el-row>
      <el-form ref="form" size="small" :model="queryFrom" inline label-width="80px">
        <el-form-item>
          <el-select v-model="queryFrom.elePlatformName" placeholder="请选择平台" clearable filterable>
            <el-option v-for="item in OptElePlatformNameList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.shopSimlpeName" clearable placeholder="请选择账号" filterable>
            <el-option v-for="item in OptShopSimlpeNameList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.countryCode" placeholder="请选择站点" clearable filterable>
            <el-option v-for="item in OptCountryCodeList" :key="item.countryCode" :label="item.countryCode"
              :value="item.countryCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryFrom.name" placeholder="请输入结算单号"></el-input>
        </el-form-item>
        <el-form-item>
          <button class='bttn-fill bttn-md bttn-primary' @click="getPage(1)">
            <svg-icon icon-class="search" className="search-icon" />搜索</button>

          <button class='bttn-fill bttn-md bttn-success' @click="setMoney()" style="margin-left:10px">
            <svg-icon icon-class="edit" />初始化期初应收金额</button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table border highlight-current-row ref="xTable" height="750" size="mini" :data="tableData" stripe>
      <el-table-column type="index" width="50" show-overflow-tooltip align="center" label="序号"></el-table-column>
      <el-table-column prop="platform" width="100" label="平台" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="account" width="100" label="账号" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="site" width="100" label="站点" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="SettlementNo" width="100" label="结算单号" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="RevenueRecognitionType" label="收入确认类型" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="StartDate" label="开始日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="EndDate" label="结束日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="paymentDate" label="汇款日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="settlementCurrency" label="结算币种" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="CollectionCurrency" label="收款币种" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="SettlementRate" label="结算汇率" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="beginningPeriod" label="期初应收金额" show-overflow-tooltip align="center" width="100">
      </el-table-column>
      <el-table-column prop="receivablePeriod" label="本期应收金额" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="currentperiod" label="本期放款金额" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="amountreceived" label="实际收款金额" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="endperiod" label="期末应收金额" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Collectionbank" label="回款银行" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="Collectionaccount" label="回款账号" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="isreceived" label="是否已收到款项" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Collectiondate" label="回款日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="操作" show-overflow-tooltip align="center" fixed="right" width="100">
        <template slot-scope="scope">
          <button class='bttn-stretch bttn-md bttn-primary' title="编辑" @click="editEvent(scope.row)">
            <svg-icon icon-class="edit" /></button>
          <button class='bttn-stretch bttn-md bttn-primary' title="记录" @click="watchEvent(scope.row)">
            <svg-icon icon-class="view" /></button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :page-size="queryFrom.Row" :page-sizes="[20,50,100]" :total="total"
        style="float:right;"></el-pagination>
    </el-col>
    <el-dialog title="汇款确认办理" :visible.sync="showEdit" :close-on-click-modal="false" width="30%" center>
      <el-form :model="EditForm" label-width="150px" label-position="left" size="small">
        <el-form-item label="实际收款金额">
          <el-input v-model="EditForm.amountreceived"></el-input>
        </el-form-item>
        <el-form-item label="回款日期">
          <el-date-picker v-model="EditForm.Collectiondate" type="date" placeholder="选择日期" style="width: 100%;">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="showEdit = false">取
          消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="showEdit = false">确 定</button>
      </div>
    </el-dialog>

    <el-dialog title="设置期初应收金额" :visible.sync="initVisible" :close-on-click-modal="false" width="70%" center>
      <el-table border highlight-current-row ref="xTable" height="500" size="mini" :data="InitData" stripe
        @cell-click="dblhandleCurrentChange" :row-class-name="tableRowClassName">
        <el-table-column type="index" width="50" show-overflow-tooltip align="center" label="序号"></el-table-column>
        <el-table-column prop="platform" width="100" label="平台" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="account" width="100" label="账号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="site" width="100" label="站点" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="SettlementNo" width="100" label="结算单号" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="RevenueRecognitionType" label="收入确认类型" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="StartDate" label="开始日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="EndDate" label="结束日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="paymentDate" label="汇款日期" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="settlementCurrency" label="结算币种" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="CollectionCurrency" label="收款币种" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="SettlementRate" label="结算汇率" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="beginningPeriod" label="期初应收金额" show-overflow-tooltip align="center" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.index === tabClickIndex && tabClickLabel === '期初应收金额'">
              <el-input size="small" v-model="scope.row.beginningPeriod" v-focus
                @change="scope.row.beginningPeriodisEdit=true" @blur="inputBlur" placeholder="期初应收金额"></el-input>
            </span>
            <span v-else
              :style="{color:scope.row.beginningPeriodisEdit==true?'red':'#606266'}">{{scope.row.beginningPeriod}}</span>
          </template>
        </el-table-column>
       </el-table>
      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="initVisible = false">取
          消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="initVisible = false">确 定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ExamineCompont from './componets/ExamineCompont.vue'
  export default {
    components: {
      ExamineCompont
    },
    directives: {
      // 注册一个局部的自定义指令 v-focus
      focus: {
        // 指令的定义
        inserted: function (el) {
          // 聚焦元素
          el.querySelector('input').focus()

        }
      }
    },
    data() {
      return {
        initVisible: false,

        showEdit: false,
        EditForm: {},
        queryFrom: {
          Page: 1,
          Row: 20
        },
        OptElePlatformNameList: [],
        OptShopSimlpeNameList: [],
        OptCountryCodeList: [],
        total: 0,
        InitData: [{
            platform: "Amazon",
            account: "BSC",
            site: "US",
            SettlementNo: "123",
            RevenueRecognitionType: "确认",
            StartDate: "2021-06-01",
            EndDate: "2021-06-30",
            paymentDate: "2021-06-15",
            settlementCurrency: "USD",
            CollectionCurrency: "USD",
            SettlementRate: "1",
            beginningPeriod: "",
            receivablePeriod: "676.00",
            currentperiod: "576.00",
            amountreceived: "",
            endperiod: "100.00",
            Collectionbank: "招商银行",
            Collectionaccount: "123456789987654321",
            isreceived: "",
            Collectiondate: "",
          },
          {
            info: 'second',
            platform: "Amazon",
            account: "BSC",
            site: "US",
            SettlementNo: "123",
            RevenueRecognitionType: "确认",
            StartDate: "2021-06-01",
            EndDate: "2021-06-30",
            paymentDate: "2021-06-15",
            settlementCurrency: "USD",
            CollectionCurrency: "USD",
            SettlementRate: "1",
            beginningPeriod: "110.00",
            receivablePeriod: "676.00",
            currentperiod: "776.00",
            amountreceived: "",
            endperiod: "776.00",
            Collectionbank: "招商银行",
            Collectionaccount: "123456789987654321",
            isreceived: "",
            Collectiondate: "",
          }
        ],
        tableData: [{
            info: 'first',
            platform: "Amazon",
            account: "BSC",
            site: "US",
            SettlementNo: "123",
            RevenueRecognitionType: "确认",
            StartDate: "2021-06-01",
            EndDate: "2021-06-30",
            paymentDate: "2021-06-15",
            settlementCurrency: "USD",
            CollectionCurrency: "USD",
            SettlementRate: "1",
            beginningPeriod: "",
            receivablePeriod: "676.00",
            currentperiod: "576.00",
            amountreceived: "",
            endperiod: "100.00",
            Collectionbank: "招商银行",
            Collectionaccount: "123456789987654321",
            isreceived: "",
            Collectiondate: "",
          },
          {
            info: 'second',
            platform: "Amazon",
            account: "BSC",
            site: "US",
            SettlementNo: "123",
            RevenueRecognitionType: "确认",
            StartDate: "2021-06-01",
            EndDate: "2021-06-30",
            paymentDate: "2021-06-15",
            settlementCurrency: "USD",
            CollectionCurrency: "USD",
            SettlementRate: "1",
            beginningPeriod: "110.00",
            receivablePeriod: "676.00",
            currentperiod: "776.00",
            amountreceived: "",
            endperiod: "776.00",
            Collectionbank: "招商银行",
            Collectionaccount: "123456789987654321",
            isreceived: "",
            Collectiondate: "",
          }
        ],
        tabClickIndex: null, // 点击的单元格
        tabClickLabel: '', // 当前点击的列名
      }
    },
    methods: {
      watchEvent() {
        const id = this.$layer.iframe({
          title: "查看编辑记录",
          // area: 'auto',
          area: ["50vw", "50vh"],
          content: {
            content: ExamineCompont, //组件         
            parent: this, //vue实例 传入实例 弹窗组件内才能获取laydata
            data: {
              info: [{
                  sysAuditID: 1,
                  sysAuditCreateDate: '2021-06-29',
                  sysAuditPerName: '李俏欣',
                  tableData: [{
                    a1: '500.00',
                    a2: '300.00',
                    a3: '2001-06-29',
                  }]
                },
                {
                  sysAuditID: 2,
                  sysAuditCreateDate: '2021-06-11',
                  sysAuditPerName: '左亮',
                  tableData: [{
                    a1: '900.00',
                    a2: '700.00',
                    a3: '2001-06-11',
                  }]
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

      setMoney() {
        this.initVisible = true
      },
      editEvent(row) {
        this.EditForm.amountreceived = row.currentperiod
        this.EditForm.Collectiondate = new Date()

        this.showEdit = true
      },
      tableRowClassName({
        row,
        rowIndex
      }) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      dblhandleCurrentChange(row, column, cell, event) {
        switch (column.label) {
          case "期初应收金额":
            this.tabClickIndex = row.index
            this.tabClickLabel = column.label
            break;
          default:
            return
        }
      },
      // 失去焦点初始化
      inputBlur(row, event, column) {
        this.tabClickIndex = null
        this.tabClickLabel = ''
      },
      handleCurrentChange(val) {
        this.queryFrom.page = val;
        this.getPage(val);
      },

      handleSizeChange(val) {
        this.queryFrom.row = val;
        this.getPage(this.queryFrom.page);
      },
      getPage(page = 1) {
        this.queryFrom.page = page;
      },
    }
  }
</script>

<style>

</style>