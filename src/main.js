import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import './plugins/vuetify-mask.js'
import Toasted from 'vue-toasted'

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

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
