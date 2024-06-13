/**
 * @return {Room}
 */
export function newRoom() {
  return {
    title: '',
  };
}

/**
 * @param {Room} r
 * @return {boolean}
 */
export function isValidRoom(r) {
  return r.title &&
      r.title !== '';
}