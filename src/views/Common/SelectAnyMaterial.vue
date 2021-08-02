<template>
  <el-form :inline="true" ref="QueryForm" :model="QueryForm" :size="formSize">
    <el-form-item prop="matCate">
      <el-select placeholder="选择类目" v-model="QueryForm.matCate" @change="SelectMatOperateCate" :filter-method="MatCateFitter" filterable clearable multiple collapse-tags :style="matCateStyle">
        <el-option v-for="item in OptMatCateFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matOperateCate">
      <el-select placeholder="选择运营大类" v-model="QueryForm.matOperateCate" @change="SelectMatComBrand" @visible-change="FocusMatOperateCate" :filter-method="MatOperateCateFitter" filterable clearable multiple collapse-tags :style="matOperateCateStyle">
        <el-option v-for="item in OptOperateCateFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matComBrand">
      <el-select placeholder="选择公司品牌" v-model="QueryForm.matComBrand" @change="SelectMatProName" @visible-change="FocusMatComBrand" :filter-method="MatComBrandFitter" filterable clearable multiple collapse-tags :style="matComBrandStyle">
        <el-option v-for="item in OptMatComBrandFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matProName">
      <el-select placeholder="选择产品名称" v-model="QueryForm.matProName" @change="SelectMatBrand" @visible-change="FocusMatProName" :filter-method="MatProNameFitter" filterable clearable multiple collapse-tags :style="matProNameStyle">
        <el-option v-for="item in OptMatProNameFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matBrand">
      <el-select placeholder="选择适用品牌" v-model="QueryForm.matBrand" @change="SelectMatModel" @visible-change="FocusMatBrand" :filter-method="MatBrandFitter" filterable clearable multiple collapse-tags :style="matBrandStyle">
        <el-option v-for="item in OptMatBrandFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matModel">
      <el-select placeholder="选择适用机型" v-model="QueryForm.matModel" @change="SelectMatStyle" @visible-change="FocusMatModel" :filter-method="MatModelFitter" filterable clearable multiple collapse-tags :style="matModelStyle">
        <el-option v-for="item in OptMatModelFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matStyle">
      <el-select placeholder="选择款式" v-model="QueryForm.matStyle" @change="SelectMatColor" @visible-change="FocusMatStyle" :filter-method="MatStyleFitter" filterable clearable multiple collapse-tags :style="matStyleStyle">
        <el-option v-for="item in OptMatStyleFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="matColor">
      <el-select placeholder="选择颜色" v-model="QueryForm.matColor" @change="changeMatColor" @visible-change="FocusMatColor" :filter-method="MatColorFitter" filterable clearable multiple collapse-tags :style="matColorStyle">
        <el-option v-for="item in OptMatColorFitter" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
  import { GetTreeName } from "@/api/Common";
  import { checkPower, isEmpty } from "@/utils/validate"
  export default {
    props: {
      matCateStyle: { type: String, default: 'width:170px;' },
      matOperateCateStyle: { type: String, default: 'width:230px;' },
      matComBrandStyle: { type: String, default: 'width:200px;' },
      matProNameStyle: { type: String, default: 'width:270px;' },
      matBrandStyle: { type: String, default: 'width:250px;' },
      matModelStyle: { type: String, default: 'width:370px;' },
      matStyleStyle: { type: String, default: 'width:410px;' },
      matColorStyle: { type: String, default: 'width:480px;' },
      formSize: { type: String, default: 'small' },
    }, 
    data() {
      return {
        QueryForm: {
          matCate: [],
          matOperateCate: [],
          matComBrand: [],
          matProName: [],
          matBrand: [],
          matModel: [],
          matStyle: [],
          matColor: [],
        },
        OptMatCate: [], //类目
        OptOperateCate: [], //运营大类
        OptMatComBrand: [], //公司品牌
        OptMatProName: [], //产品名称
        OptMatBrand: [], //适用品牌
        OptMatModel: [], //适用机型
        OptMatStyle: [], //款式
        OptMatColor: [], //颜色
        OptMatCateFitter: [], //类目
        OptOperateCateFitter: [], //运营大类
        OptMatComBrandFitter: [], //公司品牌
        OptMatProNameFitter: [], //产品名称
        OptMatBrandFitter: [], //适用品牌
        OptMatModelFitter: [], //适用机型
        OptMatStyleFitter: [], //款式
        OptMatColorFitter: [], //颜色
      }
    },
    mounted() {
      this.SelectMatCate();
    },
    methods: {
      //查类目
      SelectMatCate() {
        this.OptOperateCate = []; //运营大类
        this.OptMatComBrand = []; //公司品牌
        this.OptMatProName = []; //产品名称
        this.OptMatBrand = []; //适用品牌
        this.OptMatModel = []; //适用机型
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色

        this.QueryForm.matOperateCate = [];
        this.QueryForm.matComBrand = [];
        this.QueryForm.matProName = [];
        this.QueryForm.matBrand = [];
        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];

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

        this.QueryForm.matOperateCate = [];
        this.QueryForm.matComBrand = [];
        this.QueryForm.matProName = [];
        this.QueryForm.matBrand = [];
        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查运营大类
      FocusMatOperateCate(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          let condition = { type: 'matOperateCate', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查公司品牌
      SelectMatComBrand() {
        this.OptMatProName = []; //产品名称
        this.OptMatBrand = []; //适用品牌
        this.OptMatModel = []; //适用机型
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色 

        this.QueryForm.matComBrand = [];
        this.QueryForm.matProName = [];
        this.QueryForm.matBrand = [];
        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查公司品牌
      FocusMatComBrand(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          let condition = { type: 'matComBrand', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查产品名称
      SelectMatProName() {
        this.OptMatBrand = []; //适用品牌
        this.OptMatModel = []; //适用机型
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色

        this.QueryForm.matProName = [];
        this.QueryForm.matBrand = [];
        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查产品名称
      FocusMatProName(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate) || !isEmpty(this.QueryForm.matComBrand)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          let condition = { type: 'matProName', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查适用品牌
      SelectMatBrand() {
        this.OptMatModel = []; //适用机型
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色

        this.QueryForm.matBrand = [];
        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查适用品牌
      FocusMatBrand(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate) || !isEmpty(this.QueryForm.matComBrand) || !isEmpty(this.QueryForm.matProName)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          let condition = { type: 'matBrand', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查适用机型
      SelectMatModel() {
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色

        this.QueryForm.matModel = [];
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查适用机型
      FocusMatModel(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate) || !isEmpty(this.QueryForm.matComBrand) || !isEmpty(this.QueryForm.matProName) ||
            !isEmpty(this.QueryForm.matBrand)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }

          let condition = { type: 'matModel', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查款式
      SelectMatStyle() {
        this.OptMatColor = []; //颜色
        this.QueryForm.matStyle = [];
        this.QueryForm.matColor = [];
      },
      //查款式
      FocusMatStyle(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate) || !isEmpty(this.QueryForm.matComBrand) || !isEmpty(this.QueryForm.matProName) ||
            !isEmpty(this.QueryForm.matBrand) || !isEmpty(this.QueryForm.matModel)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          let condition = { type: 'matStyle', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      //查颜色
      SelectMatColor(value) {
        this.QueryForm.matColor = [];
      },
      //查颜色
      FocusMatColor(flag) {
        if (flag == true) {
          let val = ""
          if (!isEmpty(this.QueryForm.matCate) || !isEmpty(this.QueryForm.matOperateCate) || !isEmpty(this.QueryForm.matComBrand) || !isEmpty(this.QueryForm.matProName) ||
            !isEmpty(this.QueryForm.matBrand) || !isEmpty(this.QueryForm.matModel) || !isEmpty(this.QueryForm.matStyle)) {
            val = this.BuildSQLConditions();
          } else {
            val = "1=1"
          }
          const condition = { type: 'matColor', value: val };
          this.GetMaterialInfo(condition);
        }
      },
      changeMatColor() {
        this.$forceUpdate();
      },
      //构建物料查询条件
      BuildSQLConditions() {
        let val = "1=1";
        if (this.QueryForm.matCate.length > 0) {
          val += "AND matCate IN ('" + this.QueryForm.matCate.join("','") + "')";
        }

        if (this.QueryForm.matOperateCate.length > 0) {
          val += " AND matOperateCate IN ('" + this.QueryForm.matOperateCate.join("','") + "')";
        }

        if (this.QueryForm.matComBrand.length > 0) {
          val += " AND matComBrand IN ('" + this.QueryForm.matComBrand.join("','") + "')";
        }

        if (this.QueryForm.matProName.length > 0) {
          val += " AND matProName IN ('" + this.QueryForm.matProName.join("','") + "')";
        }

        if (this.QueryForm.matBrand.length > 0) {
          val += " AND matBrand IN ('" + this.QueryForm.matBrand.join("','") + "')";
        }

        if (this.QueryForm.matModel.length > 0) {
          val += " AND matModel IN ('" + this.QueryForm.matModel.join("','") + "')";
        }

        if (this.QueryForm.matModel.length > 0) {
          val += " AND matModel IN ('" + this.QueryForm.matModel.join("','") + "')";
        }

        if (this.QueryForm.matStyle.length > 0)
        {
          val += " AND matStyle in('" + this.QueryForm.matStyle.join("','") + "')";
        }

        return val;
      },
      //获取物料信息
      GetMaterialInfo(obj) {

        GetTreeName(obj).then(res => {
          switch (obj.type) {
          case 'matOperateCate':
            this.OptOperateCate = res.data;
            this.OptOperateCateFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matComBrand':
            this.OptMatComBrand = res.data;
            this.OptMatComBrandFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matProName':
            this.OptMatProName = res.data;
            this.OptMatProNameFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matBrand':
            this.OptMatBrand = res.data;
            this.OptMatBrandFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matModel':
            this.OptMatModel = res.data;
            this.OptMatModelFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matStyle':
            this.OptMatStyle = res.data;
            this.OptMatStyleFitter = res.data.filter((p, i) => i < 50);
            break;
          case 'matColor':
            this.OptMatColor = res.data;
            this.OptMatColorFitter = res.data.filter((p, i) => i < 50);
            break;
          default:
            this.OptMatCate = res.data;
            this.OptMatCateFitter = res.data.filter((p, i) => i < 50);
            break;
          }
        });

      },
      clearFormMat() {
        this.$refs["QueryForm"].resetFields();
        this.OptOperateCate = []; //运营大类
        this.OptMatComBrand = []; //公司品牌
        this.OptMatProName = []; //产品名称
        this.OptMatBrand = []; //适用品牌
        this.OptMatModel = []; //适用机型
        this.OptMatStyle = []; //款式
        this.OptMatColor = []; //颜色
      },
      initDataMat(obj) {
        this.QueryForm.matCate = obj.matCate;
        this.SelectMatOperateCate();
        this.QueryForm.matOperateCate = obj.matOperateCate;
        this.SelectMatComBrand();
        this.QueryForm.matComBrand = obj.matComBrand;
        this.SelectMatProName();
        this.QueryForm.matProName = obj.matProName;
        this.SelectMatBrand();
        this.QueryForm.matBrand = obj.matBrand;
        this.SelectMatModel();
        this.QueryForm.matModel = obj.matModel;
        this.SelectMatStyle();
        this.QueryForm.matStyle = obj.matStyle;
        setTimeout(() => {
          this.SelectMatColor(obj.matStyle);
          this.QueryForm.matColor = obj.matColor;
        }, 1000);
      },
      MatCateFitter(input) {
        this.OptMatCateFitter = this.OptMatCate.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatOperateCateFitter(input) {
        this.OptOperateCateFitter = this.OptOperateCate.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatComBrandFitter(input) {
        this.OptMatComBrandFitter = this.OptMatComBrand.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatProNameFitter(input) {
        this.OptMatProNameFitter = this.OptMatProName.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatBrandFitter(input) {
        this.OptMatBrandFitter = this.OptMatBrand.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatModelFitter(input) {
        this.OptMatModelFitter = this.OptMatModel.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatStyleFitter(input) {
        this.OptMatStyleFitter = this.OptMatStyle.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
      MatColorFitter(input) {
        this.OptMatColorFitter = this.OptMatColor.filter(p => p.name.toLowerCase().indexOf(input.toLowerCase()) > -1).filter((p, i) => i < 50);
      },
    }
  }
</script>

<style lang="less" scoped>

</style>