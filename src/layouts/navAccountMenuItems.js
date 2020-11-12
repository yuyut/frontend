//src/layouts/navAccountMenuItems.js
export default [{
    href: process.env.VUE_APP_IDENTITY_BASE_URL + "/account/forgotpassword",
    i18n: "menu.change_password",
    url: "",
    name: "",
    icon: "mdi-lock-reset",
    text: "Change Password"
},
{
    i18n: "menu.logout",
    url: "/pages/logout",
    name: "Logout",
    icon: "mdi-logout",
    text: "logout"
}
];