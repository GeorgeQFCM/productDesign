<template>
  <!-- <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
    <el-form inline :model="QueryFrom" class="paddingStyle">
      <el-form-item label="物料编码">
        <el-input v-model="QueryFrom.materialcode" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="platform" label="平台" width="100"> </el-table-column>
      <el-table-column prop="countrycode" label="站点" width="100"> </el-table-column>
      <el-table-column prop="asin" label="ASIN">
        <template slot-scope="scope">
          <el-checkbox-group v-model="scope.row.checkList">
            <el-checkbox v-for="item in scope.row.asin " :key="item" :label="item"></el-checkbox>
          </el-checkbox-group>
        </template>
      </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </span>
  </el-dialog> -->
  <el-dialog title="新增" :visible.sync="dialogVisible" width="70%">
    <el-form inline :model="QueryFrom" class="paddingStyle">
      <el-form-item label="物料编码">
        <el-input v-model="QueryFrom.materialcode" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="平台">
        <el-input v-model="QueryFrom.platform" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="站点">
        <el-input v-model="QueryFrom.countryCode" clearable>
        </el-input>
      </el-form-item>
      <el-form-item label="asin">
        <el-input v-model="QueryFrom.asin" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchList">&nbsp;&nbsp;查&nbsp;&nbsp;询&nbsp;&nbsp;
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData2" border style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="materialcode" label="物料编码" show-overflow-tooltip align="center"></el-table-column>
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
        <el-table-column prop="saleDays" label="可售天数" show-overflow-tooltip align="center" width="150">
          <template slot="header" slot-scope="scope">
            <span>可售天数 (&lt;{{KSday}}天)</span>
          </template>

          <template slot-scope="scope">
            <span
              :class="scope.row.stockNum /scope.row.averageDailySales<KSday?'textColor':''">{{scope.row.stockNum /scope.row.averageDailySales}}</span>
          </template>
        </el-table-column>
    </el-table>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        QueryFrom: {
          materialcode: "",
        },
        tableData: [],
        tableData2: [{
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
        }],
        checkData: [],
        multipleSelection: []
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.tableData.forEach(x => {
          x.checkList = []
        })
        val.forEach(x => {
          x.checkList.push(...x.asin)
        })
        this.multipleSelection = val;
      },
      initData() {
        this.dialogVisible = true
        this.QueryFrom.materialcode = ""
        this.tableData = []
        this.checkData = []
      },
      searchList() {
        this.tableData = [{
            materialcode: "A3C210001",
            category: "3C周边-收纳保护",
            productname: "防丢器保护壳",
            style: "镶钻圆形款",
            mainmaterials: "锌合金",
            pattern: "无",
            companybrand: "TiMOVO",
            platform: "Amazon",
            countrycode: "US(北美)",
            asin: ["ASIN1", "ASIN2", "ASIN3"],
            checkList: []
          },
          {
            materialcode: "A3C210001",
            category: "3C周边-收纳保护",
            productname: "防丢器保护壳",
            style: "镶钻圆形款",
            mainmaterials: "锌合金",
            pattern: "无",
            companybrand: "TiMOVO",
            platform: "Amazon",
            countrycode: "UK(欧洲)",
            asin: ["ASIN4", "ASIN5", "ASIN6"],
            checkList: []
          },
          {
            materialcode: "A3C210001",
            category: "3C周边-收纳保护",
            productname: "防丢器保护壳",
            style: "镶钻圆形款",
            mainmaterials: "锌合金",
            pattern: "无",
            companybrand: "TiMOVO",
            platform: "Amazon",
            countrycode: "CA(北美)",
            asin: ["ASIN7", "ASIN8", "ASIN9"],
            checkList: []
          }
        ]
      },
      confirmAdd() {
        this.tableData.forEach(x => {
          x.checkList.forEach(l => {
            this.checkData.push({
              materialcode: x.materialcode,
              category: x.category,
              productname: x.productname,
              style: x.style,
              mainmaterials: x.mainmaterials,
              pattern: x.pattern,
              companybrand: x.companybrand,
              platform: x.platform,
              countrycode: x.countrycode,
              asin: l,
              typeofshipping: "",
              stockquantity: ""
            })
          })
        })
        this.$emit('func', this.checkData)
        console.log(JSON.stringify(this.checkData));
        this.dialogVisible = false
      },

    }
  }
</script>

<style>

</style>