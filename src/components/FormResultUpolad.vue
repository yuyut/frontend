<template>
    <div class="upload">
         <v-card>
             <v-card-title class="v-card__title" >
                    <v-icon
                    left
                    class:="pr-3"
                    >
                    mdi-file-document-multiple-outline
                    </v-icon>
                        {{$t('sidebar.form.companyForms')}} : {{realformName}} 
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                    <span>{{this.$t('form.form.add')}}</span>
                    <template v-slot:activator="{ on}">
                    <v-btn 
                       color="primary"
                        dark
                        outlined
                        v-on="on"
                        class:="px-3"
                        @click='addRecord'
                    >
                        {{$t('form.form.add')}}
                    </v-btn>
                    </template>
                    </v-tooltip>
            </v-card-title>
            <v-card-text>
                <grid 
                    :style="{height: '680px'}"
                    :data-items="dataResult"
                    :columns="columns"
                    :column-menu="columnMenu"
                    :pageable="true"
                    :skip= "skip"
                    :take="take"
                    :total="total"
                    :sortable="true"
                    :sort= "sort"
                    :resizable = "true"
                    :filter="filter"
                    :edit-field="'inEdit'"
                    @filterchange = "filterChange"
                    @pagechange="pageChangeHandler"
                    @sortchange="sortChangeHandler"
                    @itemchange="itemChange"
                    >
                    <template v-slot:change="data">
                        <change :dataItem="data.props.dataItem"
                        @edit="edit"
                        @save="save" 
                        @cancel="cancel"
                        @checkTemplate="checkTemplate"
                        :showRender="showRender"
                        :gotSchema="gotSchema"
                        :formComponents="schema"
                        :defaultResult="currentTemplateResult"
                        ></change>
                    </template>
                    <template v-slot:isEnable="data">
                        <td >
                        <v-checkbox :label="$t('project.isEnable')" small v-model="data.props.dataItem.isEnable" :disabled ="(!isAdd &&data.props.dataItem.inEdit )? false : true"></v-checkbox>
                        </td>
    
                    </template>
                    <template v-slot:name="data">
                        <td>
                            <UserMenu :userInfo="{id:data.props.dataItem.createdUserId,name:data.props.dataItem.createdUserName }" />
                        </td>
                    </template>
                </grid> 
                </v-card-text>
        </v-card> 

     
    </div>
</template>
<script>
import VueI18n from 'vue-i18n'
import axios from 'axios';
import { Grid,filterGroupByField } from '@progress/kendo-vue-grid';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
import moment from 'moment'
import change from './noteBtnWithPreview'
import UserMenu from './SystemUserMenu'

//import store from "@/store.js";


