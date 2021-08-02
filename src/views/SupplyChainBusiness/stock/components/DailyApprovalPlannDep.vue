<template>
  <el-dialog title="计划部备货申请审批" :visible.sync="explainVisible" width="86%" top="10vh">

    <el-row :gutter="20">
      <el-col :span="5">
        <el-form :model="Eform" size="small" class="EformClass" label-width="120px" label-position="right">
          <el-col class="colClass">
            <span class="mat-title">分类属性:</span>
            <el-form-item>
              <label slot="label">类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目:</label>
              <span class="spanItemClass">{{Eform.matCate}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">运营大类:</label>
              <span class="spanItemClass">{{Eform.MatOperateCate}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">产品名称:</label>
              <span class="spanItemClass">{{Eform.matProName}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;式:</label>
              <span class="spanItemClass">{{Eform.matStyle}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">主&nbsp;&nbsp;材&nbsp;&nbsp;料:</label>
              <span class="spanItemClass">{{Eform.matMainMaterial}}</span>
            </el-form-item>
            <el-form-item label="图案:">
              <label slot="label">图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案:</label>
              <span class="spanItemClass">{{Eform.matPattern}}</span>
            </el-form-item>
          </el-col>
          <el-col class="colClass">
            <span class="mat-title">关键属性:</span>
            <el-form-item>
              <label slot="label">公司品牌:</label>
              <span class="spanItemClass">{{Eform.matComBrand}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">适用品牌或对象:</label>
              <span class="spanItemClass">{{Eform.matBrand}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">型&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号:</label>
              <span class="spanItemClass">{{Eform.matModel}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">颜&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;色:</label>
              <span class="spanItemClass">{{Eform.matColor}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">尺&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</label>
              <span class="spanItemClass">{{Eform.matSize}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">包装数量:</label>
              <span class="spanItemClass">{{Eform.matPackQty}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">版&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本:</label>
              <span class="spanItemClass">{{Eform.matVerson}}</span>
            </el-form-item>
          </el-col>
          <el-col class="colClass">
            <span class="mat-title">一般属性:</span>
            <el-form-item>
              <label slot="label">适用机型:</label>
              <span class="spanItemClass">{{Eform.matCompatibleModel}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">版本描述:</label>
              <span class="spanItemClass">{{Eform.matVersonDesc}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">节日标签:</label>
              <span class="spanItemClass">{{Eform.matFestLabel}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">季节标签:</label>
              <span class="spanItemClass">{{Eform.matSeasonLabel}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">M&nbsp;&nbsp;O&nbsp;&nbsp;Q:</label>
              <span class="spanItemClass">{{Eform.MOQ}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">采购起订量备注:</label>
              <span class="spanItemClass">{{Eform.orderRemark}}</span>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col :span="19">
        <el-row style="margin-top:10px" class="colSpanClass">
          <div style="float:right">
            <div>
              <button class='bttn-stretch bttn-md bttn-primary' style="width:100px">上一个</button>
              <button class='bttn-stretch bttn-md bttn-success' style="width:100px">下一个</button>
            </div>
          </div>
        </el-row>
        <div style="margin-top:10px" class="colSpanClass">
          <div>
            <span class="mat-title">【事业部名称-Team名称】备货申请</span>
            <div style="float:right;margin-bottom:10px">
              <button class='bttn-fill bttn-md bttn-warning' style="width:100px" @click="NoPass">不通过</button>
              <button class='bttn-fill bttn-md bttn-success' style="width:100px">通过</button>
            </div>
          </div>

          <el-table border :data="dataList2" size="mini" height="230" :span-method="ObjectSpanMethod">
            <el-table-column label="申请方式" width="70" prop="applymethod" align="center"></el-table-column>
            <el-table-column type="selection" align="center" width="50"></el-table-column>
            <el-table-column label="平台" width="70" prop="platform" align="center"></el-table-column>
            <el-table-column label="申请合计" width="80" prop="applytotal" align="center"></el-table-column>
            <el-table-column label="期望交期" width="100" prop="deliverydate" align="center"></el-table-column>
            <el-table-column label="共计" width="80" prop="total" align="center"></el-table-column>
            <el-table-column label="Amazon店铺即时库存总数" prop="amazoninventory" align="center"></el-table-column>
            <el-table-column label="国内仓已调拨未发货数量合计" prop="warehousetotal" align="center"></el-table-column>
            <el-table-column label="海外仓库存数量合计" width="100" prop="overseasquantity" align="center"></el-table-column>
            <el-table-column label="海外仓在途数量合计" width="100" prop="overseasquantity2" align="center"></el-table-column>
            <el-table-column label="国内可用库存合计" width="90" prop="inventorytotal" align="center"></el-table-column>
            <el-table-column label="申请审核中数量合计" width="90" prop="applyreviewtotal" align="center"></el-table-column>
            <el-table-column label="采购未完成数量合计" width="90" prop="purchaseunfinishedtotal" align="center">
            </el-table-column>
            <el-table-column label="Team7天日均销量" width="90" prop="teamdailysales" align="center">
              <template slot="header">
                <el-tooltip class="item" effect="dark" content="7天销量/7" placement="top-start">
                  <i class="el-icon-warning-outline" style="color:red"></i>
                </el-tooltip>
                <span>Team7天日均销量</span>
              </template>
            </el-table-column>
            <el-table-column label="全链条库存周转天数" width="90" prop="turnoverdays" align="center">
              <template slot="header">
                <el-tooltip class="item" effect="dark"
                  content="（Amazon店铺即时库存总数（乐天的用海外仓在途数量+海外仓库存数量）+国内仓已调拨未发货数量+国内可用库存+未完成数量）/（7天销量/7）"
                  placement="top-start">
                  <i class="el-icon-warning-outline" style="color:red"></i>
                </el-tooltip>
                <span>全链条库存周转天数</span>
              </template>
            </el-table-column>
            <el-table-column label="备货后周转天数" width="90" prop="turnoverdays2" align="center">
              <template slot="header">
                <el-tooltip class="item" effect="dark"
                  content="（Amazon店铺即时库存总数（乐天的用海外仓在途数量+海外仓库存数量）+国内仓已调拨未发货数量+国内可用库存+未完成数量+采购数量合计）/（7天销量/7）"
                  placement="top-start">
                  <i class="el-icon-warning-outline" style="color:red"></i>
                </el-tooltip>
                <span>备货后周转天数</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top:10px" class="colSpanClass">
          <span class="mat-title">区域申请明细</span>
          <el-table border :data="tableData" size="mini" height="350">
            <el-table-column label="平台" width="70" prop="platform" align="center"></el-table-column>
            <el-table-column label="区域" width="70" prop="area" align="center"></el-table-column>
            <el-table-column label="7,14,30天销量" width="100" prop="sevenSellNum" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.sevenSellNum}},</span>
                <span>{{scope.row.foruthSellNum}},</span>
                <span>{{scope.row.thirdthSellNum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="Amazon店铺即时库存总数" width="100" prop="amazoninventory" align="center"></el-table-column>
            <el-table-column label="国内仓已调拨未发货数量合计" width="110" prop="warehousetotal" align="center"></el-table-column>
            <el-table-column label="海外仓库存数量合计" width="90" prop="overseasquantity" align="center"></el-table-column>
            <el-table-column label="海外仓在途数量合计" width="90" prop="overseasquantity2" align="center"></el-table-column>
            <el-table-column label="备货类型" width="100" prop="stocktype" align="center"></el-table-column>
            <el-table-column label="申请日期" width="90" prop="applydate" align="center"></el-table-column>
            <el-table-column label="申请人" width="70" prop="applyperson" align="center"></el-table-column>
            <el-table-column label="申请备货数量" width="70" prop="applyNum" align="center"></el-table-column>
            <el-table-column label="申请备货建议运输方式" width="100" prop="applytransport" align="center"></el-table-column>
            <el-table-column label="申请备货说明" width="100" prop="applydescription" align="center"></el-table-column>
            <el-table-column label="海外库存周转天数" prop="overseasturnoverdays" align="center">
              <template slot="header">
                <el-tooltip class="item" effect="dark"
                  content="（Amazon店铺即时库存总数（乐天的用海外仓在途数量+海外仓库存数量）+国内仓已调拨未发货数量）/（7天销量/7）" placement="top-start">
                  <i class="el-icon-warning-outline" style="color:red"></i>
                </el-tooltip>
                <span>海外库存周转天数</span>
              </template>
            </el-table-column>
          </el-table>
        </div>

      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        explainVisible: false,
        Eform: {
          matCate: "配件",
          MatOperateCate: "平板电脑保护套",
          matProName: "平板皮套",
          matStyle: "车线款-支架",
          matMainMaterial: "PU",
          matPattern: "无",

          matComBrand: "MoKo",
          matBrand: "苹果",
          matModel: "apple pencil",
          matColor: "黑色",
          matSize: "",
          matPackQty: "无",
          matVerson: "V1",

          matCompatibleModel: "Galaxy Tab S7 FE 2021 12.4寸",
          matVersonDesc: "标准版",
          matFestLabel: "圣诞节",
          matSeasonLabel: "东季",
          MOQ: "123456",
          orderRemark: "1000/单色，3000起订",
        },
        dataList2: [{
            applymethod: "日常备货",
            platform: "Amazon",
            applytotal: "300",
            total: "500",
            amazoninventory: "600",
            warehousetotal: "300",
            overseasquantity: "100",
            overseasquantity2: "200",
            inventorytotal: "800",
            applyreviewtotal: "400",
            purchaseunfinishedtotal: "200",
            teamdailysales: "50",
            turnoverdays: "8",
            turnoverdays2: "5",
            deliverydate: "2021-07-29"
          },
          {
            applymethod: "紧急备货",
            platform: "Amazon",
            applytotal: "300",
            total: "500",
            amazoninventory: "600",
            warehousetotal: "300",
            overseasquantity: "100",
            overseasquantity2: "200",
            inventorytotal: "800",
            applyreviewtotal: "400",
            purchaseunfinishedtotal: "200",
            teamdailysales: "50",
            turnoverdays: "8",
            turnoverdays2: "5",
            deliverydate: "2021-07-29"
          },
          {
            applymethod: "项目备货",
            platform: "Amazon",
            applytotal: "300",
            total: "500",
            amazoninventory: "600",
            warehousetotal: "300",
            overseasquantity: "100",
            overseasquantity2: "200",
            inventorytotal: "800",
            applyreviewtotal: "400",
            purchaseunfinishedtotal: "200",
            teamdailysales: "50",
            turnoverdays: "8",
            turnoverdays2: "5",
            deliverydate: "2021-07-29"
          }
        ],
        tableData: [{
            platform: "Amazon",
            area: "EU",
            sevenSellNum: "50",
            foruthSellNum: "100",
            thirdthSellNum: "200",
            amazoninventory: "200",
            warehousetotal: "150",
            overseasquantity: "130",
            overseasquantity2: "140",
            stocktype: "日常备货",
            applydate: "2021-06-28",
            applyperson: "某某某",
            applyNum: "100",
            applytransport: "海运",
            applydescription: "说明",
            overseasturnoverdays: "10",
          },
          {
            platform: "Amazon",
            area: "NA",
            sevenSellNum: "50",
            foruthSellNum: "100",
            thirdthSellNum: "200",
            amazoninventory: "200",
            warehousetotal: "150",
            overseasquantity: "130",
            overseasquantity2: "140",
            stocktype: "日常备货",
            applydate: "2021-06-28",
            applyperson: "某某某",
            applyNum: "100",
            applytransport: "海运",
            applydescription: "说明",
            overseasturnoverdays: "10",
          },
          {
            platform: "Amazon",
            area: "CA",
            sevenSellNum: "50",
            foruthSellNum: "100",
            thirdthSellNum: "200",
            amazoninventory: "200",
            warehousetotal: "150",
            overseasquantity: "130",
            overseasquantity2: "140",
            applyNum: "100",
            stocktype: "日常备货",
            applyperson: "某某某",
            applydate: "2021-06-28",
            applytransport: "海运",
            applydescription: "说明",
            overseasturnoverdays: "10",
          }
        ]
      }
    },
    methods: {
      NoPass() {
        this.$prompt('请输入审批意见', '备货申请审批', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator: () => {

          },

        }).then(({
          value
        }) => {
          this.$message({
            type: 'success',
            message: '你的审批意见是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      initData() {
        this.explainVisible = true
      },
      FilterData() {
        let spanOneArr = [];
        let concatOne = 0;
        this.dataList2.forEach((item, index) => {
          if (index == 0) {
            spanOneArr.push(1)
          } else {
            if (
              item.applymethod === this.dataList2[index - 1].applymethod,
              item.total === this.dataList2[index - 1].total
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
        if (columnIndex === 0 || columnIndex === 5) {
          const _row = (this.FilterData(this.dataList2).one)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .EformClass {
    .el-form-item {
      margin-bottom: 0px;

      .el-form-item__label {
        color: #0b3d50;
        font-weight: lighter;

      }

      .spanItemClass {
        color: #203744;
        display: flex;
        width: 150px;
        line-height: 30px;
      }
    }
  }

  .colClass {
    //border: 1px solid #6c848d;

    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #f3f0e945;
  }

  .colSpanClass {

    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #f3f0e945;
    // height: 710px;
    // overflow: auto;
  }

  .mat-title {
    margin-bottom: 15px;
    margin-left: 5px;
    border-bottom: 2px solid #00a381;
  }
</style>