<template>
  <div>
    <el-dialog :title="title" :width="width" :visible.sync="isShowVisible" center :close-on-click-modal="false"
      :before-close="() => $emit('close')">
      <el-card v-loading="isLoading">
        <el-form label-width="125px" :model="data" ref="data" :rules="rules">
          <el-col :span="8">
            <el-form-item label="平台:" prop="platformName" id="platformName">

              <el-select v-model="data.platformName" filterable placeholder="请选择平台">
                <el-option v-for="(item, index) in platformNameList" :key="index" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="事业部:" prop="department" id="department">
              <el-select v-model="data.department" filterable placeholder="请选择事业部">
                <el-option v-for="(item, index) in departmentList" :key="index" :label="item.Department"
                  :value="item.Department"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="Team:" prop="team" id="team">
              <el-select v-model="data.Team" filterable placeholder="请选择Team">
                <el-option v-for="(item, index) in teamList" :key="index" :label="item.Team" :value="item.Team">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="区域:" prop="area" id="area">
              <el-select v-model="data.area" filterable placeholder="请选择区域">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.Area" :value="item.Area">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="运营大类:" prop="category" id="category">


              <el-select v-model="data.category" filterable placeholder="请选择运营大类" @change="selectCategoryOne">
                <el-option v-for="(item, index) in categoryList" :key="index" :label="item.category"
                  :value="item.category"></el-option>
              </el-select>

            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="产品名称:" prop="productName" id="productName">
              <el-select v-model="data.productName" filterable placeholder="选择产品名称" no-data-text="请先选择上级(运营大类)"
                @change="selectCategoryOne">
                <el-option v-for="(item, index) in productNameList" :key="index" :label="item.product_name"
                  :value="item.product_name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="月份:" prop="mon" id="mon">
              <el-select v-model="data.mon" filterable placeholder="选择月份">
                <el-option v-for="(item, index) in monsList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="季节:" prop="season" id="season">
              <el-select v-model="data.season" filterable placeholder="选择季节">
                <el-option v-for="(item, index) in seasonsList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>



          <el-col :span="8">
            <el-form-item label="优先级`:" prop="priority" id="priority">
              <el-input v-model="data.priority"></el-input>
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
      },
      seasonsList: {
        type: Array,
      },

      monsList: {
        type: Array,
      },


    },
    data() {
      return {
        title: this.$attrs.id ? "编辑" : "新增",
        isShowVisible: true,
        isLoading: false,
        productNameList: [],
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
        },
        data: {
          platformName: "Amazon",
          department: "事业二部",
          team: "Team4",
          area: "US",
          category: "水上运动",
          productName: "移动电源",
          season: "无",
          applicableModels: "77",
          id: 0,
          lifeCycle: "1",
          orderGoodsDays: "1",
          priority: "1",
          safeSaleDays: "1",
          salesVolume: "1",
          mon: "1",
          coefficient: "1"
        },
      };
    },

    async created() {
      
    },
    methods: {


      async selectCategoryOne(category) {
        let http = new SysMaterialApi();
        const resProductName = await http.getProductName({
          category
        });
        this.productNameList = [{
          productName: ""
        }, ...resProductName.data] || [];



      },
      saveData() {
        this.$refs["data"].validate((valid, object) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: "请耐心等待.....",
              spinner: "el-icon-loading",
              background: "rgba(0, 0, 0, 0.7)",
            });
            let http = new SeasonCoefficientApi();

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
              console.log("新增的this.data:>> ", this.data);
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
    },
  };
</script>

<style scoped>
</style>