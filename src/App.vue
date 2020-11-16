<template>
  <v-app>

      <div id="nav">
      <router-link :to="{name: 'Enter', params: {formVersionId:'2778a5f3-1024-4c97-9e09-892319689f6a'}}"></router-link> 
      <router-link :to="{name: 'formVersion', params: {formVersionId:'51bb96ec-30e2-4697-869c-94c47b43cc14'}}"></router-link> 
      <router-view/>
       </div>


  
  </v-app>
</template>

<script>

export default {
  name: 'App',
  //formVersionId:'2778a5f3-1024-4c97-9e09-892319689f6a',
  data: () => ({
     
  }),
};
</script>
