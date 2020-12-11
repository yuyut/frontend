<template>
    <div>
        <v-toolbar class="toolbar" elevation="0">
            <v-toolbar-title>{{project_name}}<v-icon class="my-auto">mdi-chevron-right</v-icon>標註資料</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-btn depressed small :color="arrangeMode==='block' ? '#00bc97' : '#5DDEC5'" tile @click="viewMode('block')">
                <v-icon color="#ffffff">mdi-view-module</v-icon>
            </v-btn>
            <v-btn depressed small :color="arrangeMode==='list' ? '#00bc97' : '#5DDEC5'" tile @click="viewMode('list')">
                <v-icon color="#ffffff">mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-icon class="mr-1">mdi-filter-outline</v-icon>
            <v-autocomplete
                v-model="searchStatus"
                :items="statusItems"
                :item-text="'name'"
                return-object
                class="search-bar status"
                dense
                outlined
                hide-details
                @change="status_sorting($event)"
            ></v-autocomplete>
            
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-icon class="mr-1">mdi-magnify</v-icon>
            <v-text-field
                class="search-bar"
                placeholder="搜尋標註資料"
                outlined
                dense
                hide-details
                @keydown="searching($event)"
            ></v-text-field>
            <v-divider class="mx-4" inset vertical></v-divider>
            
            <v-btn color="#ffffff"><v-icon class="mr-1">mdi-file-word-box-outline</v-icon>匯出Word</v-btn>
        </v-toolbar>
    </div>
</template>

<script>


export default {
    name: "photoViewerHeader",
    components: {},
    data() {
        return{
            project_name:"WEBIM-南港機廠社會住宅案",
            searchStatus:"所有標註",
            statusItems:["所有標註",'草稿', '發佈', '結案', '釋疑中'],
            searchValue:'',
            sortValue:0,
        }
    },
    created(){
        this.$root.$emit("viewMode", this.arrangeMode);
    },
    props:["arrangeMode"],
    computed:{
        
    },
    watch: {
      
    },
    mounted(){
        let token = localStorage.getItem('oidc_access_token');
        let config = {
            headers: {
                Authorization: `bearer ${token}`,
            },
        };
        this.$http.get('https://webim-api.syncobox.com/v1.1/Markup/GetStatus', config).then(res=>{
            this.statusItems=[];
            let allStatus = {
                "id":0,
                "name":"所有標註"
            }
            this.statusItems = res.data;
            this.statusItems.unshift(allStatus)
            this.searchStatus = this.statusItems.find(e=>e.id===0);
        });
        
    },
    methods:{
        viewMode(mode){
            this.arrangeMode=mode;
            this.$root.$emit("viewMode", mode);
        },
        searching(event){
            if(event.key==="Enter" || event.target._value===""){
                this.searchValue = event.target.value
                this.$root.$emit("sorting", this.sortValue, this.searchValue);
            }
        },
        status_sorting(value){
            this.sortValue = value.id;
            this.$root.$emit("sorting", this.sortValue, this.searchValue);
        }
    },
}

</script>

<style scoped>
.toolbar{
    margin: -20px;
    max-width: calc(100% + 40px) !important;
}
.search-bar{
    width: 250px;
    max-width: 250px;
}
.search-bar.status{
    width: 150px;
    max-width: 150px;
}
.v-text-field.v-input.search-bar input{
    line-height: 24px !important;
}
</style>