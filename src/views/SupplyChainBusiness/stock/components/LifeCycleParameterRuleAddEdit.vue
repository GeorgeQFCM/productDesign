<template>
  <div>
    <el-dialog :title="title" :width="width" :visible.sync="isShowVisible" center :close-on-click-modal="false"
      :before-close="() => $emit('close')">
      <el-card v-loading="isLoading">
        <el-form label-width="125px" :model="data" ref="data" :rules="rules">
          <el-col :span="12">
            <el-form-item label="平台:" prop="platformName" id="platformName">
              <el-select v-model="data.platformName" filterable placeholder="请选择平台">
                <el-option v-for="(item, index) in platformNameList" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="事业部:" prop="department" id="department">
              <el-select v-model="data.department" filterable placeholder="请选择平台">
                <el-option v-for="(item, index) in departmentList" :key="index" :label="item.Department"
                  :value="item.Department"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="Team:" prop="team" id="team">
              <el-select v-model="data.team" filterable placeholder="请选择Team">
                <el-option v-for="(item, index) in teamList" :key="index" :label="item.Team" :value="item.Team">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域:" prop="area" id="area">
              <el-select v-model="data.area" filterable placeholder="请选择地区">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.Area" :value="item.Area">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="运营大类:" prop="category" id="category">
              <el-select v-model="data.category" filterable placeholder="请选择运营大类" @change="selectCategoryOne">
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.category"
                  :value="item.category"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="产品名称:" prop="productName" id="productName">
              <el-select v-model="data.productName" filterable placeholder="需先选择运营大类" @change="selectCategoryOne">
                <el-option v-for="(item, index) in this.productNameList" :key="index" :label="item.product_name"
                  :value="item.product_name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="适用机型:" prop="applicableModels" id="applicableModels">
              <el-select v-model="data.applicableModels" filterable placeholder="请选择适用机型">
                <el-option v-for="(item, index) in this.applicableModelsList" :key="index" :label="item.type"
                  :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="安全销量:" prop="salesVolume" id="salesVolume">
              <el-input v-model="data.salesVolume" style="width:220px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="生命周期:" prop="lifeCycle" id="lifeCycle">
              <el-input v-model="data.lifeCycle" style="width:220px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="安全销售天数:" prop="safeSaleDays" id="safeSaleDays">
              <el-input v-model="data.safeSaleDays" style="width:220px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="订货天数:" prop="orderGoodsDays" id="orderGoodsDays">
              <el-input v-model="data.orderGoodsDays" style="width:220px"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="优先级:" prop="priority" id="priority">
              <el-input v-model="data.priority" style="width:220px"></el-input>
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
      departmentList: {
        type: Array,
      },
      categoryList: {
        type: Array,
      },
      applicableModelsList: {
        type: Array,
      }
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
          department: [{
            required: true,
            message: "请填写事业部",
            tirgger: "blur"
          }, ],
          team: [{
            required: true,
            message: "请填写Team",
            tirgger: "blur"
          }],

          area: [{
            required: true,
            message: "请填写区域",
            tirgger: "blur"
          }],
          category: [{
            required: true,
            message: "请填写运营大类",
            tirgger: "blur"
          }, ],
        },
        productNameList: [],

        data: {
          applicableModels: "",
          area: "",
          category: "",
          department: "",
          lifeCycle: "",
          orderGoodsDays: "",
          platformName: "",
          priority: "",
          productName: "",
          safeSaleDays: "",
          salesVolume: "",
          team: "",
        },
      };
    },

    async created() {
    
      
    },
    methods: {
      saveData() {
        this.$refs["data"].validate((valid, object) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "请耐心等待.....",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            let http = new LifeCycleParameterRuleApi();

            if (this.$attrs.id) {
              http
                .update({
                  ...this.data,
                  id: this.$attrs.id
                })
                .then((res) => {
                  loading.close();
                  if (res.code === 200) {
                    this.$message.success("保存成功!");
                    this.$emit("close");
                  } else {
                    this.$message.error("保存失败!");
                  }
                })
                .catch((e) => {
                  loading.close();
                });
            } else {
              console.log("this.data b4:>> ", this.data);
              http
                .add(this.data)
                .then((res) => {
                  loading.close();
                  if (res.code === 200) {
                    this.$message.success("保存成功!");
                    this.$emit("close");
                  } else {
                    this.$message.error("保存失败!");
                  }
                })
                .catch((e) => {
                  loading.close();
                });
            }
          } else {
            let validArr = [];
            Object.keys(object).forEach(function (key) {
              validArr.push(key);
            });
            let validVal = "#" + validArr[0];
            document.querySelector(validVal).scrollIntoView(true);
          }
        });
      },
      async selectCategoryOne(category) {
        let http = new SysMaterialApi();
        const resProductName = await http.getProductName({
          category
        });
        this.productNameList = [{
          productName: ""
        }, ...resProductName.data] || [];
        console.log("this.productNameList :>> ", this.productNameList);
      },
    },
  };
</script>

<style scoped>
</style>