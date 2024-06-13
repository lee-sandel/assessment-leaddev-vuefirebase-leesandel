import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './api'
import {store} from '@/store';
import vuetify from '@/plugins/vuetify';

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')

store.dispatch('init').catch(console.error);
