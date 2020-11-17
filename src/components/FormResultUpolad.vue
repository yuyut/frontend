
<template>
    <div class="upload">
         <v-card>
             <v-card-title  >
                <div>
                    <v-icon
                    left
                    >
                    mdi-file-document-multiple-outline
                    </v-icon>
                        {{$t('Template Setting')}} : {{formName}} - {{versionNumber}}
                    <v-spacer></v-spacer>
                    <v-btn 
                        color="primary"
                        dark
                        id="addnew"
                        @click='addRecord'
                    >
                        {{$t('Add new')}}
                    </v-btn>
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
                    <template v-slot:change="data">
                        <change :dataItem="data.props.dataItem"
                        @edit="edit"
                        @save="save" 
                        @cancel="cancel"
                        ></change>
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
                'change' : noteBtn,
              },

  data: function(){
      
        return{
        //destinationId:this.$route.params.id,
        columnMenu: true,
        columns: [
            { field: 'name', title:this.$i18n.t('name') },
            { field: 'isEnable', title:this.$i18n.t('isEnable'), editable:false },
            { field: 'createdUserName', title:this.$i18n.t('createdUser'), editable:false},
            { title: "",  cell:"change" , width:'120px',filterable:false, sortable: false, columnMenu:false },
        ],
        dataResult:[],
        //gridData: dataResult.map((dataEdit) => Object.assign({}, dataEdit)),
        rules: [
            v => !!v || 'File is required',
        ],
        skip: 0,
        take: 10,
        filter: null,
        parentCurrentId:null,
        formName:null,
        versionNumber:null,
        inEdit:true,
        updatedData: [],
    }
  },
  methods:{
    addRecord() {
        const dataItem = { inEdit: true };

        this.dataResult.splice(0, 0, dataItem)

    },
    itemChange: function (e) {
        if (e.dataItem.id) {
            console.log(e.field)
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
            console.log(this.dataResult[index]);
            this.$API.api.main.formResultTemplate.put(this.dataResult[index].id,this.dataResult[index])
            .then(res => {
                console.log("save successed");
                console.log(res);
                vm.postData();
            })
            .catch(function (error) {
                    console.log(error);
            });
        }
        else{ //save new item
            const newRecord = e.dataItem;
            const data = this.dataResult.slice();
            console.log(data);
            this.dataResult = data;
            let vm = this;
            this.$API.api.main.formFormResultTemplate.post(this.formVersionId,this.dataResult[0].name)
            .then(res => {
                console.log("save successed");
                console.log(res);
                vm.postData();
            })
            .catch(function (error) {
                    console.log(error);
            });
        }
        
    }, 
    cancel(e) {
        console.log(e.dataItem);

        if (e.dataItem.id!=undefined) {
            let index = this.dataResult.findIndex(p => p.id === e.dataItem.id);
            let updateDataIndex = this.updatedData.findIndex(p => p.id === e.dataItem.id);
            let updated = Object.assign(this.updatedData[updateDataIndex], {'inEdit': undefined});
            this.dataResult.splice(index, 1, updated);} 
        else{
            this.dataResult.splice(0, 1)
        }
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
            vm.updatedData = JSON.parse(JSON.stringify(res.data));
        })
    },

    myUpload:function(){
        vm.$API.api.main.formFormResultTemplate.post(vm.formVersionId,name,data)            
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
                        sort: this.sort
                         };
        let name = "nameee";
        const queryStr = toDataSourceRequestString(state);
        let vm = this;
        console.log(this.formVersionId);
        this.$API.api.main.formFormResultTemplate.all(this.formVersionId,queryStr)
            .then(res => {
            vm.dataResult = res.data.data;
            console.log(res);
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

      
  },
  beforeMount(){
        console.log('beforeMount 被執行');
  },
  mounted(){     
    console.log('mounted 被執行');
    //this.getData();
    this.postData();
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
