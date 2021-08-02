<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-form inline :model="queryFrom" size="small">
        <el-form-item>
          <el-select v-model="queryFrom.department" placeholder="请选择事业部">
            <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.team" placeholder="请选择Team组">
            <el-option v-for="item in options2" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker v-model="queryFrom.Year" type="year" value-format="yyyy" :clearable="false"
            placeholder="请选择年份"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.Mold" placeholder="请选择类型">
            <el-option v-for="item in MoldOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="getPage">查询</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input placeholder="请输入物料款式" v-model="matStyle" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-table border :data="dataList" stripe height="350" highlight-current-row
            @current-change="handleCurrentChange" size="mini" style="z-index:2">
            <el-table-column label="物料属性" prop="material" align="center" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="20">
          <YearAnalys ref="YearAnalys"></YearAnalys>
        </el-col>
      </el-row>
    </el-card>
    <!-- <el-card style="margin-top:5px">
      <YearbyYearAnalys ref="YearbyYearAnalys"></YearbyYearAnalys>
    </el-card> -->
    <el-card style="margin-top:5px">
      <YearbyYearAnalys2 ref="YearbyYearAnalys2"></YearbyYearAnalys2>
    </el-card>
  </div>
</template>

<script>
  import YearAnalys from './echartCompont/YearAnalys.vue'

  // import YearbyYearAnalys from './echartCompont/YearbyYearAnalys.vue'
  import YearbyYearAnalys2 from './echartCompont/YearbyYearAnalys2.vue'
  export default {
    components: {
      YearAnalys,
      // YearbyYearAnalys,
      YearbyYearAnalys2
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
        queryFrom: {
          department: "事业一部",
          team: "Team1",
          Year: "2021",
          Mold: "月份",
        },
        MoldOpt: [{
          value: "周",
          label: "周"
        }, {
          value: "月份",
          label: "月份"
        }, {
          value: "季度",
          label: "季度"
        }],
        options: ["事业一部", "事业二部", "事业三部", "事业四部", "事业五部"],
        options2: ["Team1", "Team2", "Team10"],
        dataList: [],
        currentRow: null,
        matStyle: ""


      }
    },
    methods: {
      getPage() {
        this.$refs.YearAnalys.getPage(this.queryFrom, 'default')
        // this.$refs.YearbyYearAnalys.getPage()
        this.$refs.YearbyYearAnalys2.getPage()
        this.dataList = [{
            material: "电子->充电设备->充电器->屏显支座款->铝合金-> 无"
          },
          {
            material: "配件->智能手表->手表表带->双色NK运动->硅胶-> 无"
          },
          {
            material: "配件->智能手表->手表表带->双色NK运动->硅胶-> 无"
          },
          {
            material: "配件->智能手表->手表表带->双色NK运动->硅胶-> 无"
          },
          {
            material: "配件->智能手表->手表表带->双色NK运动->硅胶-> 无"
          },
          {
            material: "配件->平板电脑保护套->平板皮套->电压款-三折半透->PC"
          },
          {
            material: "运动->运动户外类-运动->平板防水袋->佩戴式->PVC-> 无"
          },
          {
            material: "运动->运动户外类-运动->平板防水袋->佩戴式->PVC-> 无"
          },
        ]
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        this.$refs.YearAnalys.getPage(this.queryFrom, 'current')
      },


    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-table--striped .el-table__body tr.el-table__row--striped.current-row td {
    background-color: #56a5ff;
  }

  /deep/.el-table__body tr.current-row>td {
    background-color: #56a5ff;
  }
</style>