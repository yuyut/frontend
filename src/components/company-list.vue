<template>

<v-card class="list-card px-5 py-4">
    <v-card-title class="v-card__title px-0">
        <v-icon
        left
        class:="pr-3"
        >
        mdi-file-document-multiple-outline
        </v-icon>
            授權公司列表  
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
    <v-card-text class="pa-0">
        <grid
            class="list-view"
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
            <template v-slot:edit="data">
                <td :dataItem="data.props.dataItem">
                    <v-btn  :to="{name: 'company-setting'}">  設定
                    </v-btn> 
                </td>
            </template>
        </grid>
    </v-card-text>
</v-card> 
</template>
<script>

import { Grid,filterGroupByField } from '@progress/kendo-vue-grid';


export default {

    components: { 
                'grid':Grid,
              },

  data: function(){
        
    return{
        searchValue:null,
        columns: [
            { field: 'name', title:this.$t('company.company_name'), editable:false },
            { field: 'userMax', title:'同時上線數量', editable:false },
            { field: 'enable', title:'授權使用', editable:false},
            { title: this.$t('flow.actions.edit'),  cell:"edit" , width:'150px',filterable:false, sortable: false, columnMenu:false },
        ],
       
        skip: 0,
        take: 10,
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
        dataResult(){ return this.$store.state.authorize.data.slice(this.skip,this.skip + this.take)},
        total(){return this.$store.state.authorize.data.length}
 
    }
 }
</script>
<style scoped>
.list-view{
    height: 90% !important;
    max-height: 90% !important;
}
.list-card{  
    max-height: calc(100vh - 140px);
    height: calc(100vh - 140px);

}
.search-bar{
    width: 250px;
    max-width: 250px;
}
</style>
