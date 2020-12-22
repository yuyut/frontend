<template>
  <div>
    <v-icon 
      @click="topFunction()" 
      id="topBtn"
      color="primary"
      class="mdi-48px d-none d-sm-block"
      >mdi-arrow-up-bold </v-icon>
    <v-alert v-if="alert"
      class="alert-box"
      border="bottom"
      colored-border
      type="warning"
      elevation="2"
    >
      Upload / Delete failed
    </v-alert>

    <v-toolbar class="toolbar" elevation="0">
      <v-toolbar-title>專案照片</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-icon class="mr-1">mdi-magnify</v-icon>
      <v-text-field
          class="search-bar"
          placeholder="搜尋標註資料"
          outlined
          dense
          hide-details
          @keydown="searching($event)"
      ></v-text-field>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
          >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
              v-bind="attrs"
              v-on="on"
              id="titleBtn"
     
              :height="btnHeight"
                color="#ffffff"
          >
          <span v-if="!isSame(breakPointName,'xs')">新增圖片</span>
          <v-icon> 
              mdi-plus
            </v-icon> 
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
      <v-menu offset-y :close-on-content-click="closeOnContentClick">
        <template v-slot:activator="{ on, attrs }">
          <v-btn id="titleBtn"                 
            v-bind="attrs"
            v-on="on"
            :height="btnHeight"

            color="#ffffff" 
          >
            <span v-if="!isSame(breakPointName,'xs') "> 排序</span>
              <v-icon >  mdi-sort-variant
              </v-icon> 
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-radio-group
              v-model="sort[0].field"
              mandatory
            >
              <v-radio
                label="時間"
                value="createdDate"
              ></v-radio>
              <v-radio
                label="人員"
                value="createdUserName"
              ></v-radio>
            </v-radio-group>
          </v-list-item>
          <v-list-item>
            <v-radio-group
              v-model="sort[0].dir"
              mandatory
            >
              <v-radio
                label="遞增"
                value="asc"
              ></v-radio>
              <v-radio
                label="遞減"
                value="desc"
              ></v-radio>
            </v-radio-group>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar> 
      <v-row  class="row123"  >
        <v-col
          cols="12" lg2 sm4 md3 xs6 lg="2" sm="4" md="3" xs="6"
          v-for="(photo,index) in photosData"
          :key="index"
          @click="changeAll(photo,index)"
        >
   
          <v-hover v-slot="{hover}">
            <sb-gallery-card
                :hover="hover"
                :item="photo"
                :hasRelativeTime="true"
                :isShowHead="false"
                :isShowTitle="true"
                :isShowDescription ="false"
              ></sb-gallery-card>
            </v-hover>
      </v-col>
      </v-row>  
      <v-dialog v-model="showViewer">
        <sb-media-viewer
            :showViewer="showViewer"
            :markupData="markupData"
            :dataItem="currentItem" 
            :showPrevBtn="true" 
            :showNextBtn="true"
        ></sb-media-viewer>
        </v-dialog>
        <v-progress-circular v-if="loading && (!bottom)"
          indeterminate
          color="primary"
        ></v-progress-circular>
  </div>
</template>
<script>
import { toDataSourceRequestString  } from '@progress/kendo-data-query'; 
import moment from 'moment'
import UserMenu from './SystemUserMenu'
import axios from 'axios'
import NoImageAtAll from '../assets/Noimage.jpg'

