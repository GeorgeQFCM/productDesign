<template>
  <el-dialog title="外包装信息" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
    <el-form :model="dialogform" size="small">
      <el-form-item label="品牌名称">
        <span>SiiuMaid</span>
      </el-form-item>
    </el-form>
    <div>
      <el-input style="width:200px;margin-right:10px" size="small" v-model="edition"></el-input>
      <button class='bttn-fill bttn-md bttn-success' @click="newAdd">
        <svg-icon icon-class="add" />新增版本</button>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe size="small">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row>
            <el-col :span="4" class="borderShow">
              <div class="titleContainer">
                <span class="titleStyle">
                  文案
                </span>
              </div>
              <a target="_blank" href="http://www.w3school.com.cn">外包装文案.excel</a>
            </el-col>
            <el-col :span="20" class="borderShow">
              <div class="titleContainer">
                <span class="titleStyle">
                  图片
                </span>
              </div>
              <div class="vue-draggable">
                <li v-for="(item, index) in imageList" :key="index" class="draggable-item"
                  style=" width:200px;height: 200px">
                  <el-image :src="item.link" :preview-src-list="[item.link]"></el-image>
                  <div class="shadow2">
                    <span>{{ index + 1 }}</span>
                  </div>
                  <div class="shadow3">
                    <span>{{ item.name }}</span>
                  </div>
                </li>
              </div>
            </el-col>
          </el-row>


        </template>
      </el-table-column>
      <el-table-column prop="edition" label="包装版本" width="100" align="center">
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
          <button class='bttn-stretch bttn-md bttn-primary' @click="Edit(scope.row,'pic')">
            <svg-icon icon-class="photoToSellPoint" /></button>
          <button class='bttn-stretch bttn-md bttn-primary'>
            <svg-icon icon-class="download" /></button>
        </template>
      </el-table-column>
    </el-table>

    <el-drawer title="外包装文案上传" :append-to-body="true" :visible.sync="copydrawer" :direction="direction"
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


    <el-drawer title="外包装图片上传" :append-to-body="true" :visible.sync="picdrawer" :direction="direction"
      :before-close="handleClose" size="50%">
      <el-row style="width:100%;height:100%">
        <el-row style="margin-top:5px;">
          <div style="float:right;margin-right:5px">
            <button class='bttn-fill bttn-sm bttn-danger' @click="handelApplyDelete1">
              批量删除</button>
            <button class='bttn-fill bttn-sm bttn-royal' @click="handelApplySave">
              保存</button>
          </div>
        </el-row>
        <el-row style="height:400px;overflow:auto;border-top: 1px solid;">
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
            </vuedraggable>
          </div>
        </el-row>

        <el-row style="border-bottom: 1px solid;margin-top:5px;">
          <div style="float:right;margin-right:5px">
            <button class='bttn-fill bttn-sm bttn-danger' @click="handelApplyDelete2">
              批量删除</button>
            <button class='bttn-fill bttn-sm bttn-primary' @click="handelUpload" :disabled="server">
              上传</button>
          </div>
        </el-row>

        <el-row style="height:350px;overflow:auto">
          <div class="uploadWrapper">
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
                :http-request="uploadFile" action="" accept=".jpg, .jpeg, .png, .gif" :multiple="!isSingle"
                :limit="limit" :on-exceed="onExceed" :on-change="OnChangeUpload" :before-upload="BeforeUpload"
                :show-file-list="false" :auto-upload="false" :style="{ width: width + 'px', height: height + 'px' }">
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
        dialogVisible: false,
        dialogform: {},
        tableData: [{
          edition: "一个版本",
          CopyTime: this.parseTime(new Date()),
          PicTime: this.parseTime(new Date()),
          CopyEdit: "已编辑",
          PicEdit: "已编辑",
          CopyAuthor: "大美女",
          PicAuthor: "大帅哥",

        }],
        edition: "",
        copydrawer: false,
        fileList: [{
          name: '外包装文案.excel',
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
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      Edit(row, tval) {
        if (tval === 'copy') {
          this.copydrawer = true
        } else {
          this.picdrawer = true
        }

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