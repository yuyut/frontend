<template>
  <div>      
      <v-dialog
          v-model="dialog"
          max-width="600px"
          >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            v-bind="attrs"
             v-on="on"
            color="#ffffff"
          >
          權限設定
          </v-btn>
        </template>
        <v-spacer></v-spacer>  
          <v-card >
            <v-card-title class="card-title">
                <span class="title">權限設定</span>
                <v-spacer></v-spacer>
                <v-icon
                    @click="dialog = false;"
                    > 
                    mdi-close
                    </v-icon> 
              </v-card-title>
            <v-card-text
                class="access-control-text d-flex flex-column">
                <div class="info-box">
                <v-row>
                    <v-col>
                        <v-icon 
                            class="info-icon"
                            size="75"
                            color="primary"> 
                            mdi-folder 
                            </v-icon> 
                            <div class="file-info">
                                <p class="file-info-title">資料夾名稱</p>
                                <p class="file-info-detail">資料夾 (25MB)</p>
                                </div>
                        </v-col>
                        <v-col class="d-flex justify-center flex-column">
                             <v-switch
                                v-model="inherentSwitch"
                                :label="`繼承父層檔案 : ${inherentSwitch.toString()}`"
                                color="primary"
                                @change="dialogDisable=inherentSwitch"
                                hide-details
                                ></v-switch>
                            </v-col>
                    </v-row>
                    <div class="default-control-box mt-5">
                        <v-row>
                        <v-col cols="3" class="d-inline">
                            <p class="subtitle-1 access-title control-box">預設儲存權限：</p>
                        </v-col>
                        <v-col cols="9" class="d-inline control-box">
                            <v-select
                                :disabled="dialogDisable"
                                dense
                                :items="items"
                                solo
                                label="Deny"
                                id="default-select"
                                ></v-select>
                            </v-col>
                            </v-row>
                        </div>
                    <v-divider></v-divider>
                    <v-data-table
                        flat
                        :headers="headers"
                        :items="desserts"
                        :items-per-page="5"
                        class="elevation-1"
                        :hide-default-footer="true"
                        disable-pagination
                        fixed-header
                        :height="'300px'"
                    >
                    <template v-slot:body.append>
                    <tr>
                        <td colspan="3">
                            <v-text-field>
                                <span slot="prepend" :style="{width:'160px'}">
                                <v-icon>
                                mdi-account-plus-outline
                                </v-icon>
                                <span> 新增授權使用者</span>
                                <v-icon
                                    class ="ml-1"
                                    size="8"
                                    color="primary"
                                    @click="showInfo()"
                                    >
                                mdi-information-outline
                                </v-icon>
                                </span>
                                  <v-icon
                                    :disabled="dialogDisable"
                                    slot="append"
                                    color="primary"
                                    @click="addItem(item)"
                                    >
                                mdi-plus
                                </v-icon>
                            </v-text-field>
                        </td>
                        </tr>
                        </template>
                        <template v-slot:item.delete="{ item }">
                            <v-icon
                                small
                                @click="deleteItem(item);deleteDialog=!deleteDialog"
                                :disabled="dialogDisable"
                                color="red"
                            >
                                mdi-delete
                            </v-icon>
                            </template>
                    </v-data-table>
                 </div>
          </v-card-text>
          <v-card-actions class="pb-3">
              <v-spacer></v-spacer>
               <v-btn
                class="pa-2 mx-2"
                color="primary"
                outlined
                @click="dialog = false;"
                >
                {{$t('cancel')}}
            </v-btn> 
                <v-btn
                class="p mx-2"
                depressed
                color="primary"
                @click="dialog = false;"
                >
                {{$t('save')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> 
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
               <v-col>
                    <v-list-item two-line >
                        <v-icon 
                            class="info-icon"
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
                        @change="drawerDisable=inherentSwitch"
                        hide-details
                        ></v-switch>
                    </v-col>
                </v-row>
            </template>
        <br/>
        <div class="default-control-box mx-6">
            <v-row>
            <v-col cols="4" class="d-flex">
                <span class="subtitle-1 access-title ">預設儲存權限：</span>
            </v-col>
            <v-spacer/>
            <v-col cols="8" class="d-inline control-box ">
                <v-select
                    dense
                    :items="items"
                    :disabled="drawerDisable"
                    solo
                    label="Deny"
                    id="default-select"
                    ></v-select>
                </v-col>
                </v-row>
            </div>
        <!-- <v-list-item class="px-5 add-access" v-if="!drawerDisable && !inherentSwitch">
             <v-row>
                 <v-col cols="2">
                    <v-select
                        class="flex-column justify-center"
                        v-model='searchOrAdd'
                        :items='searchOrAdds'
                        dense
                        hide-details
                        :style="{width:'100px'}"
                        >
                        <template v-slot:label v-if="searchOrAdd==null" :style="{width:'100px'}">
                            <v-icon
                                >
                                mdi-account-plus-outline</v-icon> 
                        </template>
                        <template v-slot:selection="data">
                            <v-icon
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            >
                        {{data.item.icon}}</v-icon>
                        </template>
                        <template v-slot:item="data">
                            <v-icon
                            v-bind="data.attrs"
                            :input-value="data.selected"
                            close
                            >
                            {{data.item.icon}}</v-icon>
                        </template>
                    </v-select> 
                    </v-col>
                <v-col cols="9" v-if="searchOrAdd.name=='add'">
                    <v-autocomplete 
                        v-model="friends"
                        :disabled="isUpdating"
                        :items="people"
                        filled
                        chipsc
                        item-text="name"
                        item-value="name"
                        multiple
                        label="新增授權使用者"
                        placeholder="關鍵字搜尋使用者"
                        class="mx-4"
                        flat
                        color="dark grey"
                        hide-selected
                        @keydown.enter="addItem(friends)"
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
                        <template v-slot:append>
                            <v-select
                            label="授權方式設定"
                            color="dark"
                            :style="{width:'200px'}"
                            dense
                            hide-details
                            :items="items"
                            ></v-select> 
                        </template>
                        </v-autocomplete>
                    </v-col>
                <v-col cols="1" v-if="searchOrAdd.name=='add'">
                    <v-tooltip bottom >
                        <template v-slot:activator="{ on, attrs }">
                            <v-icon
                                    color="primary"
                                    class="mx-2"
                                    v-bind="attrs"
                                    v-on="on"
                                    @click="addItem(friends)"
                                    >
                                    mdi-plus</v-icon>
                            </template>
                            <span>新增使用者</span>
                        </v-tooltip>
                    </v-col>
                <v-col cols="10" v-if="searchOrAdd.name=='search'">
                    <v-text-field 
                        v-model="searchResult"
                        hide-details
                        counter="25"
                        hint="Input user name"
                        label="Search name"
                    >
                    
                    <template v-slot:append>
                        <v-tooltip bottom >
                        <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="primary"
                            v-bind="attrs"
                            v-on="on"
                            class="mx-2"
                            >
                            mdi-magnify</v-icon>
                        </template>
                            <span>搜尋使用者</span>
                        </v-tooltip>
                    </template>
                    </v-text-field>
                </v-col>
            </v-row>
            </v-list-item> -->
            <v-list-item class="px-5 add-access">
                <v-autocomplete 
                    v-model="friends"
                    :disabled="isUpdating"
                    :items="people"
                    chipsc
                    hide-details
                    item-text="name"
                    item-value="name"
                    multiple
                    placeholder="關鍵字搜尋使用者"
                    label="新增授權使用者"
                    flat
                    color="dark grey"
                    hide-selected
                    @keydown.enter="addItem(friends)"
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
                <template v-slot:prepend>
                    <v-icon
                    class="mx-2"
                    >
                    mdi-account-search-outline</v-icon>
                </template>
            <template v-slot:append>
                <v-tooltip bottom >
                <template v-slot:activator="{ on, attrs }">
                <v-icon
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                    class="mx-2"
                    @keydown.enter="addItem(item)"
                    @click="addItem(item)"
                    >
                    mdi-account-plus-outline</v-icon>
                </template>
                    <span>新增使用者</span>
                </v-tooltip>
            </template>
                    </v-autocomplete>
            </v-list-item>
        <v-list dense class="access-box overflow-y-auto">
            <v-list-item 
            class="access-list"
            v-for="item in items1"
            :key="item.title" 
            two-line>
            <v-list-item-avatar>
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
                    dense
                    :items="items"
                    solo
                    :label="item.status"
                    id="default-select"
                    ></v-select>
                    </v-col>
                <v-col cols="2" class="pa-0 d-flex justify-center">
                    <v-btn
                        v-if="!drawerDisable"
                        icon
                        @click="deleteDialog=!deleteDialog"
                        color="red">
                        <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                    </v-col>
                </v-list-item-content> 
            </v-list-item>
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
    <v-dialog
        v-model="shareDialog"
        max-width="600px"
        >
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        v-bind="attrs"
        v-on="on"
        class="ml-3"
        color="blue"
        dark
        @click.stop="shareDialog = !shareDialog"
        >
        分享
        <v-icon>
            mdi-share-variant-outline
            </v-icon>
    </v-btn>
    </template>
    <v-spacer></v-spacer>  
        <v-card >
        <v-card-title class="card-title">
            <span class="title">分享設定</span>
            <!-- <v-icon>
                mdi-share-variant-outline
            </v-icon> -->
            <v-spacer></v-spacer>
            <v-icon
                @click="shareDialog = false;"
                > 
                mdi-close
                </v-icon> 
            </v-card-title>
        <v-card-text
            class="share-control-text"
            >
            <v-icon 
                class="info-icon"
                size="75"
                color="primary"> 
                mdi-folder 
                </v-icon> 
             <div class="file-info">
                <p class="file-info-title">資料夾名稱</p>
                <p class="file-info-detail">資料夾 (25MB)</p>
                </div>
            <div class="permission">
                <v-row>
                    <v-col cols="3" class="pb-0">
                        <span class="body-1 text--primary">權限設定</span>
                        <v-icon
                        class="ml-2"
                        size="25"
                        >
                        mdi-account-multiple
                        </v-icon>
                    </v-col>
                    <v-col cols="9" class="pb-0">
                        <v-select
                            v-model="sharingResult"
                            hide-details
                            dense
                            :items="sharingOpt"
                            solo
                            :label="'Select sharing style'"
                            id="default-select"
                            ></v-select>   
                            <p class="d-inline" v-if="sharingResult=='知道連結的使用者'">任何知道這個連結的網際網路使用者都能查看</p>
                            <p class="d-inline" v-if="sharingResult=='隱藏'">停止分享此項目</p>
                    </v-col>
                  
                </v-row>
                 <v-row  v-if="sharingResult!=='隱藏'" > 
                    <v-col cols="3" class="pb-0">
                        <span class="body-1 text--primary">密碼設定</span>
                        <v-icon
                            class="ml-2"
                            size="25"
                            >
                            mdi-link-lock
                            </v-icon>
                    </v-col>
                    <v-col cols="9" class="justify-end d-flex py-0">
                        <v-switch
                            dense
                            hide-details
                            inset
                            v-model="passwordSwitch"
                            flat
                            ></v-switch>
                    </v-col>
                </v-row>

                <v-row  v-if="sharingResult!=='隱藏'">
                    <v-col cols="12"  v-if="passwordSwitch && !passwordChanged">
                        <v-text-field v-if="passwordSwitch"
                            class="d-inline"
                            flat
                            v-model="password"
                            label="Password"
                            single-line
                            :rules="rules"
                            @keydown.enter="setPassword(password)"
                            >
                                <template v-slot:append>
                                    <v-icon @click="setPassword(password)"
                                        color="primary">
                                        mdi-subdirectory-arrow-left
                                    </v-icon>
                                </template>
                            </v-text-field>
                    </v-col>
                     <v-col cols="12"  v-if="passwordSwitch && passwordChanged">
                        <a @click="changePassword=!changePassword">Change Password</a>
                        <v-text-field  v-if="changePassword"
                            class="d-inline"
                            flat
                            label="Password"
                            single-line
                            :rules="rules"
                            @keydown.enter="setPassword(password)"
                            >
                                <template v-slot:append>
                                    <v-icon @click="setPassword(password)"
                                        color="primary">
                                        mdi-subdirectory-arrow-left
                                    </v-icon>
                                </template>
                            </v-text-field>
                    </v-col>
                </v-row>

                <v-row  v-if="sharingResult!=='隱藏'" > 
                    <v-col cols="3" class="pb-0">
                        <span class="body-1 text--primary">時效設定</span>
                        <v-icon
                            class="ml-2"
                            size="25"
                            >
                            mdi-calendar-month-outline
                            </v-icon>
                    </v-col>
                    <v-col cols="9" class="justify-end d-flex py-0">
                        <v-switch
                            dense
                            hide-details
                            inset
                            v-model="dateSwitch"
                            flat
                            ></v-switch>
                    </v-col>
                </v-row>
                <v-row  v-if="dateSwitch && sharingResult!=='隱藏'">
                    <v-col
                    cols="12"
                    sm="6"
                    >
                    <v-date-picker
                        v-model="dates"
                        range
                        :allowed-dates="setAllowDates"
                    ></v-date-picker>
                    </v-col>
                    <v-col
                    cols="12"
                    sm="6"
                    >
                    <v-text-field
                        v-model="dateRangeText"
                        label="時效範圍"
                        prepend-icon="mdi-calendar"
                        readonly
                    ></v-text-field>
                    日期: {{ dates }}
                    </v-col>
                </v-row>
                <!-- <v-row v-if="passwordSwitch">
                    <v-col cols="2">
                        <span class="body-1">時效設定</span>
                    </v-col>
                    <v-col cols="10">
                        <v-select
                            hide-details
                            dense
                            :items="duration"
                            solo
                            label="時間長度"
                            id="default-select"
                            ></v-select>
                    </v-col>
                </v-row> -->
            <v-row v-if="sharingResult!=='隱藏'"> 
                <v-col cols="3" class="pr-0">
                    <v-btn 
                        elevation="2"
                        @click="generateLink"
                        :loading="isLoading"
                        :disabled="sharingResult==null  || !passwordChanged"
                    >
                        <v-icon>
                            mdi-refresh
                        </v-icon>
                        更新連結</v-btn>
                </v-col>
                <v-col cols="9" v-if="showLink">
                    <v-text-field
                        flat
                        v-model="link"
                        hide-details
                        label="Outlined"
                        single-line
                        class="d-inline"
                        >
                        <template v-slot:append>
                             <div class="justify-end d-flex"
                                @click="copyItem()">
                                <v-icon size="25"
                                    color="primary"> 
                                mdi-link-variant
                                </v-icon> 
                                <span class="subtitle-1 ">複製連結</span>
                                </div>
                        </template>
                        </v-text-field>
                </v-col>
                <!-- <v-col cols="3" v-if="showLink" class="pl-0">
                   
                </v-col> -->
            </v-row>
            </div>
            <v-alert
                transition="fade-transition"
                :value="copied"
                dense
                text
                type="success"
                >
                連結複製成功
            </v-alert>
        </v-card-text>
        <v-card-actions class="pb-3" v-if="sharingResult=='隱藏'">
            <v-spacer></v-spacer>
            <v-btn
                class="pa-2 mx-2"
                color="primary"
                outlined
                @click="shareDialog = false;"
                >
            {{$t('cancel')}}
        </v-btn> 
            <v-btn
            class="p mx-2"
            depressed
            color="primary"
            @click="shareDialog = false;"
            >
            {{$t('save')}}
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog> 
   
    </div>
</template>


<script>

import moment from 'moment'
import axios from 'axios'
export default {
    
    components: {

    },
    watch: {

    },
    props: {

    },
    mounted(){
       this.setAllowDates();
    },
    computed: {
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
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
            dates: [],
            copied:false,
            showLink:false,
            isLoading:false,
            changePassword:false,
            duration:['1H','2H','6H','12H','1 Day','2 Day','7 Day'],
            passwordChanged:false,
            password:null,
            dateSwitch:false,
            passwordSwitch:false,
            rules: [(v) =>  !!v || "請輸入密碼"],
            searchResult:null,
            searchOrAdd: {
                name: "add",
                icon:'mdi-account-plus-outline'
                },
            searchOrAdds:[
                { name:'search', icon:'mdi-account-search-outline'},
                { name:'add', icon:'mdi-account-plus-outline'}
                ],
            loading: false,
            search: null,
            select: null,
            friends: ['Sandra', 'Britta'],
            people: [
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
            dialogDisable:false,
            drawerDisable:false,
            inherentSwitch: false,
            link:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lacus, ultrices sed dolor sit amet, commodo venenatis lectus.',
            info:false,
            drawer: false,
            sharingResult:null,
            sharingOpt:[ '知道連結的使用者', '隱藏'],
            items1: [
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
            ],
            dialog:false,
            deleteDialog:false,
            shareDialog:false,
            items: ['ReadWrite' ,'Deny', 'ReadOnly' ],
            headers: [
            {  
                text: '使用者',
                sortable: false,
                value: 'name',
                width: '240px'
            },
            { text: '權限', value: 'auth' },
            { text: '移除', value: 'delete' },
            ], 
            desserts: [
            {
                name: 'Frozen Yogurt',
                auth: 'ReadOnly',
            },
            {
                name: 'Ice cream sandwich',
                auth: 'ReadWrite',
            },
            {
                name: 'Eclair',
                auth: 'ReadOnly',
            },
            {
                name: 'Cupcake',
                auth: 'Deny',
            },
            {
                name: 'Gingerbread',
                auth: 'ReadOnly',
            },
            {
                name: 'Jelly bean',
                auth: 'Deny',
            },
            {
                name: 'Lollipop',
                auth: 'ReadOnly',
            },
            {
                name: 'Honeycomb',
                auth: 'Deny',
            },
            {
                name: 'Donut',
                auth: 'ReadWrite',
            },
            {
                name: 'KitKat',
                auth: 'ReadWrite',
            },
            ],
            editedIndex: -1,
            editedItem: {
                name: '',
                auth: '',
            },
        }
    },
    methods: {
        setAllowDates(val){
            return moment(val).add(+1, 'days').isSameOrAfter(moment());
        },
        copyItem(){
            this.copied=true;
            setTimeout((()=>{
                this.copied=false;
                }),2000);
        },
        generateLink(){
            this.isLoading=true;
            setTimeout((()=>{
                this.isLoading=false;
                this.showLink=true;
                }),2000);
           
        },
        setPassword(password){
            this.passwordChanged=true;
        },
        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },
        editHandler: function() {
            this.$emit('edit', {dataItem:this.dataItem});
        },
        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.desserts.splice(this.editedIndex, 1)
        },
        addItem(data){

        },
        showInfo(){
            this.info=true;
        },
    }
}
</script>
<style scoped lang="scss">
.exit{
    position:absolute;
    top:10px;
    right:10px;
}
.card-title{
    padding-bottom: 0px !important;
}
.access-control-text{
    height:auto;
    min-height: 500px;
    vertical-align: middle;
}

.info-box{
    padding:0px;
    margin:0px;
}
.info-icon{
    display: inline-block;
}
.file-info{
    display: inline-block;
    vertical-align: middle;
    padding-top: 15px;
    margin-left: 12px;
}
.file-info-title{
    margin-bottom: 5px;
    
}
.file-info-detail{
    margin-bottom: 5px;
}
.access-box{
    height:65%;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#E5E7E9 
}
.access-title{
    margin-top: 8px !important;
    color:#454545;
}
.control-box{
    padding-bottom: 0;
}
#default-select{
    //padding:0 !important;
    width:150px;
}
.add-access{

    background-color:#F2F3F4;
    min-height:70px;
}
.add-access-title{
    color:#454545;
}
.access-list{
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color:#E5E7E9;
}
</style>