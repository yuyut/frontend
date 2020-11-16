<template>
  <div class="about">
    <h1>This is an about page</h1>
    <router-link :to="{name: 'Enter', params: {formVersionId:'51bb96ec-30e2-4697-869c-94c47b43cc14'}}">DocumentReport</router-link> | 
    <router-link :to="{name: 'formVersion', params: {formVersionId:'88787421-5690-451e-a1ed-e41797d0d822'}}">formVerson</router-link> 
    <router-view/>
  </div>
</template>
