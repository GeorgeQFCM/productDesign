<template>
  <el-col>
    <el-form :inline="true" :model="query" ref="query">
      <el-form-item prop="matCate">
              <el-select placeholder="选择类目" v-model="query.matCate" @change="SelectMatOperateCate" clearable multiple collapse-tags style="width:150px;">
                <el-option v-for="item in OptMatCate" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matOperateCate">
              <el-select placeholder="选择运营大类" v-model="query.matOperateCate" @change="SelectMatComBrand" clearable multiple collapse-tags style="width:200px;">
                <el-option v-for="item in OptOperateCate" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matComBrand">
              <el-select placeholder="选择公司品牌" v-model="query.matComBrand" @change="SelectMatProName" @focus="FocusMatComBrand" clearable multiple collapse-tags style="width:200px;">
                <el-option v-for="item in OptMatComBrand" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matProName">
              <el-select placeholder="选择产品名称" v-model="query.matProName" @change="SelectMatBrand" @focus="FocusMatProName" clearable multiple collapse-tags style="width:300px;">
                <el-option v-for="item in OptMatProName" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matBrand">
              <el-select placeholder="选择适用品牌" v-model="query.matBrand" @change="SelectMatModel" @focus="FocusMatBrand" clearable multiple collapse-tags style="width:300px;">
                <el-option v-for="item in OptMatBrand" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matModel">
              <el-select placeholder="选择适用机型" v-model="query.matModel" @change="SelectMatStyle" @focus="FocusMatModel" clearable multiple collapse-tags style="width:350px;">
                <el-option v-for="item in OptMatModel" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matStyle">
              <el-select placeholder="选择款式" v-model="query.matStyle" @change="SelectMatColor" @focus="FocusMatStyle" style="width:470px;" clearable multiple collapse-tags>
                <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="matColor">
              <el-select placeholder="选择颜色" v-model="query.matColor" @change="changeMatColor" @focus="FocusMatColor" style="width:470px;" clearable multiple collapse-tags>
                <el-option v-for="item in OptMatColor" :key="item.name" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
    </el-form>
  </el-col>
</template>

