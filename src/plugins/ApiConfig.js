

  function getBlobConfig(e) {
    e.responseType = "blob"
    return e
  }
  
  function getJsonConfig(e) {
    e.headers['Content-Type'] = "application/json;charset=UTF-8"
    return e
  }
  
  function getFormConfig(e) {
    e.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8"
    return e
  }
  
  function getFormDataConfig(e) {
    e.headers['Content-Type'] = "multipart/form-data"
    return e
  }
  function getTextConfig(e){
    e.headers['Content-Type'] = "text/plain; charset=utf-8"
    return e
  }

  

  export default {
    getBlobConfig,
    getJsonConfig,
    getFormConfig,
    getFormDataConfig,
    getTextConfig,
  }