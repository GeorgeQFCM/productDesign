<template>
  <el-dialog :visible.sync="Visible" width="70%" class="QueryDialog">
    <el-row>
      <div style="display:inline-block;">
        <label>自定义查询条件</label>
      </div>
      <div style="float:right;display:inline-block;">
        <label
          class="iconfont ebms_iconduigou"
          style="color:#228B22;padding-right:10px;"
          title="保存"
          @click="save"
        ></label>
        <label
          class="iconfont ebms_iconicon-"
          style="color:red;padding-right:10px;"
          title="关闭"
          @click="close"
        ></label>
      </div>
      <el-row :gutter="10">
        <el-form :inline="true">
          <!-- 左边部分 -->
          <el-col :span="4" style="border:1px solid #99a9bf;height:200px;">
            <el-row>
              <el-checkbox v-model="MaterialPropertyCk" @change="SelMaterialProperty">基于物料属性</el-checkbox>
            </el-row>
            <el-row>
              <el-checkbox v-model="ShopPropertyCk" @change="SelShopProperty">基于店铺属性</el-checkbox>
            </el-row>
          </el-col>
          <!-- 右边部分 -->
          <el-col :span="20">
            <!--基于物料选择显示的页面  -->
            <div class="materialDiv" v-show="ShowMaterial">
              <el-select
                placeholder="选择类目"
                size="small"
                v-model="Material.MatCate"
                @change="getOperateCate"
                clearable
              >
                <el-option
                  v-for="item in OptMatCate"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择运营大类"
                size="small"
                v-model="Material.OperateCate"
                @change="getMatComBrand"
                clearable
              >
                <el-option
                  v-for="item in OptOperateCate"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择公司品牌"
                size="small"
                v-model="Material.MatComBrand"
                @change="getMatProName"
                clearable
              >
                <el-option
                  v-for="item in OptMatComBrand"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择产品名称"
                size="small"
                v-model="Material.MatProName"
                @change="getMatBrand"
                clearable
              >
                <el-option
                  v-for="item in OptMatProName"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择品牌"
                size="small"
                v-model="Material.MatBrand"
                @change="getMatMode"
                clearable
              >
                <el-option
                  v-for="item in OptMatBrand"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择机型"
                size="small"
                v-model="Material.MatMode"
                @change="getMatStyle"
                clearable
              >
                <el-option
                  v-for="item in OptMatMode"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select
                placeholder="选择款式"
                size="small"
                v-model="Material.MatStyle"
                @change="getMatColor"
                clearable
              >
                <el-option
                  v-for="item in OptMatStyle"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <el-select placeholder="选择颜色" size="small" v-model="Material.MatColor" clearable>
                <el-option
                  v-for="item in OptMatColor"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                ></el-option>
              </el-select>
              <!-- 增加按钮 -->
              <label
                class="iconfont ebms_icontianjiafang"
                style="margin-left:20px;color:#228B22;float:right;padding-right:10px;"
                @click="AddMaterial"
              ></label>
              <!-- 选择的物料点击+按钮显示的信息 -->
              <div class="ShowMaterialInfo">
                <el-row v-for="Material in MaterialOptions" :key="Material">
                  <el-col :span="20" style="padding-left:5px;">{{Material}}</el-col>
                  <el-col :span="4">
                    <label
                      class="iconfont ebms_iconshanchuzijiedian"
                      style="float:right;color:red;padding-right:10px;"
                      @click="DelMaterial(Material)"
                    ></label>
                  </el-col>
                </el-row>
              </div>
            </div>

            <!-- 基于店铺选择显示的页面 -->
            <div class="ShopDiv" v-show="ShowShop">
              <el-select
                placeholder="账号"
                size="small"
                v-model="Shop.ShopNameSimple"
                @change="GetShopName"
                clearable
              >
                <el-option
                  v-for="item in ShopNameSimpleOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select
                placeholder="店铺全称"
                size="small"
                v-model="Shop.ShopName"
                @change="GetSiteCode"
                clearable
              >
                <el-option
                  v-for="item in ShopNameOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-select placeholder="站点" size="small" v-model="Shop.SiteCode" clearable>
                <el-option
                  v-for="item in SiteCodeOpt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <label
                class="iconfont ebms_icontianjiafang"
                style="margin-left:20px;color:#228B22;float:right;padding-right:10px;"
                @click="AddShop"
              ></label>
              <div class="ShowMaterialInfo">
                <el-row v-for="Shop in ShopOptions" :key="Shop">
                  <el-col :span="20" style="padding-left:5px;">{{Shop}}</el-col>
                  <el-col :span="4">
                    <label
                      class="iconfont ebms_iconshanchuzijiedian"
                      style="float:right;color:red;padding-right:10px;"
                      @click="DelShop(Shop)"
                    ></label>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </el-row>
  </el-dialog>
