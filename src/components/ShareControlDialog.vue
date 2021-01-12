<template>
  <div>      
    <v-dialog
        v-model="shareDialog"
        max-width="700px"
        persistent
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
        <v-card-title>
            <span class="title">分享設定</span>
            <v-spacer></v-spacer>
            <v-icon
                @click="shareDialog = false;"
                > 
                mdi-close
                </v-icon> 
            </v-card-title>
        <v-card-text>
            <v-row>
                <v-icon 
                    class="d-inline"
                    size="75"
                    color="primary"> 
                    mdi-folder 
                    </v-icon> 
                <div class="file-info">
                    <p class="mb-1">資料夾名稱</p>
                    <p class="mb-1">資料夾 (25MB)</p>
                    </div>
                </v-row>
            <div>
                <v-row>
                    <v-col cols="3">
                        <v-icon
                        class="mr-2"
                        size="25"
                        >
                        mdi-account-multiple
                        </v-icon>
                        <span class="body-1">權限設定</span>
                    </v-col>
                    <v-col cols="9" class="justify-end d-flex">
                        <v-switch
                            v-model="sharingResult"
                            dense
                            hide-details
                            inset
                            flat
                            ></v-switch>
                    </v-col>
                </v-row>
                 <v-row  v-if="sharingResult " > 
                    <v-col cols="3" >
                        <v-icon
                            class="mr-2"
                            size="25"
                            >
                            mdi-link-lock
                            </v-icon>
                        <span class="body-1">密碼設定</span>
                    </v-col>
                    <v-col cols="9" class="justify-end d-flex">
                        <v-switch
                            dense
                            hide-details
                            inset
                            v-model="passwordSwitch"
                            flat
                            ></v-switch>
                    </v-col>
                </v-row>
                <v-row  v-if="sharingResult">
                    <v-col cols="12"  v-if="passwordSwitch " class="pt-0">
                         <a v-if="passwordSwitch && changePassword" @click="changePassword=!changePassword">Change Password</a>
                        <v-text-field v-if="!changePassword"
                            class="d-inline"
                            flat
                            v-model="password"
                            label="Password"
                            single-line
                            :rules="rules"
                            @keydown.enter="setPassword(password); updatePassword()"
                            :messages="message"
                            >
                            </v-text-field>
                    </v-col>
                </v-row>
                <v-row  v-if="sharingResult" > 
                    <v-col cols="10" >
                        <v-icon
                            class="mr-2"
                            size="25"
                            >
                            mdi-calendar-month-outline
                            </v-icon>
                        <span class="body-1">時效設定 </span>
                        <span>
                             <span class="body-1" v-if="dates!=null && dateSwitch && checkValidate()">  {{dates}} </span>
                            <span class="body-1" v-if="timePicker!=null && dateSwitch && checkValidate()">  {{timePicker}}</span>
                            </span>
                    </v-col>
                    <v-col cols="2" class="justify-end d-flex">
                        <v-switch
                            dense
                            hide-details
                            inset
                            v-model="dateSwitch"
                            flat
                            ></v-switch>
                    </v-col>
                </v-row>
                <v-row  v-if="sharingResult">
                    <v-col cols="6" class=" py-0">
                       <span v-if="dateSwitch">
                             <v-menu
                                ref="menu"
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                :return-value.sync="dates"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    ref="dateTextField"
                                    @change="setDates(dates);$refs.menu.save(dates)"
                                    :rules="dateRules"
                                    v-model="dates"
                                    :error="datesError"
                                    :error-messages="datesErrorMessage"
                                    label="日期: (yyyy-mm-dd)"
                                    prepend-icon="mdi-calendar"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                @change="$refs.menu.save(dates);setDates(dates)"
                                @keydown.enter="$refs.menu.save(dates);setDates(dates)"
                                v-model="dates"
                                no-title
                                :allowed-dates="setAllowDates"
                                scrollable
                                >
                                </v-date-picker>
                            </v-menu>
                        </span>
                    </v-col>
                      <v-col cols="6" class=" py-0">
                       <span v-if="dateSwitch">
                            <v-text-field
                                    :error-message="timeErrorMessage"
                                    @change="setTime(timePicker)"
                                    :rules="timeRules"
                                    v-model="timePicker"
                                    :value="timePicker"
                                    label=" 時間: (hh:mm)"
                                    prepend-icon="mdi-clock-outline"
                                ></v-text-field>
                        </span>
                    </v-col>
                </v-row>
            <v-row v-if="sharingResult"> 
                <v-col cols="9" >
                    <v-text-field
                        v-if="showLink"
                        id="copyLink"
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
                                    > 
                                mdi-link-variant
                                </v-icon> 
                                <span class="subtitle-1 ">複製連結</span>
                                </div>
                        </template>
                        </v-text-field>
                </v-col>
                <v-col cols="3" class="justify-end d-flex">
                    <v-btn 
                        elevation="2"
                        @click="generateLink(); changePassword=!changePassword"
                        :loading="isLoading"
                        :disabled=" !sharingResult  || (!password&&passwordSwitch) || datesError || timeError"
                        color="primary"
                    >
                        <v-icon>
                            mdi-refresh
                        </v-icon>
                        更新</v-btn>
                </v-col>
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
        <v-card-actions class="pb-3" v-if="!sharingResult">
            <v-spacer></v-spacer>
            <v-btn
                class="pa-2 mx-2"
                color="primary"
                outlined
                @click="shareDialog = false;"
                >
            取消
        </v-btn> 
            <v-btn
            class="p mx-2"
            depressed
            color="primary"
            @click="shareDialog = false;"
            >
            <v-icon>
                mdi-refresh
                </v-icon>
                更新
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog> 
    </div>
