import Vue from 'vue'
import Vuex from 'vuex'
import bookings from '@/store/bookings';

Vue.use(Vuex);

export const store = new Vuex.Store({
  actions: {
    init() {
    },
    connected() {
    },
    messageReceived({}, msg) {
      // message received from the server
    }
  },
  modules: {
    bookings
  }
});
