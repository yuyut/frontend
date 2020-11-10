<template>
    <div class="upload">
        <keep-alive>
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
            <template v-slot:aa="data" display: flex; align-items: center;>
                <customeButton  :dataItem="data" :id="data.props.dataItem.id" :currentId="parentCurrentId" @change="changeCurrentId" >YESSelect </customeButton>
            </template>
        </grid>  
         </keep-alive>
        <form  v-on:submit.prevent="onSubmit" >
        <div id='post'>
            <label for="files">檔案 </label>
            <input name="userName" id="file" value="FILE " type="file"  ><br>
            <label for="files">JSON </label>
            <input type="file" id="json" onChange={handleUpload} /><br>
            <button type="submit" v-on:click="myUpload">Send</button>
        </div>
        </form>

    </div>
</template>
<script>

import axios from 'axios';
import custome from './customCell.vue';
import { Grid } from '@progress/kendo-vue-grid';
//import { process } from '@progress/kendo-data-query';
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
const formVersionId='2778a5f3-1024-4c97-9e09-892319689f6a'
const token = 
'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkFCZXFQVjYwVG1fVnRPc3BraGlRY0EiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDQ4OTIyNDMsImV4cCI6MTYwNDg5NTg0MywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1kZXYuc3luY29ib3guY29tIiwiYXVkIjoicGFubzphbGwiLCJjbGllbnRfaWQiOiJzeW5jb2JveC1hcGktc3dhZ2dlciIsInN1YiI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImF1dGhfdGltZSI6MTYwNDg5MjI0MywiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkFZN0dFTlFERkhQQk8zVVZYWUlXMkhZTjdVVVlLM01aIiwiZm9yZ2VfZXhwaXJlc19kYXRlIjoiMDAwMeW5tDHmnIgx5pelIOaYn-acn-S4gCIsInByZWZlcnJlZF91c2VybmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwibmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwiZW1haWwiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.KEQnFWsG2NhEWAqvrxZZgs2yCBZxz_KO3FyH5__g5KFLbc93T0VigKdy7pMHMPoEl8JAD8s2aagQahQghQ6TUFiQxQ8OFYDpVEGRzfTfUrnKwoDL_I2YhFlWnAWZOFSMrdO2JZtQ5W5FlY4-5NuDNH1YMQEceg_PW82Y9vsLxp5_xPTLLosquYpps_bb7sZ0o7ZUI6dTtN0tNQJ2o4YsJRtS6gq-QWr-3ac79KlcCMSJaRzXdhlAQHYUWs9VlNOpMINyIqNQYU0maugrctFF9k38opUvtXZt78K3JfFoKavqEqBcQ0EavNk67DlEPKhAbF84PRW-j9M9n8xxV01DEQ';



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
                'customeButton':custome
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
    this.checkParentCurrentId();
    this.postData();
   
    var status ='';
        return{

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
        parentCurrentId:null
      
    }
  },
  methods:{
    checkParentCurrentId(){
        let vm=this;
        this.$API.api.main.formVersion.get(formVersionId)
        .then(res => {
            console.log("Check Parent ID");
            vm.parentCurrentId = res.data.appliedDocumentReportTemplateId;
            console.log(vm.parentCurrentId)
        })
        .catch(function (error) {
                console.log(error);
        });
    },
    changeCurrentId(id){

        this.parentCurrentId=id;
        console.log(this.parentCurrentId);
    },
    doSomething: function(data){
        console.log("do something!!!!!!!!!!");
        console.log(data.props.dataItem.id);
        //this.postTemplate(data.props.dataItem.id);

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
    myUpload:function(){
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
        })
        .catch(function (error) {
                console.log(error);
        });
        console.log('postData excuted');

        
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
