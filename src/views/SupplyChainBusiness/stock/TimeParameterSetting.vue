<template>

  <div>
    <FloatBall ref="FloatBall" :RecordForm="RecordForm"></FloatBall>
    <el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>日常备货流程时间点设置</span>
              <button style="float: right; padding: 3px 0" class='bttn-stretch bttn-md bttn-success'>保存</button>
            </div>
            <div class="text item">
              <el-form ref="form" :model="form" label-width="170px">
                <el-form-item label="运营人员：">
                  <el-select v-model="form.OperatorsDay" class="settingClass" style="width:150px" placeholder="请选择天数">
                    <el-option label="第一天" value="第一天"></el-option>
                    <el-option label="第二天" value="第二天"></el-option>
                  </el-select>
                  <el-time-picker class="settingClass" v-model="form.OperatorsTime"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="时间点" style="width:220px">
                  </el-time-picker>
                  <el-select v-model="form.OperatorsDeafult" class="settingClass" style="width:220px"
                    placeholder="请选择默认审核结果">
                    <el-option label="不备货" value="不备货">
                      <span style="float: left">不备货</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[不备货]='0'</span>
                    </el-option>
                    <el-option label="通过" value="通过">
                      <span style="float: left">通过</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[通过]='申请值'</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="产品线负责人：">
                  <el-select v-model="form.ProductDay" class="settingClass" style="width:150px" placeholder="请选择天数">
                    <el-option label="第一天" value="第一天"></el-option>
                    <el-option label="第二天" value="第二天"></el-option>
                  </el-select>
                  <el-time-picker class="settingClass" v-model="form.ProductTime"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="时间点" style="width:220px">
                  </el-time-picker>
                  <el-select v-model="form.ProductDeafult" class="settingClass" style="width:220px"
                    placeholder="请选择默认审核结果">
                    <el-option label="不备货" value="不备货">
                      <span style="float: left">不备货</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[不备货]='0'</span>
                    </el-option>
                    <el-option label="通过" value="通过">
                      <span style="float: left">通过</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[通过]='申请值'</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Team主管：">
                  <el-select v-model="form.TeamDay" class="settingClass" style="width:150px" placeholder="请选择天数">
                    <el-option label="第一天" value="第一天"></el-option>
                    <el-option label="第二天" value="第二天"></el-option>
                  </el-select>
                  <el-time-picker class="settingClass" v-model="form.TeamTime"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="时间点" style="width:220px">
                  </el-time-picker>
                  <el-select v-model="form.TeamDeafult" class="settingClass" style="width:220px"
                    placeholder="请选择默认审核结果">
                    <el-option label="不备货" value="不备货">
                      <span style="float: left">不备货</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[不备货]='0'</span>
                    </el-option>
                    <el-option label="通过" value="通过">
                      <span style="float: left">通过</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[通过]='申请值'</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="事业部经理：">
                  <el-select v-model="form.DeptDay" class="settingClass" style="width:150px" placeholder="请选择天数">
                    <el-option label="第一天" value="第一天"></el-option>
                    <el-option label="第二天" value="第二天"></el-option>
                  </el-select>
                  <el-time-picker class="settingClass" v-model="form.DeptTime"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="时间点" style="width:220px">
                  </el-time-picker>
                  <el-select v-model="form.DeptDeafult" class="settingClass" style="width:220px"
                    placeholder="请选择默认审核结果">
                    <el-option label="不备货" value="不备货">
                      <span style="float: left">不备货</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[不备货]='0'</span>
                    </el-option>
                    <el-option label="通过" value="通过">
                      <span style="float: left">通过</span>
                      <span style="float: right; color: #8492a6; font-size: 13px">[通过]='申请值'</span>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="计划部：">
                  <el-select v-model="form.PlanDay" class="settingClass" style="width:150px" placeholder="请选择天数">
                    <el-option label="第一天" value="第一天"></el-option>
                    <el-option label="第二天" value="第二天"></el-option>
                  </el-select>
                  <el-time-picker class="settingClass" v-model="form.PlanTime"
                    :picker-options="{selectableRange: '00:00:00 - 23:59:00'}" placeholder="时间点" style="width:220px">
                  </el-time-picker>
                  <el-select v-model="form.PlanDeafult" class="settingClass" style="width:220px"
                    placeholder="请选择默认审批处理结果">
                    <el-option label="通过" value="通过">
                    </el-option>
                    <el-option label="不通过" value="不通过">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>预警天数设置</span>
              <button style="float: right; padding: 3px 0" class='bttn-stretch bttn-md bttn-success'>保存</button>
            </div>

            <el-form>
              <el-form-item label-width="170px" label="可售天数">
                <el-input style="width:200px;" v-model="KSday">
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>备货天数设置</span>
              <button style="float: right; padding: 3px 0" class='bttn-stretch bttn-md bttn-success'>保存</button>
            </div>
            <el-form :model="stockDaysFrom">
              <el-form-item label-width="170px" label="订单处理天数">
                <el-input style="width:200px;" v-model="stockDaysFrom.orderDays">
                </el-input>
              </el-form-item>
              <el-form-item label-width="170px" label="海外仓处理天数">
                <el-input style="width:200px;" v-model="stockDaysFrom.overseasDays">
                </el-input>
              </el-form-item>
              <el-form-item label-width="170px" label="国内仓处理天数">
                <el-input style="width:200px;" v-model="stockDaysFrom.domesticDays">
                </el-input>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {},
        KSday: "15",
        RecordForm: {
          product: "刘润涛",
          author: "庄全发",
          startTime: "2021-06-28",
          endTime: "2021-06-28",
          describe: "第一版",
        },
        stockDaysFrom: {}
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settingClass {
    margin-right: 10px;
  }
</style>