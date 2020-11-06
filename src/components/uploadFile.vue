<template>
    <div class="upload">
         <grid 
            :style="{height: '660px'}"
            :data-items="items2"
            :columns="columns"
            :column-menu="columnMenu"
            :pageable="true"
            :skip= "skip"
            :take="take"
            :total="total"
            :sortable="true"
            :sort= "sort"
            :filter="filter"
            @pagechange="pageChangeHandler">
            <template v-bind:style="wrapper" v-slot:aa="props">
                <div>
                <!-- <customeButton :data-item = "props.dataItem"  @click="doSomething(props,dataItem)" v-bind:style="styleObjectA" >Select </customeButton> -->
                <button :data-item = "props.dataItem"  @click="doSomething(props)" v-bind:style="styleObjectA" >Select </button>
                </div>
            </template>
        </grid>  
            
        <form  v-on:submit.prevent="onSubmit" >
        <div id='post'>
            <label for="files">檔案 </label>
            <input name="userName" id="file" value="FILE " type="file"  ><br>
            <label for="files">JSON </label>
            <input type="file" id="json" onChange={handleUpload} /><br>
            <button type="submit" v-on:click="myFunction">Send</button>
        </div>
        </form>

    </div>
</template>
<script>

import axios from 'axios';
//import custome from './customCell.vue';
import { Grid } from '@progress/kendo-vue-grid';
//import { process } from '@progress/kendo-data-query';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
const formVersionId='2778a5f3-1024-4c97-9e09-892319689f6a'
const token = 
'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFCZXFQVjYwVG1fVnRPc3BraGlRY0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDQ1Njc0NjQsImV4cCI6MTYwNDU3MTA2NCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1kZXYuc3luY29ib3guY29tIiwiYXVkIjoicGFubzphbGwiLCJjbGllbnRfaWQiOiJzeW5jb2JveC1hcGktc3dhZ2dlciIsInN1YiI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImF1dGhfdGltZSI6MTYwNDU2NzQ2NCwiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkFZN0dFTlFERkhQQk8zVVZYWUlXMkhZTjdVVVlLM01aIiwiZm9yZ2VfZXhwaXJlc19kYXRlIjoiMDAwMeW5tDHmnIgx5pelIOaYn-acn-S4gCIsInByZWZlcnJlZF91c2VybmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwibmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwiZW1haWwiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.WRwHzs_ZpJwZ75veOLtEAteZTWuLQGdr1ZGlssmlPqYTWw3j6KSYBQUaa83QGP3fdEYCAW6GKzMwADWvCO4Ak8Yo5HYMphmZJaIllG0z7BAV_2ildMEZJL9xkIxbRapIoQR3MfDhGsta8wgiDuYzWDvBpzl-HXsz_IX5OmrH34eipH56Ff_D6tDAfrPP5ZyWYg02r0EXa3WbQTZNf-MKGdPXfIm8qlG9OVsbZMpbmZYgouR5Dl0e9FTGdHL_hp3wRU3Tpu2BrFeqIHx0DR-rWie_PfHk_BonwdAUU5QSFwQHI5S66u3UnzFgb4tFhldbjgNQLO5zV9U1ITw3hyjYeg';



//
//setting token
//預設是空字串，若API需要驗證，必須設定Token
//API.config.token = 'xxxx'

//Portal api
//API.api.main.{apiName}.{apiMethod}(params)

