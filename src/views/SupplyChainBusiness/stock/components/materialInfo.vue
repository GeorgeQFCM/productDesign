<template>
  <el-dialog title="物料信息" :visible.sync="explainVisible" width="70%" top="10vh">
    <div>
      <div class="title-box">
        <div class="even-box">事业部: 事业一部</div>
        <div class="team-box">Team: Team1</div>
        <div class="recommend-box">{{`推荐日期: ${parseTime(new Date())}`}}</div>
        <div class="recommend-box">{{`物料编码: ` + matTableData[0].matcode}}</div>
      </div>
    </div>
    <div>
      <el-form :model="Eform" size="small" class="EformClass" label-width="120px" label-position="right">
        <el-row style="margin-top: 50px;">
          <el-col :span="7" class="colClass">
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
          <el-col :span="8" class="colClass">
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
          <el-col :span="8" class="colClass">
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
        </el-row>
      </el-form>
    </div>

    <div class="mat-box" v-if="false">
      <span class="mat-title">物料维度信息:</span>
      <el-table :data="matTableData" border style="width: 100%">
        <el-table-column prop="useStock" label="可用库存">
        </el-table-column>
        <el-table-column prop="stockCry" label="供货周期">
        </el-table-column>
        <el-table-column prop="purchaseNum" label="采购未完成数量">
        </el-table-column>
        <el-table-column prop="firstDate" label="首单日期">
        </el-table-column>
        <el-table-column prop="sellDateNum" label="持续售卖天数">
        </el-table-column>
      </el-table>
    </div>
    <div class="mat-box" v-if="false">
      <span class="mat-title">Asin维度信息:</span>
      <el-table :data="matTableData" border style="width: 100%">
        <el-table-column label="Asin" prop="Asin">
        </el-table-column>
        <el-table-column label="Amazon店铺即时库存总数" prop="AmaStockNum">
        </el-table-column>
        <el-table-column prop="amaSellNum" label="亚马逊可售数量">
        </el-table-column>
        <el-table-column label="预留数量" prop="preNum">
        </el-table-column>
        <el-table-column label="物流待发数" prop="preSendNum">
        </el-table-column>
        <el-table-column label="亚马逊来货数量" prop="AmaComeNum">
        </el-table-column>
        <el-table-column label="海运来货数量" prop="yumComeNum">
        </el-table-column>
        <el-table-column label="卡航来货数量" prop="kaComeNum">
        </el-table-column>
        <el-table-column label="海外仓在途数量" prop="haiwaiNum">
        </el-table-column>
        <el-table-column label="Amazon店铺库存供货天数" prop="AmaStockDateNum">
        </el-table-column>
        <el-table-column label="持续断货天数" lapropbel="stackDateNum">
        </el-table-column>
        <el-table-column prop="treeSellNum" label="30天销售数量">
        </el-table-column>
        <el-table-column prop="foueSellNum" label="14天销售数量">
        </el-table-column>
        <el-table-column prop="sevenSellNum" label="7天销售数量">
        </el-table-column>
        <el-table-column prop="curPre" label="本月/上月">
        </el-table-column>
        <el-table-column prop="yeCurPre" label="去年本月/去年上月">
        </el-table-column>
        <el-table-column prop="daliySell" label="日均销量">
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="explainVisible = false">取 消</el-button>
      <el-button type="primary" @click="explainVisible = false">确 定</el-button>
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
        explainVisible: false,
        matTableData: [{
          matcode:"ATC210398"
        }],
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
      }
    },
    methods: {
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      initData() {
        this.explainVisible = true
      }
    }
  }
</script>

<style lang="scss" scoped>
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


  .mat-title {
    margin-bottom: 15px;
    margin-left: 5px;
    border-bottom: 2px solid #00a381;
  }
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
</style>