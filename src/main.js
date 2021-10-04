import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './plugins/vuetify-mask.js'
import './helpers/validationConfig.js'
import Toasted from 'vue-toasted'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 3000,
  position: 'top-right',
  action: {
    text: 'Fechar',
    onClick: (e, toastObject) => {
      toastObject.goAway(0)
    }
  }
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
