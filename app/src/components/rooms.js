/**
 * @return {Room}
 */
export function newRoom() {
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