<template>
  <v-menu v-model="menu" :close-on-content-click="false" offset-y>
    <template v-slot:activator="{ on }">
      <v-chip class="mr-2 primary" style="padding-left:6px" small v-on="on">
        <v-avatar left>
          <v-icon dark v-if="user.src === undefined">mdi-account-circle</v-icon>
          <v-img v-else :src="user.src"></v-img>
        </v-avatar>
        {{ user.name }}
      </v-chip>
    </template>
    <v-card class="userInfoCard">
      <v-list>
        <v-list-item>
          <v-avatar class="primary mr-3">
            <img :src="user.src" v-if="user.src !== undefined" />
            <span class="white--text headline" v-else>{{ userS }}</span>
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="user.email !== undefined">{{
              user.email
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider class="ma-0 pa-0" />
      <v-card-actions v-if="user.email">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon @click="sendEmail()" v-on="on"
              ><v-icon>mdi-email</v-icon></v-btn
            >
          </template>
          <span>寄送郵件</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  props: {
    userInfo: Object, // {id:"",name:'',email:''}
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    user() {
      return this.userInfo;
    },
    userS() {
      if (this.user && this.user.name) {
        return this.user.name.charAt(0).toUpperCase();
      }
      return "";
    },
  },
  methods: {
    sendEmail() {
      var email = this.user.email ? this.user.email : "";
      var subject = "";
      var emailBody = "To  " + this.user.name + ":";
      document.location =
        "mailto:" + email + "?subject=" + subject + "&body=" + emailBody;
    },
  },
};
</script>

<style scoped>
.userInfoCard {
  min-width: 250px;
}
</style>
