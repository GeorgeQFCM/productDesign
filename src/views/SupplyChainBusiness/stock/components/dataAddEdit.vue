<template>
    <div>
      <el-dialog :title="title" :width="width"
                 :visible.sync="isShowVisible"
                 center :close-on-click-modal="false"
                 :before-close="() => $emit('close')">
        <el-card v-loading="isLoading">
          <el-form label-width="125px" :model="data" ref="data" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="平台:" prop="platform_name" id="platform_name">
                  <el-input v-model="data.platform_name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域:" prop="area" id="area">
                  <el-input v-model="data.area"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="物流方式:" prop="logistics_mode" id="logistics_mode">
                  <el-input v-model="data.logistics_mode"></el-input>
                </el-form-item>
              </el-col>

                            <el-col :span="12">
                <el-form-item label="物流天数:" prop="logistics_days" id="logistics_days">
                  <el-input v-model="data.logistics_days"></el-input>
                </el-form-item>
              </el-col>

                <el-col :span="12">
                <el-form-item label="创建时间:" prop="create_at" id="create_at">
                  <el-input v-model="data.create_at"></el-input>
                </el-form-item>
              </el-col>

                            
                <el-col :span="12">
                <el-form-item label="更新时间:" prop="update_at" id="update_at">
                  <el-input v-model="data.update_at"></el-input>
                </el-form-item>
              </el-col>


                        <el-col :span="12">
                <el-form-item label="更新人:" prop="update_by" id="update_by">
                  <el-input v-model="data.update_by"></el-input>
                </el-form-item>
              </el-col>


              
                        <el-col :span="12">
                <el-form-item label="创建人:" prop="create_by" id="create_by">
                  <el-input v-model="data.create_by"></el-input>
                </el-form-item>
              </el-col>



            </el-row>
          </el-form>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="saveData">保存</el-button>
          <el-button @click="$emit('close')">取消</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import LogisticsDayApi from '@/api/stock/LogisticsDayApi'
  export default {
    name: 'dataAddEdit',
    props:{
      width:{
        type:String,
        default:'60vw'
      },
      userId:{
        type:String,
      },
    },
    data(){
      return{
        title:this.$attrs.id?'编辑':'新增',
        isShowVisible:true,
        isLoading:false,
        rules:{
          platform_name: [{required: true, message: '请填写平台', tirgger: 'blur'}],
          area: [{required: true, message: '请填写区域', tirgger: 'blur'}],
          logistics_mode: [{required: true, message: '请填写物流方式', tirgger: 'blur'}],
        },
        data:{
          id:"",
          platform_name:"",
          area:"",
          logistics_mode:"",
        },
      }
    },
    
    async created(){
      this.isLoading = true
      let http = new LogisticsDayApi()
      console.log('this.$attrs.id :>> ', this.$attrs.id);

      if(this.$attrs.id){
        this.title = '编辑'
        let data = await http.detail({id:this.$attrs.id})
        this.data = data.data
        this.isLoading = false
      }else{
        this.isLoading = false
      }
    },
    methods:{
      saveData(){
        this.$refs['data'].validate((valid, object) => {
          if (valid) {
            const loading = this.$loading({
              lock: true,
              text: '请耐心等待.....',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            })
            let http = new LogisticsDayApi()
            
            if(this.$attrs.id){
              http.update({...this.data,"id":this.$attrs.id}).then(res => {
                loading.close()
                if(res.code === 200){
                  this.$message.success('保存成功!')
                  this.$emit('close')
                }else{
                  this.$message.error('保存失败!')
                }
              }).catch(e => {
                loading.close()
              })
            }else{
            http.add(this.data).then(res => {
                loading.close()
                if(res.code === 200){
                  this.$message.success('保存成功!')
                  this.$emit('close')
                }else{
                  this.$message.error('保存失败!')
                }
              }).catch(e => {
                loading.close()
              })
          } }else {
            let validArr = []
            Object.keys(object).forEach(function (key) {
              validArr.push(key)
            });
            let validVal = "#" + validArr[0];
            document.querySelector(validVal).scrollIntoView(true);
          }
        })
      },
    },
  }
</script>

<style scoped>

</style>
