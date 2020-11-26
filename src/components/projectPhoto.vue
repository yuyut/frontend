<template>
  <div>
    <v-card>
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
      <div v-if="is_data_fetched" > 
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
          <v-card
          :elevation="hover ? 12 : 2">
         
            <!-- <v-img 
            max-height="350"
            contain
            :src="my"
            aspect-ratio="1.6"
            class="123"
            alt="random image"
            > -->
             <img 
             class="image-card"
              v-lazyLoad
              :id="photo.id"
              contain
              aspect-ratio="1.6"
              alt="random image"
            >
            <div class="bottom-gradient"></div>
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
            <!-- </v-img>  -->
            <div class="text-bottom"> 
              <p class="overflow-textbox text-bottom"> MONKEY MONKEY MONKEY <br/>
               建立者: {{photo.createdUserName}} &nbsp;  建立時間: {{time(photo.createdDate)}}  </p>
              <!-- <UserMenu :userInfo="{id:12,name:'asdfasdfsdf' }" /> -->
              </div> 
          </v-card>
          </v-hover>
          </v-col>
        </v-row>
        </div>
    </v-card>
  </div>
</template>

<script>

import moment from 'moment'
import UserMenu from './SystemUserMenu'
import Vue from 'vue'
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
    say(){
      console.log("hiiiiii");
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
          console.log("arrow");
          console.log(this);
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
    async getPhotos(){
      let vm = this;
      for (let i = 0; i < this.photosData.length; i++) {

        await this.$API.api.main.photo.getData(this.photosData[i].id,null,this.Config)            
        .then(res => {
          const reader = new FileReader();
          if (res.data) {
            vm.photosData[i]["image"] = reader.readAsDataURL(res.data);
            reader.onloadend = function() { 
            vm.photosData[i]["image"] = reader.result;       
             //vm.$forceUpdate();      
            };
          }
        })
        .catch(function (error) {
            console.log(error);
        }); 
      }
      vm.is_data_fetched = true;
      console.log(this.imageURLs);
     
    },

    async getProjectPhotosId() {
      let vm = this;
      await this.$API.api.main.projectPhoto.get(this.projectId)            
      .then(res => {
          if (res.data) {
            vm.photosData = res.data;
            vm.getPhotos();
          }
          return new Promise ((resolve, reject) => {
            console.log(resolve);
          })
      })
      .catch(function (error) {
          console.log(error);
      }); 
       
    },
    
  },
  created() {
    this.getProjectPhotosId();
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
  .image-card{
    max-width:100%;
    max-height:100%;
  }
</style>