</template>

<script>
import moment from 'moment'
export default {
    mounted(){
       this.setAllowDates();
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
            datesErrorMessage:null,
            timeErrorMessage:null,
            timeError:false,
            datesError:false,
            dateMenu:false,
            message:null,
            dates: null,
            timePicker:null,
            copied:false,
            showLink:false,
            isLoading:false,
            changePassword:false,
            password:null,
            dateSwitch:false,
            passwordSwitch:false,
            rules: [(v) =>  !!v || "請輸入密碼"],
            dateRules:[(v) =>  moment(v,"YYYY-MM-DD", true).isValid() || "請輸入正確格式"],
            timeRules:[(v) =>  moment(v,"HH:mm", true).isValid() || "請輸入正確格式"],
            name:null,
            addMemberDialog:false,
            link:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse odio lacus, ultrices sed dolor sit amet, commodo venenatis lectus.',
            sharingResult:null,
            sharingOpt:[ '知道連結的使用者', '隱藏'],
            shareDialog:false,
        }
    },
    methods: {
        checkValidate(){
            if( moment(this.dates).isValid() & moment(this.timePicker,"HH:mm", true).isValid()){
                return true
            }
            else{
                return false
            }
        },
        setAllowDates(val){
            return moment(val).add(+1, 'days').isSameOrAfter(moment());
        },
        copyItem(){
            this.copied=true;
            var text = this.link;
            navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');});
            setTimeout((()=>{
                this.copied=false;
                }),2000);
        },
        generateLink(){
            this.password=null;
            this.isLoading=true;
            setTimeout((()=>{
                this.isLoading=false;
                this.showLink=true;
                }),2000);
        },
        setPassword(password){  
            this.password=password; 
        },
        setDates(dates){
             this.dateMenu=false;
             console.log(moment(dates,"YYYY-MM-DD", true).isValid())
            if (this.setAllowDates(dates)){
                this.dates=dates;
                console.log(this.dates);
                this.datesError=false;
                this.datesErrorMessage=null;
            }
            else{
                this.datesError=true;
                if (!moment(dates,"YYYY-MM-DD", true).isValid()){
                    this.datesErrorMessage="請輸入正確格式";
                }
                else{
                    this.datesError=true;
                    this.datesErrorMessage="請輸入今天之後的日期";
                }
                console.log(this.dates);
            }
        },
        setTime(timePicker){
            if (moment(timePicker,"HH:mm", true).isValid()){
                this.timePicker=timePicker;
                this.timeSuccess=true;
                this.timeError=false;
            }
            else{
                this.timeSuccess=false;
                this.timeError=true;
                this.timeErrorMessage=this.message;
            }
        },
    }
}
</script>
<style scoped>
.file-info{
    display: inline-block;
    vertical-align: middle;
    padding-top: 15px;
    margin-left: 12px;
}

</style>