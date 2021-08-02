<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card style="margin-top: 10px">
      <div style="margin:10px 0px 10px 10px">
        <el-button type="primary" @click="NewAdd" size="medium">新增</el-button>
        <el-button type="warning" size="medium">导入</el-button>
        <el-button type="primary" size="medium">保存</el-button>
        <el-button type="success" size="medium">提交</el-button>
      </div>
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table paddingStyle" ref="multipleTable"
        stripe :span-method="ObjectSpanMethod" @selection-change="handleSelectionChange" height="780px">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="物料编码" width="100" prop="materialcode" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" @click="showStock(scope.row)">{{scope.row.materialcode}}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="运营大类" width="100" prop="category" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品名称" width="100" prop="productname" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="款式" width="100" prop="style" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="主材料" width="100" prop="mainmaterials" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="图案" width="100px" prop="pattern" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="公司品牌" width="100" prop="companybrand" align="center" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="首单日期" prop="firstorderdate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="国内库存" prop="domesticstock" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="国外库存" prop="foreigninventory" align="center" show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column label="平台" prop="platform" align="center" clearable></el-table-column>
        <el-table-column label="站点" prop="countrycode" align="center"></el-table-column>
        <el-table-column label="ASIN" prop="asin" align="center"></el-table-column>

        <el-table-column label="建议运输方式" prop="typeofshipping" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.typeofshipping" placeholder="请选择" clearable>
              <el-option label="空运" value="空运"></el-option>
              <el-option label="海运" value="海运"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="备货申请数量" prop="stockquantity" align="center">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stockquantity" placeholder="请输入" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" title="删除" @click="deleteRow(scope.row,scope.$index)" icon="el-icon-delete">
            </el-button>
            <el-button type="text" icon="el-icon-view" @click="WatchExamine(scope.row)"></el-button>

          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <EmergencyStockAdd ref="EmergencyStockAdd" @func="getChildData"></EmergencyStockAdd>
    <InventoryQuantity ref="InventoryQuantity"></InventoryQuantity>

  </section>
</template>

<script>
  import EmergencyStockAdd from './components/EmergencyStockAdd';
  import InventoryQuantity from './components/InventoryQuantity'
  import ExamineCompont from './components/ExamineCompont.vue'
  export default {
    components: {
      EmergencyStockAdd,
      InventoryQuantity,
      ExamineCompont
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
        route: this.$route,
        tableLoading: false,
        QueryFrom: {
          materialcode: "",
        },
        dataList: [],
        multipleSelection: []
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
      getChildData(arr) {
        console.log(arr);
        this.dataList.push(...arr)
      },
      showStock() {
        this.$refs.InventoryQuantity.initData()
      },

      NewAdd() {
        this.$refs.EmergencyStockAdd.initData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      FilterData() {
        let spanOneArr = [];
        let concatOne = 0;
        this.dataList.forEach((item, index) => {
          if (index == 0) {
            spanOneArr.push(1)
          } else {
            if (
              item.materialcode === this.dataList[index - 1].materialcode &&
              item.category === this.dataList[index - 1].category &&
              item.productname === this.dataList[index - 1].productname &&
              item.style === this.dataList[index - 1].style &&
              item.mainmaterials === this.dataList[index - 1].mainmaterials &&
              item.pattern === this.dataList[index - 1].pattern &&
              item.companybrand === this.dataList[index - 1].companybrand &&
              item.platform === this.dataList[index - 1].platform &&
              item.countrycode === this.dataList[index - 1].countrycode) {
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
        if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 ||
          columnIndex === 6 || columnIndex === 7 || columnIndex === 8 || columnIndex === 9) {
          const _row = (this.FilterData(this.dataList).one)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      deleteRow(row, index) {
        this.dataList.splice(index, 1)
      }


    },
    created() {
      console.log(this.$route.query);
      this.dataList = [this.$route.query]
    },
    watch: {
      '$route'(to, from) {
        console.log(this.$route.query);
        this.dataList = [this.$route.query]
      }
    },
  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 0px;
  }

  .paddingStyle {
    padding: 20px 10px 0px 10px
  }
</style>