//i18n.js
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages() {
    const locales = require.context('../node_modules/syncobox-shared/src/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = { 
    }
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}

export default new VueI18n({
    locale: 'zh' || process.env.VUE_APP_I18N_LOCALE || 'en' ,
    fallbackLocale: 'zh' || process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
   
})