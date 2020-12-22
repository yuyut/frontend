
<template>
    <div class="upload">
         <v-card class="px-5 py-4">
             <v-card-title class="v-card__title px-0">
                    <v-icon
                    left
                    class:="pr-3"
                    >
                    mdi-file-document-multiple-outline
                    </v-icon>
                        {{$t('flow.dataGrid.formName')}} : {{formName}} - {{versionNumber}}
                    
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
                            @click="dialog=true"
                        >
                            {{$t('flow.form.add')}}
                        </v-btn>
                        </template>
                        </v-tooltip>
                        <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="600px"
                    >
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{$t('form.dataGrid.uploadFile')}}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-file-input 
                            v-model="file"
                            :rules="rules"
                            id="docfile"
                            type="file"
                            accept=".doc,.docx"
                            label="File input (doc file)"
                            ></v-file-input>
                            <v-file-input 
                            :rules="rules"
                            v-model="jsonfile"
                            id="json"
                            type="file"
                            accept=".json"
                            label="File input (Json file)"
                            ></v-file-input>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false;"
                            >
                            {{$t('close')}}
                            </v-btn>
                            <v-btn
                            :disabled="buttonDisable()"
                            color="blue darken-1"
                            text
                            @click="dialog = false; myUpload();"
                            >
                            {{$t('save')}}
                            </v-btn>
                        </v-card-actions>
                        </v-card>
                    </v-dialog>    
            </v-card-title>
            <v-card-text class="pa-0">
                <grid             
                    :style="{height: '680px'}"
                    :data-items="dataResult"
                    :columns="columns"
                    :column-menu="columnMenu"
                    :pageable="pageable"
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
                    <template v-slot:note="data">    
                        <noteBtn :dataItem="data.props.dataItem"
                        @edit="edit"
                        @save="save" 
                        @cancel="cancel"
                        ></noteBtn>
                    </template>
                    <template v-slot:aa="data">
                        <customeButton :formVersionId="formVersionId"  :id="data.props.dataItem.id" :currentId="parentCurrentId" @change="changeCurrentId" > </customeButton>
                    </template>
                    <template v-slot:day="data">
                        <td ><sb-ui-time-cell :time="data.props.dataItem.createdDate" /></td>
                    </template>
                      <template v-slot:name="data">
                        <td>
                            <UserMenu :userInfo="{id:data.props.dataItem.createdUserId,name:data.props.dataItem.createdUserName,email:a }" />
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
import custome from './customCell.vue';
import { Grid,filterGroupByField } from '@progress/kendo-vue-grid';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
import moment from 'moment'
import noteBtn from './noteBtn'
import UserMenu from './SystemUserMenu'
//import store from "@/store.js";


