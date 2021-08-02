<template>
  <el-dialog title="材料信息" top="10vh" :close-on-click-modal="false" :visible.sync="dialogVisible" width="70%">
    <el-form :model="dialogform" label-width="120px" size="small">
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
      <el-row>
        <el-col :span="12" class="borderShow" style="height:100px">
          <el-form-item label="证据提供方式">
            <el-select v-model="dialogform.trademarktype" filterable>
              <el-option label="公司" value="公司"></el-option>
              <el-option label="代理机构" value="代理机构"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="borderShow" style="height:100px">
          <el-form-item label="细类目筛选表">
            <el-upload multiple class="upload-demo " ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList" :auto-upload="false">
              <div>
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器
                </el-button>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="borderShow" style="height:450px">
          <div v-for="(item,index) in count" :key="index" style=" border: 1px solid #e2e2e2;">
            <el-form-item :label="'销售链接'+(index+1)" style="margin-top:5px" prop="cmdiRefLink">
              <div style="float:left">
                <el-input v-model="item.cmdiRefLink" class="InpuClass" placeholder="请输入链接"></el-input>
              </div>
            </el-form-item>
            <el-form-item label="使用产品证据图">
              <el-upload drag multiple class="uploadImage" action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img fit="scale-down" class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImageVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="销售订单截图">
              <el-upload drag multiple class="uploadImage" action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img fit="scale-down" class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImageVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="销售页面截图" style="width:90%">
              <el-upload drag multiple class="uploadImage" action="#" list-type="picture-card" :auto-upload="false">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file" slot-scope="{file}">
                  <img fit="scale-down" class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                      <i class="el-icon-download"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                      <i class="el-icon-delete"></i>
                    </span>
                  </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogImageVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <div style="float: right;margin: -35px 10px 0px 5px;">
              <el-button type="danger" style="margin-left:7px" icon="el-icon-minus" size="mini" v-if="count.length>1 "
                @click="del(index)"></el-button>
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="add"></el-button>
            </div>
          </div>

        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogform: {
          trademark: "SiiuMaid",
          trademarktype: "文字商标",
          country: "英国",
          MajorCategories: "第九类"
        },
        dialogVisible: false,
        fileList: [{
          name: '细类目筛选表.excel',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        count: [{
          cmdiRefLink: ""
        }],
        dialogImageUrl: '',
        dialogImageVisible: false,
        disabled: false
      }
    },
    methods: {
      initData() {
        this.dialogVisible = true
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      add() {
        let i = this.count.length
        this.count.push({
          cmdiRefLink: ""
        })
      },
      del(index) {
        this.count.splice(index, 1);
      },
      handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogImageVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      }
    }
  }
</script>
<style lang="less" scoped>
  .borderShow {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    overflow: auto;

  }

  .InpuClass {
    width: 600px;
  }

  /deep/ .el-upload-dragger {
    width: 100px;
    height: 100px;
  }

  /deep/ .el-upload--picture-card {
    width: 100px;
    height: 100px;
  }

  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;

  }

  .el-upload--picture-card i {
    transform: translateY(-50%);
  }
</style>