export default {

    name: 'FormResultUpolad', 
  
    components: { 
                'grid':Grid,
                'change' : change,
                'UserMenu' : UserMenu
              },
     props: {
        formId: {
            type:String,
            default:'88787421-5690-451e-a1ed-e41797d0d822'
        },
    },
    data: function(){
        
    return{
        gotSchema : false,
        showRender : false,
        templatesResult:[],
        currentId:null,
        schema:null,
        currentTemplateResult:[],
        realformName:null,
        isAdd:false,
        //destinationId:this.$route.params.id,
        columnMenu: true,
        columns: [
            { field: 'name', title:this.$t('panorama.name') },
            { field: 'isEnable', title:this.$t('company.is_enable'), editable:false,cell:"isEnable" },
            { field: 'createdUserName', title:this.$t('form.dataGrid.createdUser'), editable:false,cell:"name"},
            { title: this.$t('flow.actions.edit'),  cell:"change" , width:'180px',filterable:false, sortable: false, columnMenu:false },
        ],
        dataResult:[],
        //gridData: dataResult.map((dataEdit) => Object.assign({}, dataEdit)),
        rules: [
            v => !!v || 'Required Content',
        ],
        sort: [
                { field: 'createdDate', dir: 'desc' }
                ],
        total:null,
        skip: 0,
        take: 5,
        filter: null,
        parentCurrentId:null,

        versionNumber:null,
        inEdit:true,
        updatedData: [],
    }
  },
  methods:{
    getJsonConfig(e) {
    e.headers['Content-Type'] = "application/json;charset=UTF-8"
    return e
  },
    async formSave(){
        var result = await this.$refs.formRender.getSubmiton();
        var resultJson = await JSON.stringify(result);
        var resultJson2 = JSON.stringify(resultJson);
        this.$API.api.main.formResultTemplate.putContent(this.currentId, resultJson2, APICONFIG.getJsonConfig)
            .catch(function (error) {
                console.log(error);
            });      
    },
    checkTemplate(e){
        let vm = this;
        this.currentId=e.dataItem.id;
        this.$API.api.main.formResultTemplate.get(this.currentId)
            .then(res => {
                vm.currentTemplateResult=res.data.content;
                vm.showRender = true;
            })
        .catch(function (error) {
            console.log(error);
        });      
    },
    
    getSchema(){
        let vm = this;
        this.$API.api.main.form.get(vm.formId,true)
            .then(res => {
            vm.schema = res.data.currentAppliedSchema.components;
            vm.gotSchema = true;
        })
        .catch(function (error) {
            console.log(error);
        });
        
    },
    formName(){
        let vm = this;
        this.$API.api.main.form.get(this.formId)
            .then(res => {
            vm.realformName = res.data.name;
        })
        .catch(function (error) {
            console.log(error);
        });
        
    },
    addRecord() {
        this.isAdd=true;
        const dataItem = { inEdit: true };
        this.dataResult.splice(0, 0, dataItem);

    },
    itemChange: function (e) {
        if (e.dataItem.id) {
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let updated = Object.assign({},this.dataResult[index], {[e.field]:e.value});
            this.dataResult.splice(index, 1, updated);
        } else {
              e.dataItem[e.field] = e.value;
        }
    },
    update(data, item) {
        let updated;
        let index = data.findIndex(p => item.id && p.id === item.id);
            updated = Object.assign({}, item);
            data[index] = updated;
        return data[index];
    },
    edit: function (e) {
        let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
        let updated = Object.assign({},this.dataResult[index], {inEdit:true});
        this.dataResult.splice(index, 1, updated);
    },
    save: function(e) {
        if (e.dataItem.id!=undefined){ //edit existed item
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let item = this.dataResult[index];
            let updated = Object.assign(this.update(this.dataResult.slice(), item), {inEdit:undefined});
            this.dataResult.splice(index, 1, updated);
            let updateDataIndex = this.updatedData.findIndex(p => p.id === e.dataItem.id);
            this.updatedData.splice(updateDataIndex, 1, updated);
            let vm = this;
            this.$API.api.main.formResultTemplate.put(this.dataResult[index].id,this.dataResult[index])
            .then(res => {
                vm.postData();
            })
            .catch(function (error) {
                console.log(error);
            });
            
        }
        else{ //save new item
            const newRecord = e.dataItem;
            const data = this.dataResult.slice();
            this.dataResult = data;
            let vm = this;
            this.$API.api.main.formFormResultTemplate.post(this.formId,this.dataResult[0].name)
            .then(res => {
                vm.postData();
            })
            .catch(function (error) {
                    console.log(error);
            });
        }
        this.isAdd=false;
    }, 
    cancel(e) {
        if (e.dataItem.id!=undefined) {
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let updateDataIndex = this.updatedData.findIndex(p => p.id === e.dataItem.id);
            let updated = Object.assign(this.updatedData[updateDataIndex], {'inEdit': undefined});
            this.dataResult.splice(index, 1, updated);} 
        else{
            this.dataResult.splice(0, 1)
        }
        this.isAdd=false;
    },
    formData(){
    let vm=this;
    this.$API.api.main.formVersion.get(vm.formId)
        .then(res => {
            vm.parentCurrentId = res.data.appliedDocumentReportTemplateId;
            vm.versionNumber = res.data.versionNumber;
        })
        .catch(function (error) {
                console.log(error);
        });
    },
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm:ss');
        return time;
    },
    filterChange:function (event) {
    let isColumnActive = filterGroupByField(event.event.field, event.filter);
    // @ts-ignore
    let changedColumn = this.columns.find(function(column) {
        return column.field === event.event.field;
    });
    if (changedColumn) {
        changedColumn.headerClassName = isColumnActive ? 'active' : '';
    }
    this.filter = event.filter;
    this.postData();
    },
    sortChangeHandler: function(e) {
        this.sort = e.sort;
        this.postData();
    },
   
    buttonDisable(){
        if(!!this.file&&!!this.jsonfile)
            return false;
        else 
            return true;
    },
    pageChangeHandler: function(event) {
            this.skip = event.page.skip;
            this.take = event.page.take;
            this.filter = event.page.filter;
            this.postData();
        },
    // getData:function(){
    //     let vm = this;
    //     this.$API.api.main.formFormResultTemplate.get(this.formId)
    //     .then(res => {
    //         vm.dataResult = res.data;
    //         vm.updatedData = JSON.parse(JSON.stringify(res.data));
    //     })
    // },

    myUpload:function(){
        vm.$API.api.main.formFormResultTemplate.post(vm.formId,name,data)            
        .then(res => {
            vm.postData();      
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    postData:function(){        //fetch kendo grid
        let state = {   take: this.take,
                        skip: this.skip,
                        filter: this.filter,
                        sort: null
                         };
        let name = "nameee";
        const queryStr = toDataSourceRequestString(state);
        let vm = this;
        this.$API.api.main.formFormResultTemplate.all(this.formId,queryStr)
            .then(res => {
            vm.dataResult = res.data.data;
            vm.total=res.data.total;
            vm.updatedData = JSON.parse(JSON.stringify(res.data.data));
        })
        .catch(function (error) {
            console.log(error);
        });
    },

},
    beforeCreate() {
        
    },
    created(){   
        this.getSchema();
         this.formName();
 
    },
    beforeMount(){
    },
    mounted(){     
        this.postData();
    },
    computed:{
    // formId(){
    //     return this.$route.params.formId;
    //   },
    
    }
 }
</script>
<style>


#upload{
    text-align: left;
}
.parent p {
  color: #42b883;
}
#toolbar{
    font-size: 1.25rem
}
#addnew{
    position: absolute;
    right:16px;
    top:16px;
    margin-right: 0;
}


</style>
