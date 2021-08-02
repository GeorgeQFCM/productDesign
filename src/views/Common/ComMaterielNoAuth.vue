<!--
 * @Descripttion:  不加权限
 * @version: 
 * @Author: zj
 * @Date: 2021-04-13 09:26:30
 * @LastEditors: zj
 * @LastEditTime: 2021-04-13 09:38:56
-->
<template>
  <el-row>
    <el-form :inline="true" :model="query" ref="queryMat">
      <el-row>
        <el-form-item prop="matCate" size="small">
          <el-select placeholder="选择类目" v-model="query.matCate[0]" filterable @change="SelectMatOperateCate" clearable style="width:150px;">
            <el-option v-for="item in OptMatCate" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matOperateCate" size="small">
          <el-select placeholder="选择运营大类" v-model="query.matOperateCate[0]" filterable @change="SelectMatProName" clearable style="width:150px;">
            <el-option v-for="item in OptOperateCate" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matProName" size="small">
          <el-select placeholder="选择产品名称" v-model="query.matProName[0]" filterable @change="SelectMatStyle" clearable style="width:150px;">
            <el-option v-for="item in OptMatProName" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matStyle" size="small">
          <el-select placeholder="选择款式" v-model="query.matStyle[0]" filterable @change="SelectMatMainMaterial" clearable style="width:150px;">
            <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matMainMaterial" size="small">
          <el-select placeholder="选择主材料" v-model="query.matMainMaterial[0]" filterable @change="SelectMatPattern" clearable style="width:150px;">
            <el-option v-for="item in OptMatMainMaterial" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matPattern" size="small">
          <el-select placeholder="选择图案" v-model="query.matPattern[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatPattern" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row style="margin-top:5px">
        <el-form-item prop="matComBrand" size="small">
          <el-select placeholder="选择公司品牌" v-model="query.matComBrand[0]" clearable filterable @clear="clearComBrand" :filter-method="comModelFilter" style="width:150px;">
            <el-option v-for="item in OptMatComBrand" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matBrand" size="small">
          <el-select placeholder="选择适用品牌或对象" v-model="query.matBrand[0]" clearable filterable @clear="clearBrand" :filter-method="BrandFilter" style="width:150px;">
            <el-option v-for="item in OptMatBrand" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matModel" size="small">
          <el-select placeholder="选择型号" v-model="query.matModel[0]" clearable filterable :filter-method="matModelFilter" style="width:150px;">
            <el-option v-for="item in OptMatModel" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matColor" size="small">
          <el-select placeholder="选择颜色" multiple collapse-tags v-model="query.matColor" filterable style="width:150px;" :filter-method="filterMethod" clearable>
            <el-option v-for="item in OptMatColor" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matSize" size="small">
          <el-select placeholder="选择尺码" v-model="query.matSize[0]" style="width:150px;" filterable clearable>
            <el-option v-for="item in OptMatSize" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matPackQty" size="small">
          <el-select placeholder="选择包装数量" v-model="query.matPackQty[0]" style="width:150px;" filterable clearable>
            <el-option v-for="item in OptMatPackQty" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
      </el-row>

      <el-row style="margin-top:5px">
        <el-form-item prop="matCompatibleModel" size="small">
          <el-select placeholder="选择适用机型" multiple collapse-tags v-model="query.matCompatibleModel" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatCompatibleModel" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matVerson" size="small">
          <el-select placeholder="选择版本" v-model="query.matVerson[0]" style="width:150px;" filterable clearable>
            <el-option v-for="item in OptMatVerson" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matSPUCode" size="small">
          <el-input placeholder="SPU/物料编码" v-model="matSPUCode" @change="codeChange" style="width: 310px;" clearable>
          </el-input>
        </el-form-item>
        <el-form-item size="small">
          <slot></slot>
        </el-form-item>
      </el-row>
    </el-form>

  </el-row>
</template>

