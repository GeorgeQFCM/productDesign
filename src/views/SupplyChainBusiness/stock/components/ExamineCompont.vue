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
            <h4>这是{{item.sysAuditPerName}}的审批</h4>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="a1" label="申请备货数量" align="center">
              </el-table-column>
              <el-table-column prop="a2" label="申请审核说明" align="center">
              </el-table-column>
              <el-table-column prop="a3" label="本次采购数量" align="center">
              </el-table-column>
              <el-table-column prop="a4" label="本次采购建议运输方式" align="center">
              </el-table-column>
              <el-table-column prop="a5" label="本次采购说明" align="center">
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
    name: 'ExamineCompont',
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
        tableData: [{
          a1: '100',
          a2: '这是申请审核说明',
          a3: '500',
          a4: '海运',
          a5: '这是一段采购说明'
        }, {
          a1: '100',
          a2: '这是申请审核说明',
          a3: '500',
          a4: '海运',
          a5: '这是一段采购说明'
        }, {
          a1: '100',
          a2: '这是申请审核说明',
          a3: '500',
          a4: '海运',
          a5: '这是一段采购说明'
        },]
      }
    }
  }
</script>


<style>
  .vl-notify.vl-notify-iframe {

    z-index: 9999 !important;
  }
</style>