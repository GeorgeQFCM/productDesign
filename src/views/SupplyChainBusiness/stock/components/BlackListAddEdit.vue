<template>
  <div>
    <el-dialog :title="title" :width="width" :visible.sync="isShowVisible" center :close-on-click-modal="false"
      :before-close="() => $emit('close')">
      <el-card v-loading="isLoading">
        <el-form label-width="125px" :model="data" ref="data" :rules="rules">
          <el-col span="8">
            <el-form-item label="物料编码:" prop="materialCode" id="materialCode">
              <el-input v-model="data.materialCode"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-form-item label="ASIN:" prop="asin" id="asin">
              <el-input v-model="data.asin"></el-input>
            </el-form-item>
          </el-col>

        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveData">保存 </el-button>
        <el-button @click="$emit('close')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "BlackListAddEdit",
    props: {
      width: {
        type: String,
        default: "60vw",
      },
      userId: {
        type: String,
      },
    },
    data() {
      return {
        title: this.$attrs.id ? "编辑" : "新增",
        isShowVisible: true,
        isLoading: false,
        rules: {
          materialCode: [{
            required: true,
            message: "请填写物料编号",
            tirgger: "blur"
          }, ],
          asin: [{
            required: true,
            message: "请填写ASIN",
            tirgger: "blur"
          }, ],

        },
        data: {
          materialCode: "",
          asin: "",


        },
      };
    },

    async created() {

    },
    methods: {
      saveData() {

      },
    },
  };
</script>

<style scoped>
</style>