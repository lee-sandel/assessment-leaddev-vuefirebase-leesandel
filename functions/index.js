/**
 * This example functions looks for bookings changes and populates the `lastWrittenTime` field
 *
 * @type {ChangeFunc}
 */
const example = (change, store) => {
  if (change.ref.path.startsWith('bookings/')) {
    console.log(`[example] booking change: ${change.ref.path}, title: '${change.document.title}'`);
    store.setDoc(change.ref, {
      ...change.document,
      lastWrittenTime: new Date()
    });
  }
};

/**
 * If a booking references a room name that is not in the store, this function will add it 
 *
 * @type {ChangeFunc}
 */
const autoRoomCreation = (change, store) => {
  if (change.ref.path.startsWith('bookings/') && store.getDoc(change.document.room.ref) === undefined) {
    console.log(`[autoRoomCreation] creating room: ${change.document.room.ref.path}'`);
    store.setDoc(change.document.room.ref, {
      title: change.document.room.title,
      capacity: change.document.guests
    });
  }
};

/**
 * Any function exported here will be called whenever there is a data change in the store.
 *
 * @type {Object<string, ChangeFunc>}
 */
module.exports = {
  example,
  autoRoomCreation
};
