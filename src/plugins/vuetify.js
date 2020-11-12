import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHant from 'vuetify/es5/locale/zh-Hant';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: "#006ad8",
                secondary: "#424242",
                accent: "#82B1FF",
                error: "#FF5252",
                info: "#2196F3",
                success: "#4CAF50",
                warning: "#FFC107",
                delete: "#F44336",
                skyBlue: "#83A8C1",
                grey: "#EEEEEE",
                white: "#FFFFFF",
            },
        },
    },
    lang: {
        locales: { zhHant },
        current: 'zh-Hant',
    },
});
