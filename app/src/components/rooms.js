import {store} from '../store'

/**
 * @return {Room}
 */
export function newRoom() {
  if(store.state.rooms.activeRoomEdit) {
    return store.state.rooms.activeRoomEdit
  }
  return {
    title: '',
    capacity: 4,
  };
}

/**
 * @param {Room} r
 * @return {boolean}
 */
export function isValidRoom(r) {
  return r.title &&
      r.title !== '' &&
      r.capacity > 0;
}