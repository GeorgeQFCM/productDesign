<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-form ref="form" size="small" :model="queryFrom" inline label-width="80px" class="formMargin">
      <el-row style="margin-top:5px">
        <el-form-item>
          <el-input v-model="queryFrom.materialcode" placeholder="请输入物料编码" clearable></el-input>
        </el-form-item>
        <el-form-item prop="matSPUCode" size="small">
          <el-input placeholder="请输入SPU" v-model="queryFrom.matSPUCode" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.countryCode" placeholder="请选择站点" clearable filterable>
            <el-option v-for="item in OptCountryCodeList" :key="item.countryCode" :label="item.countryCode"
              :value="item.countryCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="asin" size="small">
          <el-input placeholder="请输入ASIN" v-model="queryFrom.asin" clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.stockState" placeholder="请选择处理状态" clearable style="width:150px;">
            <el-option label="已处理" value="已处理"></el-option>
            <el-option label="未处理" value="未处理"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <button class='bttn-fill bttn-md bttn-primary' @click="getPage">
            <svg-icon icon-class="search" className="search-icon" />搜索</button>
        </el-form-item>
        <el-form-item prop="asin" size="small">
          <button class='bttn-fill bttn-md bttn-warning' @click="getPage2()">
            <svg-icon icon-class="search" className="search-icon" />搜索预警数据</button>
        </el-form-item>
      </el-row>
      <el-row>

        <el-form-item>
          <!-- <button class='bttn-fill bttn-md bttn-success' @click="showSalesAlert=true">
            <svg-icon icon-class="edit" className="search-icon" />设置预警阈值</button> -->
          <button class='bttn-fill bttn-md bttn-success'>
            <svg-icon icon-class="download" />导出</button>
        </el-form-item>
      </el-row>
    </el-form>
    <el-row>
      <el-table border highlight-current-row height="700" size="mini" :data="tableData" stripe>
        <el-table-column type="index" width="50" show-overflow-tooltip align="center" label="序号"></el-table-column>
        <el-table-column prop="materialcode" label="物料编码" width="100" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="team" label="Team" show-overflow-tooltip align="center"></el-table-column>
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
        <el-table-column prop="elePlatformName" width="160" label="平台-站点-Asin" show-overflow-tooltip align="center">
          <template slot-scope="scope">
            <span>{{scope.row.platform}}-{{scope.row.countrycode}}-{{scope.row.asin}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="stockNum" label="平台库存数量" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="averageDailySales" label="日均销量" show-overflow-tooltip align="center">
        </el-table-column>
        <el-table-column prop="saleDays" label="可售天数" show-overflow-tooltip align="center" width="120">
          <template slot="header" slot-scope="scope">
            <span>可售天数 (&lt;{{KSday}}天)</span>
          </template>
          <template slot-scope="scope">
            <span
              :class="scope.row.stockNum /scope.row.averageDailySales<KSday?'textColor':''">{{scope.row.stockNum /scope.row.averageDailySales}}</span>
          </template>
        </el-table-column>
        <el-table-column label="Amazon店铺即时库存总数" width="120" prop="amazoninventory" align="center"></el-table-column>
        <el-table-column label="国内仓已调拨未发货数量合计" width="120" prop="warehousetotal" align="center"></el-table-column>
        <el-table-column label="海外仓库存数量合计" width="100" prop="overseasquantity" align="center"></el-table-column>
        <el-table-column label="海外仓在途数量合计" width="100" prop="overseasquantity2" align="center"></el-table-column>
        <el-table-column label="采购未完成数量合计" width="100" prop="purchaseunfinishedtotal" align="center"></el-table-column>

        <!-- <el-table-column prop="processingStatus" label="处理状态" show-overflow-tooltip align="center"></el-table-column> -->
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" :page-size="queryFrom.Row" :page-sizes="[20,50,100]" :total="total"
          style="float:right;"></el-pagination>
      </el-col>
    </el-row>


    <el-dialog title="紧急备货" :visible.sync="showEdit" :close-on-click-modal="false" width="30%" center>
      <!--
        <el-table border :data="EdataList" class="resource-table paddingStyle" ref="multipleTable" stripe height="300">
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
      </el-table>
      -->
      <el-form :model="Eform" size="small" class="EformClass" label-width="110px" label-position="right">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="物料编码:">
              <span class="spanItemClass">{{Eform.materialcode}}</span>
            </el-form-item>
            <el-form-item label="运营大类:">
              <span class="spanItemClass">{{Eform.category}}</span>
            </el-form-item>
            <el-form-item label="产品名称:">
              <span class="spanItemClass">{{Eform.productname}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">款&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;式:</label>
              <span class="spanItemClass">{{Eform.productname}}</span>
            </el-form-item>
            <el-form-item label="主材料:">
              <label slot="label">主&nbsp;&nbsp;材&nbsp;&nbsp;料:</label>
              <span class="spanItemClass">{{Eform.mainmaterials}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图案:">
              <label slot="label">图&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;案:</label>
              <span class="spanItemClass">{{Eform.pattern}}</span>
            </el-form-item>
            <el-form-item label="公司品牌:">
              <span class="spanItemClass">{{Eform.companybrand}}</span>
            </el-form-item>
            <el-form-item label="平台:">
              <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台:</label>
              <span class="spanItemClass">{{Eform.platform}}</span>
            </el-form-item>
            <el-form-item label="站点:">
              <label slot="label">站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点:</label>
              <span class="spanItemClass">{{Eform.countrycode}}</span>
            </el-form-item>
            <el-form-item label="ASIN:">
              <label slot="label">A&nbsp;&nbsp;S&nbsp;&nbsp;I&nbsp;&nbsp;N:</label>
              <span class="spanItemClass">{{Eform.asin}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-top:10px;border-top:1px solid #4f455c;">
          <el-col :span="12">
            <el-form-item label="运输方式:">
              <el-select v-model="Eform.typeofshipping" placeholder="请选择" clearable style=" width: 120px;">
                <el-option label="空运" value="空运"></el-option>
                <el-option label="海运" value="海运"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="申请数量:">
              <el-input v-model="Eform.stockquantity" placeholder="请输入" clearable style=" width: 120px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="showEdit = false">取
          消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="showEdit = false">提 交</button>
      </div>
    </el-dialog>

    <el-dialog title="销售预警设置" :visible.sync="showSalesAlert" :close-on-click-modal="false" width="20%" center>
      <el-form>
        <el-form-item label-width="80px" label="可售天数">
          <el-input style="width:200px;" v-model="KSday">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="showSalesAlert = false">取
          消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="showSalesAlert = false">确 定</button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import tableDataJson from './Data.json'
  import {
    isEmpty
  } from '@/utils/index'
  const dataList = [{
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "US",
      asin: "ASIN1",
      stockNum: 100,
      averageDailySales: 25,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 200,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 100,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 150,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 50,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 150,
          suggest: "紧急备货"
        },
      ]
    },
    {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "US",
      asin: "ASIN2",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 50,
      averageDailySales: 25,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",


      list: [{
          type: "本地库存",
          number: 200,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 100,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 150,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 50,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 150,
          suggest: "紧急备货"
        },
      ]

    },
    {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "US",
      asin: "ASIN3",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 100,
      averageDailySales: 10,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 200,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 100,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 150,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 50,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 150,
          suggest: "紧急备货"
        },
      ]
    },
    {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "UK",
      asin: "ASIN4",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 200,
      averageDailySales: 10,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 200,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 100,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 150,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 50,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 150,
          suggest: "紧急备货"
        },
      ]
    },
    {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "UK",
      asin: "ASIN5",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 200,
      averageDailySales: 5,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 150,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 60,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 80,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 30,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 0,
          suggest: "紧急备货"
        },
      ]
    }, {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "UK",
      asin: "ASIN6",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 150,
      averageDailySales: 5,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 150,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 60,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 80,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 30,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 0,
          suggest: "紧急备货"
        },
      ]
    }, {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "CA",
      asin: "ASIN7",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 150,
      averageDailySales: 2,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "未处理",
      list: [{
          type: "本地库存",
          number: 150,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 60,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 80,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 30,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 0,
          suggest: "紧急备货"
        },
      ]
    }, {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "CA",
      asin: "ASIN8",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 100,
      averageDailySales: 2,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "已处理",
      list: [{
          type: "本地库存",
          number: 150,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 60,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 80,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 30,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 0,
          suggest: "紧急备货"
        },
      ]
    }, {
      materialcode: "A3C210001",
      team: 'Team1',
      category: "3C周边-收纳保护",
      productname: "防丢器保护壳",
      style: "镶钻圆形款",
      mainmaterials: "锌合金",
      pattern: "无",
      companybrand: "TiMOVO",
      platform: "Amazon",
      countrycode: "CA",
      asin: "ASIN9",
      typeofshipping: "",
      stockquantity: "",
      stockNum: 150,
      averageDailySales: 2,
      processingStatus: "未处理",
      amazoninventory: "500",
      warehousetotal: "400",
      overseasquantity: "300",
      overseasquantity2: "200",
      purchaseunfinishedtotal: "150",
      processingStatus: "已处理",
      list: [{
          type: "本地库存",
          number: 150,
          suggest: "本地发货"
        },
        {
          type: "英国仓",
          number: 60,
          day: "",
          suggest: "海外仓发货"
        },
        {
          type: "德国仓",
          number: 80,
          suggest: "海外仓发货"
        },
        {
          type: "未入库数量",
          number: 30,
          suggest: "催货"
        },
        {
          type: "缺失数量",
          number: 0,
          suggest: "紧急备货"
        },
      ]
    }
  ]
  export default {
    mounted() {
      this.OptCountryCodeList = tableDataJson.CoutryCode
    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-28",
          endTime: "2021-06-28",
          describe: "第二版",

        },
        OptCountryCodeList: [],
        KSday: 30,
        queryFrom: {
          Page: 1,
          Row: 20
        },
        total: 1,
        tableData: dataList,
        showEdit: false,
        EdataList: [],
        showSalesAlert: false,
        Eform: {}
      }
    },
    methods: {

      getPage() {
        if (!isEmpty(this.queryFrom.asin)) {
          this.tableData = [{
            materialcode: "A3C210001",
            team: 'Team1',
            category: "3C周边-收纳保护",
            productname: "防丢器保护壳",
            style: "镶钻圆形款",
            mainmaterials: "锌合金",
            pattern: "无",
            companybrand: "TiMOVO",
            platform: "Amazon",
            countrycode: "US",
            asin: "ASIN1",
            stockNum: 100,
            averageDailySales: 25,
            processingStatus: "未处理",
            amazoninventory: "500",
            warehousetotal: "400",
            overseasquantity: "300",
            overseasquantity2: "200",
            purchaseunfinishedtotal: "150",
            processingStatus: "未处理",
            list: [{
                type: "本地库存",
                number: 200,
                suggest: "本地发货"
              },
              {
                type: "英国仓",
                number: 100,
                day: "",
                suggest: "海外仓发货"
              },
              {
                type: "德国仓",
                number: 150,
                suggest: "海外仓发货"
              },
              {
                type: "未入库数量",
                number: 50,
                suggest: "催货"
              },
              {
                type: "缺失数量",
                number: 150,
                suggest: "紧急备货"
              },
            ]
          }]
        } else {
          this.tableData = dataList
        }
      },
      getPage2() {
        this.tableData = dataList.filter(x => {
          let dat = x.stockNum / x.averageDailySales
          return dat < this.KSday
        })


      },
      suggestClick(val, index, num) {
        if (val == '紧急备货') {
          this.EdataList = [this.tableData[index]]
          this.Eform = this.tableData[index]
          this.EdataList[0].typeofshipping = "海运"
          this.EdataList[0].stockquantity = num
          this.showEdit = true

          // this.$router.push({
          //   path: '/Stock/EmergencyStock',
          //   query: this.tableData[index]
          // })
        }
      },
      handleCurrentChange(val) {
        this.queryFrom.page = val;
        this.getPage(val);
      },

      handleSizeChange(val) {
        this.queryFrom.row = val;
        this.getPage(this.queryFrom.page);
      },
    }

  }
</script>




<style lang="scss" scoped>
  .textColor {
    color: red
  }

  /deep/ .EformClass {
    .el-form-item {
      margin-bottom: 5px;

      .el-form-item__label {
        color: #0f2350;
        font-weight: lighter;

      }

      .spanItemClass {
        color: #203744;
        display: flex;
        width: 120px;
        line-height: 30px;



      }
    }



  }
</style>