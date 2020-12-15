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
                    授權公司列表
                <v-spacer></v-spacer>

                <v-btn 
                    color="primary"
                    dark
                    class:="px-3"
                    @click='addRecord'
                >
                    {{$t('form.form.add')}}
                </v-btn>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                    class="search-bar"
                    placeholder="搜尋標註資料"
                    outlined
                    dense
                    hide-details
                    @keydown="searching($event)"
                ></v-text-field>
            </v-card-title>
            <v-card-text>
                <grid
                    :pageable="pageable"
                    :page-size="pageSize"                 
                    :data-items="dataResult"
                    :columns="columns"
                    :skip="skip"
                    :take="take"
                    :total="total"
                    @filterchange = "filterChange"
                    @pagechange="pageChangeHandler"
                    @sortchange="sortChangeHandler"
                    @itemchange="itemChange"
                    >
                    <template v-slot:change="data">
                        <td :dataItem="data.props.dataItem"
                        >
                        <router-link :to="{name: 'company-setting'}">
                            <v-btn >  設定
                            </v-btn> 
                            </router-link>
                        </td>
                    </template>
                    <template v-slot:delete="data">
                        <td>
                         <change :dataItem="data.props.dataItem"
                                :title="'刪除'"
                                @edit="deleteItem"
                                
                        ></change>
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
import { skip } from '@progress/kendo-data-query/dist/npm/transducers';
import change from './editBtn'

//import store from "@/store.js";


export default {

    name: 'FormResultUpolad', 
  
    components: { 
                'grid':Grid,
                'change' : change,
              },

  data: function(){
        
    return{
        searchValue:null,
        columns: [
            { field: 'name', title:'公司名稱', editable:false },
            { field: 'userMax', title:'同時上線數量', editable:false },
            { field: 'enable', title:'授權使用', editable:false},
            { title: this.$i18n.t('flow.actions.edit'),  cell:"change" , width:'150px',filterable:false, sortable: false, columnMenu:false },
            { title: this.$i18n.t('flow.actions.delete'),  cell:"delete" , width:'150px',filterable:false, sortable: false, columnMenu:false },
        ],
       
        skip: 0,
        take: 5,
        pageSize: 10,
        pageable: {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            },
    }
  },
  methods:{
    addEdit(){
   
    },
    deleteItem: function (e) {
        let realIndex = this.$store.state.authorize.data.findIndex(p => p.id === e.dataItem.id);
        this.$store.state.authorize.data.splice(realIndex, 1);
        //console.log('Real index is:' + realIndex);
    },
    addRecord(){

    },
    searching(event){
        if(event.key==="Enter" || event.target._value===""){
            this.searchValue = event.target.value
        }
    },
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm:ss');
        return time;
    },
    pageChangeHandler: function(event) {

        this.skip = event.page.skip;
        this.take = event.page.take;
        this.filter = event.page.filter;
    },

},
    beforeCreate() {
        
    },
    created(){   

 
    },
    beforeMount(){
    },
    mounted(){     

    },
    computed:{
        dataResult(){ return this.$store.state.authorize.data.slice(this.skip,this.skip+this.take)},
        total(){return this.$store.state.authorize.data.length}
 
    }
 }
</script>
<style>


.search-bar{
    width: 250px;
    max-width: 250px;
}
</style>
