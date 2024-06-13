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
 * Any function exported here will be called whenever there is a data change in the store.
 *
 * @type {Object<string, ChangeFunc>}
 */
module.exports = {
  example
};
