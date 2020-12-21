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
            @pagechange="pageChangeHandler"
            >
            <template v-slot:edit="data">
                <td :dataItem="data.props.dataItem">
                    <v-tooltip bottom>
                    <span>{{$t('flow.actions.edit')}}</span>
                        <template v-slot:activator="{on}">
                            <v-btn
                            v-on="on"
                            :to="{name: 'ServerSetting' ,params:{serverId: data.props.dataItem.id}}"
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
        server:{
            "data": [
                {
                "id": 1,
                "machineName": "WEBIM-SERVER02",
                "serverName": "Taiwan-WeBIM",
                "description": "衛武資訊台灣BIM服務客戶"
                },
                {
                "id": 4,
                "machineName": "China-Drxcd",
                "serverName": "China-Drxcd_Intranet",
                "description": "迪瑞成都內部網路專用"
                },
                {
                "id": 5,
                "machineName": "WEBIM-SERVER02",
                "serverName": "Taiwan-建國總公司區網_02",
                "description": "建國內部網路專用"
                },
                {
                "id": 8,
                "machineName": "WeBIM-Server",
                "serverName": "Taiwan-WeBIM-02",
                "description": "衛武資訊台灣BIM服務客戶"
                },
                {
                "id": 9,
                "machineName": "Taiwan-Drxcd",
                "serverName": "Taiwan-Drxcd_Intranet",
                "description": "迪瑞台北內部伺服器"
                },
                {
                "id": 11,
                "machineName": "WeBIM-Server03",
                "serverName": "建國總公司_01",
                "description": "建國工程專用伺服器-區網"
                },
                {
                "id": 12,
                "machineName": "WeBIM-Server03",
                "serverName": "衛武資訊-台灣",
                "description": "衛武資訊台灣伺服器"
                },
                {
                "id": 14,
                "machineName": "WeBIM-Server04",
                "serverName": "建國總公司區網_02",
                "description": "建國內部網路專用"
                },
                {
                "id": 15,
                "machineName": "WeBIM-Server03",
                "serverName": "Taiwan-試用伺服器",
                "description": "衛武資訊新版測試"
                },
                {
                "id": 22,
                "machineName": "WeBIM-Server03",
                "serverName": "衛武資訊外部網路伺服器",
                "description": "衛武資訊專案服務客戶"
                }
            ],
            "total": 10,
            "aggregateResults": null,
            "errors": null
        },
        searchValue:null,
        columns: [
            { field: 'machineName', title:'機器名稱' },
            { field: 'serverName', title:'伺服器名稱', editable:false },
            { field: 'description', title:'描述', editable:false},
            { title: this.$i18n.t('flow.actions.edit'),  cell:"edit" , width:'160px',filterable:false, sortable: false, columnMenu:false },
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
        dataResult(){ return this.server.data.slice(this.skip,this.skip+this.take)},
        total(){ return this.server.total}
 
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
