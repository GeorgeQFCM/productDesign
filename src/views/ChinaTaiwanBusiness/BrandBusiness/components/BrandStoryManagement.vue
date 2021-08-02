<template>
  <el-dialog title="品牌故事信息" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
    <el-form :model="dialogform" size="small">
      <el-form-item label="品牌名称">
        <span>SiiuMaid</span>
      </el-form-item>
    </el-form>
    <div>
      <el-form inline>
        <el-form-item label="版本名称">
          <el-input style="width:200px;margin-right:10px" size="small" v-model="edition"></el-input>
        </el-form-item>
        <el-form-item label="用途">
          <el-select v-model="purpose" multiple placeholder="请选择用途" size="small">
            <el-option label="页面用" value="页面用">
            </el-option>
            <el-option label="其他" value="其他">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <button class='bttn-fill bttn-md bttn-success' @click="newAdd">
            <svg-icon icon-class="add" />新增版本</button>
        </el-form-item>
      </el-form>


    </div>
    <el-table :data="tableData" border style="width: 100%" stripe size="small">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col v-if="props.row.purpose=='页面用'" :span="24" class="borderShow">
              <el-image style="width: 99%; height:99%" :src="require('../image/图片1.png')"
                :preview-src-list="[require('../image/图片1.png')]" fit="scale-down"></el-image>
            </el-col>
            <el-col v-else :span="24" class="borderShow">
              <div class="titleContainer">
                <span class="titleStyle">
                  文案
                </span>
              </div>
              <a target="_blank" href="http://www.w3school.com.cn">其他用品牌故事文案.excel</a>
            </el-col>

          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="edition" label="故事版本" width="100" align="center">
      </el-table-column>
      <el-table-column prop="purpose" label="用途" width="100" align="center">
      </el-table-column>
      <el-table-column prop="CopyEdit" label="文案编辑状态" align="center">
      </el-table-column>
      <el-table-column prop="CopyAuthor" label="文案作者" align="center">
      </el-table-column>
      <el-table-column prop="CopyTime" label="文案最后更新时间" align="center">
      </el-table-column>
      <el-table-column prop="PicEdit" label="图片编辑状态" align="center">
      </el-table-column>
      <el-table-column prop="PicAuthor" label="图片作者" align="center">
      </el-table-column>
      <el-table-column prop="PicTime" label="图片最后更新时间" align="center">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
            @click.native="setSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <button class='bttn-stretch bttn-md bttn-primary' @click="Edit(scope.row,'copy')">
            <svg-icon icon-class="Apply" /></button>
          <button v-if="scope.row.purpose=='页面用'" class='bttn-stretch bttn-md bttn-primary'
            @click="Edit(scope.row,'pic')">
            <svg-icon icon-class="photoToSellPoint" /></button>
          <button class='bttn-stretch bttn-md bttn-primary'>
            <svg-icon icon-class="download" /></button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="故事文案上传" :append-to-body="true" :visible.sync="copydrawer" :direction="direction"
      :before-close="handleClose">
      <el-upload multiple class="upload-demo InpuClass" ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/" :file-list="fileList" :auto-upload="false">
        <div>
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器
          </el-button>
        </div>
      </el-upload>
    </el-drawer>


    <el-drawer :append-to-body="true" :visible.sync="picdrawer" :direction="direction" :before-close="handleClose"
      size="60%">
      <template #title>
        <span>故事图片上传</span>
        <el-button class="bttn-fill bttn-md bttn-royal" size="small" @click="sureSave(0)">保存</el-button>
        <el-button class="bttn-fill bttn-md bttn-success" size="small" style="margin-right:20px" @click="sureSave(1)">提交
        </el-button>
      </template>
      <el-card>
        <div slot="header" class="clearfix">
          <h3>From the brand</h3>

        </div>
        <div class="edit-box">
          <div class="left-img">
            <div class="img-box-view" v-if="!!img.length">
              <el-image class="img-item" style="width: 100%; height: 100%" :src="img"></el-image>
              <span class="img-span"><i class="el-icon-delete" @click="delectImg(img,'img1')"></i></span>
            </div>
            <div class="img-box-select" v-else>
              <el-upload class="upload-demo" drag ref="upload" accept="image/jpg, image/png, image/jpeg" action=""
                :http-request="uploadFile" list-type="picture" :file-list="ImageList" :auto-upload="true">
                <i class="el-icon-camera-solid camera1"></i>
                <div class="el-upload__text">Click to add image</div>
              </el-upload>
            </div>
          </div>
          <div class="middle-img-text">
            <div class="img-box-view" v-if="!!img.length">
              <el-image class="img-item" style="width: 100%; height: 100%" :src="img"></el-image>
              <span class="img-span"><i class="el-icon-delete" @click="delectImg(img,'img1')"></i></span>
            </div>
            <div class="img-box-select" v-else>
              <el-upload class="upload-demo" drag ref="upload" accept="image/jpg, image/png, image/jpeg" action=""
                :http-request="uploadFile" list-type="picture" :file-list="ImageList" :auto-upload="true">
                <i class="el-icon-camera-solid camera1"></i>
                <div class="el-upload__text">Click to add image</div>
              </el-upload>
            </div>
            <el-input v-model="titleLeft" size="small" style="width:100%;margin-top:10px"
              placeholder="Enter slogon text">
            </el-input>
          </div>
          <div class="right-text">
            <h2>Our story</h2>
            <strong>How did we get our start</strong>
            <el-input v-model="titleLeft1" size="small" style="width:100%;margin-top:10px"
              placeholder="Enter slogon text">
            </el-input>
            <strong>What makes our products unique</strong>
            <el-input v-model="titleLeft2" size="small" style="width:100%;margin-top:10px"
              placeholder="Enter slogon text">
            </el-input>
            <strong>Why do we love what we do</strong>
            <el-input v-model="titleLeft3" size="small" style="width:100%;margin-top:10px"
              placeholder="Enter slogon text">
            </el-input>
          </div>
        </div>
      </el-card>
    </el-drawer>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import {
    parseTime,
    isEmpty
  } from '@/utils/index'
  import vuedraggable from "vuedraggable";
  export default {
    components: {
      vuedraggable,
    },
    props: {
      // 图片数据(图片url组成的数组) 通过v-model传递
      list: {
        type: Array,
        default () {
          return [];
        },
      },
      // 限制上传的图片数量
      limit: {
        type: Number,
        default: 9,
      },
      // 限制上传图片的文件大小(kb)
      size: {
        type: Number,
        default: 500,
      },
      // 是否是单图上传(单图上传就是已传图片和上传按钮重叠)
      isSingle: {
        type: Boolean,
        default: false,
      },
      // 图片显示的宽度(px)
      width: {
        type: Number,
        default: 200,
      },
      // 图片显示的高度(px)
      height: {
        type: Number,
        default: 200,
      },
    },
    data() {
      return {
        imageurl: "",
        img: "",
        ImageList: [],
        titleLeft: "",
        titleLeft1: "",
        titleLeft2: "",
        titleLeft3: "",

        dialogVisible: false,
        dialogform: {},
        tableData: [{
          edition: "一个版本",
          purpose: "页面用",
          CopyTime: this.parseTime(new Date()),
          PicTime: this.parseTime(new Date()),
          CopyEdit: "已编辑",
          PicEdit: "已编辑",
          CopyAuthor: "大美女",
          PicAuthor: "大帅哥",
        }, {
          edition: "一个版本",
          purpose: "其他用",
          CopyTime: this.parseTime(new Date()),
          PicTime: "/",
          CopyEdit: "已编辑",
          PicEdit: "/",
          CopyAuthor: "大美女",
          PicAuthor: "/",
        }],
        edition: "",
        purpose: "",
        copydrawer: false,
        fileList: [{
          name: '故事文案.excel',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        picdrawer: false,
        direction: 'rtl',
        isUploading: false, // 正在上传状态
        isFirstMount: true, // 控制防止重复回显
        viewImgDialog: false,
        server: false,
        imgList: [],
        ShowList: [],
        matCode: "",
        pvVerName: "",
        type: "",
        fileList: [],
        formDate: new FormData(),
        upList: [],
        oldLegth: 0,
        page: 0,
        strTitle: "",
        row: {},
        RemarksFrom: {
          remark: ""
        },
        imageList: [{
          link: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        }, {
          link: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
        }, {
          link: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
        }, {
          link: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
        }]
      }
    },
    methods: {
      sureSave(val) {
        console.log(val);
      },
      delectImg() {

      },
      uploadFile() {},
      initData() {
        this.dialogVisible = true
      },
      newAdd() {
        if (isEmpty(this.edition)) {
          return this.$message.warning("请输入版本名称")
        }
        let flg = this.tableData.map(x => x.edition).includes(this.edition)
        if (flg) {
          return this.$message.warning("已存在该版本名称")
        }

        this.tableData.push({
          edition: this.edition,
          time: this.parseTime(new Date()),
          author: "一个大美女",
          explain: "",
          SloganE: "",
          SloganC: "",
          isEdit: true,
          state: true
        })
      },
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      Edit(row, tval) {
        if (tval === 'copy') {
          if (row.purpose == '页面用') {
            this.picdrawer = true
          } else {
            this.copydrawer = true
          }

        } else {
          this.picdrawer = true
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
      submitUpload() {
        this.$refs.upload.submit();
      },
      onRemoveShowList(name) {
        this.$refs.uploadRef.uploadFiles = this.$refs.uploadRef.uploadFiles.filter(x => x.name !== name)
        this.ShowList = this.ShowList.filter(x => x.name !== name)

      },
      //实现customUpload方法，将上传文件信息拼接到fileData中。
      uploadFile(file) {
        this.formDate.append("file", file.file);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handelUpload() {},
      // 移除单张图片
      onRemoveHandler(index, url) {
        this.$confirm("确定删除该图片?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
          .then(() => {
            DeleteImageUpload({
              filePath: url
            }).then(res => {
              this.$message.success("删除成功，请保存数据")
              this.imgList = this.imgList.filter((v, i) => {
                return i !== index;
              });
            })
            this.$forceUpdate();
          })
          .catch(() => {});
      },
      //图片状态改变
      OnChangeUpload(file, fileList) {
        if (this.imgList.length + this.$refs.uploadRef.uploadFiles.length > 9) {
          this.$refs.uploadRef.uploadFiles = []
          this.ShowList = []
          return this.$message.warning("最多只能上传九张图片")
        }
        if (!isEmpty(this.ShowList)) {
          var arr = [];
          this.ShowList.forEach((item) => {
            arr.push(item.name);
          });
          if (!arr.includes(file.name)) {
            this.ShowList.push({
              name: file.name,
              link: URL.createObjectURL(file.raw),
            });
          } else {
            this.$message.warning("存在文件名称一样");
          }
        } else {
          this.ShowList.push({
            name: file.name,
            link: URL.createObjectURL(file.raw),
          });
        }
      },
      BeforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 3;
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 3M!');
        }
        return isLt2M;
      },
      handelApplyDelete1() {

      },
      handelApplySave() {},
      handelApplyDelete2() {},
      // 超限
      onExceed() {
        this.$refs.uploadRef.abort(); // 取消剩余接口请求
      },

    },
    computed: {
      isMaxHidden() {
        return this.imgList.length >= this.limit;
      },
    },

  }
</script>


<style>
  /* .imgUpload{
    height: 250px;
    max-height: 700px;
    overflow: auto;
} */
  .imgUpload .el-upload-dragger {
    width: 100px;
    height: 100px;
  }

  .imgUpload .el-upload-dragger .el-icon-upload {
    background-color: white;
    line-height: 0px;
    border: 0px;
    height: 40px;
    font-size: 40px;
  }

  .imgUpload .el-upload-dragger .el-upload__text {
    font-size: 12px;
  }
</style>
<style lang="less" scoped>
  /deep/.el-card__header {
    padding: 0px 20px;
  }

  /deep/.el-drawer__body {
    padding: 0px 5px;
  }

  .edit-box {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 10px;

    .left-img {
      width: 315px;
      height: 315px;

      .upload-demo {
        width: 315px;
        height: 315px;
      }

      .img-box-view {
        width: 315px;
        height: 315px;
        position: relative;
      }

      .el-icon-camera-solid {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        margin: 40px 0 16px;
        font-size: 50px;
        padding: 25px;
        padding-top: 20px;
        opacity: 0.8;
        position: relative;
      }

      .camera1::after {
        content: "300:400";
        font-size: 20px;
        position: absolute;
        right: 10px;
        bottom: 5px;
      }
    }

    .middle-img-text {
      margin-left: 15px;
      width: 280px;

      .upload-demo {
        width: 280px;
        height: 84px;
      }

      .img-box-view {
        width: 280px;
        height: 84px;
      }

      .el-icon-camera-solid {
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.3);
        margin: 8px 0 1px;
        font-size: 25px;
        padding: 25px;
        padding-top: 0px;
        opacity: 0.8;
        position: relative;
      }

      .camera1::after {
        content: "280:84";
        font-size: 15px;
        position: absolute;
        right: 8px;
        bottom: 5px;
      }
    }

    .right-text {
      margin-left: 15px;
      flex: 1;
    }
  }

  .borderShow {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    height: 300px;
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

  /deep/ .el-upload {
    width: 100%;
    height: 100%;

    .el-upload-dragger {
      width: 100%;
      height: 100%;
    }
  }

  /deep/.el-dialog .el-dialog__body {
    height: 600px;
    overflow: auto;
  }



  // 拖拽
  .vue-draggable {
    display: flex;
    flex-wrap: wrap;

    .draggable-item {
      margin-right: 5px;
      margin-bottom: 5px;
      border: 1px solid #ddd;
      border-radius: 6px;
      position: relative;
      overflow: hidden;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .shadow2 {
        position: absolute;
        bottom: 50%;
        right: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transition: opacity 0.3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
      }

      .shadow {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
      }

      &:hover {
        .shadow {
          opacity: 1;
        }

        .shadow2 {
          opacity: 1;
        }
      }
    }

    &.hideShadow {
      .shadow {
        display: none;
      }

      .shadow2 {
        display: block;
      }
    }

    &.single {
      overflow: hidden;
      position: relative;

      .draggable-item {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }

    &.maxHidden {
      .uploadBox {
        display: none;
      }
    }
  }

  // el-image
  .el-image-viewer__wrapper {
    .el-image-viewer__mask {
      opacity: 0.8;
    }

    .el-icon-circle-close {
      color: #fff;
    }
  }
</style>