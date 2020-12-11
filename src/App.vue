<template>
  <v-app>

      
      <router-view/>



  
  </v-app>
</template>

<script>

export default {
  name: 'App',
  //formVersionId:'2778a5f3-1024-4c97-9e09-892319689f6a',
  data: () => ({
     formVersionId:'51bb96ec-30e2-4697-869c-94c47b43cc14',
     formId:'88787421-5690-451e-a1ed-e41797d0d822',
     projectId:'5252057b-5fa6-4eba-9e75-a9b9cd972b2f'

  }),
};
</script>
