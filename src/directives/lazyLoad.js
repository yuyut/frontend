export default {
    name: "ImageItem",
    props: {
      source: {
        type: String,
        required: true
      }
    },
  
   inserted: el => {

    async function getPhotos() {
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
       
      }

      function Config(e) {
        e['responseType'] = "blob";
        return e
      }

      async function loadImage() {
         
        var result;
          await $API.api.main.photo.getData(el.id,null,Config)            
          .then(res => {
            const reader = new FileReader();
            if (res.data) {
              result = reader.readAsDataURL(res.data);
              reader.onloadend = function() { 
                result = reader.result;       
               console.log(success);  
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