<script>
import { GetTreeName } from "@/api/Common";
export default {
  data() {
    return {
      OptMatCate: [], //类目
      OptOperateCate: [], //运营大类
      OptMatComBrand: [], //公司品牌
      OptMatProName: [], //产品名称
      OptMatBrand: [], //适用品牌
      OptMatModel: [], //适用机型
      OptMatStyle: [], //款式
      OptMatColor: [], //颜色
      query: { matCate: [], matOperateCate: [], matComBrand: [], matProName: [], matBrand: [], matModel: [], matStyle: [], matColor: [] },
    }
  },
  methods: {
    selectAllMatStyle(val) {
      this.query.matStyle = []
      if (val) {
        this.OptMatStyle.map((item) => {
          this.query.matStyle.push(item.name)
        })
      } else {
        this.query.matStyle = []
      }
      this.SelectMatColor(this.query.matStyle);
    },
    //查类目
    SelectMatCate() {
      this.OptOperateCate = []; //运营大类
      this.OptMatComBrand = []; //公司品牌
      this.OptMatProName = []; //产品名称
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matOperateCate = [];
      this.query.matComBrand = [];
      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let condition = { type: 'matCate' };
      this.GetMaterialInfo(condition);
    },
    //查运营大类
    SelectMatOperateCate() {
      this.OptMatComBrand = []; //公司品牌
      this.OptMatProName = []; //产品名称
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色 

      this.query.matOperateCate = [];
      this.query.matComBrand = [];
      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];
      
      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matOperateCate', value: val };
      this.GetMaterialInfo(condition);
    },
    
    //查公司品牌
    SelectMatComBrand() {
      this.OptMatProName = []; //产品名称
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色 

      this.query.matComBrand = [];
      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matComBrand', value: val };
      this.GetMaterialInfo(condition);
    },
    //查公司品牌
    FocusMatComBrand() {
      this.OptMatProName = []; //产品名称
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色 

      this.query.matComBrand = [];
      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matComBrand', value: val };
      this.GetMaterialInfo(condition);
    },
    //查产品名称
    SelectMatProName() {
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matProName', value: val };
      this.GetMaterialInfo(condition);
    },
    //查产品名称
    FocusMatProName() {
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matProName = [];
      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matProName', value: val };
      this.GetMaterialInfo(condition);
    },
    //查适用品牌
    SelectMatBrand() {
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matBrand', value: val };
      this.GetMaterialInfo(condition);
    },
    //查适用品牌
    FocusMatBrand() {
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matBrand = [];
      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matBrand', value: val };
      this.GetMaterialInfo(condition);
    },
    //查适用机型
    SelectMatModel() {
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matModel', value: val };
      this.GetMaterialInfo(condition);
    },
    //查适用机型
    FocusMatModel() {
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色

      this.query.matModel = [];
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      let condition = { type: 'matModel', value: val };
      this.GetMaterialInfo(condition);
    },
    //查款式
    SelectMatStyle() {
      this.OptMatColor = []; //颜色
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      let condition = { type: 'matStyle', value: val };
      this.GetMaterialInfo(condition);
    },
    //查款式
    FocusMatStyle() {
      this.OptMatColor = []; //颜色
      this.query.matStyle = [];
      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      let condition = { type: 'matStyle', value: val };
      this.GetMaterialInfo(condition);
    },
    //查颜色
    SelectMatColor(value) {
      let checkedCount = value.length;
      this.checkedMatStyleAll = checkedCount === this.OptMatStyle.length;
      this.isIndeterminateMatStyle = checkedCount > 0 && checkedCount < this.OptMatStyle.length;

      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      const condition = { type: 'matColor', value: val };
      this.GetMaterialInfo(condition);
    },
    //查颜色
    FocusMatColor(value) {
      let checkedCount = value.length;
      this.checkedMatStyleAll = checkedCount === this.OptMatStyle.length;
      this.isIndeterminateMatStyle = checkedCount > 0 && checkedCount < this.OptMatStyle.length;

      this.query.matColor = [];

      let val = this.BuildSQLConditions();
      
      const condition = { type: 'matColor', value: val };
      this.GetMaterialInfo(condition);
    },
    changeMatColor() {
      this.$forceUpdate();
    },
    //构建物料查询条件
    BuildSQLConditions(){
      
      let val = "";
      if(this.query.matCate.length > 0){
        val += "matCate IN ('" + this.query.matCate.join("','") + "')";
      }

      if(this.query.matOperateCate.length > 0){
        val += " AND matOperateCate IN ('" + this.query.matOperateCate.join("','") + "')";
      }

      if(this.query.matComBrand.length > 0){
        val += " AND matComBrand IN ('" + this.query.matComBrand.join("','") + "')";
      }

      if(this.query.matProName.length > 0){
        val += " AND matProName IN ('" + this.query.matProName.join("','") + "')";
      }

      if(this.query.matBrand.length > 0){
        val += " AND matBrand IN ('" + this.query.matBrand.join("','") + "')";
      }

      if(this.query.matModel.length > 0){
        val += " AND matModel IN ('" + this.query.matModel.join("','") + "')";
      }
      if(this.query.matModel.length > 0){
        val += " AND matModel IN ('" + this.query.matModel.join("','") + "')";
      }

      if (this.query.matStyle.length > 0)
      {
        val += " and matStyle in('" + this.query.matStyle.join("','") + "')";
      }

      return val;
    },
    //获取物料信息
    GetMaterialInfo(obj) {
      GetTreeName(obj).then(res => {
        switch (obj.type) {
          case 'matOperateCate':
            this.OptOperateCate = res.data;
            break;
          case 'matComBrand':
            this.OptMatComBrand = res.data;
            break;
          case 'matProName':
            this.OptMatProName = res.data;
            break;
          case 'matBrand':
            this.OptMatBrand = res.data;
            break;
          case 'matModel':
            this.OptMatModel = res.data;
            break;
          case 'matStyle':
            this.OptMatStyle = res.data;
            break;
          case 'matColor':
            this.OptMatColor = res.data;
            break;
          default:
            this.OptMatCate = res.data;
            break;
        }
      });
      //this.$emit('CallBack');
    },
    clearFormMat() {
      this.$refs["query"].resetFields();
      this.OptOperateCate = []; //运营大类
      this.OptMatComBrand = []; //公司品牌
      this.OptMatProName = []; //产品名称
      this.OptMatBrand = []; //适用品牌
      this.OptMatModel = []; //适用机型
      this.OptMatStyle = []; //款式
      this.OptMatColor = []; //颜色
    },
    initDataMat(obj) {
      this.query.matCate = obj.matCate;
      this.SelectMatOperateCate();
      this.query.matOperateCate = obj.matOperateCate;
      this.SelectMatComBrand();
      this.query.matComBrand = obj.matComBrand;
      this.SelectMatProName();
      this.query.matProName = obj.matProName;
      this.SelectMatBrand();
      this.query.matBrand = obj.matBrand;
      this.SelectMatModel();
      this.query.matModel = obj.matModel;
      this.SelectMatStyle();
      this.query.matStyle = obj.matStyle;
      setTimeout(() => {
        this.SelectMatColor(obj.matStyle);
        this.query.matColor = obj.matColor;
      }, 1000);
    },
    
  },
  mounted() {
    this.SelectMatCate();
  }
}
</script>