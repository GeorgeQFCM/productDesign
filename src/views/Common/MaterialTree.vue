<template>
    <el-dialog :visible.sync="Visible" :close-on-click-modal="false" :show-close="false" class="CustomerRecordOrderDialog" width="30%">
        <div style="height:40px"> 
            <div style="display:inline;color:#027DB4;font-weight:bold">物料筛选</div>
                <div class="OperaBtn" style="display:inline">
                    <label
                    class="iconfont ebms_iconhold"
                    style="color:green"
                    title="保存"
                     @click="SaveBtn()"
                    ></label>
                    <label 
                    class="iconfont ebms_iconxingguanbi"
                    style="color:red"
                    title="关闭"
                    @click="CloseBtn()"
                    ></label>
            </div>
        </div>
        <el-tree 
          :accordion="true"
          node-key="id"
          ref="MaterialTree"
          highlight-current
          :props="defaultProps"
          :load="loadNode"
          lazy
          show-checkbox
          check-strictly
          accordion
          @check-change="orgCheckChange"
          v-if="MaterialDataTreeList !=='undefined' && MaterialDataTreeList.length >0 "
        ></el-tree>
    </el-dialog>
</template>

<script>

import {GetTreeName } from "@/api/Common"; //20200922 VanceLi 修改物料请求到Common 文件
// import {GetTreeName} from "@/api/permissionset/MaterialAllocation"; 
export default {
    data(){
        return{
            defaultProps: {
                id:"id",
                label: "label",
                children: "children"
            },
            RuleValue: [],
            Title:"",
            MaterialDataTreeList: [],
            selectOrg:{
                orgsid:[],
            }
        }
    },
    props: {
      Visible: {
          type: Boolean,  
      },
    },
    methods:{
        SaveBtn(){
            this.RuleValue=[];
            this.selectOrg.orgsid=[];
            this.$refs.MaterialTree.setCheckedKeys([]);
            this.$emit('ChildDialogHide',this.Title);
        },
        CloseBtn(){
            this.RuleValue=[];
            this.selectOrg.orgsid=[];
            this.$refs.MaterialTree.setCheckedKeys([]);
            this.$emit('ChildDialogHide',null);
        },
        orgCheckChange(data,checked,indeterminate){
            this.Title = data.id;

            const indexs = this.selectOrg.orgsid.indexOf(data.id);
            if(indexs<0 && this.selectOrg.orgsid.length===1 && checked){
                this.$message({
                    message:'您已选择物料节点！',
                    type:'error' 
                })
                //设置已选择的节点为false，很重要
                this.$refs.MaterialTree.setChecked(data,false);
            }else if(this.selectOrg.orgsid.length===0 && checked){
                //发现数组为空,并且已经选择
                //防止数组有值，首先清空，再PUSH
                this.selectOrg.orgsid=[];
                this.selectOrg.orgsid.push(data.id);
            }else if(indexs>=0 && this.selectOrg.orgsid.length===1 && !checked){
                this.selectOrg.orgsid=[];
            }
        },
        loadNode(node, resolve){
            if (node.level === 0) {
                return resolve(this.MaterialDataTreeList);
            }
            if (node.level === 1) {
                this.RuleValue = [];
                // 获取二级节点
                var value = "matCate='" + node.data.label + "'";
                var id = node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matOperateCate',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 2){
                // 获得三级级节点
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +node.data.label +"'";
                var id =this.RuleValue[0] +"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matComBrand',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 3){
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +this.RuleValue[1]+"'" +" and matComBrand='" +node.data.label+"'";
                var id =this.RuleValue[0] +"."+this.RuleValue[1]+"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matProName',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 4){
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +this.RuleValue[1]+"'" +" and matComBrand='" +this.RuleValue[2]+"' and matProName='" +node.data.label+"'";
                var id =this.RuleValue[0] +"."+this.RuleValue[1] +"."+this.RuleValue[2]+"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matBrand',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 5){
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +this.RuleValue[1]+"'" +" and matComBrand='" +this.RuleValue[2]+"' and matProName='" +this.RuleValue[3]+"' and matBrand='"+node.data.label+"'";
                var id =this.RuleValue[0] +"."+this.RuleValue[1] +"."+this.RuleValue[2]+"."+this.RuleValue[3]+"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matModel',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 6){
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +this.RuleValue[1]+"'" +" and matComBrand='" +this.RuleValue[2]+"' and matProName='" +this.RuleValue[3]+"' and matBrand='"+this.RuleValue[4]+"' and matModel='" +node.data.label+"'";
                var id =this.RuleValue[0] +"."+this.RuleValue[1] +"."+this.RuleValue[2]+"."+this.RuleValue[3]+"."+this.RuleValue[3]+"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matStyle',
                value,
                node.data.label,
                id,
                resolve
                );
            }
            if(node.level === 7){
                var value ="matCate='" +this.RuleValue[0] + "' and matOperateCate='" +this.RuleValue[1]+"'" +" and matComBrand='" +this.RuleValue[2]+"' and matProName='" +this.RuleValue[3]+"' and matBrand='"+this.RuleValue[4]+"' and matModel='" + this.RuleValue[5]+"' and matStyle='"+node.data.label+"'";
                var id =this.RuleValue[0] +"."+this.RuleValue[1] +"."+this.RuleValue[2]+"."+this.RuleValue[3]+"."+this.RuleValue[3]+"."+this.RuleValue[5]+"."+node.data.label;
                this.RuleValue.push(node.data.label);
                this.getChildrenNode(
                'matColor',
                value,
                node.data.label,
                id,
                resolve
                );
            }
        },
        //加载一级节点
        getCategorylist(type, val) {
            GetTreeName({ type: type, value: val })
                .then(response => {
                var obj = [];
                response.data.forEach(element => {
                    obj.push({
                    id: element.name,
                    children: [],
                    label: element.name
                    });
                });
                     this.MaterialDataTreeList = obj;
                })
                .catch(res => {});
        },
        getChildrenNode(type, val, label, id, resolve) {
            if(type !=undefined){
                GetTreeName({ type: type, value: val })
                .then(response => {
                var arr = [];
                response.data.forEach(element => {
                    arr.push({
                    id: id +"."+ element.name,
                    children: [],
                    label: element.name
                    });
                });
                this.childrenList = arr;
                resolve(this.childrenList);
                })
                .catch(res => {});
            }
        },
    },

}
</script>