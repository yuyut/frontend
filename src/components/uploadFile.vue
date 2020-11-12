
<template>
    <div class="upload">
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
            @filterchange = "filterChange"
            @pagechange="pageChangeHandler"
            @sortchange="sortChangeHandler">
        <grid-toolbar>
            <div id="dialog">
                <v-row justify="center">
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                >
                    <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        dark
                        v-on="on"
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
                        @click="dialog = false;myUpload();"
                        >
                        {{$t('save')}}
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
                </v-row>       
            </div>
        </grid-toolbar>
            <template v-slot:aa="data">
                <customeButton :dataItem="data" :id="data.props.dataItem.id" :currentId="parentCurrentId" @change="changeCurrentId" >YESSelect </customeButton>
            </template>
        </grid>         
    </div>
</template>
<script>
import VueI18n from 'vue-i18n'
import axios from 'axios';
import custome from './customCell.vue';
import { Grid,filterGroupByField } from '@progress/kendo-vue-grid';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
//import store from "@/store.js";

const formVersionId='2778a5f3-1024-4c97-9e09-892319689f6a'

export default {

  name: 'UploadFile',

  components: { 
                'grid':Grid,
                'customeButton':custome,
              },

  data: function(){

    console.log('DATA　FUNCTION');
    this.checkParentCurrentId();
        return{
        //destinationId:this.$route.params.id,
        dialog : false,
        columnMenu: true,
        file:null,
        jsonfile:null,
        columns: [
            { title: this.$i18n.t('apply'), cell:"aa", width:'120px' }, 
            { field: 'createdDate', title:this.$i18n.t('createdTime'),filter: 'numeric' },
            { field: 'createdUserName', title:this.$i18n.t('createdUser')},
            { field: 'fileName', title:this.$i18n.t('fileName') },
        ],
        dataResult:[],
        rules: [
            v => !!v || 'File is required',
        ],
        skip: 0,
        take: 10,
        sort: [
                { field: 'createdDate', dir: 'asc' }
                ],
        filter: 0,
        parentCurrentId:null
      
    }
  },
  methods:{
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
        this.$API.api.main.formVersion.get(formVersionId)
        .then(res => {
            console.log("Check Parent ID");
            vm.parentCurrentId = res.data.appliedDocumentReportTemplateId;
            console.log(vm.parentCurrentId)
        })
        .catch(function (error) {
                console.log(error);
        });
    },
    changeCurrentId(id){
        this.parentCurrentId=id;
        console.log(this.parentCurrentId);
    },
    pageChangeHandler: function(event) {
            console.log(event.page);
            this.skip = event.page.skip;
            this.take = event.page.take;
            
            this.filter = event.page.filter;
            this.postData();
        },
    getData:function(){
        console.log("getData begin");
        this.$API.api.main.formVersionDocumentReportTemplate.get(formVersionId);
        console.log("getData excuted");
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
        console.log(json);
        let vm = this;
        reader.onload=function () { 
        text=reader.result;
        formdata.append('schema',text);
        vm.$API.api.main.formVersionDocumentReportTemplate.post(formVersionId,formdata)            
        .then(res => {
            console.log("data posteddd")
            vm.postData();      
        })
        .catch(function (error) {
                console.log(error);
        });
        }
         

    },
    postData:function(){
        console.log('postData started');
        let state = {   take: this.take,
                        skip: this.skip,
                        filter: this.filter,
                        sort: this.sort
                         };
        const queryStr = toDataSourceRequestString(state);
        console.log('queryStr is '+queryStr);
        let vm = this;
        this.$API.api.main.formVersionDocumentReportTemplate.all(formVersionId,queryStr)
            .then(res => {
            this.dataResult = res.data.data;
            console.log("kendo post response")
            vm.total=res.data.total;
            console.log('this total:'+ vm.total);

        })
        .catch(function (error) {
                console.log(error);
        });
        console.log('postData excuted');

        
    }
  },
    beforeCreate() {
    console.log('beforeCreate 被執行');
        
  },
  created(){
    console.log('created 被執行');
    this.postData();
      
  },
  mounted(){     
    console.log('mounted 被執行');
   
  },
//   computed:{
//       destination(){
//           return store.destinations.find(
//               destination => destination.id === this.destinationId
//           )
//       }
//   }
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
    float: right;
}

</style>