export default {

    name: 'UploadFile', 
  
    components: { 
                'grid':Grid,
                'customeButton':custome,
                'noteBtn' : noteBtn,
                'UserMenu' : UserMenu
              },
    props: {
        formVersionId:{
            type:String,
            //default:'51bb96ec-30e2-4697-869c-94c47b43cc14'
        },
    },

  data: function(){
      
    
        return{
        //destinationId:this.$route.params.id,
        dialog : false,
        columnMenu: true,
        file:null,
        jsonfile:null,
        pageable: {
            buttonCount: 5,
            info: true,
            type: 'numeric',
            pageSizes: true,
            previousNext: true
            },
        dataResult:[],
        //gridData: dataResult.map((dataEdit) => Object.assign({}, dataEdit)),
        rules: [
            v => !!v || 'Required Content',
        ],
        total:null,
        skip: 0,
        take: 10,
        sort: [
                { field: 'createdDate', dir: 'desc' }
                ],
        filter: null,
        parentCurrentId:null,
        formName:null,
        versionNumber:null,
        inEdit:true,
        updatedData: [],
    }
  },
  methods:{

    itemChange: function (e) {
        if (e.dataItem.id) {
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let updated = Object.assign({},this.dataResult[index], {[e.field]:e.value});
            this.dataResult.splice(index, 1, updated);
        } else {
              return;
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
        let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
        let item = this.dataResult[index];
        let updated = Object.assign(this.update(this.dataResult.slice(), item), {inEdit:undefined});
        this.dataResult.splice(index, 1, updated);
        let updateDataIndex = this.updatedData.findIndex(p => p.id === e.dataItem.id);
        this.updatedData.splice(updateDataIndex, 1, updated);
        
        
        let str = this.dataResult[index].note;
        let id = this.dataResult[index].id;
        const queryStr = toDataSourceRequestString(str);
        this.$API.api.main.documentReportTemplate.putNote(id,str)
        .then(res => {
        })
        .catch(function (error) {
            console.log(error);
        });
    }, 
    cancel(e) {
        if (e.dataItem.id) {
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let updateDataIndex = this.updatedData.findIndex(p => p.id === e.dataItem.id);
            let updated = Object.assign(this.updatedData[updateDataIndex], {'inEdit': undefined});
            this.dataResult.splice(index, 1, updated);} 
    },
    formData(){
    let vm=this;
    this.$API.api.main.formVersion.get(vm.formVersionId)
        .then(res => {
            vm.parentCurrentId = res.data.appliedDocumentReportTemplateId;
            vm.versionNumber = res.data.versionNumber;
            vm.formName=res.data.formName;
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
    checkParentCurrentId(){
        let vm=this;
        this.$API.api.main.formVersion.get(this.formVersionId)
        .then(res => {
            vm.parentCurrentId = res.data.appliedDocumentReportTemplateId;
            vm.versionNumber = res.data.versionNumber;
            vm.formName=res.data.formName;
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    changeCurrentId(id){
        this.parentCurrentId=id;
    },
    pageChangeHandler: function(event) {
            this.skip = event.page.skip;
            this.take = event.page.take;
            this.filter = event.page.filter;
            this.postData();
        },
    getData:function(){
        this.$API.api.main.formVersionDocumentReportTemplate.get(this.formVersionId);
    },

    myUpload:function(){
        var file = this.file;    //name = file
        var json = this.jsonfile;    //name = schema
        var formdata = new FormData();
        formdata.append('file',file);
        let abc = this;
        var text = new String();
        var reader = new FileReader();
        reader.readAsText(json);
        let vm = this;
        reader.onload=function () { 
        text=reader.result;
        formdata.append('schema',text);;
        vm.$API.api.main.formVersionDocumentReportTemplate.post(vm.formVersionId,formdata)            
        .then(res => {
            vm.postData();      
        })
        .catch(function (error) {
            console.log(error);
        });
        }
         

    },
    postData:function(){
        let state = {   take: this.take,
                        skip: this.skip,
                        filter: this.filter,
                        sort: this.sort
                         };
        const queryStr = toDataSourceRequestString(state);
        let vm = this;
        this.$API.api.main.formVersionDocumentReportTemplate.all(this.formVersionId,queryStr)
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
    this.postData();
    this.formData();
    this.checkParentCurrentId();
      
  },
  beforeMount(){
    //this.formData();
  },
  mounted(){     
    //this.formData();
  },
  computed:{

        columns(){
            return [
            { title: this.$i18n.t('form.actions.apply'), cell:"aa", width:'120px',editable:false, columnMenu:false }, 
            { field: 'createdDate', title:this.$i18n.t('form.dataGrid.createdTime'),filter: 'numeric',cell:"day",editable:false },
            { field: 'createdUserName', title:this.$i18n.t('form.dataGrid.createdUser'),editable:false,cell:'name'},
            { field: 'fileName', title:this.$i18n.t('panorama.file_name'),editable:false},
            { field: 'note', title:this.$i18n.t('company.note'), columnMenu:false },
            { title: this.$t('flow.actions.edit'),  cell:"note" , width:'150px',filterable:false, sortable: false, columnMenu:false },
            ]
        }
  }
 }
</script>
<style scoped>

#upload{
    text-align: left;

}
.parent p {
  color: #42b883;
}

#toolbar{
    padding:16px;
    font-size: 1.25rem
}



</style>
