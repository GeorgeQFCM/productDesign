<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-form :inline="true" :model="query" ref="queryMat" size="small" class="paddingStyle">
        <el-row>
          <el-col :span="9">
            <el-form-item prop="matCode">
              <el-input v-model="query.matCode" placeholder="请输入物料编码"></el-input>
            </el-form-item>
            <el-form-item prop="matStyle">
              <el-select placeholder="选择款式" v-model="query.matStyle" filterable clearable style="width:150px;">
                <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matSPUCode">
              <el-input v-model="query.matSPUCode" placeholder="请输入SPU编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-row>
              <el-form-item prop="radio">
                <el-radio v-model="query.radio" border label="1">本月实时统计</el-radio>
                <el-radio v-model="query.radio" border label="2">按月份统计</el-radio>
                <el-radio v-model="query.radio" border label="3">按季度统计</el-radio>
                <el-radio v-model="query.radio" border label="4">按年度统计</el-radio>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="日期" v-if="query.radio==1">
                <span>2021-06-01~2021-06-30</span>
              </el-form-item>
              <el-form-item label="月份" v-if="query.radio==2">
                <el-radio-group v-model="query.month">
                  <el-radio v-for="item in 5" :key="item" :label="item">{{item}}月</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="季度" v-if="query.radio==3">
                <el-radio-group v-model="query.quarter">
                  <el-radio v-for="item in 4" :key="item" :label="item">{{item}}季度</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="年度" v-if="query.radio==4">
                <el-date-picker v-model="query.year" type="year" placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-row style="margin-top: 10px" :gutter="5">
      <el-col :span="10">
        <el-card>
          <TeamAnalysisi ref="TeamAnalysisi"></TeamAnalysisi>
        </el-card>
        <el-card>
          <el-carousel trigger="click" height="368px" :autoplay="false" type="card">
            <el-carousel-item>
              <AmazonPlatform ref="AmazonPlatform"></AmazonPlatform>
            </el-carousel-item>
            <el-carousel-item>
              <LTPlatform ref="LTPlatform"></LTPlatform>
            </el-carousel-item>
            <el-carousel-item>
              <EbayPlatform ref="EbayPlatform"></EbayPlatform>
            </el-carousel-item>
          </el-carousel>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card>
          <el-table border stripe :data="dataList" v-loading="tableLoading" size="mini" height="630px">
            <el-table-column label="#" align="center" type="index">
            </el-table-column>
            <el-table-column label="物料编码" prop="materialcode" align="center" show-overflow-tooltip>
              <template slot="header">
                <div>
                  <span>物料编码</span>
                  <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                    <el-input size="mini" v-model="materialcodeQuery" placeholder="支持多条件过滤，例如北京 上海">
                      <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                      <div style="margin:5px 15px;">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                          全选
                        </el-checkbox>
                        <el-checkbox-group v-model="checkedMaterialcode" @change="handleCheckedMatCodeChange">
                          <el-checkbox style="display: block;margin-top:5px" v-for="item in matcodeList" :label="item"
                            :key="item">
                            {{item}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                    <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                      style=" background-color: #e9f1f6;margin-left:20px"></el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="事业部-Team" prop="BusinessTeam" align="center" show-overflow-tooltip>
              <template slot="header">
                <div>
                  <span>事业部-Team</span>
                  <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                    <el-input size="mini" v-model="BusinessTeamQuery" placeholder="支持多条件过滤，例如北京 上海">
                      <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                      <div style="margin:5px 15px;">
                        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1"
                          @change="handleCheckAllChange1">
                          全选
                        </el-checkbox>
                        <el-checkbox-group v-model="checkedBusinessTeam" @change="handleCheckedBusinessTeam">
                          <el-checkbox style="display: block;margin-top:5px" v-for="item in BusinessTeamList"
                            :label="item" :key="item">
                            {{item}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                    <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                      style=" background-color: #e9f1f6;margin-left:20px"></el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="平台-区域" prop="PlatformArea" align="center" show-overflow-tooltip>
              <template slot="header">
                <div>
                  <span>平台-区域</span>
                  <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                    <el-input size="mini" v-model="PlatformAreaQuery" placeholder="支持多条件过滤，例如北京 上海">
                      <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                    <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                      <div style="margin:5px 15px;">
                        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2"
                          @change="handleCheckAllChange2">
                          全选
                        </el-checkbox>
                        <el-checkbox-group v-model="checkedPlatformArea" @change="handleCheckedPlatformArea">
                          <el-checkbox style="display: block;margin-top:5px" v-for="item in PlatformAreaList"
                            :label="item" :key="item">
                            {{item}}</el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                    <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                      style=" background-color: #e9f1f6;margin-left:20px"></el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" prop="ApplyDate" align="center" show-overflow-tooltip>
              <template slot="header">
                <div>
                  <span>申请时间</span>
                  <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                    <el-date-picker v-model="ApplyDateQuery" type="daterange" range-separator="至"
                      start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                      style=" background-color: #e9f1f6;margin-left:20px"></el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="申请数量" prop="ApplyNumber" align="center" show-overflow-tooltip>
              <template slot="header">
                <div>
                  <span>申请数量</span>
                  <el-popover placement="bottom" title="筛选" width="400" trigger="click">

                    <el-input v-model="ApplyNumberQuery1" style="width:150px"></el-input>
                    <span>至</span>
                    <el-input v-model="ApplyNumberQuery2" style="width:150px"></el-input>

                    <el-button slot="reference" type="text" icon="el-icon-arrow-down"
                      style=" background-color: #e9f1f6;margin-left:20px"></el-button>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10, 15, 20, 50]"
            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页"
            :total="totalRows">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>



  </section>
</template>

<script>
  import TeamAnalysisi from './echartCompont/TeamAnalysisi.vue'
  import AmazonPlatform from './echartCompont/AmazonPlatform.vue'
  import LTPlatform from './echartCompont/LTPlatform.vue'
  import EbayPlatform from './echartCompont/EbayPlatform.vue'
  const matcodeOpt = ['P03K2J01', 'ATC210341']
  const BusinessTeamOpt = ['事业一部-Team1', '事业一部-Team2']
  const PlatformAreaOpt = ['Amazon-EU', 'Amazon-CA']
  export default {
    components: {
      TeamAnalysisi,
      AmazonPlatform,
      LTPlatform,
      EbayPlatform
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-17",
          endTime: "2021-06-18",
          describe: "第一版",
        },
        query: {
          year: "2021",
          radio: 1,
        },
        OptMatStyle: [],
        tableLoading: false,
        pageSize: 20,
        page: 1,
        totalRows: 20,
        dataList: [{
            materialcode: "P03K2J01",
            MaterialProperties: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
            PlatformArea: "Amazon-EU",
            BusinessTeam: "事业一部-Team1",
            ApplyNumber: "300",
            ApplyDate: "2021-06-11",
          },
          {
            materialcode: "ATC210341",
            MaterialProperties: "配件->平板电脑保护套->平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色-> -->(2pack)->Airtags 2021->V1",
            PlatformArea: "Amazon-CA",
            BusinessTeam: "事业一部-Team2",
            ApplyNumber: "400",
            ApplyDate: "2021-06-15",
          }
        ],
        materialcodeQuery: "",
        checkedMaterialcode: [],
        isIndeterminate: true,
        checkAll: false,
        matcodeList: matcodeOpt,

        BusinessTeamQuery: "",
        checkedBusinessTeam: [],
        isIndeterminate1: true,
        checkAll1: false,
        BusinessTeamList: BusinessTeamOpt,

        PlatformAreaQuery: "",
        checkedPlatformArea: [],
        isIndeterminate2: true,
        checkAll2: false,
        PlatformAreaList: PlatformAreaOpt,

        ApplyDateQuery: [],
        ApplyNumberQuery1: "",
        ApplyNumberQuery2: "",




      }
    },
    methods: {
      handleCheckAllChange(val) {
        this.checkedMaterialcode = val ? matcodeOpt : [];
        this.isIndeterminate = false;
      },
      handleCheckedMatCodeChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.matcodeList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.matcodeList.length;
      },
      handleCheckAllChange1(val) {
        this.checkedBusinessTeam = val ? BusinessTeamOpt : [];
        this.isIndeterminate1 = false;
      },
      handleCheckedBusinessTeam(value) {
        let checkedCount = value.length;
        this.checkAll1 = checkedCount === this.BusinessTeamList.length;
        this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.BusinessTeamList.length;
      },
      handleCheckAllChange2(val) {
        this.checkedPlatformArea = val ? PlatformAreaOpt : [];
        this.isIndeterminate2 = false;
      },
      handleCheckedPlatformArea(value) {
        let checkedCount = value.length;
        this.checkAll2 = checkedCount === this.PlatformAreaList.length;
        this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.PlatformAreaList.length;
      },
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    },

  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 0px;

  }

  .paddingStyle {
    padding: 20px 10px 0px 10px;

  }

  .el-carousel__item h3 {
    color: #f0fcff;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #fffffc;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #fffffc;
  }

  .el-carousel__item--card {
    width: 60%;
  }
</style>