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
                    <v-btn  :to="{name: 'CompanySetting'}">  設定
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
        authorize:{
        "data": [
            {
            "id": "01aeb395-b0f6-46e7-8ca3-73383bd0ef65",
            "name": "兆申機電",
            "userMax": 0,
            "enable": false
            },
            {
            "id": "032ea610-9425-44fc-b2d3-352fa5fc6982",
            "name": "衛武資訊",
            "userMax": 9993,
            "enable": true
            },
            {
            "id": "11653045-8aa7-4b34-ace9-42efdde07149",
            "name": "大元建築師事務所",
            "userMax": 3,
            "enable": true
            },
            {
            "id": "1a7986be-559a-4640-b4b2-5742358daae4",
            "name": "建國工程",
            "userMax": 19,
            "enable": true
            },
            {
            "id": "1bceb2e7-7dfd-4b62-8628-4fb537d289a4",
            "name": "德孚建設",
            "userMax": 0,
            "enable": false
            },
            {
            "id": "402b6471-0cad-4f73-9b20-66977b95853f",
            "name": "AICI",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "578f11cc-a74e-4011-8466-6d611a071fa7",
            "name": "永雄建設機構",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "6d77a89f-ef4c-44f9-a1d4-85645f5ee216",
            "name": "李文勝建築師事務所",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "88be52ad-fa27-457b-9f0b-2485450eb8be",
            "name": "中興電工",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "89921bda-0462-4f8e-9ce5-cb51d1a2d4bd",
            "name": "?????",
            "userMax": 0,
            "enable": true
            },
            {
            "id": "8a4b014c-cb54-4042-a3fa-38e5ee218d99",
            "name": "上海夏和建築設計有限公司",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "8ef5ecd8-748a-468a-950d-43d09847c1d0",
            "name": "SyncoBox",
            "userMax": 10,
            "enable": true
            },
            {
            "id": "97b5c5f6-5146-4455-a15c-655bf6112306",
            "name": "富邦人壽保險股份有限公司",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "9f67550e-e783-4f29-8b78-bd615c601339",
            "name": "廣宇建設實業股份有限公司",
            "userMax": 2,
            "enable": true
            },
            {
            "id": "a046d025-0d2c-4e68-9b43-292ca0e019ed",
            "name": "潘冀建築師事務所",
            "userMax": 3,
            "enable": true
            },
            {
            "id": "a586009c-a24a-4836-80a5-31e6b1e12ebc",
            "name": "嘉新資產管理開發股份有限公司",
            "userMax": 2,
            "enable": true
            },
            {
            "id": "b1e63e54-bf02-4ec9-b98a-65f76b3deca4",
            "name": "榮民工程股份有限公司",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "b3f8e320-866b-42fb-9351-a9bf851e7595",
            "name": "永齡建康基金會",
            "userMax": 2,
            "enable": false
            },
            {
            "id": "bf4071fc-4daa-47c2-9683-75633b78aeac",
            "name": "教育訓練用",
            "userMax": 30,
            "enable": true
            },
            {
            "id": "c050e506-2f25-41c8-87f4-36ee06dcc44a",
            "name": "蛭川金屬",
            "userMax": 2,
            "enable": true
            },
            {
            "id": "c47ef2b6-8c8c-4919-882c-f65ffef948ec",
            "name": "迪瑞製藥",
            "userMax": 0,
            "enable": false
            },
            {
            "id": "cb2bcbc5-7fa3-46e4-9341-88f82bfc2974",
            "name": "台北科技大學",
            "userMax": 0,
            "enable": false
            },
            {
            "id": "d22c70be-ffe0-475b-9d35-34d45d3e22eb",
            "name": "逢甲大學",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "d9d90dce-af17-4117-882f-1ff6f8d1e2bb",
            "name": "國泰建設",
            "userMax": 1,
            "enable": true
            },
            {
            "id": "ff526057-1998-43a7-9847-4623712eb980",
            "name": "測試公司(2)",
            "userMax": 0,
            "enable": true
            }
        ],
        "total": 25,
        "aggregateResults": null,
        "errors": null
        },
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
        let realIndex = this.authorize.data.findIndex(p => p.id === e.dataItem.id);
        this.authorize.data.splice(realIndex, 1);
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
        dataResult(){ return this.authorize.data.slice(this.skip,this.skip + this.take)},
        total(){return this.authorize.data.length}
 
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
