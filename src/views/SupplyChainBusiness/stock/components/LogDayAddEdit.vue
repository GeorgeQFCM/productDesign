<template>
  <div>
    <el-dialog :title="title" :width="width" :visible.sync="isShowVisible" center :close-on-click-modal="false"
      :before-close="() => $emit('close')">
      <el-card v-loading="isLoading">
        <el-form label-width="125px" :model="data" ref="data" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="平台:" prop="platformName" id="platformName">
                <el-select v-model="data.platformName" filterable placeholder="请选择平台">
                  <el-option v-for="(item, index) in platformNameList" :key="index" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="区域:" prop="area" id="area">
                <el-select v-model="data.area" filterable placeholder="请选择区域">
                  <el-option v-for="(item, index) in areaList" :key="index" :label="item.Area" :value="item.Area">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="物流方式:" prop="logisticsMode" id="logisticsMode">
                <el-select v-model="data.logisticsMode" filterable placeholder="请选择物流方式">
                  <el-option v-for="(item, index) in logModeList" :key="index" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="物流天数:" prop="logisticsDays" id="logisticsDays">
                <el-input v-model="data.logisticsDays" style="width:220px"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
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
    name: "dataAddEdit",
    props: {
      width: {
        type: String,
        default: "60vw",
      },
      userId: {
        type: String,
      },
      logModeList: {
        type: Array,
      },
      areaList: {
        type: Array,
      },
      platformNameList: {
        type: Array,
      },
      teamList: {
        type: Array,
      },
      List: {
        type: Array,
      },
    },
    data() {
      return {
        title: this.$attrs.id ? "编辑" : "新增",
        isShowVisible: true,
        isLoading: false,
        rules: {
          platformName: [{
            required: true,
            message: "请填写平台",
            tirgger: "blur"
          }, ],
          area: [{
            required: true,
            message: "请填写区域",
            tirgger: "blur"
          }],
          logisticsMode: [{
            required: true,
            message: "请填写物流方式",
            tirgger: "blur"
          }, ],
        },
        data: {
          id: "",
          platformName: "Amazon",
          area: "US",
          logisticsMode: "空运",
          logisticsDays: "30",
          areaList: [],
          platformNameList: [],
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