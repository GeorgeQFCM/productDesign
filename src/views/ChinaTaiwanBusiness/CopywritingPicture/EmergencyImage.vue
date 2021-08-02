<template>
  <section>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-row>
      <el-card>
        <el-col>
          <div style="float: left;display: inline-flex;">
            <ComMateriel ref="SelectAnyMaterial">
              <el-form size="small" :inline="true" :model="query">
                <el-form-item>
                  <el-select v-model="query.state" style="width:150px" placeholder="请选择状态" clearable>
                    <el-option label="未上传" value="未上传"></el-option>
                    <el-option label="已上传" value="已上传"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <button class='bttn-fill bttn-md bttn-primary'>
                    <svg-icon icon-class="search" />查询</button>
                </el-form-item>
              </el-form>
            </ComMateriel>
            <ComMatSelected ref="ChildQueryMatSelected" @cbFun="cbFun"></ComMatSelected>
          </div>
        </el-col>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="cardClass">
        <button class='bttn-fill bttn-md bttn-success' @click="ClassifyVisible">
          <svg-icon icon-class="add" />新增物料</button>
      </el-card>
    </el-row>
    <el-row>
      <el-table :data="datalist" v-loading="listLoading" :row-key="getRowKeys" :expand-row-keys="expands"
        @expand-change="expandSelect" :height="TableHeight" style="width: 100%;" size="mini" highlight-current-row
        stripe border fit ref="multipleTable">
        <el-table-column type="expand" fixed="left">
          <template slot-scope="props">
            <el-table :data="datalist2" style="width: 90%;" size="mini">
              <el-table-column prop="saleBrand" label="销售品牌" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="pvUpdRemark" width="300px" label="应急图备注" show-overflow-tooltip align="center">
              </el-table-column>
              <el-table-column prop="cmsppcAuthor" label="图片作者" show-overflow-tooltip align="center"></el-table-column>
              <el-table-column prop="cmsppcUpdDatetime" label="图片最后更新时间" show-overflow-tooltip align="center">
                <template slot-scope="scope">
                  {{scope.row.cmsppcUpdDatetime | dateFormat('YYYY-MM-DD')}}
                </template>
              </el-table-column>
              <el-table-column prop="pvState" label="状态" show-overflow-tooltip align="center"></el-table-column>

              <!-- <el-table-column prop="pvSyncTimes" label="同步次数" show-overflow-tooltip align="center"></el-table-column> -->
              <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope">
                  <button class='bttn-stretch bttn-md bttn-primary' title="编辑图片" @click="handEditClick(scope.row)">
                    <svg-icon icon-class="photoToSellPoint" /></button>
                  <button class='bttn-stretch bttn-md bttn-warning' title="下载图片" @click="downPic(scope.row)">
                    <svg-icon icon-class="download" /></button>
                  <!-- 
                  <el-popover placement="left" width="280" trigger="click" style="margin-left:9px">
                    <el-table :data="gridData" border stripe>
                      <el-table-column width="50" type="selection"></el-table-column>
                      <el-table-column property="countryCode" label="页面"></el-table-column>
                    </el-table>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
                    </div>

                    <button slot="reference" class='bttn-stretch bttn-md bttn-success' title="同步更新">
                      <svg-icon icon-class="report-review" /></button>
                  </el-popover> -->

                  <button class='bttn-stretch bttn-md bttn-danger' v-if=" datalist2.length>1" title="删除"
                    @click="deletePV(scoped.row)">
                    <svg-icon icon-class="delete" /></button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="matCode" label="物料编码" sortable align="center"></el-table-column>
        <el-table-column prop="matCate" label="类目" align="center"></el-table-column>
        <el-table-column label="运营大类" prop="matOperateCate" align="center" sortable></el-table-column>
        <el-table-column label="产品名称" prop="matProName" align="center" sortable></el-table-column>
        <el-table-column label="公司品牌" prop="matComBrand" align="center" sortable></el-table-column>
        <el-table-column label="适用品牌或对象" prop="matBrand" align="center" sortable width="130px"></el-table-column>
        <el-table-column label="型号" prop="matModel" align="center" sortable width="100px"></el-table-column>
        <el-table-column label="款式" prop="matStyle" align="center" sortable></el-table-column>
        <!-- <el-table-column label="主材料" prop="matMainMaterial" align="center" sortable width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="图案" prop="matPattern" align="center" sortable width="80" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column label="颜色" prop="matColor" align="center" sortable></el-table-column>
        <el-table-column label="尺码" prop="matSize" align="center" sortable width="100px"></el-table-column>
        <el-table-column label="包装数量" prop="matPackQty" align="center" sortable></el-table-column>
        <!-- <el-table-column label="适用机型" prop="matCompatibleModel" align="center" sortable width="100" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column label="版本" prop="matVerson" align="center" sortable width="80" :show-overflow-tooltip="true"></el-table-column> -->
        <el-table-column label="产品信息" align="center">
          <template slot-scope="scope">
            <a href="javascript:void(0)" @click="jump(scope.row)">跳转</a>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" align="center" width="120px">
          <template slot-scope="scoped">
            <el-popover :ref="`popove-${scoped.$index}`" placement="top" width="300" trigger="click"
              @after-leave="popoverHide">
              <el-form ref="cvVerNameform " :model="cvVerNameform " label-width="80px">
                <el-form-item label="销售品牌:" v-if="scoped.row.matComBrand=='中性'">
                  <el-select v-model="cvVerNameform.pvVerName" @keyup.enter.native="sureAdd(scoped)"
                    :ref="scoped.$index"></el-select>
                </el-form-item>
              </el-form>
              <div style="text-align: right; margin: 0">
                <!-- <el-button size="mini" type="text" @click="sureCancel(scope)">取消</el-button> -->
                <el-button type="primary" size="mini" @click="sureAdd(scoped)">确定</el-button>
              </div>
              <button slot="reference" class='bttn-stretch bttn-md bttn-success' @click="showAdd(scoped)" title="新增"
                v-if="scoped.row.matComBrand=='中性'">
                <svg-icon icon-class="add" /></button>
            </el-popover>
            <button class='bttn-stretch bttn-md bttn-danger' title="删除" @click="deletePvVer(scoped.row)">
              <svg-icon icon-class="delete" /></button>
          </template>
        </el-table-column>

      </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" :page-size="query.row" :current-page="query.page" :page-sizes="[20,50,100]"
          :total="total" style="float:right;"></el-pagination>
      </el-col>
    </el-row>
    <!-- <PrictureChild ref="PrictureChildRef" :fatherMethod="queryPvVerName"></PrictureChild> -->


    <!-- 新增分类对话框   -->
    <el-dialog title="新增分类" :visible.sync="NewClassifyVisible" :close-on-press-escape="false"
      :close-on-click-modal="false" width="75%" @close="NewClassifyClose">
      <el-row>
        <el-col>
          <div style="float: left;display: inline-flex;">
            <ComMateriel ref="DialogChildQueryMat">
              <button class='bttn-fill bttn-md bttn-primary'>
                <svg-icon icon-class="search" />查询</button>
            </ComMateriel>
            <ComMatSelected ref="DialogQueryMatSelected" @cbFun="cbFun2"></ComMatSelected>
          </div>
        </el-col>
        <el-col style="margin-top:5px">
          <el-table :data="tableData" @selection-change="handleSelectionChange" height="300px" style="width: 100%;"
            size="mini" highlight-current-row stripe border fit ref="MulMaterialTable">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column property="matCode" label="物料编码" width="110" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column prop="matName" label="物料名称" width="120" align="center"></el-table-column>
            <el-table-column prop="matCate" label="类目" width="70" show-overflow-tooltip align="center">
            </el-table-column>
            <el-table-column label="运营大类" prop="matOperateCate" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="产品名称" prop="matProName" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="款式" prop="matStyle" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="主材料" prop="matMainMaterial" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="图案" prop="matPattern" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="公司品牌" prop="matComBrand" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="适用品牌或对象" prop="matBrand" align="center" sortable width="150"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="型号" prop="matModel" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="颜色" prop="matColor" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="尺码" prop="matSize" align="center" sortable width="80" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column label="包装数量" prop="matPackQty" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="适用机型" prop="matCompatibleModel" align="center" sortable width="100"
              :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="版本" prop="matVerson" align="center" sortable width="80"
              :show-overflow-tooltip="true"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="NewClassifyVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddNewClassify">确 定</el-button>
      </span>
    </el-dialog>

  </section>