</template>
<script>
import {
  GetTbComMaterielTree,
  GetSellerInfo,
  GetSellerListByCondition,
  GetDictionaryList,
  QueryAmazonYYTaskPage,
  QueryTaskForSku,
  QueryYYTaskDet
} from "@/api/product/AmazonPageCreate";
import { GetSelfDeptList } from "@/api/permissionset/User";
import { GetSkuTypeList } from "@/api/rulebase/StandardParameter";

export default {
  data() {
    return {
      // 基于物料的多选框的勾选状态
      MaterialPropertyCk: false,
      // 基于店铺多选框的勾选状态
      ShopPropertyCk: false,
      // 物料div信息显示
      ShowMaterial: false,
      // 店铺div信息显示
      ShowShop: false,
      // 物料
      Material: {
        MatColor: ""
      },
      // 店铺
      Shop: {
        SiteCode: ""
      },
      // 选择到的物料信息
      MaterialOptions: [],
      // 物料sql语句查询数组
      MaterialSqlArr: [],
      OptMatCate: [], //类目
      OptOperateCate: [], //运营大类
      OptMatComBrand: [], //公司品牌
      OptMatProName: [], //产品名称
      OptMatBrand: [], //适用品牌
      OptMatMode: [], //适用机型
      OptMatStyle: [], //款式
      OptMatColor: [], //颜色
      ShopNameSimpleOpt: [], //店铺简称
      ShopNameOpt: [], //店铺名称
      SiteCodeOpt: [], //店铺站点
      // 选择到的店铺信息
      ShopOptions: [],
      // 店铺sql语句查询数组
      ShopSqlArr: [],
      CustomQueryTitle:""
    };
  },
  methods: {
    save() {
      if (this.MaterialOptions.length == 0 && this.ShopOptions == 0) {
        this.$message.error("请添加查询条件");
        return;
      }
      var MaterialQueryVal = [];
      if (this.MaterialOptions.length != 0) {
        MaterialQueryVal.push("(" + this.MaterialOptions.join(")or(") + ")");
      }

      if (this.ShopOptions.length) {
        MaterialQueryVal.push("(" + this.ShopOptions.join(") or (") + ")");
      }
      this.CustomQueryTitle =
        MaterialQueryVal.length != 0
          ? "(" + MaterialQueryVal.join("and") + ")"
          : "";
      //物料和店铺不勾选
      this.MaterialPropertyCk = false;
      this.ShopPropertyCk = false;
      //物料和店铺div不显示
      this.ShowMaterial = false;
      this.ShowShop = false;
      // 物料信息重置为空
      this.Material = {};
      this.Shop = {};
      // 选择的物料和店铺信息为空
      this.MaterialOptions = [];
      this.ShopOptions = [];
      //自定义查询框不可见
      this.$emit("sav");
    },
    close() {
      
      //物料和店铺不勾选
      this.MaterialPropertyCk = false;
      this.ShopPropertyCk = false;
      //物料和店铺div不显示
      this.ShowMaterial = false;
      this.ShowShop = false;
      // 物料信息重置为空
      this.Material = {};
      this.Shop = {};
      // 选择的物料和店铺信息为空
      this.MaterialOptions = [];
      this.ShopOptions = [];
      this.$emit("cls");
    },
    // 监听物料多选框的的变化
    SelMaterialProperty() {
      if (this.MaterialPropertyCk) {
        this.ShowMaterial = true;
      } else {
        this.ShowMaterial = false;
      }
    },
    // 监听商品多选框的变化
    SelShopProperty() {
      if (this.ShopPropertyCk) {
        this.ShowShop = true;
      } else {
        this.ShowShop = false;
      }
    },
    // 获取类目信息
    getMateriaCate() {
      let contion = { type: "matCate" };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatCate = res.data;
      });
    },
    //  监听类目选择框的变化 获取营运大类信息
    getOperateCate() {
      // 选择的信息重新为空 选择的值为空
      this.OptOperateCate = [];
      this.OptMatComBrand = [];
      this.OptMatProName = [];
      this.OptMatBrand = [];
      this.OptMatMode = [];
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.OperateCate = "";
      this.Material.MatComBrand = "";
      this.Material.MatProName = "";
      this.Material.MatBrand = "";
      this.Material.MatMode = "";
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matOperateCate",
        value: "matCate='" + this.Material.MatCate + "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptOperateCate = res.data;
      });
    },
    // 监听运营大类选择框的变化 获取公司品牌信息
    getMatComBrand() {
      // 让公司品牌信息重新为空 选择的值为空
      this.OptMatComBrand = [];
      this.OptMatProName = [];
      this.OptMatBrand = [];
      this.OptMatMode = [];
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.MatComBrand = "";
      this.Material.MatProName = "";
      this.Material.MatBrand = "";
      this.Material.MatMode = "";
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matComBrand",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatComBrand = res.data;
      });
    },
    // 监听公司品牌选择框的变化 获取产品名称信息
    getMatProName() {
      this.OptMatProName = [];
      this.OptMatBrand = [];
      this.OptMatMode = [];
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.MatProName = "";
      this.Material.MatBrand = "";
      this.Material.MatMode = "";
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matProName",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "' and matComBrand='" +
          this.Material.MatComBrand +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatProName = res.data;
      });
    },
    // 监听产品名称选择框的变化，获取适用品牌信息
    getMatBrand() {
      this.OptMatBrand = [];
      this.OptMatMode = [];
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.MatBrand = "";
      this.Material.MatMode = "";
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matBrand",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "' and matComBrand='" +
          this.Material.MatComBrand +
          "'and matProName='" +
          this.Material.MatProName +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatBrand = res.data;
      });
    },
    // 监听品牌选择框的变化，获取适用机型信息
    getMatMode() {
      this.OptMatMode = [];
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.MatMode = "";
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matModel",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "' and matComBrand='" +
          this.Material.MatComBrand +
          "'and matProName='" +
          this.Material.MatProName +
          "' and matBrand='" +
          this.Material.MatBrand +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatMode = res.data;
      });
    },
    // 监听机型选择框的变化，获取款式信息
    getMatStyle() {
      this.OptMatStyle = [];
      this.OptMatColor = [];
      this.Material.MatStyle = "";
      this.Material.MatColor = "";
      let contion = {
        type: "matStyle",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "' and matComBrand='" +
          this.Material.MatComBrand +
          "'and matProName='" +
          this.Material.MatProName +
          "' and matBrand='" +
          this.Material.MatBrand +
          "' and matModel= '" +
          this.Material.MatMode +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatStyle = res.data;
      });
    },
    // 监听款式选择框的变化，获取颜色信息
    getMatColor() {
      this.OptMatColor = [];
      this.Material.MatColor = "";
      let contion = {
        type: "matColor",
        value:
          "matCate='" +
          this.Material.MatCate +
          "' and matOperateCate='" +
          this.Material.OperateCate +
          "' and matComBrand='" +
          this.Material.MatComBrand +
          "'and matProName='" +
          this.Material.MatProName +
          "' and matBrand='" +
          this.Material.MatBrand +
          "' and matModel= '" +
          this.Material.MatMode +
          "' and matStyle='" +
          this.Material.MatStyle +
          "'"
      };
      GetTbComMaterielTree(contion).then(res => {
        this.OptMatColor = res.data;
      });
    },
    // 增加物料信息
    AddMaterial: function() {
      var MaterialStr = "";
      var Materialsql = "";
      if (this.Material.MatCate == undefined) {
        this.$message.error("请选择物料信息");
        return;
      } else {
        MaterialStr += this.Material.MatCate;
        Materialsql += "matCate='" + this.Material.MatCate + "'";
      }

      if (
        this.Material.OperateCate != undefined &&
        this.Material.OperateCate.length != 0
      ) {
        MaterialStr += "->" + this.Material.OperateCate;
        Materialsql += " and matOperateCate='" + this.Material.OperateCate + "'";
      }

      if (
        this.Material.MatComBrand != undefined &&
        this.Material.MatComBrand.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatComBrand;
        Materialsql += " and matComBrand='" + this.Material.MatComBrand + "'";
      }

      if (
        this.Material.MatProName != undefined &&
        this.Material.MatProName.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatProName;
        Materialsql += " and matProName='" + this.Material.MatProName + "'";
      }

      if (
        this.Material.MatBrand != undefined &&
        this.Material.MatBrand.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatBrand;
        Materialsql += " and matBrand='" + this.Material.MatBrand + "'";
      }

      if (
        this.Material.MatMode != undefined &&
        this.Material.MatMode.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatMode;
        Materialsql += " and matModel='" + this.Material.MatMode + "'";
      }

      if (
        this.Material.MatStyle != undefined &&
        this.Material.MatStyle.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatStyle;
        Materialsql += " and matStyle='" + this.Material.MatStyle + "'";
      }

      if (
        this.Material.MatColor != undefined &&
        this.Material.MatColor.length != 0
      ) {
        MaterialStr += "->" + this.Material.MatColor;
        Materialsql += " and matColor='" + this.Material.MatColor + "'";
      }
      var ret2 = this.MaterialOptions.findIndex(v => {
        return v == MaterialStr;
      });
      if (ret2 == -1) {
        this.MaterialOptions.push(MaterialStr);
        this.MaterialSqlArr.push(Materialsql);
      }
    },
    //删除物料信息显示
    DelMaterial(val) {
      var index = this.MaterialOptions.indexOf(val);
      if (index > -1) {
        this.MaterialOptions.splice(index, 1);
        this.MaterialSqlArr.splice(index, 1);
      }
    },
    // 监听店铺简称选择框的变化  获取店铺全称
    GetShopName(value) {
      this.ShopNameOpt = [];
      this.SiteCodeOpt = [];
      this.Shop.ShopName = "";
      this.Shop.SiteCode = "";
      GetSellerListByCondition({ type: 3, condition: value }).then(res => {
        res.data.forEach(element => {
          this.ShopNameOpt.push({
            label: element.shopName,
            value: element.shopName
          });
        });
      });
    },
    // 监听店铺全称选择框的变化，获取站点信息
    GetSiteCode(value) {
      this.SiteCodeOpt = [];
      this.Shop.SiteCode = "";
      GetSellerListByCondition({ type: 2, condition: value }).then(res => {
        res.data.forEach(element => {
          this.SiteCodeOpt.push({
            label: element.countryCode,
            value: element.countryCode
          });
        });
      });
    },
    //  增加店铺信息
    AddShop: function() {
      var ShopStr = "";
      var ShopSql = "";
      if (this.Shop.ShopNameSimple == undefined) {
        this.$message.error("请选择店铺属性");
        return;
      } else {
        ShopStr += this.Shop.ShopNameSimple;
        ShopSql += "ShopNameSimple = '" + this.Shop.ShopNameSimple + "'";
      }

      if (this.Shop.ShopName.length > 1) {
        ShopStr += "->" + this.Shop.ShopName;
        ShopSql += " and ShopName = '" + this.Shop.ShopName + "'";
      }

      if (this.Shop.SiteCode.length > 1) {
        ShopStr += "->" + this.Shop.SiteCode;
        ShopSql += " and CountryCode = '" + this.Shop.SiteCode + "'";
      }
      var ret2 = this.ShopOptions.findIndex(v => {
        return v == ShopStr;
      });
      if (ret2 == -1) {
        this.ShopOptions.push(ShopStr);
        this.ShopSqlArr.push(ShopSql);
      }
    },
    //  移除店铺信息
    DelShop(val) {
      var index = this.ShopOptions.indexOf(val);
      if (index > -1) {
        this.ShopOptions.splice(index, 1);
        this.ShopSqlArr.splice(index, 1);
      }
    }
  },
  created() {
    this.getMateriaCate();
    GetSellerInfo({ type: 2 }).then(res => {
      this.ShopNameSimpleOpt = [];
      // 对获取的数据循环，取到店铺简称的值，用lable和value存储
      res.data.forEach(element => {
        this.ShopNameSimpleOpt.push({
          label: element.shopNameSimple,
          value: element.shopNameSimple
        });
      });
    });
  },
  props: {
    Visible: {
      type: Boolean
    }
  }
};
</script>