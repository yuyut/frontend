<template>
  <v-app>

      <div id="nav">
      <router-link to="/Enter.vue">Enter</router-link> |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/">Home</router-link>
      <router-view/>
       </div>



    <v-app-bar
    app
    color="primary"
    dark
    >
    </v-app-bar>

    <v-main>
      <v-container>
      Hello World
      </v-container>
    </v-main>
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
