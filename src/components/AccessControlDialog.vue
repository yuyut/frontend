<template>
  <div>      
    <v-btn
        class="ml-3"
        color="pink"
        dark
        @click.stop="drawer = !drawer"
        >
        權限設定
    </v-btn>
        <v-navigation-drawer
            v-model="drawer"
            absolute
            right
            :width="'750'"
        >
         <v-icon
                @click="drawer = false;  editHandler()"
                class="d-inline exit"
                size="25"
                > 
                mdi-close
            </v-icon> 
        <template v-slot:prepend>
           <v-row>
               <v-col >
                    <v-list-item two-line>
                        <v-icon 
                            class="d-inline"
                            size="75"
                            color="primary"> 
                            mdi-folder 
                            </v-icon> 
                    <v-list-item-content class="ml-5 mt-3">
                        <v-list-item-title>資料夾名稱</v-list-item-title>
                        <v-list-item-subtitle>資料夾 (25MB)</v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                    </v-col>
                <v-col class="d-flex justify-center flex-column">
                    <v-switch
                        v-model="inherentSwitch"
                        :label="`繼承父層檔案 : ${inherentSwitch.toString()}`"
                        color="primary"
                        @change="inherentSwitch"
                        hide-details
                        ></v-switch>
                    </v-col>
                </v-row>
            </template>
        <br/>
        <div class="mx-6">
            <v-row>
            <v-col cols="4" class="d-flex py-0">
                <span class="subtitle-1 ">預設儲存權限：</span>
            </v-col>
            <v-spacer/>
            <v-col cols="8" class="d-inline control-box py-0">
                <v-select
                    dense
                    :items="accessOptions"
                    :disabled="inherentSwitch"
                    solo
                    label="Deny"
                    ></v-select>
                </v-col>
                </v-row>
            </div>
            <v-list-item class="px-5 add-access">
                <v-text-field 
                    class="pr-3"
                    v-model="search"
                    hide-details
                    placeholder="關鍵字搜尋使用者"
                    label="搜尋使用者"
                    flat
                >
                <template v-slot:prepend>
                    <v-icon
                    class="mx-2"
                    >
                    mdi-account-search-outline</v-icon>
                </template> 
                </v-text-field>
                        <v-dialog
                        v-model="addMemberDialog"
                        max-width="600px"
                        persistent
                        >
                        <template v-slot:activator="{ on, attrs }">
                        <v-btn 
                            v-bind="attrs"
                            v-on="on"
                            color="#ffffff"
                        >
                        新增成員
                        </v-btn>
                        </template>
                        <v-spacer></v-spacer>  
                        <v-card>
                            <v-card-title>
                                <span class="title">成員設定</span>
                                <v-spacer></v-spacer>
                                <v-icon
                                    @click="addMemberDialog = false;"
                                    > 
                                    mdi-close
                                    </v-icon> 
                                </v-card-title>
                            <v-card-text>
                               
                                  <v-row>
                                    <v-col cols="3" class="d-inline">
                                        <p class="subtitle-1 mt-6">新增授權成員：</p>
                                    </v-col>
                                    <v-col cols="9" class="d-inline ">
                                    <v-autocomplete
                                        class="py-4"
                                        :search-input.sync="search"
                                        v-model="friends"
                                        :items="userList"
                                        hide-details
                                        chipsc
                                        item-text="name"
                                        item-value="name"
                                        multiple
                                        placeholder="新增授權使用者"
                                        flat
                                        color="dark grey"
                                        hide-selected
                                    >
                                    <template v-slot:selection="data">
                                    <v-chip
                                        v-bind="data.attrs"
                                        :input-value="data.selected"
                                        close
                                        @click="data.select"
                                        @click:close="remove(data.item)"
                                        >
                                        <v-avatar left v-if="data.item.type=='img'">
                                            <v-img :src="data.item.avatar"></v-img>
                                        </v-avatar>
                                        <v-avatar left v-else>
                                            <v-icon>
                                                mdi-account-multiple
                                            </v-icon>
                                        </v-avatar>
                                        {{ data.item.name }}
                                        </v-chip>
                                    </template>
                                    <template v-slot:item="data">
                                    <template v-if="typeof data.item !== 'object'">
                                        <v-list-item-content v-text="data.item"></v-list-item-content>
                                    </template>
                                    <template v-else>
                                        <v-list-item-avatar v-if="data.item.type=='img'">
                                            <img :src="data.item.avatar">
                                        </v-list-item-avatar>
                                        <v-list-item-avatar v-else>
                                                <v-icon>
                                                mdi-account-multiple
                                            </v-icon>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                        </v-list-item-content>
                                    </template>
                                    </template>
                                    </v-autocomplete>
                                </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="3" class="d-inline">
                                        <p class="subtitle-1">成員儲存權限：</p>
                                    </v-col>
                                    <v-col cols="9" class="d-inline ">
                                        <v-select
                                            dense
                                            :items="accessOptions"
                                            solo
                                            label="Deny"
                                            ></v-select>
                                            </v-col>
                                </v-row>
                                </v-card-text>
                            <v-card-actions class="pb-3">
                                <v-spacer></v-spacer>
                                <v-btn
                                    class="pa-2 mx-2"
                                    color="primary"
                                    outlined
                                    @click="addMemberDialog = false;"
                                    >
                                    取消
                                </v-btn> 
                                    <v-btn
                                    class="p mx-2"
                                    depressed
                                    color="primary"
                                    @click="addMemberDialog = false;"
                                    >
                                    新增
                                </v-btn>
                                </v-card-actions>
                            </v-card>
                    </v-dialog> 
            </v-list-item>
        <v-list dense class="access-box overflow-y-auto">
            <v-list-item 
            class="access-list"
            v-for="item in filteredUserInfo"
            :key="item.title" 
            two-line>
            <v-list-item-avatar >
                <v-icon size="45">{{ item.icon }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-col cols="5" class="pa-0" >
                    <v-list-item-title class="subtitle-1 ">{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle class="body-1 ">{{ item.sub }}</v-list-item-subtitle>
                    </v-col>
                <v-col cols="5" class="pa-0">
                    <v-select
                    hide-details
                    :disabled="inherentSwitch"
                    dense
                    :items="accessOptions"
                    solo
                    :label="item.status"
                    ></v-select>
                    </v-col>
                <v-col cols="2" class="pa-0 d-flex justify-center ">
                    <v-btn
                        v-if="!inherentSwitch"
                        icon
                        @click="deleteDialog=!deleteDialog"
                        color="red">
                        <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-list-item-content> 
            </v-list-item>
            <p class="text-center" v-if="!searchUserResult">'{{search}}' 沒有任何搜尋結果</p>
        </v-list>
        <v-dialog
            v-model="deleteDialog"
            max-width="550"
            >
        <v-card>
            <v-card-title class="headline">
                確定要刪除嗎?
            </v-card-title>
            <v-card-text class="text-box">一旦刪除即無法回復設定，確定要刪除此用戶嗎?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="green darken-1"
                    text
                    @click="deleteDialog = !deleteDialog"
                    >
                    取消
                    </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="deleteDialog = !deleteDialog; myDelete()"
                    >
                    確定
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        <template v-slot:append>
            <div class="pa-2 float-right">
                <v-btn
                    class="pa-2 mx-2"
                    color="primary"
                    outlined
                    >
                    {{$t('cancel')}}
                    </v-btn> 
                    <v-btn
                    class="p mx-2"
                    depressed
                    color="primary"
                    @click="drawer = false;"
                    >
                    {{$t('save')}}
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    watch: {
    search (val) {
         val !== this.friends && this.querySelections(val)
      },
    },
    mounted(){
       this.filteredUserInfo=this.userInfo;
    },
    data() {
        const srcs = {
                1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                6: 'mdi-account-multiple'
            }
        return {
            isLoading:false,
            filteredUserInfo:[],
            search: null,
            searchUserResult:true,
            select: null,
            friends: ['Sandra', 'Britta'],
            userList: [
                    { name: 'Sandra', avatar: srcs[1], type:'img' },
                    { name: 'Ali', avatar: srcs[2], type:'img' },
                    { name: 'Trevor', avatar: srcs[3], type:'img' },
                    { name: 'Tucker', avatar: srcs[2], type:'img' },
                    { name: 'Britta', avatar: srcs[4], type:'img' },
                    { name: 'Jane ', avatar: srcs[5], type:'img' },
                    { name: 'John', avatar: srcs[1], type:'img' },
                    { name: 'Sandra', avatar: srcs[3], type:'img' },
                    { name: 'group1', avatar: srcs[6], type:'icon' },
                    { name: 'group2', avatar: srcs[6], type:'icon' },
                    { name: 'group3', avatar: srcs[6], type:'icon' },
                ],
            name:null,
            addMemberDialog:false,
            inherentSwitch: false,
            drawer: false,
            sharingOpt:[ '知道連結的使用者', '隱藏'],
            userInfo: [
                { title: '群組1', status:'Deny', icon: 'mdi-account-multiple', sub:'使用者群組' },
                { title: '群組2', status:'Deny', icon: 'mdi-account-multiple', sub:'使用者群組' },
                { title: '群組3', status:'Deny', icon: 'mdi-account-multiple', sub:'使用者群組' },
                { title: '王中明', status:'ReadOnly', icon: 'mdi-account', sub:'使用者' },
                { title: '王小明', status:'Deny', icon: 'mdi-account', sub:'研發工程師' },
                { title: '王一明', status:'ReadWrite', icon: 'mdi-account', sub:'專案工程師' },
                { title: '王二明', status:'ReadOnly', icon: 'mdi-account', sub:'研發工程師' },
                { title: '王三明', status:'Deny', icon: 'mdi-account', sub:'使用者' },
                { title: '王8明', status:'ReadWrite', icon: 'mdi-account', sub:'專案工程師' },
                { title: '王4明', status:'ReadWrite', icon: 'mdi-account', sub:'研發工程師' },
                { title: '王2明', status:'Deny', icon: 'mdi-account', sub:'使用者' },
                { title: '王1明', status:'ReadWrite', icon: 'mdi-account', sub:'研發工程師' },
                { title: '王6明', status:'ReadOnly', icon: 'mdi-account', sub:'使用者' },
                { title: '王7明', status:'Deny', icon: 'mdi-account', sub:'研發工程師' },
                { title: '王5明', status:'ReadWrite', icon: 'mdi-account', sub:'專案工程師' },
                { title: '王3明', status:'ReadOnly', icon: 'mdi-account', sub:'研發工程師' },
                { title: 'group', status:'ReadWrite', icon: 'mdi-account-multiple', sub:'專案工程師' },
                { title: 'group1', status:'ReadOnly', icon: 'mdi-account-multiple', sub:'研發工程師' },
                
            ],
            deleteDialog:false,
            accessOptions: ['ReadWrite' ,'Deny', 'ReadOnly' ],
        }
    },
    methods: {
        querySelections (v) {
            // Simulated ajax query
            this.searchUserResult=false;
            let vm = this;
            setTimeout(() => {
                    let userText = v.replace(/^\s+/, '').replace(/\s+$/, '');
                    if (userText == ''|| undefined) {
                        // text was all whitespace
                        vm.filteredUserInfo=vm.userInfo;
                        vm.searchUserResult=true;
                    } else {
                        // text has real content, now free of leading/trailing whitespace
                        vm.filteredUserInfo = vm.userInfo.filter(e => {
                            if((e.title || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1){
                                vm.searchUserResult=true;
                                return e
                            } 
                            else{
                                if(vm.searchUserResult!==true)
                                    vm.searchUserResult=false;
                            }
                        })
                    }
                }, 500)
        },
        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
        editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
        },
    }
}
</script>
<style scoped>
.exit{
    position:absolute;
    top:10px;
    right:10px;
}
.file-info{
    display: inline-block;
    vertical-align: middle;
    padding-top: 15px;
    margin-left: 12px;
}
.access-box{
    height:80%;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#E5E7E9 
}
.add-access{
    background-color:#F2F3F4;
    min-height:70px;
}
.access-list{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#E5E7E9;
}
</style>