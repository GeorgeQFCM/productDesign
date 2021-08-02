<template>
  <el-dialog title="推荐信息" :visible.sync="AsinVisible" width="80%" top="10vh">
    <div>
      <div class="title-box">
        <div class="even-box">事业部: 事业一部</div>
        <div class="team-box">Team: Team1</div>
        <div class="recommend-box">{{`推荐日期: ${parseTime(new Date())}`}}</div>
        <div class="recommend-box">{{`物料编码: ` + matTableData[0].matcode}}</div>
      </div>
    </div>
    <div v-if="true" style="margin-top: 50px">
      <el-table :data="AsinTableData" border style="width: 100%" size="mini">
        <el-table-column label="Asin" prop="Asin" align="center" width="125px">
        </el-table-column>
        <el-table-column label="国内可用库存" prop="DomesticAvailableInventory" align="center" width="125px">
        </el-table-column>
        <el-table-column label="采购未完成数量" prop="PurchaseUnfinishedQuantity" align="center" width="125px">
        </el-table-column>
        <el-table-column label="国内仓已调拨未发货数量" prop="UndeliveredQuantity" align="center" width="160">
        </el-table-column>
        <el-table-column label="Amazon店铺即时库存总数" prop="AmazonInventory" align="center" width="190px">
        </el-table-column>
        <el-table-column label="海外仓在途数量" prop="TransitQuantity" align="center" width="120px">
        </el-table-column>
        <el-table-column label="海外仓库存数量" prop="OverseasInventoryQuantity" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="sevenSellNum" label="7天销售数量" align="center" width="100px">
        </el-table-column>
        <el-table-column prop="foueSellNum" label="14天销售数量" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="treeSellNum" label="30天销售数量" align="center" width="120px">
        </el-table-column>
        <el-table-column prop="daliySell" align="center" label="日均销量">
        </el-table-column>
        <el-table-column align="center" label="推荐数量">
          <template slot-scope="scope">
            <el-popover placement="top-end" popper-class="popverClass" width="720" trigger="click">
              <div class="recomend-box">
                <div class="recomend-formula">
                  <div>建议备货量 =(安全库存天数+订货天数)*日均销量*季节系数-Amazon店铺即时库存总数</div>
                  <div> 安全库存天数=供货周期+运输天数+国内仓处理天数+海外仓处理天数+安全销售天数+订单处理天数</div>

                  <!-- <ul>
                    <li><span>参数[供货周期] A = {{computeFrom.supplycle}}10</span> </li>
                    <li><span>参数[运输天数] B = {{computeFrom.logisticsDays}}9</span> </li>
                    <li><span>参数[国内仓处理天数] C = {{computeFrom.innerDealDay}}8</span> </li>
                    <li><span>参数[Amazon仓处理天数] D = {{computeFrom.outerDealDay}}7</span> </li>
                    <li><span>参数[订单处理天数] E = {{computeFrom.orderDealDay}}6</span> </li>
                    <li><span>参数[安全销售天数] F = {{computeFrom.safeSaleDays}}5</span> </li>
                    <li><span>参数[订货天数] G = {{computeFrom.orderGoodsDays}}4</span> </li>
                    <li><span>参数[日均销量] H = {{computeFrom.dayavgqty}}9</span> </li>
                    <li><span>参数[季节系数] I = {{computeFrom.seasonRadio}}2</span> </li>
                    <li><span>参数[Amazon店铺即时库存总数] J= {{computeFrom.totalVolume}}1</span> </li>
                  </ul> -->
                  <!-- <ul>
                    <li><span>参数[供货周期] = {{computeFrom.lifeCycle}}1</span></li>
                  </ul> -->
                  <el-table :data="canshutableData" height="400px" border style="width: 100%" size="mini">
                    <el-table-column prop="date" label="参数名称" width="150">
                    </el-table-column>
                    <el-table-column prop="name" label="参数值" width="150">
                    </el-table-column>
                    <el-table-column prop="address" label="取值说明">
                    </el-table-column>
                  </el-table>
                </div>
                <!-- <div class="split"></div>
                <div class="filte-condition">
                  <span>过滤条件: </span>
                  <ul>
                    <li><span>条件一:</span> 10</li>
                    <li><span>条件二:</span> 10</li>
                    <li><span>条件三:</span> 10</li>
                  </ul>
                </div> -->
              </div>
              <el-button slot="reference" type="text" style="padding:0" @click="ViewFormula(scope.row)">
                {{scope.row.proposalNumber}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>

      <el-table :data="AsinTableData" border style="width: 100%" size="mini">
        <el-table-column label="Asin" prop="Asin" align="center" width="125px">
        </el-table-column>
        <el-table-column prop="curPre" label="环比：本月/上月 同比：去年本月/去年上月" align="center" width="250">
          <template slot-scope="scope">
            <div v-for="item in scope.row.curPre.split(',') " :key="item">{{item}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="amaSellNum" label="亚马逊可售数量供货天数" align="center" width="160">
        </el-table-column>
        <el-table-column label="Amazon店铺即时库存供货天数" prop="AmaStockDateNum" align="center" width="190px">
        </el-table-column>
        <el-table-column label="持续断货天数" prop="OutDays" align="center" width="120">
        </el-table-column>
        <el-table-column label="亚马逊可售数量" prop="AmaSaleNum" align="center" width="120px">
        </el-table-column>
        <el-table-column label="预留数量" prop="preNum" align="center" width="100px">
        </el-table-column>
        <el-table-column label="自发货订单数量" prop="preNum" align="center" width="110px">
        </el-table-column>
        <el-table-column label="物流待发数" prop="preSendNum" align="center" width="100px">
        </el-table-column>
        <el-table-column label="亚马逊来货数量" prop="AmaComeNum" align="center" width="100px">
        </el-table-column>
        <el-table-column label="海运/铁运/卡航来货数量" align="center" prop="yumComeNum">
        </el-table-column>

      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="AsinVisible = false">取 消</el-button>
      <el-button type="primary" @click="AsinVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    parseTime
  } from '@/utils/index'
  export default {
    data() {
      return {
        AsinVisible: false,
        matTableData: [{
          matcode: "ATC210398"
        }],
        computeFrom: {},
        canshutableData: [{
            date: "统计日期",
            name: "2021-07-29",
            address: "说明。。。"
          },
          {
            date: "区域",
            name: "UK",
            address: "说明。。。"
          },
          {
            date: "平台",
            name: "Amazon",
            address: "说明。。。"
          },
          {
            date: "事业部",
            name: "事业一部",
            address: "说明。。。"
          }, {
            date: "Team",
            name: "Team1",
            address: "说明。。。"
          }, {
            date: "Asin",
            name: "GAFA45515646",
            address: "说明。。。"
          }, {
            date: "物料编码",
            name: "2GAG456",
            address: "说明。。。"
          }, {
            date: "供货周期",
            name: "12天",
            address: "说明。。。"
          }, {
            date: "物流方式",
            name: "海运",
            address: "说明。。。"
          }, {
            date: "Amazon店铺总库存",
            name: "1314",
            address: "说明。。。"
          }, {
            date: "日均销量",
            name: "51",
            address: "说明。。。"
          }, {
            date: "店铺供货天数",
            name: "15",
            address: "说明。。。"
          }, {
            date: "月份",
            name: "7",
            address: "说明。。。"
          },
          {
            date: "季节系数",
            name: "7",
            address: "说明。。。"
          },
          {
            date: "订货天数",
            name: "7",
            address: "说明。。。"
          },
          {
            date: "安全销售天数",
            name: "7",
            address: "说明。。。"
          }, {
            date: "参数值",
            name: "7",
            address: "说明。。。"
          }, {
            date: "安全库存天数",
            name: "7",
            address: "说明。。。"
          }, {
            date: "建议备货量",
            name: "7",
            address: "说明。。。"
          }, {
            date: "订单处理天数",
            name: "7",
            address: "说明。。。"
          }, {
            date: "海外仓处理天数",
            name: "7",
            address: "说明。。。"
          }, {
            date: "国内仓处理天数",
            name: "7",
            address: "说明。。。"
          },
           {
            date: "生命周期",
            name: "7",
            address: "说明。。。"
          }
        ],
        AsinTableData: [{
            Asin: "B0953B6SSL",
            DomesticAvailableInventory: "500",
            PurchaseUnfinishedQuantity: "100",
            UndeliveredQuantity: "100",
            AmazonInventory: "200",
            TransitQuantity: "120",
            OverseasInventoryQuantity: "500",
            sevenSellNum: "50",
            foueSellNum: "110",
            treeSellNum: "220",
            daliySell: "11",
            proposalNumber: 99,
            curPre: "0.32,0.86",
            amaSellNum: "5",
            AmaStockDateNum: "30",
            OutDays: "0",
            AmaSaleNum: "100",
            preNum: "50",
            preSendNum: "30",
            AmaComeNum: "0",
            yumComeNum: "200",
            recommendNum: "300",
          },
          {
            Asin: "B087PTJ635",
            DomesticAvailableInventory: "600",
            PurchaseUnfinishedQuantity: "120",
            UndeliveredQuantity: "160",
            AmazonInventory: "100",
            TransitQuantity: "160",
            OverseasInventoryQuantity: "300",
            sevenSellNum: "30",
            foueSellNum: "70",
            treeSellNum: "300",
            daliySell: "10",
            proposalNumber: 69,
            curPre: "0.22,0.56",
            amaSellNum: "8",
            AmaStockDateNum: "45",
            OutDays: "0",
            AmaSaleNum: "150",
            preNum: "70",
            preSendNum: "52",
            AmaComeNum: "0",
            yumComeNum: "340",
            recommendNum: "200",
          }
        ],

        recommendInfo: {}
      }
    },
    methods: {
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      initData() {
        this.AsinVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title-box {
    display: flex;
    justify-content: space-around;
    position: absolute;
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
    margin-right: 5px;
    border: 1px solid rgba($color: #000000, $alpha: .2);
    border-radius: 3px;
    line-height: 35px;
    padding: 0 5px;
  }

  .recomend-box {
    // display: flex;
    // justify-content: space-around;
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
</style>