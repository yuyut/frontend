<template>
    <v-card class="list-card px-5 py-4"> 
        <v-card-title class="v-card__title px-0" >
        <v-icon
        left
        class:="pr-3"
        >
        mdi-file-document-multiple-outline
        </v-icon>
            伺服器列表
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
                <td :dataItem="data.props.dataItem ">
                    <v-tooltip bottom>
                    <span>{{$t('flow.actions.edit')}}</span>
                        <template v-slot:activator="{ on}">
                            <v-btn
                            v-on="on"
                            @click="editHandler"
                            color="primary">
                            {{$t('flow.actions.edit')}}
                            </v-btn>
                        </template>
                    </v-tooltip>
                </td>
            </template>
        </grid> 

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
            { field: 'machineName', title:'機器名稱' },
            { field: 'serverName', title:'伺服器名稱', editable:false },
            { field: 'description', title:'描述', editable:false},
            { title: this.$i18n.t('flow.actions.edit'),  cell:"edit" , width:'160px',filterable:false, sortable: false, columnMenu:false },
        ],
        total:this.$store.state.server.total,
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
        dataResult(){ return this.$store.state.server.data.slice(this.skip,this.skip+this.take)}
 
    }
 }
</script>
<style scoped>
.list-view{
    height: 90% !important;
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
