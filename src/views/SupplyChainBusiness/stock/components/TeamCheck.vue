<template>
  <div>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline>
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
              <!-- <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;事业部:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item> -->
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
              <!-- <el-form-item>
                <label slot="label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;team:</label>
                <el-input v-model="searchData.create_at"></el-input>
              </el-form-item> -->

              <el-form-item style="margin-left:52px ">
                <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;</el-button>
                <el-button type="warning" @click="clearList">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-button type="primary" size="medium">保存</el-button>
        <el-button type="success" size="medium">提交</el-button>
        <!-- <el-checkbox style="margin-left: 385px;" v-model="haichecked" @change="CheckedKongChange">批量空运</el-checkbox>
        <el-checkbox v-model="kongchecked" @change="CheckedHaiChange">批量海运</el-checkbox> -->
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" @select="checkChange" @select-all="selectAll"
        class="resource-table" :height="hasSearch ? '55vh' : 'calc(34vh - 20px)'" :span-method="objectSpanMethod"
        ref="multipleTable">
        <el-table-column label="物料编码" width="100" prop="matcode" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click.stop="showExplain(scope.row)">{{scope.row.matcode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="运营大类" prop="matOperateCate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品名称" prop="matProName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="款式" prop="matStyle" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="平台" width="100" prop="plat" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" width="100" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="ASIN" width="150" prop="asin" align="center" show-overflow-tooltip></el-table-column> -->
        <el-table-column type="selection" align="center" width="50"></el-table-column>
        <el-table-column label="建议运输方式" width="120" prop="transporttype" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover placement="right" popper-class="popverClass" width="400" trigger="click">
              <div class="recomend-box">
                <div class="recomend-formula">
                  <span>公&nbsp;式: |a*b*c|*d = {{recommendInfo.proposalnumber}}</span>
                  <ul>
                    <li><span>参&nbsp;数a:</span> 10</li>
                    <li><span>参&nbsp;数b:</span> 10</li>
                    <li><span>参&nbsp;数c:</span> 10</li>
                    <li>
                      <ul>
                        <li><span>参&nbsp;数e:</span> 10</li>
                        <li><span>参&nbsp;数f:</span> 10</li>
                      </ul>
                    </li>
                    <li><span>参&nbsp;数d:</span> 10</li>
                  </ul>
                </div>
                <div class="split"></div>
                <div class="filte-condition">
                  <span>过滤条件: </span>
                  <ul>
                    <li><span>条件一:</span> 10</li>
                    <li><span>条件二:</span> 10</li>
                    <li><span>条件三:</span> 10</li>
                  </ul>
                </div>
              </div>
              <el-button slot="reference" type="text" @click="showRecomendLog(scope.row)">
                {{scope.row.transporttype}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="推荐合计" prop="proposalnumber" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-popover placement="top" popper-class="popverClass" width="500" trigger="click">
              <table border="1">
                <caption>详细信息</caption>
                <thead>
                  <tr>
                    <td>站点</td>
                    <td>ASIN</td>
                    <td>建议运输方式</td>
                    <td>建议备货数量</td>
                    <!-- <td>预采购量</td> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,i) in infoList" :key="item.id">
                    <td rowspan="4" v-if="i%4 === 0">{{item.site}}</td>
                    <td rowspan="2" v-if="i%2 === 0">{{item.asin}}</td>
                    <td>{{item.transporttype}}</td>
                    <td>{{item.recommendStockNum}}</td>
                    <!-- <td>{{item.prePurchase}}</td> -->
                  </tr>
                </tbody>
              </table>
              <el-button slot="reference" type="text" @click="AllInfoShow(scope.row)">
                {{scope.row.proposalnumber}}</el-button>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="运营申请数量" prop="preStockNum" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="申请原因" align="center" prop="reason">
        </el-table-column>
        <el-table-column label="本地库存" prop="localNum" width="100" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="申请中" prop="apply" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购中" prop="purcharse" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="建议本次采购" prop="sujust" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="采购数量" width="100" prop="preStockNum1" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.preStockNum1"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="审核备注" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.beizhu"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <el-dialog title="详细信息" :visible.sync="explainVisible" width="60%" top="10vh">
      <div class="info-box">
        <span class="mat-title">分类属性:</span>
        <table border="1">
          <tr>
            <td>主材料</td>
            <td>{{matTableData[0].mainMateral}}</td>
            <td>图案</td>
            <td>{{matTableData[0].matPattern}}</td>
          </tr>
        </table>
      </div>
      <div class="info-box">
        <span class="mat-title">关键属性:</span>
        <table border="1">
          <tr>
            <td>公司品牌</td>
            <td>{{matTableData[0].comBrand}}</td>
            <td>适用品牌或对象</td>
            <td>{{matTableData[0].matBrand}}</td>
            <td>型号</td>
            <td>{{matTableData[0].matModel}}</td>
          </tr>
          <tr>
            <td>颜色</td>
            <td>{{matTableData[0].matColor}}</td>
            <td>尺码</td>
            <td>{{matTableData[0].matSize}}</td>
            <td>包装数量</td>
            <td>{{matTableData[0].matPackQty}}</td>
          </tr>
        </table>
      </div>
      <div class="info-box">
        <span class="mat-title">一般属性:</span>
        <table border="1">
          <tr>
            <td>适用机型</td>
            <td>{{matTableData[0].matCompatibleModel}}</td>
            <td>版本描述</td>
            <td>{{matTableData[0].matVersonDesc}}</td>
            <td>节日标签</td>
            <td>{{matTableData[0].matFestLabel}}</td>
            <td>季节标签</td>
            <td>{{matTableData[0].matSeasonLabel}}</td>
          </tr>

        </table>
      </div>
      <div class="info-box">
        <span class="mat-title">其他:</span>
        <table border="1">
          <tr>
            <td>MOQ</td>
            <td>{{matTableData[0].MOQ}}</td>
            <td>SPU</td>
            <td>{{matTableData[0].SPU}}</td>
            <td>NBDU</td>
            <td>{{matTableData[0].NBDU}}</td>
          </tr>
        </table>
      </div>
      <div class="mat-box">
        <span class="mat-title">库存信息:</span>
        <el-table :data="matTableData" border style="width: 100%">
          <el-table-column prop="useStock" label="可用库存">
          </el-table-column>
          <el-table-column prop="stockCry" label="供货周期">
          </el-table-column>
          <el-table-column prop="purchaseNum" label="采购未完成数量">
          </el-table-column>
          <el-table-column label="Amazon店铺即时库存总数" prop="AmaStockNum">
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
        </el-table>
      </div>
      <div class="mat-box">
        <span class="mat-title">销售信息:</span>
        <el-table :data="matTableData" border style="width: 100%">
          <el-table-column prop="firstDate" label="首单日期">
          </el-table-column>
          <el-table-column prop="amaSellNum" label="亚马逊可售数量">
          </el-table-column>
          <el-table-column prop="treeSellNum" label="30天销售数量">
          </el-table-column>
          <el-table-column prop="foueSellNum" label="14天销售数量">
          </el-table-column>
          <el-table-column prop="sevenSellNum" label="7天销售数量">
          </el-table-column>
          <el-table-column prop="sellDateNum" label="持续售卖天数">
          </el-table-column>
          <el-table-column prop="curPre" label="本月/上月">
          </el-table-column>
          <el-table-column prop="yeCurPre" label="去年本月/去年上月">
          </el-table-column>
          <el-table-column prop="daliySell" label="去日均销量">
          </el-table-column>

        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="explainVisible = false">取 消</el-button>
        <el-button type="primary" @click="explainVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
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
            matcode: "A123456",
            matOperateCate: "泡泡茶壶",
            matProName: "茶壶",
            matStyle: "泡泡",
            plat: "Amazon",
            site: "uk",
            area: "欧洲",
            proposalnumber: 500,
            localNum: 1500,
            preStockNum: 200,
            reason:"a原因",
            apply: 200,
            purcharse: 200,
            curApplyNum: 200,
            sujust: 200,
            isCheck: false,
            transporttype: "空运",
            recommendStockNum: 500,
          },
          {
            id: 4,
            matcode: "A123456",
            matOperateCate: "泡泡茶壶",
            matProName: "茶壶",
            matStyle: "泡泡",
            plat: "Amazon",
            site: "uk",
            area: "欧洲",
            proposalnumber: 500,
            localNum: 1500,
            preStockNum: 200,
            reason:"a原因",
            apply: 200,
            purcharse: 200,
            curApplyNum: 200,
            sujust: 200,
            isCheck: false,
            transporttype: "海运",
            recommendStockNum: 0,
          },
          {
            id: 5,
            matcode: "A123456",
            matOperateCate: "泡泡茶壶",
            matProName: "茶壶",
            matStyle: "泡泡",
            plat: "Amazon",
            site: "us",
            area: "北美",
            proposalnumber: 500,
            localNum: 1500,
            preStockNum: 200,
            reason:"a原因",
            apply: 200,
            purcharse: 200,
            curApplyNum: 200,
            sujust: 200,
            isCheck: false,
            transporttype: "空运",
            recommendStockNum: 0,
          },
          {
            id: 8,
            matcode: "A123456",
            matOperateCate: "泡泡茶壶",
            matProName: "茶壶",
            matStyle: "泡泡",
            plat: "Amazon",
            site: "us",
            area: "北美",
            proposalnumber: 500,
            localNum: 1500,
            preStockNum: 200,
            reason:"a原因",
            apply: 200,
            purcharse: 200,
            curApplyNum: 200,
            sujust: 200,
            isCheck: false,
            transporttype: "海运",
            recommendStockNum: 0,
          },
        ],
        tableList: [],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: '',
        multipleSelection: [

        ],
        infoList: [{
            id: 1,
            site: "UK",
            asin: "zcvxczv",
            transporttype: "海运",
            recommendStockNum: 500,
            prePurchase: 500
          },
          {
            id: 2,
            site: "UK",
            asin: "zcvxczv",
            transporttype: "空运",
            recommendStockNum: 500,
            prePurchase: 500
          },
          {
            id: 3,
            site: "UK",
            asin: "asdasd",

            transporttype: "海运",
            recommendStockNum: 500,
            prePurchase: 500
          },
          {
            id: 4,
            site: "UK",
            asin: "asdasd",

            transporttype: "空运",
            recommendStockNum: 500,
            prePurchase: 500
          }
        ],
        isShowCompanyAddEdit: false,
        isShowCompanyDetail: false,
        isShowConfigApp: false,
        recommendInfo: Object,
      }
    },
    created() {
      this.getData()
    },
    methods: {
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
      },
      handleChange(val) {
        this.hasSearch = !val.length
        console.log(val, "val");
      },
      showRecomendLog(row) {
        this.recommendInfo = row
        this.recommendLogVisble = true
      },
      showExplain(row) {
        this.explainVisible = true
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
      objectSpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 ||
          columnIndex === 5) {
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

<style>
  .popverClass {
    background-color: rgb(12, 12, 12) !important;
    color: #fff !important;
  }

</style>

<style lang="scss" scoped>
  // >>>.el-dialog__body {
  //   // height: 75vh;
  // }

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
