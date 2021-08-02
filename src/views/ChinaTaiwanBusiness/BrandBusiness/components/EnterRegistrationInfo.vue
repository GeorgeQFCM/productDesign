<template>
  <el-dialog title="注册信息" :close-on-click-modal="false" :visible.sync="dialogVisible" width="50%">
    <el-form :model="dialogform" label-width="80px">
      <el-row class="borderShow">
        <el-form-item label="商标名称">
          <span>{{dialogform.trademark}}</span>
        </el-form-item>
        <el-form-item label="备注说明">
          <span>{{dialogform.remark}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="12" class="borderShow" style="height:350px">         
          <el-form-item label="注册国家">
            <el-select v-model="dialogform.country" filterable class="InpuClass">
              <el-option label="美国商标" value="美国商标"></el-option>
              <el-option label="加拿大商标" value="加拿大商标"></el-option>
              <el-option label="澳大利亚商标" value="澳大利亚商标"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商标大类">
            <el-select v-model="dialogform.MajorCategories" filterable class="InpuClass">
              <el-option label="第一类" value="第一类"></el-option>
              <el-option label="第二类" value="第二类"></el-option>
              <el-option label="第三类" value="第三类"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商标小类">
            <el-input type="textarea" v-model="dialogform.Subclass" :autosize="{ minRows:5, maxRows: 5}"
              class="InpuClass"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="borderShow" style="height:350px">
          <el-form-item label="代理机构">
            <el-select v-model="dialogform.Agency" filterable class="InpuClass">
              <el-option label="凯德盟" value="凯德盟" class="InpuClass"></el-option>
              <el-option label="数据从ERP来" value="ERP来"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司名">
            <el-select v-model="dialogform.CompanyName" filterable class="InpuClass">
              <el-option label="深圳市金畅进出口有限公司" value="深圳市金畅进出口有限公司"></el-option>
              <el-option label="深圳市百山川科技有限公司" value="深圳市百山川科技有限公司"></el-option>
              <el-option label="深圳市再鸣电子商务有限公司" value="深圳市再鸣电子商务有限公司"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="dialogform.address" class="InpuClass"></el-input>
          </el-form-item>
          <el-form-item label="法人(中文)">
            <el-input v-model="dialogform.LegalPersonC" class="InpuClass"></el-input>
          </el-form-item>
          <el-form-item label="法人(英文)">
            <el-input v-model="dialogform.LegalPersonE" class="InpuClass"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        dialogform: {
          trademark: "SiiuMaid",
          remark: "注册文字商标，第九类"
        },
        dialogVisible: false
      }
    },
    methods: {
      initData() {
        this.dialogVisible = true
      }
    }
  }
</script>
<style lang="less" scoped>
  .borderShow {
    border: 1px solid #e2e2e2;
    padding-left: 20px;
    padding-top: 10px;
    overflow: auto;
  }

  .InpuClass {
    width: 350px;
  }
</style>