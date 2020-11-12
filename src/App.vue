<template>
  <v-app>

      <div id="nav">
      <router-link to="/FormVersion/DocumentReportTemplate">Enter</router-link> |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/">Home</router-link>
      <router-view/>
       </div>

    <sb-snackbar />
    <sb-dialog />

  
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
