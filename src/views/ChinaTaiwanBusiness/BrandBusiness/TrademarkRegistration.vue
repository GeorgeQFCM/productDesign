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
          <el-select v-model="QueryFrom.state" filterable placeholder="请选择状态">
            <el-option label="申请中" value="申请中"></el-option>
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="审查中" value="审查中"></el-option>
            <el-option label="公告中" value="公告中"></el-option>
            <el-option label="已下证" value="已下证"></el-option>
            <el-option label="异常归档" value="异常归档"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="QueryFrom.Sponsor" placeholder="请输入提案人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="QueryFrom.isRegister" filterable placeholder="请选择是否注册">
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class='bttn-fill bttn-md bttn-primary' @click="searchList">
            <svg-icon icon-class="search" />查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class='bttn-fill bttn-md bttn-success' @click="TrademarkProposal">
            <svg-icon icon-class="Apply" />商标提案</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <el-table border :data="dataList" v-loading="tableLoading" ref="multipleTable" stripe
        @selection-change="handleSelectionChange" width="100%" height="700px">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-row>
              <el-col :span="9">
                <div class="borderShow" style="height:230px">
                  <div class="titleContainer">
                    <span class="titleStyle">
                      注册公司信息
                    </span>
                  </div>
                  <el-form label-width="110px" size="mini">
                    <el-form-item>
                      <label class="labelColor"
                        slot="label">公&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;司&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名&nbsp;：</label>
                      {{props.row.CompanyName}}</el-form-item>
                    <el-form-item>
                      <label class="labelColor"
                        slot="label">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;址&nbsp;：</label>
                      {{props.row.address}}</el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">法人（中文）：</label>
                      {{props.row.LegalPersonC}}</el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">法人（英文）：</label>{{props.row.LegalPersonE}}</el-form-item>
                  </el-form>
                </div>
                <div class="borderShow" style="height:320px">
                  <div class="titleContainer">
                    <span class="titleStyle">
                      材料信息
                    </span>
                    <el-button class='bttn-stretch bttn-md bttn-success'>
                      <svg-icon icon-class="download" />
                    </el-button>
                  </div>
                  <el-form label-width="130px" size="mini">
                    <el-form-item>
                      <label class="labelColor" slot="label">证据提供方式：</label>
                      {{props.row.evidenceType}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">细类目筛选表：</label>
                      <!-- {{props.row.categoryTable}} -->
                      <a target="_blank" href="http://www.w3school.com.cn">细类目筛选表</a>
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor"
                        slot="label">销&nbsp;&nbsp;&nbsp;售&nbsp;&nbsp;&nbsp;链&nbsp;&nbsp;&nbsp;接1：</label>
                      <a target="_blank" href="https://www.taobao.com/">https://www.taobao.com/</a>
                      {{props.row.saleLink}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">使用产品证据图：</label>
                      <!-- {{props.row.evidenceImage}} -->
                      <el-image fit="scale-down" v-for="url in urls" :key="url" :src="url" :preview-src-list="urls"
                        style="width: 80px; height: 80px">
                      </el-image>
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">销售订单截图：</label>
                      {{props.row.saleOrder}}
                      <el-image fit="scale-down" v-for="url in urls" :key="url" :src="url" :preview-src-list="urls"
                        style="width: 80px; height: 80px">
                      </el-image>
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">销售页面截图：</label>
                      {{props.row.salePage}}
                      <el-image fit="scale-down" v-for="url in urls" :key="url" :src="url" :preview-src-list="urls"
                        style="width: 80px; height: 80px">
                      </el-image>
                    </el-form-item>
                  </el-form>
                </div>
              </el-col>

              <el-col :span="15">
                <el-col :span="12" class="ColStyle">
                  <div class="titleContainer">
                    <span class="titleStyle">
                      进度信息
                    </span>
                  </div>
                  <el-form label-width="140px" size="mini">
                    <el-form-item>
                      <label class="labelColor" slot="label">申请费用(含税/元)：</label>
                      {{props.row.ApplicationFee}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">发票号码：</label>
                      {{props.row.InvoiceNumber}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">合同签订日期：</label>
                      {{props.row.ContractSigningDate}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">申请日期：</label>
                      {{props.row.ApplicationDate}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">获证日期：</label>
                      {{props.row.certificateDate}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">注册号：</label>
                      {{props.row.RegistrationNumber}}
                    </el-form-item>
                    <el-form-item>
                      <label class="labelColor" slot="label">商标有效期：</label>
                      {{props.row.visa}}
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="12" class="ColStyle">
                  <div class="titleContainer">
                    <span class="titleStyle">
                      进度时间线
                    </span>
                  </div>
                  <el-timeline :reverse="true">
                    <el-timeline-item type="primary" icon="el-icon-more" v-for="(activity, index) in activities"
                      :key="index" :timestamp="activity.timestamp">
                      {{activity.content}}
                    </el-timeline-item>
                  </el-timeline>
                </el-col>

              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="商标名称" prop="trademark" align="center" sortable>
        </el-table-column>
        <el-table-column label="商标类型" prop="trademarktype" align="center" sortable>
        </el-table-column>
        <el-table-column label="国家" prop="country" align="center" sortable>
        </el-table-column>
        <el-table-column label="大类" prop="MajorCategories" align="center" sortable>
        </el-table-column>
        <el-table-column label="小类" prop="Subclass" align="center" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="商标权人" prop="CompanyName" align="center" show-overflow-tooltip sortable>
        </el-table-column> -->
        <el-table-column label="代理机构" prop="Agency" align="center" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="提案人" prop="Sponsor" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="提案时间" prop="ProposalTime" align="center" show-overflow-tooltip sortable>
        </el-table-column>
        <el-table-column label="是否注册" prop="isRegister" align="center" show-overflow-tooltip>
          <template slot-scope="scope">
            <svg-icon v-if="scope.row.isRegister" icon-class="checked" style="width: 20px;height: 20px; " />
            <svg-icon v-else icon-class="close" style="width: 20px;height: 20px; " />
          </template>
        </el-table-column>
        <el-table-column label="注册" align="center" width="80">
          <template slot-scope="scope" v-if="scope.row.isRegister">
            <el-button class='bttn-stretch bttn-lg bttn-warning' @click="registrationInfo">
              <svg-icon icon-class="note" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="材料" align="center" width="80">
          <template slot-scope="scope" v-if="scope.row.isRegister">
            <el-button class='bttn-stretch bttn-lg bttn-primary' @click="materialInfo">
              <svg-icon icon-class="investigation" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="进度" align="center" width="80">
          <template slot-scope="scope" v-if="scope.row.isRegister">
            <el-button class='bttn-stretch bttn-lg bttn-royal' @click="progressInfo">
              <svg-icon icon-class="career" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="扩类" align="center" width="80">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isRegister" class='bttn-stretch bttn-lg bttn-primary' @click="ExtendedClass">
              <svg-icon icon-class="add" />
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

    <el-dialog title="商标提案" :close-on-click-modal="false" :visible.sync="dialogVisible" width="26%">
      <el-form :model="dialogform" inline>
        <el-form-item label="商标名称">
          <el-input v-model="dialogform.trademark" class="inputwidth"></el-input>
        </el-form-item>
        <el-form-item label="商标类型">
          <el-select v-model="dialogform.trademarktype" filterable class="inputwidth">
            <el-option label="文字商标" value="文字商标"></el-option>
            <el-option label="图形商标" value="图形商标"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否注册">
          <el-radio v-model="dialogform.radio" label="1">是</el-radio>
          <el-radio v-model="dialogform.radio" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="dialogform.remark" class="inputwidth"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="商标扩类" :close-on-click-modal="false" :visible.sync="ExtendedVisible" width="26%">
      <el-form :model="ExtendedForm">
        <el-form-item label="商标名称">
          <span>{{ExtendedForm.trademark}}</span>
        </el-form-item>
        <el-form-item label="注册国家">
          <el-select v-model="ExtendedForm.country" filterable class="inputwidth">
            <el-option label="美国商标" value="美国商标"></el-option>
            <el-option label="加拿大商标" value="加拿大商标"></el-option>
            <el-option label="澳大利亚商标" value="澳大利亚商标"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商标大类">
          <el-select v-model="ExtendedForm.MajorCategories" filterable class="inputwidth">
            <el-option label="第一类" value="第一类"></el-option>
            <el-option label="第二类" value="第二类"></el-option>
            <el-option label="第三类" value="第三类"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="商标小类">
          <el-input type="textarea" v-model="ExtendedForm.Subclass" :autosize="{ minRows:5, maxRows: 5}"
            class="inputwidth"></el-input>
        </el-form-item> -->
        <el-form-item label="备注说明">
          <el-input type="textarea" v-model="ExtendedForm.remark" class="inputwidth"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="ExtendedVisible = false">取 消</el-button>
        <el-button type="primary" @click="ExtendedVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <EnterRegistrationInfo ref="EnterRegistrationInfo"></EnterRegistrationInfo>
    <EnterMaterialInfo ref="EnterMaterialInfo"></EnterMaterialInfo>
    <EnterProgressInfo ref="EnterProgressInfo"></EnterProgressInfo>
  </section>
</template>
<script>
  import EnterRegistrationInfo from './components/EnterRegistrationInfo.vue'
  import EnterMaterialInfo from './components/EnterMaterialInfo.vue'
  import EnterProgressInfo from './components/EnterProgressInfo.vue'
  export default {
    components: {
      EnterRegistrationInfo,
      EnterMaterialInfo,
      EnterProgressInfo
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
        activities: [{
            content: '提交申请',
            timestamp: '2021-07-26'
          },
          {
            content: '等待受通',
            timestamp: '2021-08-10'
          },
          {
            content: '已收到受理回执',
            timestamp: '2021-08-26'
          }, {
            content: '形式审查通过',
            timestamp: '2021-09-26'
          },
          {
            content: '证书正本下发',
            timestamp: '2021-10-26'
          },
        ],
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
        ],
        QueryFrom: {
          materialcode: "",
          row: 20,
          page: 1,

        },
        total: 0,
        tableLoading: false,
        dialogVisible: false,
        dialogform: {},
        dataList: [{
          trademark: "SiiuMaid",
          trademarktype: "文字商标",
          country: "英国商标",
          MajorCategories: "第九类",
          Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
          CompanyName: "深圳市金畅进出口有限公司",
          address: "深圳市龙岗区龙城街道黄阁坑社区腾飞路9号创投大厦1610",
          LegalPersonC: "李恩群",
          LegalPersonE: "EnQun Li",
          Agency: "凯德盟",
          state: "申请中",
          evidenceType: "公司",
          categoryTable: "",
          evidenceImage: "",
          saleLink: "",
          saleOrder: "",
          salePage: "",
          ApplicationFee: "8268.00",
          InvoiceNumber: "13624077",
          ContractSigningDate: "2021/07/26",
          ApplicationDate: "2021/07/30",
          certificateDate: "2021-10-26",
          RegistrationNumber: "13624077",
          visa: "2021/10/26 - 2031/10/26",
          isRegister: true,
          Sponsor: "王美艳",
          ProposalTime: "2021-07-29"
        }, {
          trademark: "SiiuMaid",
          isRegister: false,
          Sponsor: "王美艳",
          ProposalTime: "2021-07-29"
        }, ],
        ExtendedVisible: false,
        ExtendedForm: {
          trademark: "SiiuMaid"
        }
      }
    },
    methods: {
      searchList() {},
      TrademarkProposal() {
        this.dialogVisible = true
      },
      registrationInfo() {
        this.$refs.EnterRegistrationInfo.initData()
      },

      materialInfo() {
        this.$refs.EnterMaterialInfo.initData()
      },
      progressInfo() {
        this.$refs.EnterProgressInfo.initData()
      },

      handleSelectionChange() {},
      ExtendedClass() {
        this.ExtendedVisible = true
      },
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 0px;

  }

  .inputwidth {
    width: 350px;
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

  .ColStyle {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    height: 545px;
    overflow: auto;
  }


  .borderShow {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    overflow: auto;
  }

  .labelColor {
    color: #0b3d50;
    font-weight: weight;
  }
</style>

<style lang="less">
  .el-tooltip__popper {
    max-width: 30%;

  }
</style>