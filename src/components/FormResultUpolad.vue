
<template>
    <div class="upload">
         <v-card>
             <v-card-title  >
                <div id="dialog">
                    <v-icon
                    left
                    >
                    mdi-file-document-multiple-outline
                    </v-icon>
                        {{$t('Template Setting')}} : {{formName}} - {{versionNumber}}
                    <v-dialog
                        v-model="dialog"
                        persistent
                        max-width="600px"
                    >
                    <v-spacer></v-spacer>
                        <template v-slot:activator="{ on }">
                        <v-btn 
                            color="primary"
                            dark
                            v-on="on"
                            id="uploadBtn"
                        >
                            {{$t('uploadFile')}}
                        </v-btn>
                        </template>
                        <v-card>
                        <v-card-title>
                            <span class="headline">{{$t('uploadTemplate')}}</span>
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
                </div>
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
                    <template v-slot:note="data">
      
                        <noteBtn :dataItem="data.props.dataItem"
                        @edit="edit"
                        @save="save" 
                        @cancel="cancel"
                        ></noteBtn>
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
import noteBtn from './noteBtn'
//import store from "@/store.js";


export default {

    name: 'FormResultUpolad', 
  
    components: { 
                'grid':Grid,
                'noteBtn' : noteBtn,
              },

  data: function(){
      
        return{
        //destinationId:this.$route.params.id,
        dialog : false,
        columnMenu: true,
        file:null,
        jsonfile:null,
        columns: [
            { field: 'name', title:this.$i18n.t('name') },
            { field: 'isEnable', title:this.$i18n.t('isEnable'),editable:false },
            { field: 'createdUserName', title:this.$i18n.t('createdUser'),editable:false},
            { field: 'createdUserId', title:this.$i18n.t('createdUserId'),editable:false},
            { field: 'content', title:this.$i18n.t('content'), columnMenu:false },
            { field: 'id', title:this.$i18n.t('id') },
            { field: 'id', title:this.$i18n.t('id') },
        ],
        dataResult:[],
        //gridData: dataResult.map((dataEdit) => Object.assign({}, dataEdit)),
        rules: [
            v => !!v || 'File is required',
        ],
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
            console.log(e.field)
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
        let updateDataIndex = this.updatedData.findIndex(p => p.createdUserId === e.dataItem.createdUserId);
        this.updatedData.splice(updateDataIndex, 1, updated);
        
        
        let str = this.dataResult[index].note;
        let id = this.dataResult[index].id;
        const queryStr = toDataSourceRequestString(str);
        this.$API.api.main.documentReportTemplate.putNote(id,str)
        .then(res => {
            console.log("put successed");
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
    pageChangeHandler: function(event) {
            this.skip = event.page.skip;
            this.take = event.page.take;
            this.filter = event.page.filter;
            this.postData();
        },
    getData:function(){
        let vm = this;
        this.$API.api.main.formFormResultTemplate.get(this.formVersionId)
        .then(res => {
            vm.dataResult = res.data;
        })
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
        formdata.append('schema',text);
        console.log(vm.formVersionId);
        vm.$API.api.main.formFormResultTemplate.post(vm.formVersionId,formdata)            
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
        let name = "nameee";
        const queryStr = toDataSourceRequestString(name);
        let vm = this;
        console.log(vm.formVersionId);
        this.$API.api.main.formFormResultTemplate.post(vm.formVersionId,name)
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
    console.log('beforeCreate 被執行');
    
        
  },
  created(){
    console.log('created 被執行');
    this.getData();
    //this.postData();
      
  },
  beforeMount(){
        console.log('beforeMount 被執行');
  },
  mounted(){     
    console.log('mounted 被執行');
  },
  computed:{
      formVersionId(){
          return this.$route.params.formVersionId;
      },

  }
 }
</script>
<style>

#upload{
    text-align: left;
     padding: 25px 50px 75px 100px;
}
.parent p {
  color: #42b883;
}
#dialog{
    padding-right: 50px;
    /* float: right; */
}
#toolbar{
    padding:16px;
    font-size: 1.25rem
}
#uploadBtn{
    position: absolute;
    right:16px;
    margin-right: 0;
}


</style>
