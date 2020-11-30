<template>
  <div>
    <v-card class="border-card">
      <v-card-title  :style="{height:'60px'}">
        Photos
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          >
        <template v-slot:activator="{ on }">
            <v-btn 
                color="primary"
                dark
                v-on="on"
                id="uploadBtn"
                class:="px-3"
            >
                新增圖片
          </v-btn>
        </template>
        <v-spacer></v-spacer>  
          <v-card>
            <v-card-title>
                <span class="headline">{{$t('uploadTemplate')}}</span>
            </v-card-title>
            <v-card-text>
              <v-file-input 
              v-model="file"
              :rules="rules"
              id="docfile"
              accept="image/*"
              label="File input (image)"
              ></v-file-input>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
              color="blue darken-1"
              text
              @click="dialog = false;"
              >
              {{$t('close')}}
              </v-btn>
              <v-btn
              :disabled="buttonDisable()"
              color="blue darken-1"
              text
              @click="dialog = false; myUpload();"
              >
              {{$t('save')}}
              </v-btn>
          </v-card-actions>
          </v-card>
      </v-dialog>    
      </v-card-title>
      <v-spacer></v-spacer>
      <div> 
        <v-row :align="'end'" >
          <v-col
            cols="12"  lg="2" sm="3" md="4" xs="6"
            v-for="(photo, index) in photosData"
            :key="index"

          > 
          <v-hover
            v-slot="{ hover }"
            open-delay="200"
          >
          <v-card class="image-grid-card"
          :elevation="hover ? 12 : 2">
          <div>
         
            <v-img 
            max-height="350"
            contain
            :src="photo.image"
            aspect-ratio="1.6"
            class="123"
            alt="random image"
            > 
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>

              
              <!-- <img 
              class="image-card "
              lazyLoad
              :id="photo.id"
              alt="random image"
              >   -->
            </v-img> 
            <div class="text-bottom"> 
              <p class="overflow-textbox text-bottom"> MONKEY MONKEY MONKEY <br/>
               建立者: {{photo.createdUserName}} &nbsp;  建立時間: {{time(photo.createdDate)}}  </p>
              <!-- <UserMenu :userInfo="{id:12,name:'asdfasdfsdf' }" /> -->
            </div> 
            </div>
          </v-card>
          </v-hover>
          </v-col>
        </v-row>
        </div>
        <v-progress-circular v-if="loading"
          indeterminate
          color="primary"
        ></v-progress-circular>
    </v-card>
  </div>
</template>

