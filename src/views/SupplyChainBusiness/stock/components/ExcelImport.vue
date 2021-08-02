<template>
  <div>
    <el-dialog
      :title="title"
      :width="width"
      :visible.sync="isShowVisible"
      center
      :close-on-click-modal="false"
      :before-close="() => $emit('close')"
    >
      <el-card v-loading="isLoading">
        <el-form label-width="125px" ref="ExcelImport">
          <el-row>
            <el-col :span="18">
              <el-form-item label="模板下载:">
                <a
                  target="_blank"
                  :href="'/guns-cloud-system/' + propname + '/downloadExcel'"
                >
                  <el-button type="primary" >{{ title }}.xlxs</el-button>
                </a>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="文件导入:">
            <el-upload
              class="upload-demo"
              ref="upload"
              :data="formdata"
              :headers="headers"
              :on-success="handleSuccess"
              :on-error="handleError"
              :limit="1"
              :multiple="false"
              :action="' /guns-cloud-system/' + propname + '/upload'"
              :auto-upload="false"
            >
              <el-button slot="trigger"  type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </el-form-item>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="listImport">提交</el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>

let strr;
export default {
  name: "ExcellImport",
  props: {
    width: {
      type: String,
      default: "30vw",
    },
    userId: {
      type: String,
    },
    propname: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  data() {
    return {
      storageHandler: new StorageHandler(),
      isShowVisible: true,
      isLoading: false,
      ids: "",
      attachmentUrl: "/guns-cloud-system/LogDay/downloadExcel",
    };
  },
  computed: {
    formdata: function () {
      return {
        id: this.ids,
      };
    },
    headers: function () {
      return { Authorization: this.storageHandler.getSessionStorage("token") };
    },
  },
  methods: {
    listImport() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      if(response.code==500 && response.message!="上传失败"){
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = '/guns-cloud-system/downloadError/download?fileName=' + response.message;
      a.click();
      this.$message.error({ message: "存在失败的数据，请打开excel查看!", duration: 5000 ,type:"error"});
      }else{
      this.$message.success("上传成功!");
      }
      this.$refs.upload.clearFiles();
      this.$emit("close");
    },
    // 监听上传失败
    handleError(e, file, fileList) {
      const msg = JSON.parse(e.message);
      this.$message.error("上传失败!");
    },
    download() {
      let a = document.createElement("a");
      a.target = "_blank";
      a.href = this.attachmentUrl;
      a.click();
    },
  },
};
</script>
 
<style scoped>
.el-input {
  background: white;
}
</style>