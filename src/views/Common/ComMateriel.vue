<template>
  <el-row>
    <el-form :inline="true" :model="query" ref="queryMat">
      <el-row>
        <el-form-item prop="matCate" size="small">
          <el-select placeholder="选择类目" v-model="query.matCate[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatCate" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matOperateCate" size="small">
          <el-select placeholder="选择运营大类" v-model="query.matOperateCate[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptOperateCate" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matProName" size="small">
          <el-select placeholder="选择产品名称" v-model="query.matProName[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatProName" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matStyle" size="small">
          <el-select placeholder="选择款式" v-model="query.matStyle[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatStyle" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matMainMaterial" size="small">
          <el-select placeholder="选择主材料" v-model="query.matMainMaterial[0]" filterable clearable style="width:150px;">
            <el-option v-for="item in OptMatMainMaterial" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
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
          <el-select placeholder="选择公司品牌" v-model="query.matComBrand[0]" clearable filterable style="width:150px;">
            <el-option v-for="item in OptMatComBrand" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matBrand" size="small">
          <el-select placeholder="选择适用品牌或对象" v-model="query.matBrand[0]" clearable filterable style="width:150px;">
            <el-option v-for="item in OptMatBrand" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matModel" size="small">
          <el-select placeholder="选择型号" v-model="query.matModel[0]" clearable filterable style="width:150px;">
            <el-option v-for="item in OptMatModel" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matColor" size="small">
          <el-select placeholder="选择颜色" multiple collapse-tags v-model="query.matColor" filterable style="width:150px;"
            clearable>
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
          <el-select placeholder="选择适用机型" multiple collapse-tags v-model="query.matCompatibleModel" filterable clearable
            style="width:150px;">
            <el-option v-for="item in OptMatCompatibleModel" :key="item.name" :label="item.name" :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matVerson" size="small">
          <el-select placeholder="选择版本" v-model="query.matVerson[0]" style="width:150px;" filterable clearable>
            <el-option v-for="item in OptMatVerson" :key="item.name" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="matSPUCode" size="small">
          <el-input placeholder="SPU/物料编码" v-model="matSPUCode" style="width: 310px;" clearable>
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
        isAuth: ""
      }
    },


  }
</script>