moment.locale('zh-tw', {
  relativeTime: {
    future: '%s内',
    past: '%s前',
    s: '幾秒',
    ss: '%d秒',
    m: '1分',
    mm: '%d分鐘',
    h: '1小時',
    hh: '%d小時',
    d: '1天',
    dd: '%d天',
    M: '1個月',
    MM: '%d個月',
    y: '1年',
    yy: '%d年'
  },
})
export default {
  directives:{
    lazyLoad: {
      inserted: el => {
        async function loadImage() {
         var result;;
            await Vue.prototype.$API.api.main.photo.getData(el.id,null,Vue.prototype.$Config)            
            .then(res => {
              const reader = new FileReader();
              if (res.data) {
                result = reader.readAsDataURL(res.data);
                reader.onloadend = function() { 
                  result = reader.result; 
                  el.src=result;
                  
                };
              }
            })
            .catch(function (error) {
                console.log(error);
            }); 
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
    sort:{
      deep: true,
      handler(){
        if(this.sort[0].field != null){
          if(this.sort[0].field != this.lastField){
            this.lastField = this.sort[0].field;
            this.changeSortField(this.sort[0].field);
          }
        }
        if(this.sort[0].dir != null){
          if(this.sort[0].dir != this.lastDir){
              this.lastDir = this.sort[0].dir;
              this.changeSortDir(this.sort[0].dir);
            }
          }
        }
      }
  },
  data() {
    return {
      showViewer:false,
      markupData:{imgSrc:null,svgSrc:null},
      searchValue:null,
      infoColor:'',
      commentColor:'primary',
      comment:true,
      info:false,
      note:null,

      items: [
        { title: 'comment', icon: 'mdi-comment-outline',color:'primary' },
        { title: 'Home', icon: 'mdi-information-outline', color:'' },
      ],
      showNav:false,
      mini: false,
      alert:false,
      closeOnContentClick: false,
      lastField:"createdDate",
      lastDir:"desc",
      NoImageAtAll:NoImageAtAll,
      bottom:false,
      input:null,
      newData:null,
      page:0,
      pageSize:10,
      total:0,
      loading:false,
      skip: 0,
      take: 10,
      sort: [
              { field: 'createdDate', dir: 'desc' }
            ],
      filter: null,
      componentKey: 0,
      currentItem:{},
      currentImage:null,
      currentIndex:null,
      imageDialog:false,      
      dialog:false,
      dialog1:false,
      deleteDialog:false,
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
    
    breakPointName(){
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 'xs'
        case 'sm': return 'sm'
        case 'md': return 'md'
        case 'lg': return 'lg'
        case 'xl': return 'xl'
        default: return 'md'
      }
    },
    btnHeight () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 30
        case 'sm': return 35
        case 'md': return 35
        case 'lg': return 40
        case 'xl': return 45
        default: return 40
      }
    },
      projectId(){
        return this.$route.params.projectId;
    },
  },
  methods: { 

    changeAll(photo,index){
      this.currentItem=photo;
      // this.markupData=photo.markupData;
      this.markupData.imgSrc=photo.imgSrc;
      console.log(this.markupData);
      this.changeCurrentIndex(index);
      this.showViewer=true;
      
    },
    closeImgDialog(value){
      this.showViewer=value;
    },
   renameKey ( obj, oldKey, newKey ) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    },
    searching(event){
        if(event.key==="Enter" || event.target._value===""){
            this.searchValue = event.target.value
        }
    },
    changeNavContent(str){
      if(str=='comment'){
        this.comment=true;
        this.info=false;
        this.infoColor='';
        this.commentColor='primary';
      }
      if(str=='info'){
        this.comment=false;
        this.info=true;
        this.commentColor='';
        this.infoColor='primary';
      }
    },
    submitNote(){
      let index = this.replys.length;
      let obj = { 'comment': this.note, 'time': '今天', };
      this.replys.splice(0,0,obj);
     
      this.note=null;
    },
    activateDrawer(){
      this.$refs.imageDrawer.isActive=true;
      this.$refs.imageDrawerMini.isActive=true;
    },
    onResize () {
        this.isMobile = window.innerWidth < 600
      },
    isSame(a,b){
      if(a==null) return true;
      if(a==b)  return true;
      else {
         return false;
      }  
    },
    changeSortField(data){
      this.page = 0;
      this.photosData = [];
      this.sort.field = data;
      this.postData();
    },
    changeSortDir(data){
      this.page = 0;
      this.photosData = [];
      this.sort.dir = data;
      this.postData();
    },
    changeCurrentIndex(index){
      this.currentIndex = index;
    },
    changeCurrentItem(item){
      this.currentItem = item;
    },


    editHandler: function() {
    this.$emit('edit', {dataItem:this.dataItem});
    },
    activateReadMore(photo){
      photo.readMoreActivated = true;
    },
    isScrollToPageBottom(){
       if(this.page >= Math.ceil(this.total / this.pageSize)){
          this.bottom = true;
       }
        else {
          this.bottom = false;
        }
            
    },
    handScroll(){
      if(!this.loading && this.scrollTop() + this.windowHeight() >= (this.documentHeight() - 150/*滾動響應區域高度取150px*/)){
        this.isScrollToPageBottom();
       if(!this.bottom){       
          this.postData();

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
      this.loading = true;
      if(this.page==0)  this.page++;
      let state2 = {   
                  take: this.pageSize,
                  skip: this.page*this.pageSize,
                  sort: this.sort
                    };
      const queryStr = toDataSourceRequestString(state2);
      let vm = this;
      this.$API.api.main.projectPhoto.get(this.projectId,queryStr,this.ConfigJSON)
          .then(res => {
          const arr = res.data.data;
          arr.forEach( obj => {this.$set(obj,'formatTime',vm.time(obj.createdDate) );
              this.renameKey( obj, 'createdUserName', 'author' );
              this.renameKey( obj, 'createdDate', 'date' ) 
          } );

          this.total = res.data.total;
          this.loading = false;

          //CONCAT CONCAT CONCAT!!!!!
          this.photosData = vm.photosData.concat(arr);

          this.newData = res.data.data;
          this.page++;
          this.isScrollToPageBottom();
          if(this.documentHeight()-this.windowHeight()-this.scrollTop() < this.windowHeight()*0.1 && !this.bottom){
              this.postData();
          }

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
    fromNow(date){
      moment.locale(this.$i18n.locale);
      let time = moment(date).fromNow();
        return time;
    },
    myUpload:function(){
      var file = this.file;    //name = file
      var formdata = new FormData();
      formdata.append('file',file);
      let vm = this;
      this.$API.api.main.projectPhoto.post(this.projectId,'GeneralPicture',formdata)            
      .then(res => {
        this.file = null;
        this.page = 0;
        this.photosData = [];
        this.postData();
      })
      .catch(function (error) {
          console.log(error);
          vm.alert=true;
      });
    },
    myDelete:function(input){
      let vm = this;
      
      this.$API.api.main.photo.delete(input)            
      .then(res => {
        //DONE:update datas
        //empty input
        
        if (input) {
        let index = this.photosData.findIndex(p => p.id === input);
        this.photosData.splice(index, 1);
        }
        this.input = null;
      })
      .catch(function (error) {
         vm.alert=true;
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
        let index = this.photosData.findIndex(x => x.id == datas[i].id); 
        this.$API.api.main.photo.getData(datas[i].id,null,this.Config)            
        .then(res => {
          const reader = new FileReader();
          if (res.data) {
            reader.readAsDataURL(res.data);
            reader.onloadend = function() { 
            vm.$set(vm.photosData[index],'imgSrc',reader.result);
            // vm.$set(vm.photosData[index],'markupData',{'imgSrc': reader.result, 'svgSrc':null});
             //vm.$forceUpdate();      
            };
          }
        })
        .catch(function (error) {
          vm.$set(vm.photosData[index],'imgSrc',vm.NoImageAtAll);
          console.log(error);
        }); 
      }
    },
    scrollFunction() {
      var mybutton = document.getElementById("topBtn");
      if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    },
    // When the user clicks on the button, scroll to the top of the document
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  created() {
    this.postData();
    window.addEventListener('scroll', this.handScroll);
    window.addEventListener('scroll', this.scrollFunction);
        
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
    this.$root.$on("closeMediaViewer",(value)=>{
      this.closeImgDialog(value);
    });
    let vm = this;
    this.$root.$on("switchMediaData", (mode)=>{
    switch(mode){
        case "prev":
            if(vm.currentIndex>0){
              vm.currentIndex--;
              vm.currentItem = vm.photosData[vm.currentIndex];
              vm.markupData=vm.currentItem.markupData;
            }
            break;
        case "next":
             if(vm.currentIndex < vm.photosData.length-1){
              vm.currentIndex++;
              vm.currentItem = vm.photosData[vm.currentIndex]
              vm.markupData=vm.currentItem.markupData;
            }
            break;
     }
 })
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, { passive: true })
  },  
}
</script>

<style >
  .mini-gradient {
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
    vertical-align: bottom;
    height: 100%;
  }
  .image-card{
    width: auto;
    height: 210px;
    object-fit: contain;
  }
  #image-text { 
    position: absolute;
    text-align: center;
    top: 15px;
    width: 100%;
    color:white;
    height: auto;
    word-wrap: break-word;
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    font-size: 17px;
  }
  .overflow-textbox{
    overflow:hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-right: 1rem;
  }
  .card{
    width: 320px;
    height: auto;
    /* max-height: 274px; */
    margin: 10px;
    /* padding-bottom: 20px; */
}
  .row123{
    margin: 0px !important;
    padding: 5px 10px;
    height : auto;
  }
  .edit-icon{
    z-index: 15;
    margin:5px;
    float: right;
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
  
  #titleBtn{ 
    margin:8px;
    width:auto;

    }
  .hide {
  display: none;
  }
  .myDIV:hover  .hide {
    display: inline-block;
  }
  .text-box{
    text-align: left;
  }
  .alert-box{
    width:20%;
    margin-left: auto;
    margin-right: auto;
  }
  #topBtn {
    opacity: 80%;
    display: none;
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 99;
    font-size: 18px;
    color: white;
    padding: 15px;
  }

  .gradient{
    width:100%; 
    height:100%;
    display:inline-block;
    background: linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,0.2),rgba(0,0,0,0.6),rgba(0,0,0,0.6));
  }
  #preview-list-content{
    height:90vh;
    overflow: hidden;
  }
  .preview-title-info{
    text-align:left;
    padding-left:20px;
    
  }
  .markup-box{
    display: table-cell;
    vertical-align: middle;
  }
  .preview-markup{
    display:flex;
    
  }
  .navigation-edit-btn{
    text-align: left;
  }
  .preview-title{
    position: relative;
    min-height: 55px;
  }
  .nav-content{
    float:left;
    overflow: auto;
    width: calc(100% - 57px);
    padding:8px;
    height:calc(100% - 58px);
  }
  .nav-content-mini{
    float:left;
    overflow: auto;
    width: 100%;
    padding-bottom: 10px;
    
    height:calc(100% - 58px);
  }
  .nav-comment{
    width: 100%;
  }
  .nav-right-bar{
    float:right;
    width: 56px;
    height:calc(100% - 58px);
    border-left: 0.5px solid #ededed;
    flex-direction: column;
    overflow: hidden !important;
  }
  .nav-bottom-bar{
    width:auto;
    position: absolute;
    bottom:0;
    right:0;
    flex-direction: column;
    margin:10px;
    background-color:rgba(255, 255, 255, 0.5);
  }
  .bottom-icon{
    margin:4px;
    
  }
  .nev-top-bar{
    display:flex;
    height: 55px;
   
  }
  .nav-bottom-icon{
    bottom: 0;
    position: absolute;
  }
  #right-drawer-mini{
    float:right;
    height:100%;
    overflow: hidden;
  }

  #right-drawer{
    float:right;
    height:100%;
    overflow: hidden;
    min-width: 360px;
  }
  .nav-reply:hover{
    border-style: solid;
    border-width: 0.5px;
    border-color: #ededed;
  }
  .nav-reply{
    border-style: solid;
    border-width: 0.5px;
    border-color: transparent;
  }
  .right-side-sub-text{   
    float: right;
  }
  .left-side-text{
    width:80%;
    text-align: left;
    display: inline-block;
  }
  .info-title{
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    font-size: 19px;
    color:gray;
    height:2rem;
  }
  .info-content{
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    font-size: 22px;
  }
  .text-title{
    /* font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif; */
    font-size: 16px;
    height:18px;
    color:gray;
  }
  .text-content{
    /* font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif; */
    font-size: 18px;
  }
  .search-bar{
    width: 250px;
    max-width: 250px;
  }
  .toolbar{
    margin: -20px;
    max-width: calc(100% + 40px) !important;
}
</style>
