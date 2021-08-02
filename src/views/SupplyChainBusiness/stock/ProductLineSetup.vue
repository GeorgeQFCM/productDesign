<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-row>
      <el-form ref="form" size="small" :model="queryFrom" inline label-width="80px">
        <el-form-item>
          <el-select v-model="queryFrom.matCate" placeholder="请选择类目" clearable filterable>
            <el-option v-for="item in OptMatCateList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.matOperateCate" placeholder="请选择运营大类" clearable filterable>
            <el-option v-for="item in OptOperateCateList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.matComBrand" placeholder="请选择公司品牌" clearable filterable>
            <el-option v-for="item in OptMatComBrandList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.elePlatformName" placeholder="请选择平台" clearable filterable>
            <el-option v-for="item in OptElePlatformNameList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.area" clearable placeholder="请选择区域" filterable>
            <el-option v-for="item in OptAreaList" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="queryFrom.countryCode" placeholder="请选择站点" clearable filterable>
            <el-option v-for="item in OptCountryCodeList" :key="item.countryCode" :label="item.countryCode"
              :value="item.countryCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="queryFrom.name" placeholder="请输入事业部经理/Team主管"></el-input>
        </el-form-item>
        <el-form-item>
          <button class='bttn-fill bttn-md bttn-primary' @click="getPage(1)">
            <svg-icon icon-class="search" className="search-icon" />搜索</button>
        </el-form-item>

      </el-form>
    </el-row>
    <el-row>
      <button class='bttn-fill bttn-md bttn-success' @click="settingPerson">
        <svg-icon icon-class="edit" />分配</button>
      <button class='bttn-fill bttn-md bttn-royal' style="margin-left:10px">
        <svg-icon icon-class="upload" />导入</button>
      <button class='bttn-fill bttn-md bttn-warning' style="margin-left:10px">
        <svg-icon icon-class="download" />导出</button>
    </el-row>

    <el-table class="tableBox" border highlight-current-row ref="xTable" height="700" size="mini" :data="tableData"
      stripe>
      <el-table-column type="index" width="50" show-overflow-tooltip align="center" label="序号"></el-table-column>
      <el-table-column prop="matCate" label="类目" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="matOperateCate" label="运营大类" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="matComBrand" label="公司品牌" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="elePlatformName" label="平台" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="area" label="区域" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="business" label="事业部" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="team" label="Team" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="operater" label="运营人员" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="productPerson" label="产品线负责人" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="teamP" label="Team主管" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="department" label="事业部经理" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="active" label="操作" width="100">
        <template slot-scope="scope">
          <button class='bttn-stretch bttn-md bttn-primary' title="编辑" @click="editEvent(scope.row)">
            <svg-icon icon-class="edit" /></button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" :page-size="queryFrom.Row" :page-sizes="[20,50,100]" :total="total"
        style="float:right;"></el-pagination>
    </el-col>

    <el-dialog title="产品线分配" :visible.sync="showEdit" :close-on-click-modal="false" width="70%" center
      @close='DialogClose'>
      <button class='bttn-fill bttn-md bttn-primary' style="margin-bottom:10px" @click="handelApplyAdd">
        <svg-icon icon-class="add" />增加</button>
      <button class='bttn-fill bttn-md bttn-success' style="margin-bottom:10px;margin-left:10px" @click="autoAnalysis">
        <svg-icon icon-class="add" />自动分析</button>
      <el-table :data="SetList" height="600" highlight-current-row tooltip-effect="dark" size="small" border fit>
        <el-table-column type="index" width="50" align="center"></el-table-column>
        <el-table-column prop="matCate" label="类目" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.matCate" clearable size="small" @change="matCateChange(scope)" filterable>
              <el-option v-for="item in OptMatCateList" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="matOperateCate" label="运营大类" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.matOperateCate" clearable size="small" filterable>
              <el-option v-for="item in OptOperateCateList" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="matComBrand" label="公司品牌" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.matComBrand" clearable size="small" filterable>
              <el-option v-for="item in OptMatComBrandList" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="elePlatformName" label="平台" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.elePlatformName" clearable size="small" filterable>
              <el-option v-for="item in OptElePlatformNameList" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="area" label="区域" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.area" clearable size="small" filterable>
              <el-option v-for="item in OptAreaList" :key="item.name" :label="item.name" :value="item.name">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="事业部" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.department" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="team" label="Team" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.team" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in TeamList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="countryCode" label="运营人员" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.operater" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="countryCode" label="产品线负责人" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.productPerson" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="team" label="Team主管" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.team" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in TeamList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="department" label="事业部经理" align="center">
          <template slot-scope="scope">
            <el-select v-model="scope.row.department" filterable clearable size="small" style="width: 100%;">
              <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="80px">
          <template slot-scope="scope">
            <button class='bttn-stretch bttn-md bttn-danger' @click="handelApplyDel(scope.row,scope.$index)">
              <svg-icon icon-class="delete" /></button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="showEdit = false">取
          消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="SavaSeting">确 定</button>
      </div>
    </el-dialog>

    <el-dialog title="运营部门/组修改" :visible.sync="Visible" :close-on-click-modal="false" width="40%" top="15vh" center
      @close="getPage">
      <el-form :model="EditForm" label-width="150px" label-position="left">
        <el-form-item label="类目">
          <span>{{EditForm.matCate}}</span>
        </el-form-item>
        <el-form-item label="运营大类">
          <span>{{EditForm.matOperateCate}}</span>
        </el-form-item>
        <el-form-item label="公司品牌">
          <span>{{EditForm.matComBrand}}</span>
        </el-form-item>
        <el-form-item label="平台">
          <span>{{EditForm.elePlatformName}}</span>
        </el-form-item>
        <el-form-item label="区域">
          <span>{{EditForm.area}}</span>
        </el-form-item>
        <el-form-item label="事业部">
          <el-select v-model="EditForm.department" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Team">
          <el-select v-model="EditForm.department" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="运营人员">
          <el-select v-model="EditForm.operater" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品线负责人">
          <el-select v-model="EditForm.productPerson" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Team主管">
          <el-select v-model="EditForm.team" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in TeamList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="事业部经理">
          <el-select v-model="EditForm.department" filterable clearable size="small" style="width: 100%;">
            <el-option v-for="item in departmentList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <button class='bttn-fill bttn-md bttn-warning' style="margin-right: 10px;" @click="Visible = false">取 消</button>
        <button class='bttn-fill bttn-md bttn-success' @click="sureEdit">确 定</button>
      </div>
    </el-dialog>



    <el-dialog title="记录查看" :visible.sync="RecordVisible" :close-on-click-modal="false" width="40%" top="15vh" center
      @close="getPage">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
          placement="top">
          <el-card>
            <el-form label-width="100px">
              <el-form-item label="类型">
                <span>{{activity.className}}</span>
              </el-form-item>
              <el-form-item label="部门/组">
                <span>{{activity.department}}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{activity.status}}</span>
              </el-form-item>
            </el-form>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <div slot="footer" class="dialog-footer">
        <el-button @click="RecordVisible = false">取 消</el-button>
        <el-button type="primary" @click="RecordVisible= false">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>


