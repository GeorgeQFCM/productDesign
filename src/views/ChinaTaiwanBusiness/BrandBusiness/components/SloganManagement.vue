<template>
  <el-dialog title="Slogan信息" :visible.sync="dialogVisible" width="70%" :close-on-click-modal="false">
    <el-form :model="dialogform" size="small">
      <el-form-item label="品牌名称">
        <span>SiiuMaid</span>
      </el-form-item>
    </el-form>
    <div>
      <el-input style="width:200px;margin-right:10px" size="small" v-model="edition"></el-input>
      <button class='bttn-fill bttn-md bttn-success' @click="newAdd">
        <svg-icon icon-class="add" />新增版本</button>
    </div>
    <el-table :data="tableData" border style="width: 100%" stripe size="small">

      <el-table-column prop="edition" label="Slogan版本" width="100" align="center">
      </el-table-column>
      <el-table-column prop="SloganE" label="Slogan（英文）" align="center">
        <template slot-scope="scope">
          <el-input type="textarea" size="mini" v-if="scope.row.isEdit" v-model="scope.row.SloganE" placeholder="请输入内容">
          </el-input>
          <span v-else>{{scope.row.SloganE}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="SloganC" label="Slogan（中文）" align="center">
        <template slot-scope="scope">
          <el-input type="textarea" size="mini" v-if="scope.row.isEdit" v-model="scope.row.SloganC" placeholder="请输入内容">
          </el-input>
          <span v-else>{{scope.row.SloganC}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="explain" label="构思说明" align="center">
        <template slot-scope="scope">
          <el-input type="textarea" size="mini" v-if="scope.row.isEdit" v-model="scope.row.explain" placeholder="请输入内容">
          </el-input>
          <span v-else>{{scope.row.explain}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="Slogan作者" width="100" align="center">
      </el-table-column>
      <el-table-column prop="time" label="最后更新时间" width="100" align="center">
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100" align="center">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"
            @click.native="setSwitch(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <button class='bttn-stretch bttn-md bttn-primary' @click="Edit(scope.row)">
            <svg-icon icon-class="Apply" /></button>
          <!-- <button class='bttn-stretch bttn-md bttn-danger' @click="del(scope.$index)">
            <svg-icon icon-class="delete" /></button> -->
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  import {
    parseTime,
    isEmpty
  } from '@/utils/index'
  export default {
    data() {
      return {
        dialogVisible: false,
        dialogform: {},
        tableData: [{
          edition: "一个版本",
          time: this.parseTime(new Date()),
          explain: "构思在心中",
          author: "一个狗子",
          SloganE: "Your will,my hands",
          SloganC: "我用双手成就你的梦想",
          isEdit: false,
          state: true

        }],
        edition: "",

      }
    },
    methods: {
      initData() {
        this.dialogVisible = true
      },
      newAdd() {
        if (isEmpty(this.edition)) {
          return this.$message.warning("请输入版本名称")
        }
        let flg = this.tableData.map(x => x.edition).includes(this.edition)
        if (flg) {
          return this.$message.warning("已存在该版本名称")
        }

        this.tableData.push({
          edition: this.edition,
          time: this.parseTime(new Date()),
          author: "一个大美女",
          explain: "",
          SloganE: "",
          SloganC: "",
          isEdit: true,
          state:true
        })
      },
      parseTime(data) {
        return parseTime(data, "{y}-{m}-{d}")
      },
      Edit(row) {
        row.isEdit = !row.isEdit
      },
      del(index) {
        console.log(index);
        this.tableData.splice(index, 1);
      },
      setSwitch(row) {
        let flg = !row.state
        console.log(flg);
        const text = row.state ? '启用' : '禁用'
        this.$confirm(`确定${text}吗？`, '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          row.state = !flg
        }).catch(() => {
          row.state = flg
        });
      },

    },

  }
</script>


<style>
  /* .imgUpload{
    height: 250px;
    max-height: 700px;
    overflow: auto;
} */
  .imgUpload .el-upload-dragger {
    width: 100px;
    height: 100px;
  }

  .imgUpload .el-upload-dragger .el-icon-upload {
    background-color: white;
    line-height: 0px;
    border: 0px;
    height: 40px;
    font-size: 40px;
  }

  .imgUpload .el-upload-dragger .el-upload__text {
    font-size: 12px;
  }
</style>
<style lang="less" scoped>
  /deep/ .el-upload {
    width: 100%;
    height: 100%;

    .el-upload-dragger {
      width: 100%;
      height: 100%;
    }
  }

  /deep/.el-dialog .el-dialog__body {
    height: 600px;
    overflow: auto;
  }



  // 拖拽
  .vue-draggable {
    display: flex;
    flex-wrap: wrap;

    .draggable-item {
      margin-right: 5px;
      margin-bottom: 5px;
      border: 1px solid #ddd;
      border-radius: 6px;
      position: relative;
      overflow: hidden;

      .el-image {
        width: 100%;
        height: 100%;
      }

      .shadow2 {
        position: absolute;
        bottom: 50%;
        right: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 1;
        transition: opacity 0.3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
      }

      .shadow {
        position: absolute;
        top: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
        transition: opacity 0.3s;
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        padding: 2px;
        cursor: pointer;
      }

      &:hover {
        .shadow {
          opacity: 1;
        }

        .shadow2 {
          opacity: 1;
        }
      }
    }

    &.hideShadow {
      .shadow {
        display: none;
      }

      .shadow2 {
        display: block;
      }
    }

    &.single {
      overflow: hidden;
      position: relative;

      .draggable-item {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }

    &.maxHidden {
      .uploadBox {
        display: none;
      }
    }
  }

  // el-image
  .el-image-viewer__wrapper {
    .el-image-viewer__mask {
      opacity: 0.8;
    }

    .el-icon-circle-close {
      color: #fff;
    }
  }
</style>