<template>
  <section>
    <el-dropdown trigger="click" ref="dllTable" placement="bottom">
      <span class="el-dropdown-link">
        <el-badge class="mark" :value="selectedCount" type="primary">
          <el-input type="text" :value="showContent" :placeholder="placeholder" suffix-icon="el-icon-arrow-down" disabled></el-input>
        </el-badge>
      </span>
      <el-dropdown-menu slot="dropdown" class="Selecteddropdown">
        <el-card class="box-card" shadow="never" style="width: 700px;">
          <div slot="header" style="float:left;margin:5px 0px 0px 10px">
            <el-checkbox v-model="MAchecked" @change="MAchange">MA</el-checkbox>
            <el-checkbox v-model="FAchecked" @change="FAchange">FA</el-checkbox>
          </div>
          <div slot="header" style="float:right;">
            <el-button type="success" size="mini" icon="el-icon-check" @click="handelDefine"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-close" @click="handelCancel"></el-button>
          </div>
          <el-row>
            <el-table ref="dataList" :data="dataList" border style="width: 100%;" size="small" tooltip-effect="dark" highlight-current-row fit>
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <el-table-column label="序号" type="index" align="center"></el-table-column>
              <el-table-column v-for="column in columns" :key="column.key" :v-show="!column.hidden" :label="column.key" :prop="column.val" align="center" min-width="100px"></el-table-column>
            </el-table>
          </el-row>
        </el-card>
      </el-dropdown-menu>
    </el-dropdown>
  </section>
</template>

<script>
  import { GetSkuTypePagePrice } from "@/api/rulebase/StandardParameter";
  export default {
    data() {
      return {
        selectedCount: 0, //选中的行数
        selectedText: "", //选中后展示的文本
        titleName: "", //标题
        showContent: "",
        placeholder: "",
        showKey: [], //展示数据集合中的列名
        columns: [{ key: "", val: "", hiden: false }], //绑定的列与值
        dataList: [], //列表的数据
        MAchecked: false,
        FAchecked: false
      }
    },
    methods: {
      MAchange() {
        GetSkuTypePagePrice({ MAchecked: this.MAchecked, FAchecked: this.FAchecked }).then(res => { this.dataList = res.data })
      },
      FAchange() {
        GetSkuTypePagePrice({ MAchecked: this.MAchecked, FAchecked: this.FAchecked }).then(res => { this.dataList = res.data })
      },
      handelDefine() {
        const rows = this.$refs.dataList.selection;
        if (rows.length > 0) {
          for (let index = 0; index < this.showKey.length; index++) {
            const element = this.showKey[index];
            if (this.selectedText == "") {
              this.selectedText = rows[0][element]
            } else {
              this.selectedText = this.selectedText + "-" + rows[0][element];
            }
          }
        } else {
          this.selectedText = ""
          this.showContent = ""
        }
        if (this.showContent == "") {
          this.showContent = this.titleName + ' ' + this.selectedText;
        }
        this.selectedCount = rows.length;
        this.$refs.dllTable.hide();
        if (this.$listeners['cbFun']) {
          this.$emit('cbFun', rows);
        }
      },
      handelCancel() {
        this.selectedText = "";
        this.showContent = ""
        this.selectedCount = 0;
        this.$refs.dllTable.hide();
        this.$refs.dataList.clearSelection();
        if (this.$listeners['cbFun']) {
          this.$emit('cbFun', this.$refs.dataList.selection);
        }
      },
      init(dataList, columns, showKey, titleName, placeholder) {
        this.dataList = dataList;
        this.columns = columns;
        this.showKey = showKey;
        this.titleName = titleName;
        this.placeholder = placeholder;
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>