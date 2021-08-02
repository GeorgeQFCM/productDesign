<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-card>
      <el-form inline :model="QueryFrom" style="margin-top:10px;margin-left:5px">
        <el-form-item>
          <el-select v-model="QueryFrom.BrandName" multiple placeholder="请选择品牌名称" style="width:500px">
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
      <el-table fit border :data="dataList" v-loading="tableLoading" ref="multipleTable" stripe
        @selection-change="handleSelectionChange" width="100%" height="700px">
        <el-table-column type="index" width="55" align="center"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-col :span="16">
              <div class="borderShow" style="height:350px">
                <div class="titleContainer">
                  <span class="titleStyle">
                    授权信息
                  </span>
                </div>
                <div>
                  <el-button class='bttn-fill bttn-sm bttn-success' @click="newAdd">
                    <svg-icon icon-class="add" />新增授权信息</el-button>
                  <el-button class='bttn-fill bttn-sm bttn-royal' style="float: right;margin-right:10px">
                    <svg-icon icon-class="Apply" />保存</el-button>
                </div>

                <el-table :data="tableData" border style="width: 99%" size="mini" height="260px">
                  <el-table-column prop="RegistrationNumber" label="品牌注册号">
                    <template slot-scope="scope">
                      <el-input size="mini" v-if="scope.row.isEdit" v-model="scope.row.RegistrationNumber"
                        placeholder="请输入内容">
                      </el-input>
                      <span v-else>{{scope.row.RegistrationNumber}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="country" label="品牌注册国家">
                    <template slot-scope="scope">
                      <el-select size="mini" v-if="scope.row.isEdit" v-model="scope.row.country" filterable>
                        <el-option label="美国" value="美国"></el-option>
                        <el-option label="加拿大" value="加拿大"></el-option>
                        <el-option label="澳大利亚" value="澳大利亚"></el-option>
                      </el-select>
                      <span v-else>{{scope.row.country}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="platform" label="平台">
                    <template slot-scope="scope">
                      <el-select size="mini" v-if="scope.row.isEdit" v-model="scope.row.platform" filterable>
                        <el-option label="Amazon" value="Amazon"></el-option>
                        <el-option label="eBay" value="eBay"></el-option>
                      </el-select>
                      <span v-else>{{scope.row.platform}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="shop" label="BR注册店铺" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-select size="mini" v-if="scope.row.isEdit" v-model="scope.row.shop" filterable>
                        <el-option label="Amazon_BY_US" value="Amazon_BY_US"></el-option>
                        <el-option label="Amazon_BY_UK" value="Amazon_BY_UK"></el-option>
                      </el-select>
                      <span v-else>{{scope.row.shop}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="mailbox" label="BR注册邮箱" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-input size="mini" v-if="scope.row.isEdit" v-model="scope.row.mailbox" placeholder="请输入内容">
                      </el-input>
                      <span v-else>{{scope.row.mailbox}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="grantshop" label="BR授权店铺" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-select size="mini" v-if="scope.row.isEdit" v-model="scope.row.grantshop" filterable>
                        <el-option label="Amazon_BY_US" value="Amazon_BY_US"></el-option>
                        <el-option label="Amazon_BY_UK" value="Amazon_BY_UK"></el-option>
                      </el-select>
                      <span v-else>{{scope.row.grantshop}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="grantmailbox" label="BR授权邮箱" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <el-input size="mini" v-if="scope.row.isEdit" v-model="scope.row.grantmailbox"
                        placeholder="请输入内容">
                      </el-input>
                      <span v-else>{{scope.row.grantmailbox}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="grantuser" label="BR授权角色">
                    <template slot-scope="scope">
                      <el-input size="mini" v-if="scope.row.isEdit" v-model="scope.row.grantuser" placeholder="请输入内容">
                      </el-input>
                      <span v-else>{{scope.row.grantuser}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="scope">
                      <el-button class='bttn-stretch bttn-md bttn-primary' size="mini"
                        @click="scope.row.isEdit=!scope.row.isEdit">
                        <svg-icon icon-class="Apply" />
                      </el-button>
                      <el-button class='bttn-stretch bttn-md bttn-danger' size="mini" @click="del(scope.$index)">
                        <svg-icon icon-class="delete" />
                      </el-button>
                      <el-button class='bttn-stretch bttn-md bttn-danger' size="mini" @click="add(scope.row)">
                        <svg-icon icon-class="add" />
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="borderShow" style="height:350px">
                <div class="titleContainer">
                  <span class="titleStyle">
                    商标信息
                  </span>
                </div>
                <el-table size="mini" border :data="trademarkList" v-loading="tableLoading" ref="multipleTable" stripe
                  @selection-change="handleSelectionChange" width="99%" height="300px">
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
                </el-table>
              </div>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column label="销售品牌名称" prop="BrandName" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="state" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
              @click.native="setSwitch(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="售后服务邮箱" prop="mailbox" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="绑定电话" prop="Telephone" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="官网" prop="website" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Facebook" prop="Facebook" align="center" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Instagram" prop="Instagram" align="center" show-overflow-tooltip>
        </el-table-column>

        <el-table-column label="公共信息" prop="commentInfo" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-primary' @click="EditcommentInfo(scope.row)">
              <svg-icon icon-class="copywriting" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="logo" prop="logo" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-warning' @click="Editlogo(scope.row)">
              <svg-icon icon-class="logo" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="slogan" prop="slogan" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-success' @click="EditSlogan(scope.row)">
              <svg-icon icon-class="writing" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="外包装" prop="OuterPacking" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-warning' @click="EditOuterPacking(scope.row)">
              <svg-icon icon-class="package" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="售后服务卡" prop="serviceCard" align="center" width="100">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-danger' @click="EditServiceCard(scope.row)">
              <svg-icon icon-class="reward" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="品牌故事" prop="BrandStory" align="center" width="80">
          <template slot-scope="scope">
            <el-button class='bttn-stretch bttn-lg bttn-success' @click="EditBrandStory(scope.row)">
              <svg-icon icon-class="script" />
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

    <el-dialog title="品牌公共信息" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
      <el-form :model="dialogform" size="small">
        <el-form-item label="品牌名称">
          <span>{{dialogform.BrandName}}</span>
        </el-form-item>
        <el-form-item label="售后服务邮箱">
          <el-input v-model="dialogform.mailbox"></el-input>
        </el-form-item>
        <el-form-item label="绑定电话">
          <el-input v-model="dialogform.Telephone"></el-input>
        </el-form-item>
        <el-form-item label="官网">
          <el-input v-model="dialogform.website"></el-input>
        </el-form-item>
        <el-form-item label="Facebook">
          <el-input v-model="dialogform.Facebook"></el-input>
        </el-form-item>
        <el-form-item label="Instagram">
          <el-input v-model="dialogform.Instagram"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-el-button @click="dialogVisible = false">取 消</el-el-button>
        <el-el-button type="primary" @click="dialogVisible = false">确 定</el-el-button>
      </span>
    </el-dialog>

    <LogoManagement ref="LogoManagement"></LogoManagement>
    <SloganManagement ref="SloganManagement"></SloganManagement>
    <OuterPackagingManagement ref="OuterPackagingManagement"></OuterPackagingManagement>
    <ServiceCardManagement ref="ServiceCardManagement"></ServiceCardManagement>
    <BrandStoryManagement ref="BrandStoryManagement"></BrandStoryManagement>
  </section>
</template>

<script>
  import LogoManagement from './components/LogoManagement.vue'
  import SloganManagement from './components/SloganManagement.vue'
  import OuterPackagingManagement from './components/OuterPackagingManagement.vue'
  import ServiceCardManagement from './components/ServiceCardManagement.vue'
  import BrandStoryManagement from './components/BrandStoryManagement.vue'
  export default {
    components: {
      LogoManagement,
      SloganManagement,
      OuterPackagingManagement,
      ServiceCardManagement,
      BrandStoryManagement
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
          page: 1,
        },
        total: 0,
        tableLoading: false,
        dialogVisible: false,
        dialogform: {},
        dataList: [{
            BrandName: "SiiuMaid",
            mailbox: "eumaster@ebuyyue.com",
            Telephone: "1888888888",
            website: "www.SiiuMaid.com",
            Facebook: "Facebook",
            Instagram: "Instagram",
            state: true,
          }, {
            BrandName: "SiiuMaid",
            mailbox: "eumaster@ebuyyue.com",
            Telephone: "1888888888",
            website: "www.SiiuMaid.com",
            Facebook: "Facebook",
            Instagram: "Instagram",
            state: true,
          },
          {
            BrandName: "SiiuMaid",
            mailbox: "eumaster@ebuyyue.com",
            Telephone: "1888888888",
            website: "www.SiiuMaid.com",
            Facebook: "Facebook",
            Instagram: "Instagram",
            state: true,

          },
          {
            BrandName: "SiiuMaid",
            mailbox: "eumaster@ebuyyue.com",
            Telephone: "1888888888",
            website: "www.SiiuMaid.com",
            Facebook: "Facebook",
            Instagram: "Instagram",
            state: false,

          }
        ],
        tableData: [{
          RegistrationNumber: "123456",
          country: "美国",
          platform: "Amazon",
          shop: "Amazon_BY_US",
          mailbox: "eumaster@ebuyyue.com",
          grantshop: "Amazon_BY_US",
          grantmailbox: "eumaster@ebuyyue.com",
          grantuser: "administrator",
          isEdit: false
        }],
        trademarkList: [{
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "中国",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            department: "财务部"
          }, {
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "美国",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            department: "财务部"
          },
          {
            trademark: "SiiuMaid",
            RegistrationNumber: "123456",
            country: "日本",
            MajorCategories: "第九类",
            Subclass: "【0901】 - 电子计算机及其外部设备;【0902】 - 记录、记数检测器;【0903】 - 其他办公用机械（不包括打字机、誊写机、油印机）;【0904】 - 衡器;【0905】 - 量具;【0906】 - 信号器具;【0907】 - 通讯导航设备;【0908】 - 音像设备;【0909】 - 摄影、 电影用具及仪器;【0910】 -测量仪器仪表， 实验室用器具， 电测量仪器， 科学仪器;【0911】 - 光学仪器;【0912】 - 光电传输材料;【0913】 - 电器用晶体及碳素材料， 电子、 电气通用元件;【0914】 -电器成套设备及控制装置;【0915】 - 电解装置;【0916】 - 灭火器具;【0918】 - 工业用X光机械设备;【0919】 - 安全救护器具;【0920】 - 警报装置， 电铃;【0921】 -眼镜及附件;【0922】 - 电池， 充电器;【0923】 - 电影片， 已曝光材料;【0924】 - 其他;",
            termofvalidity: '2021/07/21-2030/07/21',
            department: "财务部"
          }
        ],
      }
    },
    methods: {
      searchList() {},
      newAdd() {
        this.tableData.push({
          RegistrationNumber: "",
          country: "",
          platform: "",
          shop: "",
          mailbox: "",
          grantshop: "",
          grantmailbox: "",
          grantuser: "",
          isEdit: true
        })
      },
      add(row) {
        this.tableData.push({
          RegistrationNumber: row.RegistrationNumber,
          country: row.country,
          platform: row.platform,
          shop: row.shop,
          mailbox: row.mailbox,
          grantshop: row.grantshop,
          grantmailbox: row.grantmailbox,
          grantuser: row.grantuser,
          isEdit: true
        })
      },

      del(index) {
        console.log(index);
        this.tableData.splice(index, 1);
      },
      handleSelectionChange() {},
      EditcommentInfo(row) {
        this.dialogVisible = true
        this.dialogform = {
          BrandName: row.BrandName,
          mailbox: row.mailbox,
          Telephone: row.Telephone,
          website: row.website,
          Facebook: row.Facebook,
          Instagram: row.Instagram,
        }
      },
      setSwitch(row) {
        let flg = !row.state
        console.log(flg);
        const text = row.state ? '启用' : '禁用'
        this.$confirm(`确定${text}吗？`, '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          row.state = !flg
        }).catch(() => {
          row.state = flg
        });
      },
      Editlogo(row) {
        this.$refs.LogoManagement.initData()
      },
      EditSlogan(row) {
        this.$refs.SloganManagement.initData()
      },
      EditOuterPacking(row) {
        this.$refs.OuterPackagingManagement.initData()
      },
      EditServiceCard(row) {
        this.$refs.ServiceCardManagement.initData()
      },
      EditBrandStory(row) {
        this.$refs.BrandStoryManagement.initData()
      },


    }
  }
</script>

<style lang="scss" scoped>
  /deep/.el-card__body {
    padding: 0px;
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
    width: 96%;
  }

  /deep/.el-table__expanded-cell[class*=cell] {
    padding: 20px 10px;
  }
</style>

<style lang="less">
  .el-tooltip__popper {
    max-width: 30%;
  }
</style>