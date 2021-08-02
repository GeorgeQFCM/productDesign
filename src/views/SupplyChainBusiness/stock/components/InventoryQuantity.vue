<template>
  <section>
    <el-dialog top="5vh" :title="`${ShowFrom.materialcode}-实时库存及销量数据查看`" :visible.sync="dialogVisible" width="50%">
      <el-form :model="ShowFrom" size="mini">
        <el-form-item label="物料属性">
          {{ ShowFrom.category }}-> {{ ShowFrom.productname }}->
          {{ ShowFrom.style }}-> {{ ShowFrom.mainmaterials }}->
          {{ ShowFrom.pattern }}-> {{ ShowFrom.companybrand }}
        </el-form-item>
      </el-form>
      <el-row>
        <div>
          <span style="border-bottom: 2px solid #3b5898">国内库存信息</span>
        </div>
        <el-table size="mini" :data="ERPTableData" border style="width: 100%">
          <el-table-column prop="localstock" label="ERP即时库存数量" align="center">
          </el-table-column>
          <el-table-column prop="purchashtock" label="采购订单未完成数量" align="center"></el-table-column>
          <el-table-column prop="number" label="合计" align="center"></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div>
          <span style="border-bottom: 2px solid #3b5898">平台库存信息</span>
        </div>
        <el-table size="mini" show-summary :data="tableData" border style="width: 100%">
          <el-table-column prop="platform" label="平台" align="center">
          </el-table-column>
          <el-table-column prop="account" label="账号" align="center">
          </el-table-column>
          <el-table-column prop="countrycode" label="站点" align="center">
          </el-table-column>
          <el-table-column prop="asin" label="ASIN" align="center"></el-table-column>
          <el-table-column prop="number" label="平台即时库存" align="center"></el-table-column>
          <el-table-column prop="number2" label="平台在途数量" align="center"></el-table-column>
          <el-table-column label="未拣货数量" width="100" prop="nopick" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="已拣货未打包数量" width="100" prop="unpack" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="已打包未发货数量" width="100" prop="unsend" align="center" show-overflow-tooltip>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div>
          <span style="border-bottom: 2px solid #3b5898">海外仓库存信息</span>
        </div>
        <el-table size="mini" show-summary :data="OverseasTableData" border style="width: 100%">
          <el-table-column prop="OverseasName" label="海外仓名称" align="center">
          </el-table-column>
          <el-table-column prop="OverseasNumber" label="海外仓即时库存数量" align="center">
          </el-table-column>
          <el-table-column prop="OverseasNumber2" label="海外仓在途数量" align="center">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div>
          <span style="border-bottom: 2px solid #3b5898">申请数量信息</span>
        </div>
        <el-table size="mini" :data="ApplyTableData" border style="width: 100%">
          <el-table-column prop="applystock" label="申请中数量" align="center">
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div>
          <span style="border-bottom: 2px solid #3b5898">销量信息</span>
        </div>
        <el-table size="mini" show-summary :data="SaleTableData" border style="width: 100%">
          <el-table-column prop="platform" label="平台" align="center">
          </el-table-column>
          <el-table-column prop="account" label="账号" align="center">
          </el-table-column>
          <el-table-column prop="countrycode" label="站点" align="center">
          </el-table-column>
          <el-table-column prop="asin" label="ASIN" align="center"></el-table-column>
          <el-table-column prop="sevenday" label="7天销售数量" align="center">
          </el-table-column>
          <el-table-column prop="fourteenday" label="14天销量数量" align="center">
          </el-table-column>
          <el-table-column prop="thirtyday" label="30天销量数量" align="center">
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        SaleTableData: [{
            platform: "Amazon",
            account: "BSC",
            countrycode: "US",
            asin: "ASIN1",
            sevenday: 500,
            fourteenday: 100,
            thirtyday: 2000
          },
          {
            platform: "Amazon",
            account: "BSC",
            countrycode: "UK",
            asin: "ASIN2",
            sevenday: 500,
            fourteenday: 100,
            thirtyday: 2000
          },
          {
            platform: "Amazon",
            account: "BSC",
            countrycode: "CA",
            asin: "ASIN3",
            sevenday: 500,
            fourteenday: 100,
            thirtyday: 2000
          }
        ],
        ShowFrom: {
          materialcode: "A3C210001",
          category: "3C周边-收纳保护",
          productname: "防丢器保护壳",
          style: "镶钻圆形款",
          mainmaterials: "锌合金",
          pattern: "无",
          companybrand: "TiMOVO",
          localstock: 2000,
          applystock: 500,
          purchashtock: 900
        },
        ERPTableData: [{
          localstock: 1000,
          purchashtock: 200,
          number: 1200
        }],
        tableData: [{
            platform: "Amazon",
            account: "BSC",
            countrycode: "US",
            asin: "ASIN1",
            number: 400,
            number2: 300,
            nopick: 100,
            unpack: 200,
            unsend: 150
          },
          {
            platform: "Amazon",
            account: "BSC",
            countrycode: "UK",
            asin: "ASIN2",
            number: 300,
            number2: 300,
            nopick: 100,
            unpack: 200,
            unsend: 150
          },
          {
            platform: "Amazon",
            account: "BSC",
            countrycode: "CA",
            asin: "ASIN3",
            number: 200,
            number2: 300,
            nopick: 100,
            unpack: 200,
            unsend: 150
          }
        ],
        OverseasTableData: [{
            OverseasName: "海外仓1",
            OverseasNumber: 400,
            OverseasNumber2: 300
          },
          {
            OverseasName: "海外仓2",
            OverseasNumber: 200,
            OverseasNumber2: 100
          },
          {
            OverseasName: "海外仓3",
            OverseasNumber: 300,
            OverseasNumber2: 100
          }
        ],
        ApplyTableData: [{
          applystock: 500
        }]
      };
    },
    methods: {
      initData() {
        this.dialogVisible = true;
      }
    }
  };

</script>

<style lang="scss" scoped>
  .el-table {
    margin-bottom: 5px;
  }

</style>
