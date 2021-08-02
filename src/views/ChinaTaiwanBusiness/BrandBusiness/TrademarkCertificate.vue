<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-form inline :model="QueryFrom" style="margin-top:10px;margin-left:5px">
        <el-form-item>
          <el-select v-model="QueryFrom.trademark" multiple placeholder="请选择商标名称" style="width:500px">
            <el-option key="TiMOVO" label="TiMOVO" value="TiMOVO">
            </el-option>
            <el-option key="MOKO" label="MOKO" value="MOKO">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class='bttn-fill bttn-md bttn-primary' @click="searchList">
            <svg-icon icon-class="search" />查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table border :data="dataList" v-loading="tableLoading" ref="multipleTable" stripe
        @selection-change="handleSelectionChange" width="100%" height="700px">

        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column width="50" align="center">
          <template slot-scope="scope" v-if="scope.$index==2">
            <el-tooltip class="item" effect="dark" content="该证件快过期了" placement="top-start">
              <svg-icon icon-class="pin" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-col :span="6">
              <div class="borderShow" style="height:370px">
                <div class="titleContainer">
                  <span class="titleStyle">
                    资助补贴信息
                  </span>
                </div>
                <el-form label-width="130px" size="mini">
                  <el-form-item>
                    <label class="labelColor" slot="label">是否可申请资助：</label>
                    是
                  </el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">资助编号：</label>
                    123456789
                  </el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">资助金额：</label>
                    16000.00</el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">到款日期：</label>
                    2021/07/27</el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">资助情况：</label>
                    申请资助16000</el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">办理人：</label>
                    高天真</el-form-item>
                  <el-form-item>
                    <label class="labelColor" slot="label">办理时间：</label>
                    2021/06/27</el-form-item>
                </el-form>
              </div>
              <div class="borderShow" style="height:100px">
                <div class="titleContainer">
                  <span class="titleStyle">
                    商标证书
                  </span>
                </div>
                <el-form label-width="110px" size="mini">
                  <el-form-item>
                    <label class="labelColor" slot="label">证书文件：</label>
                    <a target="_blank" href="http://www.w3school.com.cn">商标证书.PDF</a>
                  </el-form-item>
                </el-form>
              </div>
            </el-col>
            <el-col :span="18">
              <div class="borderShow" style="height:470px">
                <div class="titleContainer">
                  <span class="titleStyle">
                    续费信息
                  </span>
                </div>
                <el-timeline>
                  <el-timeline-item timestamp="2040/07/27" placement="top">
                    <el-card>
                      <el-form label-width="110px" size="mini">
                        <el-form-item>
                          <label class="labelColor" slot="label">续展文件：</label>
                          <a target="_blank" href="https://www.taobao.com/">续费文件.excel</a>
                        </el-form-item>
                        <el-form-item>
                          <label class="labelColor" slot="label">续展费用：</label>
                          1288.00
                        </el-form-item>
                        <el-form-item>
                          <label class="labelColor" slot="label">备注说明：</label>
                          本次续费说明。。。。。。。。。。。。。
                        </el-form-item>
                      </el-form>
                    </el-card>
                  </el-timeline-item>
                  <el-timeline-item timestamp="2030/06/27" placement="top">
                    <el-card>
                      <el-form label-width="110px" size="mini">
                        <el-form-item>
                          <label class="labelColor" slot="label">续展文件：</label>
                          <a target="_blank" href="https://www.taobao.com/">续费文件.excel</a>
                        </el-form-item>
                        <el-form-item>
                          <label class="labelColor" slot="label">续展费用：</label>
                          888.00
                        </el-form-item>
                        <el-form-item>
                          <label class="labelColor" slot="label">备注说明：</label>
                          本次续费说明。。。。。。。。。。。。。</el-form-item>
                      </el-form>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-col>
          </template></el-table-column>
        <el-table-column label="商标名称" prop="trademark" align="center">
        </el-table-column>
        <el-table-column label="注册号" prop="RegistrationNumber" align="center">
        </el-table-column>
        <el-table-column label="国家" prop="country" align="center">
        </el-table-column>
        <el-table-column label="大类" prop="MajorCategories" align="center">
        </el-table-column>
        <el-table-column label="小类" prop="Subclass" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="有效期" prop="termofvalidity" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="商标权人" prop="CompanyName" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="保管部门" prop="department" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="交接" header-align="center" width="150">
          <template slot-scope="scope">
            <!-- <el-button class='bttn-stretch bttn-lg bttn-success' @click="open">
              <svg-icon icon-class="hand-over" />
            </el-button> -->
            <el-steps :active="scope.row.active" size="mini" finish-status="success">
              <el-step title="交接" icon="el-icon-folder" @click.native="open(scope.row)"></el-step>
              <el-step title="确认" icon="el-icon-folder-checked" @click.native="open2(scope.row)"></el-step>
            </el-steps>
          </template>
        </el-table-column>
        <el-table-column label="提醒" align="center" width="80">
          <template slot-scope="scope">
            <el-popover placement="top" width="300" trigger="click">
              <label>有效期剩余 </label>
              <el-input-number v-model="num" controls-position="right" :min="1" label="描述文字" size="small">
              </el-input-number>
              <label> 天提醒</label>
              <div style="text-align: right; margin-top: 10px">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
              </div>
              <el-button slot="reference" class='bttn-stretch bttn-lg bttn-success'>
                <svg-icon icon-class="productivity" />
              </el-button>
            </el-popover>

          </template>
        </el-table-column>
        <el-table-column label="补贴" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-royal' @click="dialogVisible=true">
              <svg-icon icon-class="open-box" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="延期" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-warning' @click="dialogVisible2=true">
              <svg-icon icon-class="schedule" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-size="QueryFrom.row"
          :current-page="QueryFrom.page" :page-sizes="[20,50,100]" :total="total" style="float:right;"></el-pagination>
      </el-col>
    </el-card>

    <el-dialog title="商标交接" :visible.sync="JiaoVisible" width="30%">
      <el-upload multiple class="upload-demo " ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
        :file-list="JiaoList" :auto-upload="false">
        <div>
          <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="JiaoVisible = false">取 消</el-button>
        <el-button type="primary" @click="JiaoVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="商标补贴" :visible.sync="dialogVisible" width="35%" :close-on-click-modal="false">
      <el-form :model="dialogform" label-width="130px" size="small">
        <el-row class="borderShow">
          <el-col :span="12">
            <el-form-item label="商标名称">
              <span>{{dialogform.trademark}}</span>
            </el-form-item>
            <el-form-item label="注册号">
              <span>123456</span>
            </el-form-item>
            <el-form-item label="商标类型">
              <span>{{dialogform.trademarktype}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册国家">
              <span>{{dialogform.country}}</span>
            </el-form-item>
            <el-form-item label="商标大类">
              <span>{{dialogform.MajorCategories}}</span>
            </el-form-item>
            <el-form-item label="商标权人">
              <span>深圳市金畅进出口有限公司</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="borderShow">
          <el-form-item>
            <label class="labelColor" slot="label">是否可申请资助：</label>          
            <el-select  v-model="dialogform.GrantNumber" class="inputwidth"></el-select>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">资助编号：</label>
            <el-input v-model="dialogform.GrantNumber" class="inputwidth"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">资助金额：</label>
            <el-input v-model="dialogform.GrantMoney" class="inputwidth"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">到款日期：</label>
            <el-date-picker v-model="dialogform.GrantDate" class="inputwidth" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">资助情况：</label>
            <el-input v-model="dialogform.GrantRemark" class="inputwidth"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">办理人：</label>
            <el-input v-model="dialogform.Handler" class="inputwidth"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">办理时间：</label>
            <el-date-picker v-model="dialogform.HandlTime" class="inputwidth" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="商标延期" :visible.sync="dialogVisible2" width="35%" :close-on-click-modal="false">
      <el-form :model="dialogform" label-width="100px">
        <el-row class="borderShow">
          <el-col :span="12">
            <el-form-item label="商标名称">
              <span>{{dialogform.trademark}}</span>
            </el-form-item>
            <el-form-item label="商标类型">
              <span>{{dialogform.trademarktype}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册国家">
              <span>{{dialogform.country}}</span>
            </el-form-item>
            <el-form-item label="商标大类">
              <span>{{dialogform.MajorCategories}}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="borderShow">
          <el-form-item>
            <label class="labelColor" slot="label">商标有效期：</label>
            <el-date-picker v-model="dialogform.visa" class="inputwidth" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">续展文件：</label>
            <el-upload class="upload-demo inputwidth" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList" :auto-upload="false">
              <div>
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
                </el-button>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">续展费用：</label>
            <el-input v-model="dialogform.renewMoney" class="inputwidth"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">备注说明：</label>
            <el-date-picker v-model="dialogform.renewRemark" class="inputwidth" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
  export default {
    components: {

    },
    data() {
      return {
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-07-27",
          endTime: "2021-07-30",
          describe: "",
        },
        QueryFrom: {
          materialcode: "",
          row: 20,
          page: 1
        },
        num: 100,
        total: 0,
        tableLoading: false,
        JiaoVisible: false,
        dialogVisible: false,
        dialogVisible2: false,
        dialogform: {
          trademark: "SiiuMaid",
          trademarktype: "文字商标",
          country: "英国",
          MajorCategories: "第九类"
        },
        dataList: [{
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "中国",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            CompanyName: "深圳市金畅进出口有限公司",
            department: "财务部",
            active: 0
          }, {
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "美国",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            CompanyName: "深圳市金畅进出口有限公司",
            department: "财务部",
            active: 1
          },
          {
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "日本",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            CompanyName: "深圳市金畅进出口有限公司",
            department: "财务部",
            active: 2
          }
        ],
        fileList: [{
          name: '续展文件.excel',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        JiaoList: [{
          name: '商标证书.PDF',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
      }
    },
    methods: {
      searchList() {},
      TrademarkProposal() {
        this.dialogVisible = true
      },
      open(row) {
        this.JiaoVisible = true

      },
      open2(row) {
        this.$confirm('此操作将确认证书交接完毕, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          row.active = 2
          this.$message({
            type: 'success',
            message: '交接成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消交接'
          });
        });
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleSelectionChange() {}
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 5px;
  }

  .borderShow {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    overflow: auto;
  }

  .titleContainer {
    margin-bottom: 10px;

    .titleStyle {
      border-bottom: 2px solid #3addf3;
      font-size: 15px;
      font-weight: 400;
      font-family: 微软雅黑 !important;
      color: #004074;

    }
  }

  .labelColor {
    color: #0b3d50;
    font-weight: weight;
  }

  .inputwidth {
    width: 95%;
  }
</style>

<style lang="less">
  .el-tooltip__popper {
    max-width: 30%;
  }
</style>