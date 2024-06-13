import {send} from '@/api';

export default {
  namespaced: true,
  state: {
    rooms: [],
    activeRoomEdit: null
  },
  mutations: {
    setRoom(state, {ref, doc}) {
      doc.ref = ref;
      state.rooms.push(doc);
    },
    setRooms(state, docs) {
      const rooms = [];
      for (const {ref, document} of docs) {
        document.ref = ref;
        rooms.push(document);
      }
      state.rooms = rooms;
    },
    setActiveRoomEdit(state, room) {
      state.activeRoomEdit = room;
    },
    deleteRoom(state, ref) {
      for (let i = 0; i < state.rooms.length; i++) {
        if (state.rooms[i].ref.path === ref.path) {
          state.rooms.splice(i, 1);
          break;
        }
      }
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
        if (msg.ref.path.includes('rooms')) {
          if (msg.documents) {
            commit('setRooms', msg.documents);
          } else if (msg.document) {
            commit('setRoom', {ref: msg.ref, doc: msg.document});
          } else if (msg.document === null) {
            commit('deleteRoom', msg.ref);
          }
        }
      }
    },
    getAll() {
      send({
        type: 'get-documents',
        ref: {
          path: 'rooms'
        }
      });
    }
  }
}
