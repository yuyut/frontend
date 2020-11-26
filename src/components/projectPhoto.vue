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

             
          <v-dialog 
              v-model="dialog2"
              persistent
              max-width="1200px"
              v-for="imageURL in imageURLs" :key="imageURL"
            >
          <v-spacer></v-spacer>
          <template v-slot:activator="{ on }">   
            <v-img
              max-height="350"
              contain
              :src="photo.image"
              aspect-ratio="1.6"
              class="grey lighten-2"
              v-on="on"
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
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>

              </template>
            </v-img> 
          </template>
            <div class="text-bottom"> 
              MONKEY MONKEY MONKEY</div> 
              <div class="text-bottom"> 
                建立者: {{photo.createdUserName}}    建立時間: {{time(photo.createdDate)}}  
              <UserMenu :userInfo="{id:12,name:'asdfasdfsdf' }" />
              </div> 
          </v-card>
          </v-hover>
          </v-col>
        </v-row>
       </div>
     
      <v-card >
           <v-card-title>
            Preview
          </v-card-title>
            <v-navigation-drawer
            absolute
            permanent
            right
            width="350px"
            >
              <template v-slot:prepend>
                <v-list-item two-line>
                  <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                  </v-list-item-avatar>
                  <v-list-item-content :style="{'justify-content': 'center', 'text-align': 'left'}">
                    <v-list-item-title>System Admin</v-list-item-title>
                    <v-list-item-subtitle>六天前</v-list-item-subtitle>
                  </v-list-item-content>
                  <v-btn
                      color="primary"
                      icon
                      dark
                      @click="dialog2 = false"
                      :style="{'text-align': 'right'}"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-list-item>
                <v-textarea
                solo
                label="textarea"  
                rows="8"         
              ></v-textarea>
              </template>
              <v-divider></v-divider>
               <template v-slot:append>
                <div class="pa-2" :style="{'text-align': 'right'}">
                 <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog2 = false;"
                  >
                  {{$t('close')}}
                  </v-btn>
                </div>
              </template>
            </v-navigation-drawer>
            <v-card-text>
            <div :style="{height:'500px', width:'800px'}" >
              <sb-markup-viewer
                :image-url='currentImage'
              ></sb-markup-viewer>
            </div>
            </v-card-text>
        </v-card>
      </v-dialog> 
    </v-card>
  </div>
</template>

<script>
import moment from 'moment'
import UserMenu from './SystemUserMenu'
export default {

  components: {
    'UserMenu' : UserMenu
  },
  props: {

  },
  watch:{
    photosData: {
      deep: true,
      
      // We have to move our method to a handler field
      handler(){
        console.log('The list of colours has changed!');
        this.$forceUpdate();
      }
      
    }

  },
  data() {
    return {
      componentKey: 0,
      currentImage:null,
      dialog:false,
      dialog2:false,
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
    time(date){
        let time = moment(date).format('YYYY/MM/DD hh:mm:ss');
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
            console.log("uploaded");
            vm.getPhotoId();       
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
      //this.currentImage = image;
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

    async getPhotoId() {
      let vm = this;
      await this.$API.api.main.projectPhoto.get(this.projectId)            
      .then(res => {
          if (res.data) {
            vm.photosData = res.data;
            vm.getPhotos();
          }
           
      })
      .catch(function (error) {
          console.log(error);
      }); 
       
    },
    
  },
  created() {
    this.getPhotoId();
  },
  mounted() {
    
  },
  beforeDestroy() {
    
  }
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
  }
</style>