<script>
  import { GetTreeName, QueryTbComMaterielData } from "@/api/Common";
  import { Trim, deepClone,trimArray, flatten ,isEmpty} from "@/utils/common.js"
  export default {
    data() {
      return {
        matColor: [],
        matModel: [],
        right: 20,


        OptMatCate: [], //类目
        OptOperateCate: [], //运营大类
        OptMatProName: [], //产品名称
        OptMatStyle: [], //款式
        OptMatMainMaterial: [], //主材料
        OptMatPattern: [], //图案

        OptMatComBrand: [], //公司品牌
        OptMatBrand: [], //适用品牌
        OptMatModel: [], //适用型号
        OptMatColor: [], //颜色
        OptMatSize: [], //尺码
        OptMatPackQty: [], //包装数量

        OptMatCompatibleModel: [], //适用机型
        OptMatVerson: [], //版本
        matSPUCode: "",
        query: {
          matCate: [],
          matOperateCate: [],
          matProName: [],
          matStyle: [],
          matMainMaterial: [],
          matPattern: [],

          matComBrand: [],
          matBrand: [],
          matModel: [],
          matColor: [],
          matSize: [],
          matPackQty: [],

          matCompatibleModel: [],
          matVerson: [],
          matCodeOrSPU: [],
        },
        matComBrand: [],
        matBrand: [],
      }
    },
    methods: {
      codeChange(val) {
        this.query.matCodeOrSPU = val.length > 0 ? val.split(",") : []
      },
      //查类目
      SelectMatCate() {
        this.OptOperateCate = []; //运营大类
        this.OptMatProName = []; //公司品牌
        this.OptMatStyle = []; //款式
        this.OptMatMainMaterial = []; //主材料
        this.OptMatPattern = []; //图案

        this.query.matOperateCate = [];
        this.query.matProName = [];
        this.query.matStyle = [];
        this.query.matMainMaterial = [];
        this.query.matPattern = [];

        let condition = { type: 'matCate' };
        this.GetMaterialInfo(condition);
      },

      //查运营大类
      SelectMatOperateCate() {
        this.OptOperateCate = []; //运营大类
        this.OptMatProName = []; //公司品牌
        this.OptMatStyle = []; //款式
        this.OptMatMainMaterial = []; //主材料
        this.OptMatPattern = []; //图案

        this.query.matOperateCate = [];
        this.query.matProName = [];
        this.query.matStyle = [];
        this.query.matMainMaterial = [];
        this.query.matPattern = [];

        let val = "matCate='" + this.query.matCate[0] + "'";
        let condition = { type: 'matOperateCate', value: val };
        this.GetMaterialInfo(condition);
      },

      //查产品名称
      SelectMatProName() {
        this.OptMatProName = [] //产品名称
        this.OptMatStyle = []; //款式
        this.OptMatMainMaterial = []; //主材料
        this.OptMatPattern = []; //图案

        this.query.matProName = [];
        this.query.matStyle = [];
        this.query.matMainMaterial = [];
        this.query.matPattern = [];

        let val = "matCate='" + this.query.matCate[0] + "' and matOperateCate='" + this.query.matOperateCate[0] + "'";
        let condition = { type: 'matProName', value: val };
        this.GetMaterialInfo(condition);
      },

      //查款式
      SelectMatStyle() {
        this.OptMatStyle = []; //款式
        this.OptMatMainMaterial = []; //主材料
        this.OptMatPattern = []; //图案

        this.query.matStyle = [];
        this.query.matMainMaterial = [];
        this.query.matPattern = [];

        let val = "matCate='" + this.query.matCate[0] + "' and matOperateCate='" + this.query.matOperateCate[0] + "'and matProName='" + this.query.matProName[0] + "'";
        let condition = { type: 'matStyle', value: val };
        this.GetMaterialInfo(condition);
      },

      //查主材料
      SelectMatMainMaterial() {
        this.OptMatMainMaterial = []; //主材料
        this.OptMatPattern = []; //图案

        this.query.matMainMaterial = [];
        this.query.matPattern = [];

        let val = "matCate='" + this.query.matCate[0] + "' and matOperateCate='" + this.query.matOperateCate[0] + "'and matProName='" + this.query.matProName[0] +
          "'and matStyle='" + this.query.matStyle[0] + "'";
        let condition = { type: 'matMainMaterial', value: val };
        this.GetMaterialInfo(condition);
      },

      //查图案
      SelectMatPattern() {
        this.OptMatPattern = []; //图案

        this.query.matPattern = [];

        let val = "matCate='" + this.query.matCate[0] + "' and matOperateCate='" + this.query.matOperateCate[0] + "'and matProName='" + this.query.matProName[0] +
          "'and matStyle='" + this.query.matStyle[0] + "'and matMainMaterial='" + this.query.matMainMaterial[0] + "'";
        let condition = { type: 'matPattern', value: val };
        this.GetMaterialInfo(condition);
      },

      changeMatColor() {
        this.$forceUpdate();
      },

      //获取物料信息
      GetMaterialInfo(obj) {
        obj.isAuth = 0
        GetTreeName(obj).then(res => {
          switch (obj.type) {
          case 'matOperateCate':
            this.OptOperateCate = res.data;
            break;
          case 'matProName':
            this.OptMatProName = res.data;
            break;
          case 'matStyle':
            this.OptMatStyle = res.data;
            break;
          case 'matMainMaterial':
            this.OptMatMainMaterial = res.data;
            break;
          case 'matPattern':
            this.OptMatPattern = res.data;
            break;
          default:
            this.OptMatCate = res.data;
            break;
          }
        });
        this.$emit('CallBack');
      },
      clearForm() {
        this.$refs.queryMat.resetFields();
        //this.OptMatCate = [] //类目
        this.OptOperateCate = [] //运营大类
        this.OptMatProName = [] //产品名称
        this.OptMatStyle = [] //款式
        this.OptMatMainMaterial = [] //主材料
        this.OptMatPattern = [] //图案
        this.matSPUCode = ""
      },

      //初始化
      initData(obj) {
        this.query.matCompatibleModel = [];
        this.query.matColor = [];
        !isEmpty(obj.matCate) ? this.query.matCate[0] = obj.matCate : this.query.matCate = [];
        this.SelectMatOperateCate();
        !isEmpty(obj.matOperateCate) ? this.query.matOperateCate[0] = obj.matOperateCate : this.query.matOperateCate = [];
        this.SelectMatProName();
        !isEmpty(obj.matProName) ? this.query.matProName[0] = obj.matProName : this.query.matProName = [];
        this.SelectMatStyle();
        !isEmpty(obj.matStyle) ? this.query.matStyle[0] = obj.matStyle : this.query.matStyle = [];
        this.SelectMatMainMaterial();
        !isEmpty(obj.matMainMaterial) ? this.query.matMainMaterial[0] = obj.matMainMaterial : this.query.matMainMaterial = [];
        this.SelectMatPattern();
        !isEmpty(obj.matPattern) ? this.query.matPattern[0] = obj.matPattern : this.query.matPattern = [];

        !isEmpty(obj.matComBrand) ? this.query.matComBrand[0] = obj.matComBrand : this.query.matComBrand = [];
        !isEmpty(obj.matBrand) ? this.query.matBrand[0] = obj.matBrand : this.query.matBrand = [];
        !isEmpty(obj.matModel) ? this.query.matModel[0] = obj.matModel : this.query.matModel = [];
        !isEmpty(obj.matSize) ? this.query.matSize[0] = obj.matSize : this.query.matSize = [];
        !isEmpty(obj.matPackQty) ? this.query.matPackQty[0] = obj.matPackQty : this.query.matPackQty = [];
        !isEmpty(obj.matVerson) ? this.query.matVerson[0] = obj.matVerson : this.query.matVerson = [];
        // this.matSPUCode = ""
        // this.query.matCodeOrSPU = [];
        (!isEmpty(obj.matCodeOrSPU) && obj.matCodeOrSPU.length > 0) ? this.query.matCodeOrSPU = obj.matCodeOrSPU: this.query.matCodeOrSPU = [];
        (!isEmpty(obj.matCodeOrSPU) && obj.matCodeOrSPU.length > 0) ? this.matSPUCode = this.query.matCodeOrSPU.join(','): this.matSPUCode = "";
        obj.matComBrand ? this.query.matComBrand[0] = obj.matComBrand : this.query.matComBrand = [];
        !isEmpty(trimArray(obj.matCompatibleModel)) ? this.query.matCompatibleModel.push(trimArray(obj.matCompatibleModel)): [];
        !isEmpty(trimArray(obj.matColor)) ? this.query.matColor.push(trimArray(obj.matColor)): [];
        this.query.matCompatibleModel = flatten(this.query.matCompatibleModel)
        this.query.matColor = flatten(this.query.matColor)
      },

      filterMethod(val) {
        this.OptMatColor = this.matColor.filter(e => e.name.toLowerCase().indexOf(val.toLowerCase()) > -1).filter((v, i) => i < 20)
      },

      comModelFilter(val) {
        this.OptMatComBrand = this.matComBrand.filter(e => e.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
      },
      clearComBrand() {
        this.OptMatComBrand = this.matComBrand
      },

      BrandFilter(val) {
        this.OptMatBrand = this.matBrand.filter(e => e.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
      },
      clearBrand() {
        this.OptMatBrand = this.matBrand
      },

      matModelFilter(val) {
        this.OptMatModel = this.matModel.filter(e => e.name.toLowerCase().indexOf(val.toLowerCase()) > -1).filter((v, i) => i < 20)
      },

      async getOptMatComBrand() {
        const { data, code } = await QueryTbComMaterielData({ type: "matComBrand", value: "" ,isAuth:0})
        if (code == 0) {
          this.matComBrand = data.filter(x => !!Trim(x.name))
          this.OptMatComBrand = deepClone(this.matComBrand)
        }
      },

      async getOptMatBrand() {
        const { data, code } = await QueryTbComMaterielData({ type: "matBrand", value: "",isAuth:0 })
        if (code == 0) {
          this.matBrand = data.filter(x => !!Trim(x.name))
          this.OptMatBrand = deepClone(this.matBrand)
        }
      },
      async getOptMatModel() {
        const { data, code } = await QueryTbComMaterielData({ type: "matModel", value: "",isAuth:0 })
        if (code == 0) {
          this.matModel = data.filter(x => !!Trim(x.name))
          this.OptMatModel = this.matModel.filter((v, i) => i < 20)
        }
      },

      getOptMatColor() {
        QueryTbComMaterielData({ type: "matColor", value: "",isAuth:0 }).then(res => {
          if (res.code == 0) {
            this.matColor = res.data
            this.matColor.sort((a, b) => a.name.length - b.name.length)
            this.OptMatColor = this.matColor.filter((v, i) => i < this.right)
          }
        })
      },

      getOptMatSize() {
        QueryTbComMaterielData({ type: "matSize", value: "",isAuth:0 }).then(res => {
          if (res.code == 0) {
            this.OptMatSize = res.data.filter(x => !!x.name)
          }
        })
      },

      getOptMatPackQty() {
        QueryTbComMaterielData({ type: "matPackQty", value: "",isAuth:0 }).then(res => {
          if (res.code == 0) {
            this.OptMatPackQty = res.data.filter(x => !!Trim(x.name))
          }
        })
      },

      getOptMatCompatibleModel() {
        QueryTbComMaterielData({ type: "matCompatibleModel", value: "",isAuth:0 }).then(res => {
          if (res.code == 0) {
            this.OptMatCompatibleModel = res.data.filter(x => !!Trim(x.name))
          }
        })
      },

      getOptMatVerson() {
        QueryTbComMaterielData({ type: "matVerson", value: "",isAuth:0 }).then(res => {
          if (res.code == 0) {
            this.OptMatVerson = res.data.filter(x => !!Trim(x.name))
          }
        })
      },
    },
    mounted() {
      this.SelectMatCate();
      this.getOptMatComBrand()
      this.getOptMatBrand()
      this.getOptMatModel()
      this.getOptMatColor()
      this.getOptMatSize()
      this.getOptMatPackQty()
      this.getOptMatCompatibleModel()
      this.getOptMatVerson()
    }
  }
</script>