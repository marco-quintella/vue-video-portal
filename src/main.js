import '@babel/polyfill'
import {
  extend, setInteractionMode, ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import { email, max, min, oneOf, required, size } from 'vee-validate/dist/rules'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuebar from 'vuebar'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

// import InfiniteLoading from 'vue-infinite-loading'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: 'Enter {_field_}'
})

extend('oneOf', {
  ...oneOf
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

extend('password', {
  params: ['target'],
  validate (value, { target }) {
    return value === target
  },
  message: 'Password does not match'
})

extend('size', {
  ...size,
  message: 'video size should be less than 500 MB!'
})

Vue.config.productionTip = false
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Vue.use(InfiniteLoading, {
//   props: {
//     distance: null
//     /* other props need to configure */
//   }
// })

// Vue.component('InfiniteLoading', InfiniteLoading)

Vue.use(VueMeta)
Vue.use(Vuebar)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