<script>
  import tableDataJson from './Data.json'
  export default {
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-22",
          endTime: "2021-06-23",
          describe: "第一版",
        },
        queryFrom: {
          matCate: "",
          matOperateCate: "",
          matComBrand: '',
          Page: 1,
          Row: 20
        },
        total: 1,
        showEdit: false,
        tableData: [{
            matCate: "培育",
            matOperateCate: "母婴用品",
            matComBrand: "VavoPaw",
            elePlatformName: "Amazon",
            operater: "某某某",
            productPerson: '某某某',
            business: "事业一部",
            department: "彭丽莲",
            team: 'Team',
            teamP: '罗海欣',
            area: 'EU'
          },
          {

            matCate: "配件",
            matOperateCate: "手机保护套",
            matComBrand: "Nuovoware",
            elePlatformName: "Amazon",
            operater: "某某某",
            productPerson: '某某某',
            business: "事业一部",
            department: "彭丽莲",
            team: 'Team',
            teamP: '罗海欣',
            area: 'EU'
          },
          {

            matCate: "智能",
            matOperateCate: "智能音箱",
            matComBrand: "MoKo",
            elePlatformName: "Amazon",
            operater: "某某某",
            business: "事业一部",
            productPerson: '某某某',
            department: "彭丽莲",
            team: 'Team',
            teamP: '罗海欣',
            area: 'EU'
          },
          {

            matCate: "运动",
            matOperateCate: "极限运动",
            matComBrand: "中性",
            elePlatformName: "Amazon",
            operater: "某某某",
            productPerson: '某某某',
            business: "事业一部",
            department: "彭丽莲",
            team: 'Team',
            teamP: '罗海欣',
            area: 'NA'
          }
        ],
        SetList: [],
        Visible: false,
        EditForm: {},
        OptMatCateList: [

        ],
        OptOperateCateList: [],
        OptMatComBrandList: [], //公司品牌
        OptElePlatformNameList: [],
        OptAreaList: [{
          name: "NA"
        }, {
          name: "EU"
        }, ],
        OptCountryCodeList: [],

        departmentList: [
          "彭丽莲", "王晓云", "肖智远", "阮玲芳", "黄阳", "李杰", "袁彩华"
        ],
        TeamList: [
          "罗海欣", "陈妙珊", "许丹宜", "阮玲芳", "王清科", "吴思婷", "林梓靖"
        ],
        isExportLoding: false,
        isImportLoding: false,
        MatCateList: [],
        OperateCateArr: [],
        ComBrandList: [],
        AllDictArr: [],
        MatOperateCateList: [],
        DictFormVisible: false,
        DictForm: {},
        scopeContainer: null,
        field: "",
        RecordVisible: false,
        activities: [{
          className: "修改",
          department: 'Team1',
          status: "已变更",
          timestamp: '2021-06-15'
        }, {
          className: "申请",
          department: 'Team2',
          status: "已批准",
          timestamp: '2021-06-13'
        }, {
          className: "申请",
          department: 'Team3',
          status: "已驳回",
          timestamp: '2021-06-11'
        }]

      }
    },
    methods: {
      autoAnalysis() {

        this.SetList = [{
            matCate: "电子",
            matOperateCate: "办公用品",
            matComBrand: "ATic",
            elePlatformName: "Amazon",
            area: "NA",
            countryCode: ["AE,CA"],
            department: "",
            team: ""

          },
          {
            matCate: "电子",
            matOperateCate: "办公用品",
            matComBrand: "ATic",
            elePlatformName: "Amazon",
            area: "NA",
            countryCode: ["CA"],
            department: "",
            team: ""

          },
          {
            matCate: "电子",
            matOperateCate: "充电设备",
            matComBrand: "Emibele",
            elePlatformName: "Amazon",
            area: "NA",
            countryCode: [],
            department: "",
            team: ""

          },
          {
            matCate: "电子",
            matOperateCate: "外设产品",
            matComBrand: "Emibele",
            elePlatformName: "MoKo",
            area: "",
            countryCode: [],
            department: "",
            team: ""

          }
        ]
      },
      showAddDic(scope, val) {
        this.DictFormVisible = true
        this.DictForm = {
          dicValueCode: "",
          dicValueName: "",
          dicValueSymbol: "",
          dicValueRemark: "",
        }
        this.scopeContainer = scope
        this.field = val
      },
      editSubmit() {
        switch (this.field) {
          case '类目':
            this.scopeContainer.row.matCate = this.DictForm.dicValueName
            break;
          case '运营大类':
            this.scopeContainer.row.matOperateCate = this.DictForm.dicValueName
            break;
          case '公司品牌':
            this.scopeContainer.row.matComBrand = this.DictForm.dicValueName
            break;

          default:
            break;
        }
        this.DictFormVisible = false

      },

      apply(row) {
        if (row.status !== 1) {
          return
        }
        if (row.matComBrand !== "中性") {
          this.$confirm('【Team1】将申请该产品线运营, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '申请成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消申请'
            });
          });
        } else {
          this.$confirm('【事业五部】将申请该产品线运营, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '申请成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消申请'
            });
          });
        }

      },
      approval(row) {
        if (row.status !== 2) {
          return
        }
        if (row.matComBrand !== "中性") {
          this.$confirm('是否批准【Team1】运营该产品线?', '提示', {
            confirmButtonText: '批准',
            cancelButtonText: '驳回',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '已批准!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已驳回'
            });
          });
        } else {
          this.$confirm('是否批准【事业五部】运营该产品线?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '已批准!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已驳回'
            });
          });
        }

      },
      checkPower: function (role) {
        return this.$store.getters.funs.indexOf(role) > -1;
      },
      handelApplyAdd() {
        this.SetList.push({
          matCate: "",
          matOperateCate: "",
          matComBrand: ""
        })
      },
      SavaSeting() {
        let uploadList = []
        this.SetList.forEach((x, i) => {
          if (isEmpty(x.matCate) || isEmpty(x.matOperateCate) || isEmpty(x.matComBrand) || isEmpty(x.department)) {
            return this.$message.warning(`第 ${i+1} 行的数据存在空值`)
          }
          let arr = this.departmentList.filter(item => {
            return x.department.includes(item.sysPerCode)
          })
          let NameArr = [];
          let CodeArr = [];
          arr.forEach(item => {
            NameArr.push(item.sysPerName)
            CodeArr.push(item.sysPerCode)
          })
          let obj = {
            MatCate: x.matCate,
            MatOperateCate: x.matOperateCate,
            MatComBrand: x.matComBrand,
            MatOperatorName: NameArr.join(','),
            MatOperator: CodeArr.join(',')
          }
          uploadList.push(obj)
        })
        AddList(uploadList).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.showEdit = false
          } else {
            this.$message.warning(res.msg)
          }

        })
      },
      DialogClose() {
        this.SetList = []
        this.getPage(1)
      },
      handelApplyDel(row, index) {
        this.SetList.splice(index, 1)
      },
      settingPerson() {
        this.showEdit = true
        this.SetList.push({
          matCate: "",
          matOperateCate: "",
          matComBrand: "",
          department: ""
        })
      },
      editEvent(row) {
        this.EditForm = {
          matCate: row.matCate,
          matOperateCate: row.matOperateCate,
          matComBrand: row.matComBrand,
          elePlatformName: row.elePlatformName,
          area: row.area,
          operater: row.operater,
          productPerson: row.productPerson,
          department: row.department,
          team: row.team
        }
        this.Visible = true
      },
      sureEdit() {
        if (isEmpty(this.EditForm.department)) {
          return this.$message.warning("运营人员不能为空")
        }
        let arr = this.departmentList.filter(item => {
          return this.EditForm.department.includes(item.sysPerCode)
        })
        let NameArr = [];
        let CodeArr = [];
        arr.forEach(item => {
          NameArr.push(item.sysPerName)
          CodeArr.push(item.sysPerCode)
        })
        let obj = {
          MatCate: this.EditForm.matCate,
          MatOperateCate: this.EditForm.matOperateCate,
          MatComBrand: this.EditForm.matComBrand,
          MatOperatorName: NameArr.join(','),
          MatOperator: CodeArr.join(',')
        }
        UpdateAudit(obj).then(res => {
          if (res.code == 0) {
            this.$message.success(res.msg)
            this.Visible = false
          } else {
            this.$message.warning(res.msg)
          }
        })
      },
      ViewEvent(row) {
        this.RecordVisible = true
      },
      handleCurrentChange(val) {
        this.queryFrom.page = val;
        this.getPage(val);
      },

      handleSizeChange(val) {
        this.queryFrom.row = val;
        this.getPage(this.queryFrom.page);
      },
      getPage(page = 1) {
        this.queryFrom.page = page;
      },
      async getOptMatOperteCate(condition) {
        await GetTreeName(condition).then(res => {
          switch (condition.type) {
            case 'matOperateCate':
              this.OperateCateArr = res.data.map(d => d.name)
              break;
            default:
              this.OperateCateArr = []
              break;
          }
        });
      },

      matCateChange(scope) {},

      QuerymMtCateAndMatOperateCate() {
        QuerymMtCateAndMatOperateCate().then(res => {
          this.MtCateAndMatOperateCateList = res.data
        })
      }

    },
    mounted() {
      this.OptMatComBrandList = tableDataJson.BrandData
      this.OptMatCateList = tableDataJson.MatCate
      this.OptOperateCateList = tableDataJson.MatOperateCate
      this.OptCountryCodeList = tableDataJson.CoutryCode
      this.OptElePlatformNameList = tableDataJson.ElePlatformName






    },
  }
</script>

<style lang="less" scoped>
  .tableBox {
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

  .el-button:focus {
    color: #0066e4 !important;
  }

  /deep/.formitemClass {
    border-bottom: 2px solid #1685a9 !important;
    width: 22%;
  }

  .el-button--text {
    color: #1e354c;
  }

  .el-button:focus {
    color: #0066e4 !important;
  }

  .span {
    width: 220px;
  }

  .BtnPosition {
    margin-left: 5px;
  }
</style>