<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline :model="QueryFrom" class="paddingStyle">
            <el-form-item label="物料编码">
              <el-input v-model="QueryFrom.materialcode" placeholder="多个物料编码请用英文逗号( , )隔开" style="width:500px"
                clearable>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 10px">
      <div style="margin:10px 0px 10px 10px">
        <el-button type="warning" size="medium">导入</el-button>
        <el-button type="primary" size="medium">保存</el-button>
        <el-button type="success" size="medium">提交</el-button>
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" class="paddingStyle" ref="multipleTable" stripe
        @selection-change="handleSelectionChange" width="100%" height="700px">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="物料编码" width="120" prop="materialcode" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click.stop="showExplain(scope.row)">{{scope.row.materialcode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="运营大类" width="100" prop="category" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="组合属性" width="200" prop="productname" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="首单日期" width="140" prop="firstorderdate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购起订量" width="100" prop="sujust" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.sujust}}</span>
          </template>
        </el-table-column>
        <el-table-column label="MOQ" prop="MOQ" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <span style="color:#ff7500">{{scope.row.MOQ}}</span>
          </template>
        </el-table-column>
        <el-table-column label="事业部" width="100" prop="style" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="Team" width="100" prop="mainmaterials" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="平台" width="100" prop="platform" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="区域" width="100" prop="area" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="7天销量： 14天销量： 30天销量：" width="120" prop="foreigninventory" align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="国内可用库存" width="100" prop="domesticstock" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="未完成数量" width="100" prop="domesticstock1" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="国内仓已调拨未发货数量" width="160" prop="domesticstock2" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Amazon店铺即时库存总数" width="160" prop="domesticstock3" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="海外仓库存数量" width="110" prop="foreigninventory1" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="已申请采购数量合计" width="100" prop="stockquantity2" align="center" clearable>
        </el-table-column>

        <el-table-column label="建议运输方式" width="100" prop="stockquantity" align="center" clearable fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stockquantity" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="采购数量" prop="stockquantity3" align="center" clearable fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stockquantity3" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="100" prop="stockquantity4" align="center" clearable fixed="right">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stockquantity4" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" title="删除" @click="deleteRow(scope.row,scope.$index)" icon="el-icon-delete">
            </el-button>
            <el-button type="text" icon="el-icon-view" @click="WatchExamine(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <MaterialInfo ref="MaterialInfo"></MaterialInfo>
  </section>
</template>

<script>
  import ExamineCompont from './components/ExamineCompont.vue'
  import MaterialInfo from './components/materialInfo.vue'
  export default {
    components: {
      ExamineCompont,
      MaterialInfo
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-02",
          endTime: "2021-06-11",
          describe: "第一版",
        },
        QueryFrom: {
          materialcode: "",
        },
        tableLoading: false,
        explainVisible: false,
        dataList: [{
          materialcode: "A3C210001",
          category: "平板电脑保护套",
          productname: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
          sujust: 1000,
          MOQ: 123456,
          style: "事业一部",
          platform: "Amazon",
          area: "EU",
          mainmaterials: "Team1",
          pattern: "无",
          companybrand: "TiMOVO",
          firstorderdate: "2021-04-28",
          domesticstock: "1000",
          foreigninventory: "50,100,200",


          typeofshipping: "",
          stockquantity: "",
          domesticstock1: 465,
          domesticstock2: 342,
          domesticstock3: 343,
          domesticstock4: 123,
          foreigninventory1: 364,
          stockquantity2: 500,

        }],
        matTableData: [{
          Asin: "B0953B6SSL",
          materialcode: "ATC210398",
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
      }
    },
    methods: {
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
      showExplain(row) {
        this.$refs.MaterialInfo.initData()
      },
      searchList() {
        this.dataList.unshift({
          materialcode: "A3C210002",
          category: "3C周边-收纳保护",
          productname: "防丢器保护壳",
          style: "镶钻圆形款",
          mainmaterials: "锌合金",
          pattern: "无",
          companybrand: "TiMOVO",
          firstorderdate: "2021-04-28",
          domesticstock: "1000",
          foreigninventory: "500",
          platform: "",
          stockarea: "",
          typeofshipping: "",
          stockquantity: ""

        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteRow(row, index) {
        this.dataList.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 0px;
  }

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
    right: 5em;
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

  .HotDate {
    height: 50px;
  }
</style>