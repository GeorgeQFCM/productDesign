<template>
  <!-- <el-dialog :title="strTitle" :visible.sync="viewImgDialog" width="70%" :close-on-click-modal="false" class="imgUpload" append-to-body @close="dialogClose"> -->
  <el-row style="width:100%;height:100%">
    <el-row style="margin-top:20px">
      <div style="float:right;">
        <el-form :inline="true">
          <el-form-item>
            <button class='bttn-fill bttn-sm bttn-danger' @click="handelApplyDelete1">
              批量删除</button>
          </el-form-item>
          <el-form-item>
            <button class='bttn-fill bttn-sm bttn-royal' @click="handelApplySave">
              保存</button>
          </el-form-item>
        </el-form>
      </div>
    </el-row>
    <el-row>
      <el-form label-width="110px" label-position="right" :model="RemarksFrom">
        <el-form-item label="应急图备注">
          <el-input type="textarea" :rows="1" v-model="RemarksFrom.remark"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row style="height:420px;overflow:auto;border-bottom: 1px solid;">
      <div class="uploadWrapper" style="margin-top:10px">
        <vuedraggable class="vue-draggable" :list="imgList" :class="{ single: isSingle, maxHidden: isMaxHidden }"
          :options="{ chosenClass: 'choose', animation: 150 }" tag="ul" draggable=".draggable-item">
          <!-- 拖拽元素 -->
          <li v-for="(item, index) in imgList" :key="index" class="draggable-item"
            :style="{ width: width + 'px', height: height + 'px' }">
            <el-checkbox v-model="imgList[index].check"></el-checkbox>
            <el-image :src="item.link" :preview-src-list="[item.link]"></el-image>
            <div class="shadow" @click="onRemoveHandler(index, item.link)">
              <i class="el-icon-delete"></i>
            </div>
            <div class="shadow2">
              <span>{{ index + 1 }}</span>
            </div>
            <div class="shadow3">
              <span>{{ item.name }}</span>
            </div>
          </li>
          <!-- 上传按钮 -->
        </vuedraggable>
      </div>
    </el-row>
    <el-row style="height:350px;overflow:auto">
      <div style="float:right;margin-top:10px">
        <el-form :inline="true">
          <el-form-item>
            <button class='bttn-fill bttn-sm bttn-danger' @click="handelApplyDelete2">
              批量删除</button>
          </el-form-item>
          <el-form-item>
            <button class='bttn-fill bttn-sm bttn-primary' @click="handelUpload" :disabled="server">
              上传</button>
          </el-form-item>
        </el-form>
      </div>
      <div class="uploadWrapper" style="margin-top:10px">
        <vuedraggable class="vue-draggable" :class="{ single: isSingle, maxHidden: isMaxHidden }"
          :options="{ chosenClass: 'choose', animation: 150 }" tag="ul" draggable=".draggable-item">
          <!-- 拖拽元素 -->
          <li v-for="(item, index) in ShowList" :key="index" class="draggable-item"
            :style="{ width: width + 'px', height: height + 'px' }">
            <el-checkbox v-model="ShowList[index].check"></el-checkbox>
            <el-image :src="item.link" :preview-src-list="[item.link]"></el-image>
            <div class="shadow" @click="onRemoveShowList(item.name)">
              <i class="el-icon-delete"></i>
            </div>
            <div class="shadow3">
              <span>{{ item.name }}</span>
            </div>
          </li>
          <!-- 上传按钮 -->
          <el-upload drag slot="footer" ref="uploadRef" class="uploadBox" :file-list="fileList"
            :http-request="uploadFile" action="" accept=".jpg, .jpeg, .png, .gif" :multiple="!isSingle" :limit="limit"
            :on-exceed="onExceed" :on-change="OnChangeUpload" :before-upload="BeforeUpload" :show-file-list="false"
            :auto-upload="false" :style="{ width: width + 'px', height: height + 'px' }">
            <i class="el-icon-upload uploadIcon">
              <span v-if="!isUploading && limit && limit !== 9 && !isSingle" class="limitTxt">最多{{ limit }}张</span>
            </i>
            <div class="el-upload__text" v-if="isUploading">正在上传...</div>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
          </el-upload>
        </vuedraggable>
      </div>
    </el-row>
  </el-row>
  <!-- </el-dialog> -->