<script>
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
import moment from 'moment'
import UserMenu from './SystemUserMenu'
import axios from 'axios'
export default {

  directives:{
    lazyLoad: {
      inserted: el => {
        async function loadImage() {
         var result;
         
          //console.log(result);
            await Vue.prototype.$API.api.main.photo.getData(el.id,null,Vue.prototype.$Config)            
            .then(res => {
              const reader = new FileReader();
              if (res.data) {
                console.log(res)
                result = reader.readAsDataURL(res.data);
                reader.onloadend = function() { 
                  result = reader.result; 
                  el.src=result;
                  //Vue.prototype.$img[el.id]=result;
                  //console.log(Vue.prototype.$img[el.id]);
                  
                };
              }
            })
            .catch(function (error) {
                console.log(error);
            }); 
            console.log("loadImage DONE");
        }

        function handleIntersect(entries, observer) {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(el);
            }
          });
        }

        function createObserver() {
          const options = {
            root: null,
            threshold: "0"
          };
          const observer = new IntersectionObserver(handleIntersect, options);
          observer.observe(el);
        }
        if (window["IntersectionObserver"]) {
          createObserver();
        } else {
          loadImage();
        }
      }
    }
  },

  components: {

  },
  props: {

  },
  watch:{
    // photosData: {
    //   deep: true,
      
    //   // We have to move our method to a handler field
    //   handler(){
    //     console.log('The list of colours has changed!');
    //     this.$forceUpdate();
    //   }
      
    // }

  },
  data() {
    return {
      page:1,
      pageSize:18,
      total:0,
      loading:false,
      skip: 0,
      take: 10,
      sort: [
              { field: 'createdDate' }
              ],
      filter: null,
      componentKey: 0,
      currentImage:null,
      dialog:false,
      imageURLs:[],
      photosData:[],
      is_data_fetched: false,
      file:null,
      rules: [
        v => !!v || 'Required Content',
      ],
    };
  },
  computed: {
      projectId(){
        return this.$route.params.projectId;
    },
  },
  methods: {
    isScrollToPageBottom(){
       if(page == floor(this.total / this.pageSize))
           return true
        else 
            return false
    },
    handScroll(){
      console.log("scrolling");
      debugger
     if(this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 50/*滾動響應區域高度取50px*/)){
        console.log("fetchdata");
        debugger
        //TODO: show loading icon
      }
    },
    scrollTop(){
      return Math.max(
      //chrome
      document.body.scrollTop,
      //firefox/IE
      document.documentElement.scrollTop);
    },
    documentHeight(){
      //現代瀏覽器（IE9+和其他瀏覽器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
      return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
    },
    //獲取頁面瀏覽器視口的高度
    windowHeight(){
      //document.compatMode有兩個取值。BackCompat：標準相容模式關閉。CSS1Compat：標準相容模式開啟。
      return (document.compatMode == "CSS1Compat") ? document.documentElement.clientHeight : document.body.clientHeight;
    },
    postData:function(){
      this.loading = true;
      let kendoState = {   
                    skip: 1,
                    take: 10};
      let state = {   
                    page: this.page,
                    pageSize: this.pageSize};
      const queryStr = toDataSourceRequestString(state);
      const config =  {'Authorization': ' Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ik9NZzNCcDJ6b1g0b3pJZEJfdHc1ZlEiLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE2MDY3MTYzMDksImV4cCI6MTYwNjcxOTkwOSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS1kZXYuc3luY29ib3guY29tIiwiYXVkIjoicGFubzphbGwiLCJjbGllbnRfaWQiOiJzeW5jb2JveC1hcGktc3dhZ2dlciIsInN1YiI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImF1dGhfdGltZSI6MTYwNjcxNjMwOSwiaWRwIjoibG9jYWwiLCJBc3BOZXQuSWRlbnRpdHkuU2VjdXJpdHlTdGFtcCI6IkFZN0dFTlFERkhQQk8zVVZYWUlXMkhZTjdVVVlLM01aIiwiZm9yZ2VfZXhwaXJlc19kYXRlIjoiMDAwMeW5tDHmnIgx5pelIOaYn-acn-S4gCIsInByZWZlcnJlZF91c2VybmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwibmFtZSI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwiZW1haWwiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImI4MDZiMTZmLWEzY2YtNDJkZS1iN2Q4LWFjOGQzZTgyYzk4MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJxd2Vyb28wNTI4QGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InF3ZXJvbzA1MjhAZ21haWwuY29tIiwic2NvcGUiOlsicGFubzphbGwiXSwiYW1yIjpbInB3ZCJdfQ.qbs_olTJpe62kYyhUxmuHe6OII_tCEjJy7nXuk9x9-5T9VonEsSnL6W5mK1XpAicXqJHGRCvBbfIFI_8X0qGNUddjlDZQOse2ToTal5W_xLlNq-AZrJqQRqIhDjs6omdenfhYvXDKGY9Ai6XfefxTdpzwNQWFiXxFXCXPPzMrSbPCjQ_poEzoYNtrS34RXZShH2m4zZFNQk0nvL6VF8m50PqarCFx5Xwq0Hjl5kPPceUCaQ5dJvB_ZmbdmdusuBIO9O5n1LPFd1_d8uJcdZ02OD8jVgjVdHmMex-5HnRQlqWVaTjpUAm9TipiBd1RfGHq6RzLzvb8uGUVEK_IQTQZg'};
      const options = {
        method: 'POST',
        headers: {...config, 'content-type': 'application/json-patch+json'  },
        data: state,
        url: 'https://api-dev.syncobox.com/Project/5252057b-5fa6-4eba-9e75-a9b9cd972b2f/Photo/All',
      };
      const axios = require('axios');
      let vm = this;
      axios(options)
      .then(function (response) {
        // handle success
        console.log(response);
        //DONE: page count = response.total/ page size
        //DONE: page ++, but consider the page bottom case Loading = false
        //TODO: photos data array 
        //TODO: remove the loading icon
        //TODO: get photos and put it in the DOM (arranging total photos)
        if(vm.total == 0){
          vm.total = response.data.total;
        }
        vm.loading = false;
        vm.page++;
        vm.photosData.push(response.data);
        vm.getPhotos(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
      // let vm = this;
      // this.$API.api.main.projectPhoto.all(this.projectId,state,this.ConfigJSON)
      //     .then(res => {
          
      //     console.log(res);
      //     debugger
      // })
      // .catch(function (error) {
      //     console.log(error);
      // });
    },
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm');
        return time;
    },
    forceRerender() {
      this.componentKey += 1;
      console.log("forced");
    },
    myUpload:function(){
      var file = this.file;    //name = file
      var formdata = new FormData();
      formdata.append('file',file);
      let vm = this;

      vm.$API.api.main.projectPhoto.post(this.projectId,'GeneralPicture',formdata)            
      .then(res => {
        console.log(this);
        console.log("uploaded");
        (async ()=>{

        await this.getProjectPhotosId();
        await vm.$forceUpdate();     
        })();
        console.log("out of");
          
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    buttonDisable(){
      if(this.file)
          return false;
      else 
          return true;
    },
    checkCurrentImage(image){
      console.log(image);
      this.currentImage = image;
    },
    Config(e) {
      e['responseType'] = "blob";
      return e
    },
    ConfigJSON(e) {
    e.headers['content-type'] = "application/json-patch+json";
    return e
    },
    async getPhotos(datas){
      let vm = this;
      for (let i = 0; i < datas.length; i++) {
        await this.$API.api.main.photo.getData(datas[i].id,null,this.Config)            
        .then(res => {
          const reader = new FileReader();
          if (res.data) {
            vm.photosData.find(x => x.id == datas[i].id).image = reader.readAsDataURL(res.data);
            //vm.photosData[i]["image"] = reader.readAsDataURL(res.data);
            reader.onloadend = function() { 
            vm.photosData.find(x => x.id == datas[i].id).image = reader.result;       
             //vm.$forceUpdate();      
            };
          }
        })
        .catch(function (error) {
            console.log(error);
        }); 
      }
    },

    // async getProjectPhotosId() {
    //   let vm = this;
    //   await this.$API.api.main.projectPhoto.get(this.projectId)            
    //   .then(res => {
    //       if (res.data) {
    //         vm.photosData = res.data;
    //         //vm.getPhotos();
    //       }
    //       return new Promise ((resolve, reject) => {
    //         console.log(resolve);
    //       })
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   }); 
       
    // },
    
  },
  created() {
    //this.getProjectPhotosId();
    this.postData();
    window.addEventListener('scroll', this.handScroll)
  },
  mounted() {
    
  },
  beforeDestroy() {
    
  },
  
}
</script>

<style >
  .bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    vertical-align: bottom;
    height: 100%;
  }
  .image-card{
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    max-width:100%;
    max-height:100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }
  .text-bottom {
    vertical-align: bottom;
    width: auto;
    height: 5vh;
    max-height: 3rem;
    word-wrap: break-word;
  }
  .overflow-textbox{
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-right: 1rem;
  }
  .border-card{
    padding: clamp(1rem, 10vw, 2rem); 
  }


</style>
