import {send} from '@/api';

export default {
  namespaced: true,
  state: {
    bookings: {}
  },
  mutations: {
    setBooking(state, {ref, doc}) {
      state.bookings[ref] = doc;
    },
    setBookings(state, docs) {
      const bookings = {};
      for (const {ref, document} of docs) {
        bookings[ref.path] = document;
      }
      state.bookings = bookings;
    }
  },
  actions: {
    connected: {
      root: true,
      handler({dispatch}) {
        return dispatch('getAll');
      }
    },
    messageReceived: {
      root: true,
      handler({commit}, msg) {
        if (msg.ref.path.includes('bookings')) {
          if (msg.documents) {
            commit('setBookings', msg.documents);
          } else if (msg.document) {
            commit('setBooking', {ref: msg.ref.path, doc: msg.document});
          }
        }
      }
    },
    getAll() {
      send({
        type: 'get-documents',
        ref: {
          path: 'bookings'
        }
      });
    }
  }
}
