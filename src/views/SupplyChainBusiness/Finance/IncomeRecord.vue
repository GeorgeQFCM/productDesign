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
        </el-form-item>

      </el-form>
    </el-row>
    <el-table border highlight-current-row ref="xTable" height="750" size="mini" :data="tableData" stripe>
      <el-table-column fixed type="index" width="50" show-overflow-tooltip align="center" label="序号"></el-table-column>
      <el-table-column fixed prop="platform" width="100" label="平台" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column fixed prop="shopSimlpeName" width="100" label="账号" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column fixed prop="countryCode" width="100" label="站点" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column fixed prop="SettlementNo" width="100" label="结算单号" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column fixed prop="ReportType" label="报告类型" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column fixed prop="RevenueRecognitionType" label="收入确认类型" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column fixed prop="StartDate" label="开始日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column fixed prop="EndDate" label="结束日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column fixed prop="paymentDate" label="汇款日期" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column fixed prop="settlementCurrency" label="结算币种" show-overflow-tooltip align="center">
      </el-table-column>

      <el-table-column prop="Previous" width="122" label="Previous Reserve Amount" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="SalesTotal" width="100" label="Sales-Total" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="SalesPromotion" width="118" label="Sales Promotion" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="RefundTotal" width="100" label="Refund-Total" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Giftwarp" label="Giftwarp&Shipping" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Advertising" width="100" label="Advertising" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Commission" width="100" label="Commission-Total" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="AmazonFee" width="100" label="Amazon Fee-Total" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="StorageFee" width="100" label="Storage Fee" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Reimbursement" width="120" label="Reimbursement" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Other" label="Other" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="Goodwill" label="Goodwill" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="withheldtax" width="100" label="withheld_tax" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="NonAmazonFee" width="100" label="Non-Amazon Fee" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="CurrentReserveAmount" width="115" label="Current Reserve Amount" show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column prop="UnsuccessfulTransfer" width="100" label="Unsuccessful Transfer " show-overflow-tooltip
        align="center">
      </el-table-column>
      <el-table-column prop="DepositTotal" width="100" label="Deposit Total" show-overflow-tooltip align="center">
      </el-table-column>
      <el-table-column prop="Period" width="100" label="应收金额" show-overflow-tooltip align="center"></el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :page-size="queryFrom.Row" :page-sizes="[20,50,100]" :total="total"
        style="float:right;"></el-pagination>
    </el-col>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        queryFrom: {
          Page: 1,
          Row: 20
        },
        OptElePlatformNameList: [],
        OptShopSimlpeNameList: [],
        OptCountryCodeList: [],
        total: 0,
        tableData: [{
          platform: "Amazon",
          shopSimlpeName: "BSC",
          countryCode: "US",
          SettlementNo: "123",
          ReportType: "settlement",
          RevenueRecognitionType: "确认",
          StartDate: "2021-06-01",
          EndDate: "2021-06-30",
          paymentDate: "2021-06-15",
          settlementCurrency: "USD",

          Previous: "-",
          SalesTotal: "1000.00",
          SalesPromotion: "-200.00",
          RefundTotal: "-80.00",
          Giftwarp: "100.00",
          Advertising: "-50.00",
          Commission: "-20.00",
          AmazonFee: "-45.00",
          StorageFee: "-4.00",
          Reimbursement: "-5.00",
          Other: "-5.00",
          Goodwill: "-5.00",
          withheldtax: "-5.00",
          NonAmazonFee: "-5.00",
          CurrentReserveAmount: "-100.00",
          UnsuccessfulTransfer: "-",
          DepositTotal: "576.00",       
          Period: "676.00"
        }]
      }
    },
    methods: {
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

<style lang="scss">
  .el-table {
    .el-table__fixed {
      height: auto !important; // 此处的important表示优先于element.style
      bottom: 17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
    }
  }
</style>