export default {

  name: 'UploadFile',

  components: { 
                'grid':Grid,
                //'customeButton':custome
              },
  beforeCreate() {
    console.log('beforeCreate 被執行');
        
  },
  created(){
    console.log('created 被執行');
    
      
  },
  mounted(){     
    console.log('mounted 被執行');
   
  },
  data: function(){
    console.log('DATA　FUNCTION');
    this.postData();
    var status ='';
        return{
        wrapper: {
             display: 'flex',
            'font-size': '18px',
            'text-align':'center',
            color: 'red',
            fontSize: '13px', 
        },
        styleObjectB:{
            
            'width':'100px',
            'margin': '-20px -50px',
            'position':'relative',
            'top':'50%',
            'left':'50%',
            'background-color': 'coral',
        },
        styleObjectA: {

            'width':'100px',
            'margin': '-20px -50px',
            'position':'relative',
            'top':'50%',
            'left':'50%'
        },
        skip: 0,
        take: 10,
        columnMenu: true,
        columns: [
            { title: 'Templates', cell:"aa" },
            //{ title: 'Template' ,template: "<button v-on:click='greet'>Greet</button>"},
            //div class='k-button'><span class='k-icon k-delete'>
            { field: 'id'},
            { field: 'createdUserId', title: 'createdUserId' },
            { field: 'createdDate', title: 'createdDate', width: '220px' },
            { field: 'createdUserName', title: 'createdUserName' },
            { field: 'fileName', title: 'fileName' },
        ],
        items:[],
        items2:[],
        //gridData:[],
        sort: [],
        filter: null,
        //dataItems:Object.entries(this.items2),
        status:status
      
    }
  },
//   watch:{
//       items:{
//           handler(){
//           console.log("items change");
//           console.log(this.items);
//       },
//       } 
//   },
  methods:{
    getstatus(){
        console.log(this.status);
        if (this.status =='200'){
            return true;
        }
        else
            return false;
    },
    doSomething: function(props){
        console.log("do something!!!!!!!!!!");
        console.log(props.props.dataItem.id);
        console.log(dataItem);
        this.postData2(props.props.dataItem.id);

    },
    changeTemplate: function(){

    },
    pageChangeHandler: function(event) {
            console.log(event.page);
            this.skip = event.page.skip;
            this.take = event.page.take;
            this.postData();
        },
    getData:function(){
        console.log("getData begin");
        axios
        .get('https://api-dev.syncobox.com/FormVersion/2778a5f3-1024-4c97-9e09-892319689f6a/DocumentReportTemplate',{ headers:{ Authorization : token } })
        .then(res => {
            this.items = res.data;
            console.log(res);
            return this.items;
        });
        console.log("getData excuted");
    },
    myFunction:function(){
        var file = document.getElementById("file").files[0];    //name = file
        var json = document.getElementById("json").files[0];    //name = schema
        var formdata = new FormData();
        formdata.append('file',file);
        let abc = this;
        var text = new String();
        var reader = new FileReader();
        reader.readAsText(json);
        console.log(json);
        reader.onload=function () { 
            text=reader.result;
            formdata.append('schema',text);

            axios({
            method: 'post',
            url: 'https://api-dev.syncobox.com/FormVersion/2778a5f3-1024-4c97-9e09-892319689f6a/DocumentReportTemplate',
            data: formdata,
            headers:{ Authorization : token } 
            })
            .then(response => (console.log(response),abc.getData()))
            .catch(function (error) {
                console.log(error);
            });
        }
        //this.getData();
        return false;                   
    },
    postData:function(){
        // private fetch(state: DataSourceRequestState): Observable<DataResult> {
        // const queryStr = `${toDataSourceRequestString(state)}`; //serialize the state
        // const hasGroups = state.group && state.group.length;
        var formdata = new FormData();
        formdata.append('formVersionId','2778a5f3-1024-4c97-9e09-892319689f6a' );
        console.log('postData started');
        //todo: server paging
        let state = {   filter: 0,
                        group: 0,
                        skip: this.skip,
                        sort: 0,
                        take: 10 };
        const queryStr = toDataSourceRequestString(state);
        console.log('queryStr is '+queryStr);
        this.$API.api.main.formVersionDocumentReportTemplate.all(formVersionId,queryStr)
            .then(res => {
            this.items2 = res.data.data;
            console.log("kendo post response")
            this.total=res.data.total;
            console.log('this total:'+ this.total);
            console.log(res);
            console.log(this.items2+'is items2');
            return this.items2;
        })
        .catch(function (error) {
                console.log(error);
        });
        console.log('postData excuted');
        //API.api.main.{apiName}.{apiMethod}(params)
        // axios({
        //     method: 'post',
        //     url: 'https://api-dev.syncobox.com/FormVersion/2778a5f3-1024-4c97-9e09-892319689f6a/DocumentReportTemplate/All',
        //     //params: queryStr,
        //     data: queryStr,
        //     headers:{
        //     'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFCZXFQVjYwVG1fVnRPc3BraGlRY0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDQ2NjAyMjIsImV4cCI6MTYwNDY2MzgyMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1kZXYuc3luY29ib3guY29tIiwiYXVkIjoicGFubzphbGwiLCJjbGllbnRfaWQiOiJzeW5jb2JveC1hcGktc3dhZ2dlciIsInN1YiI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImF1dGhfdGltZSI6MTYwNDY2MDIyMiwiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkFZN0dFTlFERkhQQk8zVVZYWUlXMkhZTjdVVVlLM01aIiwiZm9yZ2VfZXhwaXJlc19kYXRlIjoiMDAwMeW5tDHmnIgx5pelIOaYn-acn-S4gCIsInByZWZlcnJlZF91c2VybmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwibmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwiZW1haWwiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.f4gdyhhuoHq-VZTAnULr4g6TpcR5afgHCbwsn4CopxwoYyeK4m5_NI515NaRnPsoeq_lXm2xsp-Ksdw_45E33qVzVmvYufulQkOQKtP8VA8vp-lQgoQAahHtUqCY4X3NH0mGqU6Hy31KKpkRcjJ3am5xy-wD4vN_LBk1oS4zW2fSzVEv7Q_e7_u8-y5v6gsw4P510Qk8jnpTDzP7oA1MjgFEFSo896yuSTKILx4-lm_lopjV_Kfa_t_Ub5wYrFM3-c2qCx29b0bkJkuB61J2bcO6dIVQuLfLAH-Hdhkmn8Z-xFs-NCT2Rvegq0zM1g78SiwVkdm6DXMEYExvOENuIA'
        //     }
        //     })
        // .then(res => {
        //     this.items2 = res.data.data;
        //     console.log("kendo post response")
        //     this.total=res.data.total;
        //     console.log('this total:'+ this.total);
        //     console.log(res);
        //     console.log(this.items2+'is items2');
        //     return this.items2;
        // })
        // .catch(function (error) {
        //         console.log(error);
        // });
        // console.log('postData excuted');
        
        
    },
    postData2:function(id){
        // private fetch(state: DataSourceRequestState): Observable<DataResult> {
        // const queryStr = `${toDataSourceRequestString(state)}`; //serialize the state
        // const hasGroups = state.group && state.group.length;
        console.log('postData2222 started');
        var formdata = new FormData();
        formdata.append('formVersionId','2778a5f3-1024-4c97-9e09-892319689f6a' );
        formdata.append('documentReportTemplateId ',id );
        console.log(this.items2[0].id + "  is this");
        let state = {   filter: 0,
                        group: 0,
                        skip: 0,
                        sort: 0,
                        take: 10 };
        const queryStr = toDataSourceRequestString(state);
        console.log('queryStr is '+queryStr);
        let id2=id;
        let abc = this;
        axios({
            method: 'post',
            url: 'https://api-dev.syncobox.com/FormVersion/2778a5f3-1024-4c97-9e09-892319689f6a/DocumentReportTemplate/04b466ac-4c1e-4b65-a798-eeb0d17d0064',
            params: queryStr,
            data: formdata,
            headers:{
            'Authorization': token
            }
            })
        .then(res => {
            abc.status = res.status;
            console.log("kend22222 post response")
            console.log(res);
            console.log("id: "+id2+" posted!!!!");
            console.log(status);
            
        })
        .catch(function (error) {
                console.log(error);
        });
        
        console.log('postData2222 excuted' );
        
    }

        
        
  },
  computed:{
        // result: {

        // get: function() {
        //     console.log('slice is :'+this.items2.slice(this.skip, this.take + this.skip));
        //     return this.items2.slice(this.skip, this.take + this.skip);
        //     }
        // },
        // total () {
        //     return this.items2 ? this.items2.length : 0;
        // }  
  }
}
</script>
<style>
#post{
    text-align: left;
    padding:50px;
}
</style>
