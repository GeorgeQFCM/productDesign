<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-row style="margin-top:5px">
      <el-form ref="form" size="small" :model="queryFrom" inline label-width="80px" class="formMargin">
        <el-row>
          <el-form-item prop="matCate" size="small">
            <el-select placeholder="选择类目" v-model="queryFrom.matCate" filterable clearable style="width:150px;">
              <el-option v-for="item in OptMatCate" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matOperateCate" size="small">
            <el-select placeholder="选择运营大类" v-model="queryFrom.matOperateCate" filterable clearable
              style="width:150px;">
              <el-option v-for="item in OptOperateCate" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matProName" size="small">
            <el-select placeholder="选择产品名称" v-model="queryFrom.matProName" filterable clearable style="width:150px;">
              <el-option v-for="item in OptMatProName" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matStyle" size="small">
            <el-select placeholder="选择款式" v-model="queryFrom.matStyle" filterable clearable style="width:150px;">
              <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matMainMaterial" size="small">
            <el-select placeholder="选择主材料" v-model="queryFrom.matMainMaterial" filterable clearable
              style="width:150px;">
              <el-option v-for="item in OptMatMainMaterial" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matPattern" size="small">
            <el-select placeholder="选择图案" v-model="queryFrom.matPattern" filterable clearable style="width:150px;">
              <el-option v-for="item in OptMatPattern" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matComBrand" size="small">
            <el-select placeholder="选择公司品牌" v-model="queryFrom.matComBrand" clearable filterable style="width:150px;">
              <el-option v-for="item in OptMatComBrand" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matBrand" size="small">
            <el-select placeholder="选择适用品牌或对象" v-model="queryFrom.matBrand" clearable filterable style="width:150px;">
              <el-option v-for="item in OptMatBrand" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matModel" size="small">
            <el-select placeholder="选择型号" v-model="queryFrom.matModel" clearable filterable style="width:150px;">
              <el-option v-for="item in OptMatModel" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="matCompatibleModel" size="small">
            <el-select placeholder="选择适用机型" multiple collapse-tags v-model="queryFrom.matCompatibleModel" filterable
              clearable style="width:150px;">
              <el-option v-for="item in OptMatCompatibleModel" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item prop="matSPUCode" size="small">
            <el-input placeholder="请输入SPU" v-model="matSPUCode" style="width: 310px;" clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="queryFrom.matCode" placeholder="请输入物料编码" clearable style="width: 310px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryFrom.matState" placeholder="请选择物料状态" clearable style="width:150px;">
              <el-option label="启用" value="启用"></el-option>
              <el-option label="禁用" value="禁用"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryFrom.transport" placeholder="请选择运输方式" clearable style="width:150px;">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="queryFrom.matEditState" placeholder="请选择设置状态" clearable style="width:150px;">
              <el-option label="未设置" value="未设置"></el-option>
              <el-option label="已设置" value="已设置"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="getPage(1)">搜索</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="23">
        <el-form size="small" inline>
          <el-form-item label="请选择运输方式">
            <el-select v-model="transport">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" size="small" @click="BatchEdit">批量修改</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" size="small">导出</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="small">导入</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="1">
        <el-button type="success" size="small">保存</el-button>
      </el-col>


    </el-row>
    <el-table :data="dataList" height="70vh" size="small" @cell-click="dblhandleCurrentChange" ref="dataListRef"
      :row-class-name="tableRowClassName" @selection-change="handleSelectionChange" class="MaterialSteps"
      highlight-current-row stripe border fit>
      <el-table-column type="selection" width="50" align="center"></el-table-column>
      <el-table-column width="50" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="未设置，默认海运" placement="top">
            <span v-if="scope.row.matEditState=='未设置'" style="color:red" class="el-icon-warning-outline"
              title="未设置，默认海运"></span>
          </el-tooltip>

        </template>

      </el-table-column>

      <el-table-column type="index" width="50" show-overflow-tooltip align="center" label="#"></el-table-column>
      <el-table-column prop="matSPUCode" label="SPU" width="100" sortable align="center"></el-table-column>
      <el-table-column prop="matCode" label="物料编码" width="100" sortable align="center"></el-table-column>
      <el-table-column prop="matName" label="物料名称" width="150" align="center"></el-table-column>
      <el-table-column prop="matState" label="物料状态" width="80" align="center"></el-table-column>
      <el-table-column prop="matName" label="物料属性" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.matCate}}->{{scope.row.matOperateCate}}->{{scope.row.matProName}}->{{scope.row.matStyle}}->{{scope.row.matMainMaterial}}->
            {{scope.row.matPattern}}->{{scope.row.matComBrand}}->{{scope.row.matBrand}}->{{scope.row.matModel}}->{{scope.row.matColor}}->
            {{scope.row.matSize}}->{{scope.row.matPackQty}}->{{scope.row.matCompatibleModel}}->{{scope.row.matVerson}}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="transport" label="运输方式" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.index === tabClickIndex && tabClickLabel === '运输方式'">
            <!-- <el-input size="small" v-model="scope.row.transport" v-focus @change="scope.row.transportisEdit=true"
              @blur="inputBlur" placeholder="运输方式"></el-input> -->

            <el-select v-focus size="small" filterable v-model="scope.row.transport" @change="selectChange(scope.row)">
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </span>
          <span v-else :style="{color:scope.row.transportisEdit==true?'red':'#606266'}">{{scope.row.transport}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :page-size="queryFrom.row" :page-sizes="[20,50,100]" :total="total"
        style="float:right;"></el-pagination>
    </el-col>

    <!-- 新增分类对话框   -->
    <el-dialog title="设置物料运输方式" :visible.sync="NewClassifyVisible" :close-on-press-escape="false" top="10vh"
      :close-on-click-modal="false" width="76%" @close="NewClassifyClose">
      <el-row>
        <el-col>
          <div style="float: left;display: inline-flex;">
            <el-row>
              <el-form :inline="true" :model="query" ref="queryMat" size="small" class="formMargin">
                <el-row>
                  <el-form-item prop="matCate" size="small">
                    <el-select placeholder="选择类目" v-model="query.matCate" filterable clearable style="width:150px;">
                      <el-option v-for="item in OptMatCate" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matOperateCate" size="small">
                    <el-select placeholder="选择运营大类" v-model="query.matOperateCate" filterable clearable
                      style="width:150px;">
                      <el-option v-for="item in OptOperateCate" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matProName" size="small">
                    <el-select placeholder="选择产品名称" v-model="query.matProName" filterable clearable
                      style="width:150px;">
                      <el-option v-for="item in OptMatProName" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matStyle" size="small">
                    <el-select placeholder="选择款式" v-model="query.matStyle" filterable clearable style="width:150px;">
                      <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matMainMaterial" size="small">
                    <el-select placeholder="选择主材料" v-model="query.matMainMaterial" filterable clearable
                      style="width:150px;">
                      <el-option v-for="item in OptMatMainMaterial" :key="item.name" :label="item.name"
                        :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matPattern" size="small">
                    <el-select placeholder="选择图案" v-model="query.matPattern" filterable clearable style="width:150px;">
                      <el-option v-for="item in OptMatPattern" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item prop="matComBrand" size="small">
                    <el-select placeholder="选择公司品牌" v-model="query.matComBrand" clearable filterable
                      style="width:150px;">
                      <el-option v-for="item in OptMatComBrand" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matBrand" size="small">
                    <el-select placeholder="选择适用品牌或对象" v-model="query.matBrand" clearable filterable
                      style="width:150px;">
                      <el-option v-for="item in OptMatBrand" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matModel" size="small">
                    <el-select placeholder="选择型号" v-model="query.matModel" clearable filterable style="width:150px;">
                      <el-option v-for="item in OptMatModel" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matColor" size="small">
                    <el-select placeholder="选择颜色" multiple collapse-tags v-model="query.matColor" filterable
                      style="width:150px;" clearable>
                      <el-option v-for="item in OptMatColor" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matSize" size="small">
                    <el-select placeholder="选择尺码" v-model="query.matSize" style="width:150px;" filterable clearable>
                      <el-option v-for="item in OptMatSize" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matPackQty" size="small">
                    <el-select placeholder="选择包装数量" v-model="query.matPackQty" style="width:150px;" filterable
                      clearable>
                      <el-option v-for="item in OptMatPackQty" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item prop="matCompatibleModel" size="small">
                    <el-select placeholder="选择适用机型" multiple collapse-tags v-model="query.matCompatibleModel" filterable
                      clearable style="width:150px;">
                      <el-option v-for="item in OptMatCompatibleModel" :key="item.name" :label="item.name"
                        :value="item.name"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matVerson" size="small">
                    <el-select placeholder="选择版本" v-model="query.matVerson" style="width:150px;" filterable clearable>
                      <el-option v-for="item in OptMatVerson" :key="item.name" :label="item.name" :value="item.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item prop="matSPUCode" size="small">
                    <el-input placeholder="SPU/物料编码" v-model="matSPUCode" style="width: 310px;" clearable>
                    </el-input>
                  </el-form-item>
                  <el-form-item size="small">
                    <slot></slot>
                  </el-form-item>
                </el-row>
              </el-form>
            </el-row>
          </div>
        </el-col>
        <el-col>
          <el-table :data="dataList" @selection-change="handleSelectionMaterial" height="480px" style="width: 100%;"
            size="mini" highlight-current-row stripe border fit ref="MulMaterialTable">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column property="matCode" label="物料编码" width="110" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="matName" label="物料名称" width="130" align="center"></el-table-column>
            <el-table-column prop="matCate" label="类目" width="70" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="运营大类" prop="matOperateCate" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="产品名称" prop="matProName" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="款式" prop="matStyle" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="主材料" prop="matMainMaterial" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="图案" prop="matPattern" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="公司品牌" prop="matComBrand" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="适用品牌或对象" prop="matBrand" align="center" sortable width="150"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="型号" prop="matModel" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="颜色" prop="matColor" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="尺码" prop="matSize" align="center" sortable width="80" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="包装数量" prop="matPackQty" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="适用机型" prop="matCompatibleModel" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="版本" prop="matVerson" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewClassifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddNewClassify">设 置</el-button>
      </span>
      <el-dialog width="30%" title="运输方式" :visible.sync="innerVisible" append-to-body>
        <el-form size="small">
          <el-form-item label="请选择运输方式">
            <el-select v-model="transport" clearable>
              <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="innerVisible = false">取 消</el-button>
          <el-button type="primary" @click="SumitSetting">设 置</el-button>
        </span>
      </el-dialog>
    </el-dialog>

    <el-dialog width="30%" title="批量修改" :visible.sync="BatchVisible" append-to-body>
      <el-form size="small">
        <el-form-item label="请选择运输方式">
          <el-select v-model="transport">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="BatchVisible = false">取 消</el-button>
        <el-button type="primary" @click="SumitSetting">设 置</el-button>
      </span>
    </el-dialog>

  </section>
</template>


<script>
  import tableDataJson from './Data.json'
  export default {
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
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-21",
          endTime: "2021-06-22",
          describe: "第一版",
        },
        options: ['空运', '海运'],
        queryFrom: {
          page: 1,
          row: 20,
          matCode: "",
          matEditAppState: "",
        },
        total: 1,

        tableData: [{
          matCode: "P03J5X01",
          matName: "MoKo 充电器",
          matCate: "电子",
          matOperateCate: "充电设备",
          matComBrand: "MoKo",
          matProName: "充电器",
          matBrand: "苹果",
          matModel: "apple pencil",
          matStyle: "屏显支座款",
          matColor: "黑色",
          matMainMaterial: "铝合金",
          matPattern: "无",
          matSize: "-",
          matPackQty: "(1pack)",
          matVerson: "V1",
          matCompatibleModel: "apple pencil",
          transport: "空运",
          area: "EU",



        }, ],
        editRows: [],
        NewClassifyVisible: false,
        dataList: [

        ],
        query: {},
        OptMatCate: [],
        OptOperateCate: [],
        OptMatProName: [],
        OptMatStyle: [],
        OptMatMainMaterial: [],
        OptMatPattern: [],
        OptMatComBrand: [],
        OptMatBrand: [],
        OptMatModel: [],
        OptMatColor: [],
        OptMatSize: [],
        OptMatPackQty: [],
        OptMatCompatibleModel: [],
        OptMatVerson: [],
        matSPUCode: "",
        innerVisible: false,
        transport: "海运",
        BatchVisible: false,
        tabClickIndex: null, // 点击的单元格
        tabClickLabel: '', // 当前点击的列名


      }
    },
    methods: {
      tableRowClassName({
        row,
        rowIndex
      }) {
        // 把每一行的索引放进row
        row.index = rowIndex
      },
      dblhandleCurrentChange(row, column, cell, event) {
        switch (column.label) {
          case "运输方式":
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
      selectChange(row) {
        console.log(row.transport);
        row.transportisEdit = true
        this.tabClickIndex = null
        this.tabClickLabel = ''
      },
      SettingTransport() {

        this.NewClassifyVisible = true
      },
      BatchEdit() {

        this.editRows.forEach((item, index) => {
          this.$nextTick(() => {
            this.$set(item, 'transport', this.transport)
            this.$set(item, 'transportisEdit', true)
          })
        })
        //this.$set(this.dataList, 0, this.dataList[0])
        this.dataList.__ob__.dep.notify()


      },
      handleSelectionMaterial() {},

      AddNewClassify() {
        this.innerVisible = true
      },
      SumitSetting() {
        this.innerVisible = false
        this.NewClassifyVisible = false
        this.BatchVisible = false
        this.$message.success("设置成功")
      },
      NewClassifyClose() {},

      editEvent(row, ) {
        this.NewClassifyVisible = true
      },
      //删除
      deleteEvent(row) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      DeleteEditApply(row) {
        this.QueryPage()
      },
      handleCurrentChange(val) {
        this.queryFrom.page = val;
        this.getPage(val);
      },

      handleSizeChange(val) {
        this.queryFrom.row = val;
        this.getPage(this.queryFrom.page);
      },
      getPage(page) {
        this.queryFrom.page = page
        this.QueryPage()
      },
      QueryPage() {

      },



      //勾选
      handleSelectionChange(seletion) {
        this.editRows = seletion
      },



    },
    mounted() {
      this.dataList = tableDataJson.materialdata.rows
      this.dataList.forEach((item, index) => {
        if (index > 6) {
          item.matEditState = "未设置"
          item.matState = ""
          item.matSPUCode = "A12345"
        } else {
          item.matEditState = "已设置"
          item.transport = "空运"
          item.matState = "启用"
          item.stockState = "已补货"
          item.matSPUCode = "A12345"
        }
      });


    }
  }
</script>

<style lang="less" scoped>
  .MaterialSteps {
    width: 100%;
    margin-top: 10px;

    .ebmsIcon {
      width: 1.2em;
      height: 1.2em;
      cursor: pointer;
      fill: #0066e4;
    }
  }

  /deep/.el-form-item--mini.el-form-item {
    margin-bottom: 5px;
  }



  /deep/.formitemClass {
    border-bottom: 2px solid #1685a9 !important;
    width: 22%;
  }

  .el-button--text {
    color: #1e354c;
  }

  .span {
    width: 220px;
  }

  .formMargin {

    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 10px;
    }
  }
</style>