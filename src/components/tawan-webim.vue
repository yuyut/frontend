<template>
    <v-card class="server">
        <div class="server-setting">
            <v-card-title class="v-card__title" >
            <v-icon
            left
            class:="pr-3"
            >
            mdi-file-document-multiple-outline
            </v-icon>
                目前伺服器成員
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-magnify</v-icon>
            <v-text-field
                class="search-bar"
                placeholder="搜尋標註資料"
                outlined
                dense
                hide-details
                @keydown="searching($event)"
            ></v-text-field>
        </v-card-title>
        <grid
            class="list-view"
            :pageable="pageable1"
            :page-size="pageSize1"                 
            :data-items="addedUsers"
            :columns="addedColumns"
            :skip="skip1"
            :take="take1"
            :total="total1"
            @filterchange = "filterChange"
            @pagechange="pageChangeHandler1"
            @sortchange="sortChangeHandler"
            @itemchange="itemChange"
            >
            <template v-slot:change="data">
                <td>
                    <change :dataItem="data.props.dataItem"
                        :title="'移除'"
                        :btnColor="'primary'"
                        @edit="removeEdit"
                ></change>
                </td>
            </template>
        </grid> 
        </div>
        <div class="server-setting">
            <v-card-title class="v-card__title" >
                <v-icon
                left
                class:="pr-3"
                >
                mdi-file-document-multiple-outline
                </v-icon>
                    可加入的成員
                <v-spacer></v-spacer>
                <v-icon class="mr-1">mdi-magnify</v-icon>
                <v-text-field
                    class="search-bar"
                    placeholder="搜尋標註資料"
                    outlined
                    dense
                    hide-details
                    @keydown="searching($event)"
                ></v-text-field>
        </v-card-title>
        <grid
            class="list-view"
            :pageable="pageable"
            :page-size="pageSize"                 
            :data-items="currentUsers"
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
                <td>
                <change :dataItem="data.props.dataItem"
                        :title="'加入'"
                        :btnColor="'primary'"
                        @edit="addEdit"
                ></change>
                </td>
            </template>
        </grid> 
        </div>
    </v-card>
</template>
<script>
import VueI18n from 'vue-i18n'
import axios from 'axios';
import { Grid,filterGroupByField } from '@progress/kendo-vue-grid';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
import moment from 'moment'
import change from './editBtn'
import { skip } from '@progress/kendo-data-query/dist/npm/transducers';


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
        addedColumns: [
            { field: 'company.name', title:'公司' },
            { field: 'user.name', title:'姓名'},
            { field: 'user.email', title:'Email'},
            { title: this.$i18n.t('flow.actions.edit'),  cell:"change" , width:'240px' },
        ],
        columns: [
            { field: 'company.name', title:'公司' },
            { field: 'user.name', title:'姓名'},
            { field: 'user.email', title:'Email'},
            { title: this.$i18n.t('flow.actions.edit'),  cell:"change" , width:'240px' },
        ],
      
        skip: 0,
        take: 20,
        pageSize: 20,
        pageable: {
            buttonCount: 5,
            info: true,
            type: 'numeric',
            pageSizes: true,
            previousNext: true
        },
       
        skip1: 0,
        take1: 20,
        pageSize1: 20,
        pageable1: {
            buttonCount: 5,
            info: true,
            type: 'numeric',
            pageSizes: true,
            previousNext: true
        },
    }
  },
  methods:{
    searching(event){
        if(event.key==="Enter" || event.target._value===""){
            this.searchValue = event.target.value
        }
    },
    addEdit: function (e) {
        let index = this.currentUsers.findIndex(p => p.user.id === e.dataItem.user.id);
        //console.log('Edit index is:' + index);
        let realIndex = this.$store.state.user.data.findIndex(p => p.user.id === e.dataItem.user.id);
        let updated = Object.assign({},this.$store.state.user.data[realIndex]);
        this.$store.state.user.data.splice(realIndex, 1);
        this.$store.state.added.data.splice(0, 0, updated);
        //console.log('Real index is:' + realIndex);
    },
    removeEdit: function (e) {
        let index = this.addedUsers.findIndex(p => p.user.id === e.dataItem.user.id);
        //console.log('Edit index is:' + index);
        let realIndex = this.$store.state.added.data.findIndex(p => p.user.id === e.dataItem.user.id);
        let updated = Object.assign({},this.$store.state.added.data[realIndex]);
        this.$store.state.added.data.splice(realIndex, 1);
        this.$store.state.user.data.splice(0, 0, updated);
        //console.log('Real index is:' + realIndex);
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
    pageChangeHandler1: function(event) {
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
        currentUsers(){ 
            return this.$store.state.user.data.slice(this.skip,this.skip+this.take)
            },
        addedUsers(){ 
            return this.$store.state.added.data.slice(this.skip1,this.skip1+this.take1)
            },
        total1(){
            return this.$store.state.added.data.length
            },
        total(){
            return this.$store.state.user.data.length
            },
 
    }
 }
</script>
<style scoped>
.server{
    display: flex;
    flex-direction: row;
    height: 100%;
}
.server-setting{
    margin: 8px;
}
.search-bar{
    width: 250px;
    max-width: 250px;
}
.list-view{
    height: 90% !important;
}
.list-card{
   max-height: calc(100vh - 140px);
    height: calc(100vh - 140px);
}
</style>
