<!--
 * @Description: 
 * @Date: 2021-05-10 09:53:01
-->
<template>
  <section>
    <div class="block">
      <el-timeline>
        <el-timeline-item v-for="item in info" :key="item.sysAuditID"
          :timestamp="item.sysAuditCreateDate | dateFormat('YYYY/MM/DD')" placement="top">
          <el-card style="width:40vw">
            <h4>这是{{item.sysAuditPerName}}的编辑操作</h4>
            <el-table :data="item.tableData" style="width: 100%" size="mini">
              <el-table-column prop="a1" label="期初应收金额" align="center">
              </el-table-column>
              <el-table-column prop="a2" label="实际收款金额" align="center">
              </el-table-column>
              <el-table-column prop="a3" label="回款日期" align="center">
              </el-table-column>
            </el-table>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'ExamineCompont11',
    props: {
      //本弹窗的id
      layerid: {
        type: String,
        default: ""
      },
      //父组件的data
      laydata: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //父组件传值
      info: {
        type: Array,
        default: () => {
          return [];
        }
      },
    },
    data() {
      return {
        
      }
    }
  }
</script>


<style>
  .vl-notify.vl-notify-iframe {

    z-index: 9999 !important;
  }
</style>