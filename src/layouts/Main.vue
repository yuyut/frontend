<template>
  <sb-main
    :navMenuItems.sync="menuItems"
    :navbarVerticalItems="navbarVerticalItems"
    :iconUrl="iconUrl"
    :textUrl="txtUrl"
    :user="user"
    :isRenderingVApp="false"
    isI18n
  >
    <template v-slot:footer_version>
      <v-divider vertical class="mx-2 my-2"></v-divider>
      <v-btn
        class="cpation pa-0 ml-2 mr-4"
        text
        :ripple="false"
        target="_blank"
        color="primary"
      >{{$t('terms_of_service')}}</v-btn>
      <v-btn
        class="cpation pa-0 mr-2"
        text
        :ripple="false"
        target="_blank"
        color="primary"
      >{{$t('privacy_policy')}}</v-btn>
      <v-divider vertical class="mx-2 my-2"></v-divider>
      <span class="caption ml-2">
        {{
        $t("application_version", { version: version })
        }}
      </span>
    </template>
  </sb-main>
</template>

<script>
import { mapState } from "vuex";
import navDrawerMenuItems from "./navDrawerMenuItems";
import navAccountMenuItems from "./navAccountMenuItems";
export default {
  name: "mainLayout",
  data() {
    return {
      iconUrl: "/logo-icon.png",
      txtUrl: "/logo-text.png",
      navbarVerticalItems: navAccountMenuItems,
      menuItems: navDrawerMenuItems,
      infoUrl: process.env.VUE_APP_INFO_BASE_URL,
      version: process.env.VUE_APP_APP_VERSION,
    };
  },
  computed: {
    ...mapState("auth", ["userInfo"]),
    user() {
      return {
        email: this.userInfo ? this.userInfo.email : "",
        name: this.userInfo ? this.userInfo.name : "",
      };
    },
  },
};
</script>