</template>
<script>
  import vuedraggable from "vuedraggable";
  import {
    isEmpty
  } from "@/utils/index";

  export default {
    name: "ImgUpload",
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
      fatherMethod: {
        type: Function,
        default: null
      },
      //本弹窗的id
      layerid: {
        type: String,
        default: "ImgUpload"
      },
      //父组件的data
      laydata: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //父组件传值
      dataListPare: {
        type: Array,
        default: () => {
          return [];
        }
      },
      matCodePare: {
        type: String,
        default: ""
      },
      pvVerNamePare: {
        type: String,
        default: ""
      },
      pvUpdRemarkPare: {
        type: String,
        default: ""
      },

    },
    data() {
      return {
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
        }

      };
    },
    methods: {
      onRemoveShowList(name) {
        this.$refs.uploadRef.uploadFiles = this.$refs.uploadRef.uploadFiles.filter(x => x.name !== name)
        this.ShowList = this.ShowList.filter(x => x.name !== name)

      },
      //实现customUpload方法，将上传文件信息拼接到fileData中。
      uploadFile(file) {
        this.formDate.append("file", file.file);
      },
      handelUpload() {
        this.server = true;
        const loading = this.$loading({
          lock: true,
          text: '数据拼命加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.imgList.length + this.ShowList.length > 9) {
          return this.$message.warning("最多只能上传九张图片")
        }
        if (this.$refs.uploadRef.uploadFiles.length > 0) {
          this.$refs.uploadRef.submit()
          this.formDate.append("Code", this.matCode);
          setTimeout(() => {
            ProductPictureUpload(this.formDate).then((res) => {
              this.formDate.delete("file");
              this.formDate.delete("Code");
              if (res.data !== null) {
                if (res.code == -1) {
                  this.formDate = new FormData()
                  this.fileList = []
                  this.$refs.uploadRef.uploadFiles = []
                  return this.$message.warning("上传失败")
                }
                loading.close();
                this.server = false;
                for (let j = 0; j < res.data.length; j++) {
                  let LinkArr = res.data[j].split("\\");
                  this.imgList.push({
                    name: LinkArr[LinkArr.length - 1],
                    link: res.data[j],
                    check: false,
                  });
                }
                this.formDate = new FormData()
                this.ShowList = []
                this.$refs.uploadRef.uploadFiles = []
              }
              loading.close();
              this.server = false;
            });
          }, 100);
        } else {
          this.$message.warning("无可上传文件")
          loading.close();
          this.server = false;
        }

      },
      handelApplyDelete1() {
        let _this = this
        let yes = function name(layerid) {
          _this.$message.success("删除成功，请保存数据")
          _this.imgList = _this.imgList.filter((v, i) => {
            return v.check !== true;
          });

          _this.imgList.forEach(l => {
            _this.$set(l, 'check', false)
          });
          _this.$forceUpdate();
          _this.$layer.close(layerid);
        }

        this.$layer.confirm("确定删除该图片?", yes);
        (layerid) => {
          this.$layer.close(layerid);
        }

      },
      handelApplyDelete2() {
        let _this = this
        let yes = function name(layerid) {
          _this.$message.success("删除成功，请保存数据")
          _this.ShowList = this.ShowList.filter((v, i) => {

            if (v.check) {
              _this.$refs.uploadRef.uploadFiles = _this.$refs.uploadRef.uploadFiles.filter(x => x.name !== v.name)
            }
            return v.check !== true;
          });
          _this.ShowList.forEach(l => {
            _this.$set(l, 'check', false)
          });

          _this.$forceUpdate();
          _this.$layer.close(layerid);
        }

        this.$layer.confirm("确定删除该图片?", yes);
        (layerid) => {
          this.$layer.close(layerid);
        }

      },
      handelApplySave() {

        if (isEmpty(this.imgList)) {
          DeletePicture({
            MatCode: this.matCode,
            PvVerName: this.pvVerName
          }).then(res => {
            this.oldLegth = this.imgList.length
            this.viewImgDialog = false
          })
        } else {
          var UploadArr = [];
          for (let index = 0; index < this.imgList.length; index++) {
            let obj = {
              matCode: this.matCode,
              pvVerName: this.pvVerName,
              pvdSerNum: index + 1,
              pvdPhoAddr: this.imgList[index].link,
              remark: this.RemarksFrom.remark
            };
            UploadArr.push(obj);
          }
          SavePictures(UploadArr).then((res) => {
            this.$message.success("保存成功");
            this.oldLegth = this.imgList.length
            this.viewImgDialog = false
            //this.fatherMethod(this.matCode);
            this.$layer.close(this.layerid);
          });
        }
      },
      initData(matCode, pvVerName, data, pvUpdRemark) {
        this.viewImgDialog = true;
        this.matCode = matCode;
        this.pvVerName = pvVerName
        this.imgList = [];
        this.oldLegth = data.length
        this.RemarksFrom.remark = pvUpdRemark
        this.$nextTick(() => {
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              let LinkArr = data[i].pvdPhoAddr.split("\\");
              this.imgList.push({
                name: LinkArr[LinkArr.length - 1],
                link: data[i].pvdPhoAddr
              });
            }
          }
        });
      },

      // 超限
      onExceed() {
        this.$refs.uploadRef.abort(); // 取消剩余接口请求
      },
      // 移除单张图片
      onRemoveHandler(index, url) {

        let _this = this
        let yes = function name(layerid) {
          _this.$message.success("删除成功，请保存数据")
          _this.imgList = _this.imgList.filter((v, i) => {
            return i !== index;
          });

          _this.$forceUpdate();
          _this.$layer.close(layerid);
        }

        this.$layer.confirm("确定删除该图片?", yes);
        (layerid) => {
          this.$layer.close(layerid);
        }
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
              check: false,
            });
          } else {
            this.$message.warning("存在文件名称一样");
          }
        } else {
          this.ShowList.push({
            name: file.name,
            link: URL.createObjectURL(file.raw),
            check: false,
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
      dialogClose() {
        if (this.imgList.length !== this.oldLegth) {
          this.viewImgDialog = true
          return this.$message.warning("请先保存数据再关闭")
        } else {
          this.$refs.uploadRef.uploadFiles = []
          this.ShowList = []
          this.formDate = new FormData()
        }
      },
      callbackdata() {
        var data = {
          imgList: this.imgList,
          oldLegth: this.oldLegth,
        };
        return data;
      },
    },
    computed: {
      isMaxHidden() {
        return this.imgList.length >= this.limit;
      },
    },
    mounted() {
      // this.initData(this.matCodePare, this.pvVerNamePare, this.dataListPare, this.pvUpdRemarkPare);
    },
  };
</script>
<style>
  /* .imgUpload{
    height: 250px;
    max-height: 700px;
    overflow: auto;
} */
  .imgUpload .el-upload-dragger {
    width: 200px;
    height: 200px;
    overflow: auto !important;
  }

  .imgUpload .el-upload-dragger .el-icon-upload {
    background-color: white;
    line-height: 0px;
    border: 0px;
    height: 40px;
    font-size: 40px;
    padding: 2px !important;
  }

  .imgUpload .el-upload-dragger .el-upload__text {
    font-size: 12px;

  }
</style>
<style lang="less" scoped>
  /deep/.el-upload__text {
    position: relative;
    top: -60px;
  }

  /deep/ .el-upload {
    width: 100%;
    height: 100%;
  }

  /deep/.el-dialog .el-dialog__body {
    height: 790px;
    overflow: hidden;
  }

  // 上传按钮
  .uploadIcon {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #c0ccda;
    background-color: #fbfdff;
    border-radius: 6px;
    font-size: 20px;
    color: #999;

    .limitTxt,
    .uploading {
      position: absolute;
      bottom: 10%;
      left: 0;
      width: 100%;
      font-size: 14px;
      text-align: center;
    }
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

      .shadow3 {
        position: absolute;
        bottom: 10%;
        right: 50%;
        transform: translateX(50%);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transition: opacity 0.3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
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

        .shadow3 {
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

      .shadow3 {
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

  .el-upload-dragger .el-icon-upload {
    margin: 0px;
  }
</style>