</template>
<script>
  import ComMateriel from '@/views/Common/ComMateriel'
  import ComMatSelected from '@/views/Common/ComMatSelected'
  // import JSZip from 'jszip'
  // import FileSaver from 'file-saver'
  import PrictureChild from "./Components/PrictureChild";

  // import {
  //   isEmpty,
  //   deepClone
  // } from "@/utils/common";

  export default {
    components: {
      ComMatSelected,
      ComMateriel,
      PrictureChild
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
        listLoading: false,
        datalist: [{
            "matCode": "SYS210004",
            "matCate": "运动",
            "matOperateCate": "运动户外类-瑜伽",
            "matProName": "瑜伽铺巾",
            "matStyle": "印花款",
            "matMainMaterial": "速干双面绒",
            "matPattern": "",
            "matComBrand": "MoKo",
            "matBrand": "通用",
            "matModel": "-",
            "matSize": "-",
            "matVerson": "V1",
            "matColor": "曼陀罗",
            "matPackQty": "",
            "matCompatibleModel": "-",
            "pictureState": "未上传"
          },
          {
            "matCode": "SYS210003",
            "matCate": "运动",
            "matOperateCate": "运动户外类-瑜伽",
            "matProName": "瑜伽铺巾",
            "matStyle": "印花款",
            "matMainMaterial": "速干双面绒",
            "matPattern": "",
            "matComBrand": "MoKo",
            "matBrand": "通用",
            "matModel": "-",
            "matSize": "-",
            "matVerson": "V1",
            "matColor": "圣心莲",
            "matPackQty": "",
            "matCompatibleModel": "-",
            "pictureState": "未上传"
          },
          {
            "matCode": "SYS210002",
            "matCate": "运动",
            "matOperateCate": "运动户外类-瑜伽",
            "matProName": "矫正器",
            "matStyle": "矫正带短款",
            "matMainMaterial": "EVA+潜水料",
            "matPattern": "无",
            "matComBrand": "中性",
            "matBrand": "通用",
            "matModel": "-",
            "matSize": "-",
            "matVerson": "V1",
            "matColor": "黑色",
            "matPackQty": "(1pack)",
            "matCompatibleModel": "-",
            "pictureState": "已上传"
          },
        ],
        TableHeight: 550,
        comMateriel: {},
        total: 0, //总页数
        devDialogVisible: false,
        query: {
          row: 20,
          page: 1,
          isOwer: false,
        },
        ColorTableVisible: false,
        ColorData: [],
        datalist2: [{
          "pvVerName": "第一套",
          "cvVerName": "第一版",
          "cmsppcAuthor": "陈静敏",
          "cmsppcUpdDatetime": "2021-07-07T17:58:23.793",
          "sysCreatDate": "2021-06-11T14:49:04.35",
          "matCate": "运动",
          "matOperateCate": "水上运动",
          "matComBrand": "HeySplash",
          "matProName": "水袖",
          "matBrand": "儿童",
          "matModel": "-",
          "matStyle": "充气款",
          "matColor": "鲨鱼",
          "pvState": "已上传",
          "pvIsDefault": true,
          "pvUpdRemark": "应急图备注",
          "pvSyncTimes": 2,
          "saleBrand": "MOKO"
        }],
        visible: false,
        zhidingbanben: "",
        NewClassifyVisible: false,
        cvVerNameform: {
          pvVerName: ""
        },
        gridData: [{
            countryCode: "CC-CA-Zooawa-B08PFJTFRL"
          },
          {
            countryCode: "CC-DE-Zooawa-B08PFJTFRL"
          },
          {
            countryCode: "CC-ES-Zooawa-B08PFJTFRL"
          }, {
            countryCode: "CC-FR-Zooawa-B08PFJTFRL"
          }
        ],
        SeachCondition: {},
        tableData: [],
        cvVerName: '',
        // 展开行数组
        expands: [],
        multipleSelection: [],
        SyUpdateLoad: false,
        MatGroupName: '',
        options: []
      }
    },
    methods: {
      ClassifyVisible() {
        this.NewClassifyVisible = true
        this.$nextTick(() => {
          this.$refs.DialogChildQueryMat.initData({})
        })
      },

      jump(row) {
        let params = deepClone(row)
        let routeData = this.$router.push({
          name: '物料信息',
          // path: 'materiel',
          // query: row,
          params: params
        });
        // let routeData = this.$router.resolve({
        //   name: '物料信息',
        //   path: '/materiel',
        //   query: {
        //     matCate: row.matCate,
        //     matOperateCate: row.matOperateCate,
        //     matComBrand: row.matComBrand,
        //     matProName: row.matProName,
        //     matBrand: row.matBrand,
        //     matModel: row.matModel,
        //     matStyle: [row.matStyle],
        //     matColor: row.matColor,
        //     matCode: row.matCode,
        //   }
        // });
        // window.open(routeData.href, '_self');

      },
      //点击删除 图片分类
      deletePV(row) {
        this.$confirm('此操作将永久删除该套数, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteSellPointPicturePvName({
            MatCode: this.matCode,
            PvVerName: row.pvVerName
          }).then(res => {
            this.GetPage(this.query.page)
            this.queryPvVerName(this.matCode)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      downText(row) {
        let matGroupName = row.matCate + '->' + row.matOperateCate + '->' + row.matProName + '->' + row.matStyle +
          '->' + row.matMainMaterial + '->' +
          row.matComBrand + '->' + row.matBrand + '->' + row.matModel + '->' + row.matCompatibleModel + '->' + row
          .matSize + '->' + row.matVerson
        let fileName = row.matCode + '_' + row.matStyle
        QueryCopy({
          matGroupName: matGroupName,
          cvVerName: ""
        }).then(res => {
          if (res.data.length > 0) {
            let downArr = []
            let obj = {}
            res.data.forEach(item => {
              obj = {}
              obj = {
                link: item.cvdLink,
                name: item.cvVerName + '__' + item.cvdLink.split('\\')[item.cvdLink.split('\\').length - 1]
              }
              downArr.push(obj)
            });
            this.BatchDownload(downArr, fileName)
          } else {
            return this.$message.warning("无可下载文案")
          }
        })
      },
      downPic(row) {
        let fileName = this.matCode + '_' + row.matStyle + '_' + row.pvVerName
        QueryPictures({
          matCode: this.matCode,
          pvVerName: row.pvVerName
        }).then(res => {
          if (res.data.length > 0) {
            let downArr = []
            let obj = {}
            res.data.forEach(item => {
              obj = {}
              obj = {
                link: item.pvdPhoAddr,
                name: item.pvdPhoAddr.split('\\')[item.pvdPhoAddr.split('\\').length - 1]
              }
              downArr.push(obj)
            });
            this.BatchDownload(downArr, fileName)
          } else {
            return this.$message.warning("无可下载图片")
          }
        })
      },
      // imgDataUrl 数据的url数组
      BatchDownload(imgDataUrl, fileName) {
        let _this = this;
        let zip = new JSZip();
        let cache = {};
        let promises = [];
        _this.title = '正在加载压缩文件';
        for (let item of imgDataUrl) {
          const promise = _this.getImgArrayBuffer(item.link).then(data => {
            // 下载文件, 并存成ArrayBuffer对象(blob)
            zip.file(item.name, data, {
              binary: true
            }); // 逐个添加文件
            cache[item.name] = data;
          });
          promises.push(promise);
        }
        Promise.all(promises).then(() => {
          zip.generateAsync({
            type: "blob"
          }).then(content => {
            _this.title = '正在压缩';
            // 生成二进制流
            FileSaver.saveAs(content, fileName); // 利用file-saver保存文件  自定义文件名
            _this.title = '压缩完成';
          });
        }).catch(res => {
          _this.$message.error('文件压缩失败');
        });
      },
      //通过url 转为blob格式的数据
      getImgArrayBuffer(url) {
        let _this = this;
        return new Promise((resolve, reject) => {
          //通过请求获取文件blob格式
          let xmlhttp = new XMLHttpRequest();
          xmlhttp.open("GET", url, true);
          xmlhttp.responseType = "blob";
          xmlhttp.onload = function () {
            if (this.status == 200) {
              resolve(this.response);
            } else {
              reject(this.status);
            }
          }
          xmlhttp.send();
        });
      },
      showAdd(scope) {
        setTimeout(() => {
          scope._self.$refs[scope.$index].focus()
        }, 10);
      },

      //点击 确认 对应文案    
      surePvAdd(scope) {
        if (this.cvVerName === '') {
          return this.$message.warning('请指定对应文案')
        }
        let condition = {
          matCode: this.matCode,
          cvVerName: this.cvVerName,
          pvVerName: scope.row.pvVerName
        }
        UpdateCorrespondingCopy(condition).then(res => {
          if (res.code == -1) {
            this.$message.warning(res.msg)
          } else {
            scope._self.$refs[`popover-${scope.$index}`].doClose()
            this.$message.success(res.msg)
            this.queryPvVerName(this.matCode)
            this.GetPage(this.query.page)
          }
        }).catch(res => res.msg)
      },
      sureCancel(scope) {
        scope._self.$refs[`popover-${scope.$index}`].doClose()
      },

      //获取对应文案
      getCopy(row) {
        this.MatGroupName = row.matCate + '->' + row.matOperateCate + '->' + row.matProName + '->' + row.matStyle +
          '->' + row.matMainMaterial + '->' +
          row.matComBrand + '->' + row.matBrand + '->' + row.matModel + '->' + row.matCompatibleModel + '->' + row
          .matSize + '->' + row.matVerson
        QueryCopyName({
          MatGroupName: this.MatGroupName
        }).then(res => {
          this.options = res.data
        })
      },


      cvHide() {
        this.cvVerName = ''
      },
      //点击 指定默认版本
      defaultV(row) {
        let conditon = {
          matCode: this.matCode,
          pvVerName: row.pvVerName
        }
        UpdatePicDefaultVersion(conditon).then(res => {
          this.queryPvVerName(this.matCode)
          this.$message.success("指定默认套数成功")
        })
      },

      SyUpdate(row) {
        this.SyUpdateLoad = true
        SynchronousUpdate({
          MatCode: this.matCode,
          PvVerName: row.pvVerName
        }).then(res => {
          if (res.code == 0) {
            this.SyUpdateLoad = false
            this.$message.success(res.msg)
          } else {
            this.SyUpdateLoad = false
            this.$message.warning(res.msg)
          }
        })

      },
      //点击确定新增套数
      sureAdd(scoped) {
        if (isEmpty(this.cvVerNameform.pvVerName)) {
          return this.$message.warning("请输入套数名称")
        }
        this.cvVerNameform.matCode = scoped.row.matCode
        this.cvVerNameform.matCate = scoped.row.matCate
        this.cvVerNameform.matOperateCate = scoped.row.matOperateCate
        this.cvVerNameform.matProName = scoped.row.matProName
        this.cvVerNameform.matStyle = scoped.row.matStyle
        this.cvVerNameform.matMainMaterial = scoped.row.matMainMaterial
        this.cvVerNameform.matPattern = scoped.row.matPattern
        this.cvVerNameform.matComBrand = scoped.row.matComBrand
        this.cvVerNameform.matBrand = scoped.row.matBrand
        this.cvVerNameform.matModel = scoped.row.matModel
        this.cvVerNameform.matColor = scoped.row.matColor
        this.cvVerNameform.matSize = scoped.row.matSize
        this.cvVerNameform.matPackQty = scoped.row.matPackQty
        this.cvVerNameform.matCompatibleModel = scoped.row.matCompatibleModel
        this.cvVerNameform.matVerson = scoped.row.matVerson
        this.cvVerNameform.pvState = "未上传"
        this.cvVerNameform.cvVerName = ""
        this.cvVerNameform.cvIsDefault = false
        scoped._self.$refs[`popove-${scoped.$index}`].doClose()
      },

      popoverHide() {
        this.cvVerNameform.pvVerName = ""
      },

      //点击删除 图片分类
      deletePvVer(row) {
        this.$confirm('此操作将永久删除该物料, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //获取行数据的 key
      getRowKeys(row) {
        return row.matCode
      },
      //监听扩展列 打开或关闭 触发
      expandSelect(row, expandedRows) {
        var that = this;
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.matCode)
            this.matCode = row.matCode
          }
        } else {
          that.expands = []
        }
      },
      //查询版本套数
      queryPvVerName(matCode) {
        QueryPvVerName({
          MatCode: matCode
        }).then(res => {
          this.datalist2 = res.data;
        })
      },

      //监听对话框所选择的
      handleSelectionChange(rows) {
        this.multipleSelection = rows
      },

      //监听对话框关闭
      NewClassifyClose() {
        this.tableData = []
        this.SeachCondition = {}
        this.$refs.DialogQueryMatSelected.handleIconClick()
      },

      //点击确定按钮 校验 新增
      AddNewClassify() {
        if (isEmpty(this.multipleSelection)) {
          return this.$message.warning('请选择添加的数据')
        }
        var NewArr = []
        this.multipleSelection.forEach(x => {
          NewArr.push({
            matCode: x.matCode,
            pvVerName: "第一套",
            matCate: x.matCate,
            matOperateCate: x.matOperateCate,
            matProName: x.matProName,
            matStyle: x.matStyle,
            matMainMaterial: x.matMainMaterial,
            matComBrand: x.matComBrand,
            matBrand: x.matBrand,
            matModel: x.matModel,
            matSize: x.matSize,
            matVerson: x.matVerson,
            matCompatibleModel: x.matCompatibleModel,
            matColor: x.matColor,
            matPattern: x.matPattern,
            matPackQty: x.matPackQty,
            pvState: "未上传",
            pvIsDefault: true
          })
        })
        AddMateClassification(NewArr).then(res => {
          this.$message.success(res.msg)
          this.NewClassifyVisible = false
          this.GetPage(1)
        })
      },
      handEditClick(row) {
        let _this = this;
        const id = this.$layer.iframe({
          title: "",
          // area: 'auto',
          area: ["1334px", "790"],
          content: {
            content: PrictureChild, //组件         
            parent: this, //vue实例 传入实例 弹窗组件内才能获取laydata
            data: {}
          },
          canmove: true, //true可以拖动 false不能拖动
          shade: false,
          resize: true, //是否允许拉伸，默认是不允许
          scrollbar: true, //是否允许浏览器出现滚动条:默认是允许
          maxmin: true, //开启最大化最小化
          tipsMore: false, //是否允许多个tips
          //弹窗成功 id弹窗的id
          success: () => {},
          //弹窗关闭/取消
          end: () => {

          },
          cancel: () => {

          },
          //还原状态回调 id弹窗的id state：1 是由最小化还原 2是由最大化还原
          maxminiCallback: (id, state) => {},
          //最小化回调 id弹窗的id
          miniCallback: (id) => {},
          //最大化回调 id弹窗的id
          maxCallback: (id) => {},
        });

      },
      handCheckClick(row) {
        QueryshopNameSimpleAndcountryCode({
          matCode: row.matCode,

        }).then((res) => {
          this.gridData = [];
          for (let i = 0; i < res.length; i++) {
            if (!this.gridData.length) {
              //第一次进来 往数组加入第一条数据
              this.gridData.push(res[i]);
            } else {
              let isHas = false;
              for (let j = 0; j < this.gridData.length; j++) {
                //第二次进来之后 判断有没有和数组中shopname一样的
                if (this.gridData[j].shopNameSimple == res[i].shopNameSimple) {
                  this.gridData[j].countryCode =
                    this.gridData[j].countryCode + "," + res[i].countryCode;
                  isHas = true;
                  //加入每一次进来的站点
                }
              }
              if (!isHas) this.gridData.push(res[i]); //如果没有一样的 往数组加多一条
            }
          }
        });
      },
      handleSizeChange(val) {
        this.query.row = val;
        this.GetPage(this.query.page);
      },
      handleCurrentChange(val) {
        this.query.page = val;
        this.GetPage(val);
      },
      GetPage(page = 1) {
        this.listLoading = true;
        this.query.page = page
        let matObj = {
          matCate: this.$refs.SelectAnyMaterial.query.matCate[0] ? this.$refs.SelectAnyMaterial.query.matCate : [],
          matOperateCate: this.$refs.SelectAnyMaterial.query.matOperateCate[0] ? this.$refs.SelectAnyMaterial.query
            .matOperateCate : [],
          matProName: this.$refs.SelectAnyMaterial.query.matProName[0] ? this.$refs.SelectAnyMaterial.query
            .matProName : [],
          matStyle: this.$refs.SelectAnyMaterial.query.matStyle[0] ? this.$refs.SelectAnyMaterial.query.matStyle : [],
          matMainMaterial: this.$refs.SelectAnyMaterial.query.matMainMaterial[0] ? this.$refs.SelectAnyMaterial.query
            .matMainMaterial : [],
          matPattern: this.$refs.SelectAnyMaterial.query.matPattern[0] ? this.$refs.SelectAnyMaterial.query
            .matPattern : [],

          matComBrand: this.$refs.SelectAnyMaterial.query.matComBrand[0] ? this.$refs.SelectAnyMaterial.query
            .matComBrand : [],
          matBrand: this.$refs.SelectAnyMaterial.query.matBrand[0] ? this.$refs.SelectAnyMaterial.query.matBrand : [],
          matModel: this.$refs.SelectAnyMaterial.query.matModel[0] ? this.$refs.SelectAnyMaterial.query.matModel : [],
          matColor: this.$refs.SelectAnyMaterial.query.matColor,
          matSize: this.$refs.SelectAnyMaterial.query.matSize[0] ? this.$refs.SelectAnyMaterial.query.matSize : [],
          matPackQty: this.$refs.SelectAnyMaterial.query.matPackQty[0] ? this.$refs.SelectAnyMaterial.query
            .matPackQty : [],

          matCompatibleModel: this.$refs.SelectAnyMaterial.query.matCompatibleModel,
          matVerson: this.$refs.SelectAnyMaterial.query.matVerson[0] ? this.$refs.SelectAnyMaterial.query.matVerson :
            [],
          matCodeOrSPU: this.$refs.SelectAnyMaterial.query.matCodeOrSPU[0] ? this.$refs.SelectAnyMaterial.query
            .matCodeOrSPU : [],
        }
        let detail = {
          ...matObj,
          ...this.query
        };
        QuerySellPointPictrue(detail).then((response) => {
            this.total = response.data.total;
            if (this.total != 0) {
              this.datalist = response.data.rows;
            } else {
              this.datalist = [];
            }
            this.listLoading = false;
          })
          .catch((res) => {
            this.listLoading = false;
          });
      },

      cbFun(data) {
        if (isEmpty(data)) {
          return;
        } else {
          let attributes = data.split("->");
          let objAttribute = {
            matCate: "",
            matOperateCate: "",
            matProName: "",
            matStyle: "",
            matMainMaterial: "",
            matComBrand: "",
            matBrand: "",
            matModel: "",
            matCompatibleModel: "",
            matSize: "",
            matVerson: "",
          };
          if (attributes.length >= 7) {
            objAttribute.matCate = attributes[0];
            objAttribute.matOperateCate = attributes[1];
            objAttribute.matProName = attributes[2];
            objAttribute.matStyle = attributes[3];
            objAttribute.matMainMaterial = attributes[4];

            objAttribute.matComBrand = attributes[5];
            objAttribute.matBrand = attributes[6];
            objAttribute.matModel = attributes[7];
            objAttribute.matCompatibleModel = attributes[8];
            objAttribute.matSize = attributes[9];
            objAttribute.matVerson = attributes[10];
          }
          this.$refs.SelectAnyMaterial.initData(objAttribute);
          this.GetPage();
        }
      },
      GetDictionaryList() { //查询字典
        GetDictionaryList().then(res => {
          this.TFOpt = res.data.filter(p => p.dicClassCode == 's04')
          this.CopLevelOpt = res.data.filter(p => p.dicClassCode == 'p37')
          this.PhoLevelOpt = res.data.filter(p => p.dicClassCode == 'p38')
        })
      },


      cbFun2(data) {
        if (isEmpty(data)) {
          return;
        } else {
          let attributes = data.split("->");
          let objAttribute = {
            matCate: "",
            matOperateCate: "",
            matProName: "",
            matStyle: "",
            matMainMaterial: "",
            matComBrand: "",
            matBrand: "",
            matModel: "",
            matCompatibleModel: "",
            matSize: "",
            matVerson: "",
          };
          if (attributes.length >= 7) {
            objAttribute.matCate = attributes[0];
            objAttribute.matOperateCate = attributes[1];
            objAttribute.matProName = attributes[2];
            objAttribute.matStyle = attributes[3];
            objAttribute.matMainMaterial = attributes[4];

            objAttribute.matComBrand = attributes[5];
            objAttribute.matBrand = attributes[6];
            objAttribute.matModel = attributes[7];
            objAttribute.matCompatibleModel = attributes[8];
            objAttribute.matSize = attributes[9];
            objAttribute.matVerson = attributes[10];
          }
          this.$refs.DialogChildQueryMat.initData(objAttribute);
          this.GetMat();
        }
      },
      GetMat() {
        if (!isEmpty(this.$refs.DialogChildQueryMat.query.matCate) || !isEmpty(this.$refs.DialogChildQueryMat.query
            .matCodeOrSPU)) {
          this.SeachCondition.row = 100
          this.SeachCondition.page = 1
        } else {
          return this.$message.warning("请选择查询条件")
        }
        let matObj = {
          matCate: this.$refs.DialogChildQueryMat.query.matCate[0] ? this.$refs.DialogChildQueryMat.query.matCate :
          [],
          matOperateCate: this.$refs.DialogChildQueryMat.query.matOperateCate[0] ? this.$refs.DialogChildQueryMat
            .query.matOperateCate : [],
          matProName: this.$refs.DialogChildQueryMat.query.matProName[0] ? this.$refs.DialogChildQueryMat.query
            .matProName : [],
          matStyle: this.$refs.DialogChildQueryMat.query.matStyle[0] ? this.$refs.DialogChildQueryMat.query.matStyle :
            [],
          matMainMaterial: this.$refs.DialogChildQueryMat.query.matMainMaterial[0] ? this.$refs.DialogChildQueryMat
            .query.matMainMaterial : [],
          matPattern: this.$refs.DialogChildQueryMat.query.matPattern[0] ? this.$refs.DialogChildQueryMat.query
            .matPattern : [],

          matComBrand: this.$refs.DialogChildQueryMat.query.matComBrand[0] ? this.$refs.DialogChildQueryMat.query
            .matComBrand : [],
          matBrand: this.$refs.DialogChildQueryMat.query.matBrand[0] ? this.$refs.DialogChildQueryMat.query.matBrand :
            [],
          matModel: this.$refs.DialogChildQueryMat.query.matModel[0] ? this.$refs.DialogChildQueryMat.query.matModel :
            [],
          matColor: this.$refs.DialogChildQueryMat.query.matColor,
          matSize: this.$refs.DialogChildQueryMat.query.matSize[0] ? this.$refs.DialogChildQueryMat.query.matSize :
          [],
          matPackQty: this.$refs.DialogChildQueryMat.query.matPackQty[0] ? this.$refs.DialogChildQueryMat.query
            .matPackQty : [],

          matCompatibleModel: this.$refs.DialogChildQueryMat.query.matCompatibleModel,
          matVerson: this.$refs.DialogChildQueryMat.query.matVerson[0] ? this.$refs.DialogChildQueryMat.query
            .matVerson : [],
          matCodeOrSPU: this.$refs.DialogChildQueryMat.query.matCodeOrSPU[0] ? this.$refs.DialogChildQueryMat.query
            .matCodeOrSPU : [],
        }
        let detail = {
          ...matObj,
          ...this.SeachCondition
        };
        QueryMaterielPagePic(detail).then(res => {
          this.tableData = res.data.rows
        })
      }

    },
    mounted() {
      // this.GetPage();
      //this.GetDictionaryList()
    }
  }
</script>

<style lang="scss" scoped>
  /deep/.cardClass {
    margin-top: 5px;

    .el-card__body {
      padding: 10px 20px !important;
    }
  }

  /deep/.el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 12px;
  }

  .DevDialog {
    .NewProDevIput {
      width: 100%;
      display: block;

      .el-input {
        width: 100%;

        /deep/.el-input__inner {
          width: 600px
        }

      }

      .el-textarea {
        /deep/.el-textarea__inner {
          width: 600px
        }
      }
    }

    .NewProDevLinkIput {
      display: inline;

      .el-input {
        width: 500px;

        /deep/.el-input__inner {
          width: 500px
        }

      }
    }
  }

  .el-icon-warning-outline {
    font-size: 16px;
  }
</style>