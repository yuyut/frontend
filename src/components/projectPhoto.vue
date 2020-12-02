<template>
  <div>
    <v-card >
      <v-card-title>
        Photos
        <v-spacer/>
        <p style="margin-bottom:0px;">排序:
        <a class="sorting-text">
          時間 </a>
        <a class="sorting-text">
          人員 </a>
        </p>
        &numsp; | &#160;
        <p style="margin-bottom:0px;">順序:
        <a class="sorting-text">
          遞增 </a>
        <a class="sorting-text">
        遞減 </a>
        </p>
        <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          >
        <template v-slot:activator="{ on, attrs }">
            <v-btn 
                v-bind="attrs"
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
                <span class="headline">新增圖片</span>
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
              :disabled="buttonDisable(file)"
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
      <v-dialog
        v-model="imageDialog"
        persistent
        max-width="1200px"
      >
      <v-spacer></v-spacer>
      <template v-slot:activator="{ on, attrs }">
      <v-card-text> 
        <v-row  class="row123" >
          <v-col
            cols="12"  lg="2" sm="3" md="4" xs="6"
            v-for="(photo, index) in images"
            :key="index"
          > 
          <v-hover
            v-slot="{ hover }"
            open-delay="200"
          >
          <v-card class="image-grid-card"
          :elevation="hover ? 12 : 2"> 
            <v-img 
            v-on="on"
            v-bind="attrs"
            @click="changeCurrentImage(photo.image)"
            max-height="350"
            contain
            :src="(photo.image == undefined) ? 'https://picsum.photos/id/11/10/6': photo.image"
            aspect-ratio="1.7"
            class="image-inside-card"
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
            </v-img> 
              <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
               <v-icon class="edit-icon"
                v-bind="attrs"
                v-on="on"
                @click="editHandler"
                color="primary"
                >  mdi-pencil
                </v-icon> 
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title>EDIT</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="myDelete(photo.id)">
                  <v-list-item-title>DELETE</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
            <div class="text-bottom"> 
               ID: {{photo.id}}
               <a class="" v-if="!photo.readMoreActivated" @click="activateReadMore(photo)" >
              Read more...
              </a>
              <p v-if="photo.readMoreActivated" >
              建立者: {{photo.createdUserName}} &nbsp;  <br/>建立時間: {{time(photo.createdDate)}}  </p>
            <!-- <UserMenu :userInfo="{id:12,name:'asdfasdfsdf' }" /> -->
            </div>
          </v-card>
          </v-hover>
          </v-col>
        </v-row>
        </v-card-text>
        </template>
        <v-card>
         <div id="right-drawer">
          <v-icon
            id="navigation-close-btn"
            color="blue darken-1"
            text
            @click="imageDialog = false;"
            >
            mdi-close
            </v-icon>
          <v-list-item two-line>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>System Admin</v-list-item-title>
              <v-list-item-subtitle>六天前</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
            <v-textarea
            solo
            label="textarea"           
          ></v-textarea>
          <v-divider></v-divider>
          </div>
        <v-card-title>
        <span class="headline">Preview</span>
        </v-card-title>
          <v-card-text>
            <div :style="{height:'500px', width:'800px',padding:'10px'}" class="justify-center">
              <sb-markup-viewer
                :image-url='currentImage'
              ></sb-markup-viewer>
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>   
        <v-progress-circular v-if="loading && (!bottom)"
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
      images:[],
      bottom:false,
      input:null,
      newData:null,
      page:0,
      pageSize:24,
      total:0,
      loading:false,
      skip: 0,
      take: 10,
      sort: [
              { field: 'createdDate', dir: 'desc' }
            ],
      filter: null,
      componentKey: 0,
      currentImage:null,
      imageDialog:false,      
      dialog:false,
      dialog1:false,
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
    changeCurrentImage(image){
      this.currentImage = image;
    },
    editHandler: function() {
    this.$emit('edit', {dataItem:this.dataItem});
    },
    activateReadMore(photo){
      photo.readMoreActivated = true;
    },
    isScrollToPageBottom(){
      console.log(this.total / this.pageSize);
      console.log(Math.floor(this.total / this.pageSize));
       if(this.page >= Math.floor(this.total / this.pageSize)){
          this.bottom = true;
       }
        else {
          console.log("not bottom")
          this.bottom = false;
        }
            
    },
    handScroll(){
      console.log("scrolling");
      if(!this.loading && this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 150/*滾動響應區域高度取150px*/)){
        this.isScrollToPageBottom();
       if(!this.bottom){
          console.log("fetchdata");
          
          this.postData();
          //DONE: show loading icon
       }
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
    let state2 = {   
                take: 10,
                skip: 0,
                sort: this.sort
                  };
      const queryStr = toDataSourceRequestString(state2);
      console.log(queryStr);

      if(this.page==0)  this.page++;
      
      this.loading = true;
      let state = {   
                    page: this.page,
                    pageSize: this.pageSize,
                  };

      let vm = this;
      this.$API.api.main.projectPhoto.all(this.projectId,state,this.ConfigJSON)
          .then(res => {
          // handle success
          //DONE: page count = response.total/ page size
          //DONE: page ++, but consider the page bottom case Loading = false
          //DONE: photos data array 
          //DONE: remove the loading icon
          //DONE: get photos and put it in the DOM (vue updates)
          console.log(res);
          this.total = res.data.total;
          this.loading = false;

          //CONCAT CONCAT CONCAT!!!!!
          this.photosData = vm.photosData.concat(res.data.data);
          this.newData = res.data.data;
          this.page++;
      })
      .then(function(){
        vm.getPhotos(vm.newData);
        
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm');
        return time;
    },
    myUpload:function(){
      var file = this.file;    //name = file
      var formdata = new FormData();
      formdata.append('file',file);
      let vm = this;
      this.$API.api.main.projectPhoto.post(this.projectId,'GeneralPicture',formdata)            
      .then(res => {
        console.log(res);
        //TODO: update datas get ID? metadata
        // let index = this.photosData.findIndex(p => p.id === input);
        // let updated = Object.assign({},this.photosData[index], this.photosData[index]);
        // this.photosData.splice(index, 1, updated);
        this.file = null;
        this.$API.api.main.photo.get(this.projectId,'GeneralPicture',formdata) 
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    myDelete:function(input){
      if (input) {
        console.log(this.photosData.length);
        let index = this.photosData.findIndex(p => p.id === input);
        this.photosData.splice(index, 1);
         console.log(this.photosData.length);
      }
      this.$API.api.main.photo.delete(input)            
      .then(res => {
        //DONE:update datas
        //empty input
        this.input = null;
          
      })
      .catch(function (error) {
          console.log(error);
      });
    },
    buttonDisable(stuff){
      if(stuff)
          return false;
      else 
          return true;
    },
    checkCurrentImage(image){
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
    getPhotos(datas){
      let vm = this;
      for (let i = 0; i < datas.length; i++) {
        //let index = this.photosData.findIndex(x => x.id == datas[i].id); //.image = reader.readAsDataURL(res.data);
        let currentIndex = this.images.length - 1; //.image = reader.readAsDataURL(res.data);
        this.$API.api.main.photo.getData(datas[i].id,null,this.Config)            
        .then(res => {
          const reader = new FileReader();
          if (res.data) {
            reader.readAsDataURL(res.data);
            //vm.set(vm.photosData[index],image,reader.readAsDataURL(res.data));
            //vm.photosData[i]["image"] = reader.readAsDataURL(res.data);
            reader.onloadend = function() { 
            vm.$set(vm.images[currentIndex],'image',reader.result);
            vm.$set(vm.images[currentIndex],'readMoreActivated',false);
             //vm.$forceUpdate();      
            };
          }
        })
        .catch(function (error) {
          vm.photosData.splice(index, 1);
          console.log(error);
          console.log("can't find photo");
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
    height: auto;
    min-height: 2rem;
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
    padding-left: clamp(1rem, 10vw, 2rem); 
    padding-right: clamp(1rem, 10vw, 2rem);
  }
  .row123{
    height : auto;
  }
  .edit-icon{
    margin:5px;
    float: right;
  }
  .image-grid-card{
    padding:5px;
  }
  .sorting-text{
    margin-bottom:0px;
  }
  .sorting-text:link{
    color:gray;
  }
   .sorting-text:visited{
    color:gray;
  }
  .sorting-text:hover{
    background-color:gray;
    color:white;
  }
  #navigation-close-btn{
    position:absolute;
    top:0;
    right:0;
    margin-top:5px;
    margin-right:5px;
    z-index: 15;
  }
  #right-drawer{
    float:right;
    width:350px;
  }

</style>
