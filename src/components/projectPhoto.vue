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
      <v-dialog
          v-model="dialog"
          persistent
          max-width="1200px"
        >
      <v-spacer></v-spacer>
        <template v-slot:activator="{ on }">
          <v-layout  wrap>
            <v-flex  xs7 sm7 md3 lg2 
            v-for="imageURL in imageURLs" :key="imageURL" >
              <v-card class="justify-center" flat>
                <v-img
                  v-on="on"
                  @click="changeCurrentImage(imageURL)"
                  lazy-src="https://picsum.photos/id/11/10/6"
                  max-height="500px"
                  max-width="500px"
                  :src='imageURL'
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
        <v-card>
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

                  <v-list-item-content>
                    <v-list-item-title>System Admin</v-list-item-title>
                    <v-list-item-subtitle>六天前</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </template>
               <v-textarea
                solo
                label="textarea"           
              ></v-textarea>
              <v-divider></v-divider>

              <v-list dense>
                <v-list-item
                  v-for="item in items"
                  :key="item.title"
                >
                  <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-navigation-drawer>
          <v-card-title>
          <span class="headline">Preview</span>
          </v-card-title>
          <v-card-text class=text-center>
            <div :style="{height:'500px', width:'800px'}" class="justify-center">
              <sb-markup-viewer
                :image-url='currentImage'
              ></sb-markup-viewer>
            </div>
          </v-card-text>
          <v-card-actions>
           
            <v-btn
            color="blue darken-1"
            text
            @click="dialog = false;"
            >
            {{$t('close')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>   
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
    changeCurrentImage(image){
      this.currentImage = image;
    },
    Config(e) {
      e['responseType'] = "blob";
      return e
    },
    getPhotos(){
      let vm = this;
      for (let i = 0; i < this.photosData.length; i++) {
        this.$API.api.main.photo.getData(this.photosData[i].id,null,this.Config)            
        .then(res => {
          const reader = new FileReader();
          if (res.data) {
            vm.imageURLs[i] = reader.readAsDataURL(res.data);
            reader.onload = function(e) {
            vm.imageURLs[i]=e.target.result;
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
          
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
            vm.imageURLs.push(e.target.result);
            vm.is_data_fetched = true;
            };
          }
        })
        .catch(function (error) {
            console.log(error);
        }); 
      }
      
    },

    getPhotoId() {
      let vm = this;
      this.$API.api.main.projectPhoto.get(this.projectId)            
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
  mounted() {
    this.getPhotoId();
  },
  beforeDestroy() {
    
  },
  watch: {
  }

}
</script>

<style >

</style>
