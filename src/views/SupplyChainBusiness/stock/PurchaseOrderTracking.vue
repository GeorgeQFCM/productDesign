<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-form :inline="true" :model="query" ref="queryMat" size="small">
          <el-form-item label="物料编码">
            <el-input v-model="query.matCode" clearable></el-input>
          </el-form-item>
          <el-form-item label="交货日期">
            <el-date-picker v-model="query.deliveryDate" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-card>

    <el-card style="margin-top: 10px">
      <el-table border :data="dataList" stripe v-loading="tableLoading" height="650" :span-method="ObjectSpanMethod"
        ref="multipleTable">
        <el-table-column label="需求部门" width="100" prop="department" align="center" show-overflow-tooltip>
          <template slot="header">
            <div>
              <span>需求部门</span>
              <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                <el-input size="mini" v-model="DepartmentQuery" placeholder="支持多条件过滤，例如北京 上海"></el-input>
                <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                  <div style="margin:5px 15px;">
                    <el-checkbox :indeterminate="isIndeterminateDepartment" v-model="DepartmentCheckAll1"
                      @change="handleCheckAlDepartment">
                      全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedDepartment" @change="handleCheckedDepartment">
                      <el-checkbox style="display: block;margin-top:5px" v-for="item in DepartmentList" :label="item"
                        :key="item">
                        {{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <el-button slot="reference" type="text" icon="el-icon-arrow-down" style=" background-color: #e9f1f6;">
                </el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="需求Team" width="120" prop="team" align="center" show-overflow-tooltip>
          <template slot="header">
            <div>
              <span>需求Team</span>
              <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                <el-input size="mini" v-model="TeamQuery" placeholder="支持多条件过滤，例如北京 上海"></el-input>
                <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                  <div style="margin:5px 15px;">
                    <el-checkbox :indeterminate="isIndeterminateTeam" v-model="TeamCheckAll1"
                      @change="handleCheckAlTeam">
                      全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedTeam" @change="handleCheckedTeam">
                      <el-checkbox style="display: block;margin-top:5px" v-for="item in TeamList" :label="item"
                        :key="item">
                        {{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <el-button slot="reference" type="text" icon="el-icon-arrow-down" style=" background-color: #e9f1f6;">
                </el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料编码" width="100" prop="matCode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="物料名称" width="120" prop="matProName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="规格型号" prop="matModeSpec" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请日期" width="100" prop="applyDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请数量" width="100" prop="applyCount" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="订单编号" width="100" prop="orderNumber" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="下单日期" width="100" prop="orderDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="供应商" width="100" prop="supplier" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="采购数量" width="100" prop="qurchaseQuantity" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="期望交期" width="100" prop="deliverydate" align="center"></el-table-column>

        <el-table-column label="交货日期" width="100" prop="deliveryDate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="已入库数量" width="100" prop="stockQuantity" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="剩余数量" width="100" prop="remainingQuantity" align="center" show-overflow-tooltip>
        </el-table-column>

      </el-table>
      <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>


  </div>
</template>

<script>
  const DepartmentOpt = ["事业一部", "事业二部", ]
  const TeamOpt = ["Team1", "Team4", "Team10"]
  export default {
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-15",
          endTime: "2021-06-16",
          describe: "第一版;7.29增加期望交期需求",
        },
        query: {},
        dataList: [{
            department: "事业一部",
            team: "Team1",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "300",
            orderNumber: "DD-001",
            orderDate: "2021-06-17",
            supplier: "超级供应商",
            qurchaseQuantity: "100",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-18",
            stockQuantity: "50",
            remainingQuantity: "50"
          },
          {
            department: "事业一部",
            team: "Team1",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "300",
            orderNumber: "DD-002",
            orderDate: "2021-06-17",
            supplier: "超级供应商",
            qurchaseQuantity: "100",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-18",
            stockQuantity: "50",
            remainingQuantity: "50"
          },
          {
            department: "事业一部",
            team: "Team1",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "300",
            orderNumber: "DD-003",
            orderDate: "2021-06-17",
            supplier: "无敌供应商",
            qurchaseQuantity: "100",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-19",
            stockQuantity: "50",
            remainingQuantity: "50"
          },
          {
            department: "事业一部",
            team: "Team10",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "300",
            orderNumber: "FF-001",
            orderDate: "2021-06-17",
            supplier: "无敌供应商",
            qurchaseQuantity: "300",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-20",
            stockQuantity: "0",
            remainingQuantity: "300"
          },
          {
            department: "事业二部",
            team: "Team4",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "500",
            orderNumber: "GG-001",
            orderDate: "2021-06-19",
            supplier: "巅峰供应商",
            qurchaseQuantity: "200",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-25",
            stockQuantity: "100",
            remainingQuantity: "100"
          },
          {
            department: "事业二部",
            team: "Team4",
            matCode: "ATC210398",
            matProName: "平板皮套",
            matModeSpec: "LG G Pad 8.3 电压轻壳款-三折 PC 无 花团 黄色 (1pack) 标准版",
            applyDate: "2021-06-16",
            applyCount: "500",
            orderNumber: "GG-002",
            orderDate: "2021-06-19",
            supplier: "巅峰供应商",
            qurchaseQuantity: "300",
            deliverydate: "2021-07-29",
            deliveryDate: "2021-06-25",
            stockQuantity: "100",
            remainingQuantity: "200"
          },

        ],
        DepartmentQuery: "",
        checkedDepartment: [],
        isIndeterminateDepartment: true,
        DepartmentCheckAll1: false,
        DepartmentList: DepartmentOpt,

        TeamQuery: "",
        checkedTeam: [],
        isIndeterminateTeam: true,
        TeamCheckAll1: false,
        TeamList: TeamOpt,

      }
    },

    methods: {
      handleCheckAlDepartment(val) {
        this.checkedDepartment = val ? DepartmentOpt : [];
        this.isIndeterminateDepartment = false;
      },
      handleCheckedDepartment(value) {
        let checkedCount = value.length;
        this.DepartmentCheckAll1 = checkedCount === this.DepartmentList.length;
        this.isIndeterminateDepartment = checkedCount > 0 && checkedCount < this.DepartmentList.length;
      },
      handleCheckAlTeam(val) {
        this.checkedTeam = val ? TeamOpt : [];
        this.isIndeterminateTeam = false;
      },
      handleCheckedTeam(value) {
        let checkedCount = value.length;
        this.TeamCheckAll1 = checkedCount === this.TeamList.length;
        this.isIndeterminateTeam = checkedCount > 0 && checkedCount < this.TeamList.length;
      },




      FilterData() {
        let spanOneArr = [];
        let concatOne = 0;
        this.dataList.forEach((item, index) => {
          if (index == 0) {
            spanOneArr.push(1)
          } else {
            if (
              item.department === this.dataList[index - 1].department &&
              item.team === this.dataList[index - 1].team &&
              item.matCode === this.dataList[index - 1].matCode &&
              item.matProName === this.dataList[index - 1].matProName &&
              item.matModeSpec === this.dataList[index - 1].matModeSpec &&
              item.applyDate === this.dataList[index - 1].applyDate &&
              item.applyCount === this.dataList[index - 1].applyCount) {
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
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3 || columnIndex === 4 ||
          columnIndex === 5 || columnIndex === 6) {
          const _row = (this.FilterData(this.dataList).one)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },


      handleChange(val) {
        this.hasSearch = !val.length
        console.log(val, "val");
      },


      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },

      // 当前页码修改时
      handleCurrentChange(page) {
        this.page = page

      },
      // 当前页数修改时
      handleSizeChange(pageSize) {
        this.pageSize = pageSize

      },
    },
  }
</script>

<style lang="scss" scoped>


</style>