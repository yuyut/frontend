<template>
<div>
      <v-container>
      <v-row
        
        :align="center"
      >
        <v-col
          :align-self="center"
          v-for="n in 4"
          :key="n"
        >
          <v-card
            outlined
            tile
            
          >
          <div id="pictures" v-if="is_data_fetched" :style="{ display: flex, 'justify-content': center, 'align-items': center}">
          <div :style="{width:'300px' ,height:'300px' ,display: flex, 'justify-content': center, 'align-items': center}"
           v-for="imageURL in imageURLs" :key="imageURL" 
          >
          <sb-markup-viewer :style="{display: flex, 'justify-content': center, 'align-items': center}"
            :image-url='imageURL'
          ></sb-markup-viewer>
          </div>
          </div>
          <div v-else>
          nothing
          </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
