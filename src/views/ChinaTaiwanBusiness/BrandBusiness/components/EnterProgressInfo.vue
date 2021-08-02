<template>
  <el-dialog title="进度信息" top="5vh" :close-on-click-modal="false" :visible.sync="dialogVisible" width="65%">
    <el-form :model="dialogform" label-width="140px" size="small">
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
        <el-col :span="12" class="borderShow" style="height:600px">
          <el-form-item>
            <label class="labelColor" slot="label">状态：</label>
            <el-select v-model="dialogform.state" filterable class="InpuClass">
              <el-option label="申请中" value="申请中"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="审查中" value="审查中"></el-option>
              <el-option label="公告中" value="公告中"></el-option>
              <el-option label="已下证" value="已下证"></el-option>
              <el-option label="异常归档" value="异常归档"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">申请费用(含税/元)：</label>
            <el-input v-model="dialogform.ApplicationFee" class="InpuClass"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">发票号码：</label>
            <el-input v-model="dialogform.InvoiceNumber" class="InpuClass"></el-input>
          </el-form-item>
          <el-form-item label="发票文件:">
            <el-upload multiple class="upload-demo " ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList" :auto-upload="false">
              <div>
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器
                </el-button>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">合同签订日期：</label>
            <el-date-picker v-model="dialogform.ContractSigningDate" class="InpuClass" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="合同文件:">
            <el-upload multiple class="upload-demo " ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="fileList1" :auto-upload="false">
              <div>
                <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="mini" type="success" @click="submitUpload">上传到服务器
                </el-button>
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">申请日期：</label>

            <el-date-picker v-model="dialogform.ApplicationDate" class="InpuClass" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">获证日期：</label>
            <el-date-picker v-model="dialogform.certificateDate" class="InpuClass" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">注册号：</label>
            <el-input v-model="dialogform.RegistrationNumber" class="InpuClass"></el-input>
          </el-form-item>
          <el-form-item>
            <label class="labelColor" slot="label">商标有效期：</label>
            <el-date-picker v-model="dialogform.visa" class="InpuClass" type="daterange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="borderShow" style="height:600px">
          <el-timeline :reverse="false">
            <el-timeline-item type="primary" icon="el-icon-more" :timestamp="parseTime(new Date())" placement="top">
              <el-input v-model="dialogform.timestampInput" class="InpuClass"></el-input>
            </el-timeline-item>
            <el-timeline-item type="primary" icon="el-icon-more" timestamp="2021/07/01" placement="top">
              <h4>等待受通</h4>
            </el-timeline-item>
            <el-timeline-item type="primary" icon="el-icon-more" timestamp="2021/06/21" placement="top">
              <h4>提交申请</h4>
            </el-timeline-item>
          </el-timeline>
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
  import {
    parseTime
  } from '@/utils/index'
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
          name: '发票文件.PDF',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        fileList1: [{
          name: '合同文件.PDF',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }],
        count: [{
          cmdiRefLink: ""
        }, {
          cmdiRefLink: ""
        }, ],
        dialogImageUrl: '',
        dialogImageVisible: false,
        disabled: false
      }
    },
    methods: {
      parseTime(data) {
        return parseTime(data, "{y}/{m}/{d}")
      },
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
    width: 350px;
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

  .labelColor {
    color: #0b3d50;
    font-weight: weight;
  }
</style>