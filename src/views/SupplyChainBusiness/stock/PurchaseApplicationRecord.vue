<template>
  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-row :gutter="10">
        <el-col>
          <el-form inline size="mini">
            <el-row>
              <el-form-item>
                <label slot="label">状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态:</label>
                <el-checkbox-group v-model="searchData.applyStuas" class="FromWidth">
                  <el-checkbox label="审批中" style="margin-right:10px"></el-checkbox>
                  <el-checkbox label="未通过" style="margin-right:10px"></el-checkbox>
                  <el-checkbox label="已通过"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item>
                <label slot="label">申请时间:</label>
                <el-date-picker class="FromWidth" v-model="searchData.applyDate" type="daterange" range-separator="至"
                  start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台:</label>
                <el-input v-model="searchData.area" class="FromWidth"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</label>
                <el-input v-model="searchData.logistics_mode" class="FromWidth"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item>
                <label slot="label">物料编码:</label>
                <el-input v-model="searchData.matCode" class="FromWidth"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">运营大类:</label>
                <el-input v-model="searchData.matOperateCate" class="FromWidth"></el-input>
              </el-form-item>
              <el-form-item>
                <label slot="label">产品名称:</label>
                <el-input v-model="searchData.matProName" class="FromWidth"></el-input>
              </el-form-item>
              <el-form-item style="margin-left:70px ">
                <el-button type="primary" @click="searchList">查询</el-button>
                <el-button type="warning" @click="clearList">重置</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-card style="margin-top: 10px">
      <el-table border :data="dataList" v-loading="tableLoading" class="resource-table" height="640" ref="multipleTable"
        stripe @selection-change="handleSelectionChange" size="mini">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="状态" width="100" prop="applyStuas" align="center" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>
              <span>状态</span>
              <!-- <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                <el-input size="mini" v-model="applyStuasQuery" placeholder="支持多条件过滤，例如北京 上海"></el-input>
                <div style="border: 1px solid #758a99;margin:5px 0px; height: 300px; overflow: auto;">
                  <div style="margin:5px 15px;">
                    <el-checkbox :indeterminate="isIndeterminateApplyStuas" v-model="ApplyStuasCheckAll"
                      @change="ApplyStuasCheckAllChange">
                      全选
                    </el-checkbox>
                    <el-checkbox-group v-model="checkedApplyStuas" @change="CheckedApplyStuasChange">
                      <el-checkbox style="display: block;margin-top:5px" v-for="item in ApplyStuasList" :label="item"
                        :key="item">
                        {{item}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <el-button size="mini" slot="reference" type="text" icon="el-icon-arrow-down"
                  style="background-color: #665757;"></el-button>
              </el-popover> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="申请时间" width="100" prop="applyDate" align="center" show-overflow-tooltip>
          <template slot="header" slot-scope="scope">
            <div>
              <span>申请时间</span>
              <!-- <el-popover placement="bottom" title="筛选" width="400" trigger="click">
                <el-time-picker is-range v-model="ApplyDateQuery" range-separator="至" start-placeholder="开始时间"
                  end-placeholder="结束时间" placeholder="选择时间范围">
                </el-time-picker>
                <el-button slot="reference" type="text" icon="el-icon-arrow-down" style="background-color: #665757;">
                </el-button>
              </el-popover> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="物料编码" width="100" prop="matcode" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="运营大类" width="120" prop="matOperateCate" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="产品名称" width="120" prop="matProName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="款式" width="120" prop="matStyle" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="平台" width="100" prop="plat" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="区域" width="100" prop="area" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="运营申请数量" prop="apply" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="申请原因" width="150" align="center" prop="reason" show-overflow-tooltip>
        </el-table-column>
        <el-table-column class-name="columnClass" label="运输方式" width="100" prop="transporttype" align="center">
        </el-table-column>
        <el-table-column class-name="columnClass" label="采购数量" width="100" prop="preStockNum" align="center">
        </el-table-column>

        <el-table-column label="期望交期" width="100" prop="deliverydate" align="center"></el-table-column>
        <el-table-column class-name="columnClass" label="审核备注" prop="remark" width="150" align="center">
        </el-table-column>
        <el-table-column class-name="columnClass" label="审核记录" width="80" align="center" fixed="right">
          <template slot-scope="scope">
            <button class='bttn-stretch bttn-md bttn-success' @click="WatchExamine(scope.row)">
              <svg-icon icon-class="view" /></button>
          </template>
        </el-table-column>
        <el-table-column class-name="columnClass" label="生成紧急备货" width="80" align="center" fixed="right">
          <template slot-scope="scope">
            <button class='bttn-stretch bttn-md bttn-primary' @click="generate(scope.row)">
              <svg-icon icon-class="Apply" /></button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float:right; margin: 10px 0;" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="page" :page-sizes="[ 20, 50, 100]" :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="totalRows">
      </el-pagination>
    </el-card>

    <el-dialog title="生成紧急备货" :visible.sync="explainVisible" width="50%">
      <el-form :model="Eform" size="small" class="EformClass" label-width="110px" label-position="right">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="物料编码:">
              <span class="spanItemClass">{{Eform.materialcode}}</span>
            </el-form-item>
            <el-form-item label="运营大类:">
              <span class="spanItemClass">{{Eform.category}}</span>
            </el-form-item>
            <el-form-item label="组合属性:">
              <span class="spanItemClass">{{Eform.productname}}</span>
            </el-form-item>
            <el-form-item>
              <label slot="label">首单日期:</label>
              <span class="spanItemClass">{{Eform.firstorderdate}}</span>
            </el-form-item>

          </el-col>
          <el-col :span="12">
            <el-form-item>
              <label slot="label">事&nbsp;&nbsp;业&nbsp;&nbsp;部:</label>
              <span class="spanItemClass">{{Eform.style}}</span>
            </el-form-item>
            <el-form-item label="Team:">
              <label slot="label">T&nbsp;&nbsp;e&nbsp;&nbsp;a&nbsp;m:</label>
              <span class="spanItemClass">{{Eform.mainmaterials}}</span>
            </el-form-item>
            <el-form-item label="平台:">
              <label slot="label">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台:</label>
              <span class="spanItemClass">{{Eform.platform}}</span>
            </el-form-item>
            <el-form-item label="区域:">
              <label slot="label">区&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;域:</label>
              <span class="spanItemClass">{{Eform.area}}</span>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="padding-top:10px;border-top:1px solid #4f455c;">
          <el-col :span="7">
            <el-form-item label="运输方式:">
              <el-select v-model="Eform.stockquantity" placeholder="请选择" clearable style=" width: 150px;">
                <el-option label="空运" value="空运"></el-option>
                <el-option label="海运" value="海运"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="申请数量:">
              <el-input v-model="Eform.stockquantity3" placeholder="请输入" clearable style=" width: 150px;"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="期望交期:">             
              <el-date-picker v-model="Eform.stockquantity5" style=" width: 185px;" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col style="margin-top:10px">
            <el-form-item label="申请备货说明:">
              <el-input v-model="Eform.stockquantity4" placeholder="请输入" clearable style=" width: 760px;"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="explainVisible = false">取 消</el-button>
        <el-button type="primary" @click="explainVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import ExamineCompont from './components/ExamineCompont.vue'
  const ApplyStuasOpt = ['事业部待审核 ', '计划部待审批', ]
  export default {
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-15",
          endTime: "2021-06-29",
          describe: "第一版;6.29增加生成紧急备货;7.29增加期望交期需求",
        },
        Eform: {
          materialcode: "A3C210001",
          category: "平板电脑保护套",
          productname: "平板皮套->液态硅胶保护套->硅胶-> 无->中性->苹果->Airtags 2021->2020蓝色+暗绿色->(2pack)->V1->Moko",
          style: "事业一部",
          mainmaterials: "Team1",
          platform: "Amazon",
          area: "EU",


          firstorderdate: "2021-04-28",

          typeofshipping: "",
          stockquantity: "空运",
          stockquantity3: "200",
          stockquantity4: "",



        },
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
          applyStuas: ['审批中']
        },
        haichecked: false,
        kongchecked: false,
        activeName: 'N', //页面资源 -- N是api资源
        name: '',
        code: '',
        tableLoading: false,
        dataList: [{
            id: 1,
            applyStuas: '事业部待审核',
            applyDate: "2021-06-15",
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matProName: "平板皮套",
            matStyle: "电压款-三折半透",
            plat: "Amazon",
            area: "北美区域",
            apply: 10,
            reason: "XXX原因",
            transporttype: "空运",
            preStockNum: 10,
            deliverydate: "2021-07-29",
            remark: "这是Team申请的备注"
          },
          {
            id: 2,
            applyStuas: '计划部待审批',
            applyDate: "2021-06-15",
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matProName: "平板皮套",
            matStyle: "电压款-三折半透",
            plat: "Amazon",
            area: "欧洲区域",
            apply: 20,
            reason: "XXX原因",
            transporttype: "海运",
            preStockNum: 20,
            deliverydate: "2021-07-29",
            remark: "这是Team申请的备注2"
          },
          {
            id: 3,
            applyStuas: '计划部待审批',
            applyDate: "2021-06-15",
            matcode: "ATC210398",
            matOperateCate: "平板电脑保护套",
            matProName: "平板皮套",
            matStyle: "电压款-三折半透",
            plat: "Amazon",
            area: "中东",
            apply: 25,
            reason: "XXX原因",
            transporttype: "空运",
            preStockNum: 30,
            deliverydate: "2021-07-29",
            remark: "这是Team申请的备注3"
          }

        ],
        page: 1, //当前页面
        pageSize: 10, // 当前页数
        totalRows: 0, // 总条数
        companyId: '',
        multipleSelection: [],
        infoList: [{
            id: 1,
            site: "UK",
            asin: "B0953B6SSL",
            transporttype: "空运",
            recommendStockNum: 130,
            prePurchase: 130
          },
          {
            id: 2,
            site: "UK",
            asin: "B0953H7CVC",
            transporttype: "空运",
            recommendStockNum: 160,
            prePurchase: 160
          },
          {
            id: 3,
            site: "UK",
            asin: "B093WXMPDX",

            transporttype: "空运",
            recommendStockNum: 120,
            prePurchase: 120
          },
          {
            id: 4,
            site: "UK",
            asin: "B093WXMPDX",

            transporttype: "空运",
            recommendStockNum: 140,
            prePurchase: 140
          }
        ],
        isShowCompanyAddEdit: false,
        isShowCompanyDetail: false,
        isShowConfigApp: false,
        recommendInfo: Object,

        applyStuasQuery: "",
        checkedApplyStuas: [],
        isIndeterminateApplyStuas: true,
        ApplyStuasCheckAll: false,
        ApplyStuasList: ApplyStuasOpt,

        ApplyDateQuery: [],
        ApplyNumberQuery1: "",
        ApplyNumberQuery2: "",
      }
    },
    created() {
      this.getData()
    },
    methods: {
      generate(row) {
        this.explainVisible = true

      },
      ApplyStuasCheckAllChange(val) {
        this.checkedApplyStuas = val ? ApplyStuasOpt : [];
        this.isIndeterminateApplyStuas = false;
      },
      CheckedApplyStuasChange(value) {
        let checkedCount = value.length;
        this.ApplyStuasCheckAll = checkedCount === this.ApplyStuasList.length;
        this.isIndeterminateApplyStuas = checkedCount > 0 && checkedCount < this.ApplyStuasList.length;
      },



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
      showRecomendLog(row) {
        console.log(row, "row");
        this.recommendInfo = row
        this.recommendLogVisble = true
      },

      parseTime(data) {
        return parseTime(data)
      },
      //获取表格数据源
      getData() {
        let http = new StockRecommendationApi()
        // this.tableLoading = true
        let data = {
          name: this.searchData.platform_name,
          code: this.code,
          area: this.searchData.area,
          logistics_mode: this.searchData.logistics_mode,
          logistics_days: this.searchData.logistics_days,
          create_by: this.searchData.create_by,
          handlestatus: this.searchData.handlestatus,
          create_at: this.searchData.create_at,
          tasktype: this.searchData.tasktype,
          pageSize: this.pageSize,
          page: this.page,
          auditstatus: 1
        }
        // http.queryListPage(data).then(res => {
        //   this.dataList = res.data.rows
        //   this.page = res.data.page
        //   this.pageSize = res.data.pageSize
        //   this.totalRows = res.data.totalRows
        //   this.tableLoading = false
        // })
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
          columnIndex === 5 || columnIndex === 9) {
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
      handleSelectionChange(val) {
        var that = this
        val.forEach(function (val, index) {
          that.dataList.forEach((v, i) => {
            if (val.id === v.id) {
              if (that.dataList[i].proposalnumber > 0 && that.dataList[i].auditnumber == 0) {
                that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              }
            }
          })
        });
      },
      CheckedKongChange(val) {
        var that = this
        if (val) {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '空运' && that.dataList[i].proposalnumber > 0 && that.dataList[
                i]
              .auditnumber == 0) {
              that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i]);
            }
          })
        } else {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '空运' && that.dataList[i].auditnumber > 0) {
              that.dataList[i].auditnumber = ''
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i], false);
            }
          })
        }
      },
      CheckedHaiChange(val) {
        var that = this
        if (val) {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '海运' && that.dataList[i].proposalnumber > 0 && that.dataList[
                i]
              .auditnumber == 0) {
              that.dataList[i].auditnumber = that.dataList[i].proposalnumber
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i]);
            }
          })
        } else {
          that.dataList.forEach((v, i) => {
            if (that.dataList[i].transporttype == '海运' && that.dataList[i].auditnumber > 0) {
              that.dataList[i].auditnumber = ''
              this.$refs.multipleTable.toggleRowSelection(that.dataList[i], false);
            }
          })
        }
      },
      searchList() {
        this.page = 1
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
      this.$refs.multipleTable.toggleAllSelection()
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .EformClass {
    .el-form-item {
      margin-bottom: 0px;

      .el-form-item__label {
        color: #0b3d50;
        font-weight: lighter;

      }

      .spanItemClass {
        color: #203744;
        display: flex;
        width: 350px;
        line-height: 30px;


      }
    }
  }

  /deep/.el-card__body {
    padding: 5px 10px;

  }

  .columnClass {
    background-color: #000000 !important;
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

  .FromWidth {
    width: 220px;
  }
</style>