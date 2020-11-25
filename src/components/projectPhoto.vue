<template>
  <div>
    <v-card>
      <v-card-title  :style="{height:'60px'}">
        <v-btn 
          color="primary"
          dark
          id="uploadBtn"
          class:="px-3"
        >
        篩選
        </v-btn>
      </v-card-title>
      <v-spacer></v-spacer>
      <div v-if="is_data_fetched"> 
        <v-row >
          <v-col
            cols="12" sm="3" md="4"
            v-for="imageURL in imageURLs"
            :key="imageURL"
            class="d-flex child-flex"
          >
            <v-img
              :src="imageURL"
              
              aspect-ratio="1"
              class="grey lighten-2"
            >
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
          </v-col>
        </v-row>
        </div>
       
       <!-- <v-dialog 
          v-model="dialog"
          persistent
          max-width="1200px"
          v-for="imageURL in imageURLs" :key="imageURL"
        >
      <v-spacer></v-spacer>
        <template v-slot:activator="{ on }">
          <v-layout  wrap>
            <v-flex  xs7 sm7 md3 lg2 v-if="is_data_fetched"
             >
              <v-card class="justify-center" flat>
                asdfasdfasdf
                <v-img
                  v-on="on"
                  @click="checkCurrentImage(e.target.data)"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="500px"
                  max-width="500px"
                  :src='imageURL'
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
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
                      @click="dialog = false"
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
                  @click="dialog = false;"
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
      </v-dialog>    -->
    </v-card>
  </div>
</template>

<script>


export default {

  components: {

  },
  props: {

  },
  data() {
    return {
      currentImage:null,
      dialog:false,
      imageURLs:[],
      photosData:[],
      is_data_fetched: false,

    };
  },
  computed: {
      projectId(){
        return this.$route.params.projectId;
    },
  },
  methods: {
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

            vm.imageURLs[i] = reader.readAsDataURL(res.data);
            reader.onload = function(e) {
            vm.imageURLs[i]=e.target.result;
            
            
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

    getPhotoId() {
      let vm = this;
      this.$API.api.main.projectPhoto.get(this.projectId)            
      .then(res => {
          if (res.data) {
            vm.photosData = res.data;
            debugger
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
    
  },
  watch: {
  }

}
</script>

<style >

</style>
