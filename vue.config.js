// vue.config.js
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack: {
        plugins: [
            new VuetifyLoaderPlugin()
        ],
    },
     "pluginOptions": {
        "i18n": {
            "locale": "zh-Hant",
            "fallbackLocale": "en",
            "localeDir": "locales",
            "enableInSFC": true
        }
    }
}
