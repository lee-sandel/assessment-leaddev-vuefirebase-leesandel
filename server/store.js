const Emitter = require('events');
const isEqual = require('lodash.isequal');

class Store {
  constructor() {
    /**
     * @type {Object<string, Document>}
     * @private
     */
    this._data = {
      'bookings/b1': {
        title: 'Design Meeting',
        room: {ref: {path: 'rooms/boardroom'}, title: 'Boardroom'},
        fromTime: new Date('2023-02-17T10:00:00'),
        toTime: new Date('2023-02-17T11:00:00')
      },
      'bookings/b2': {
        title: 'Board Meeting',
        room: {ref: {path: 'rooms/boardroom'}, title: 'Boardroom'},
        fromTime: new Date('2023-02-17T12:00:00'),
        toTime: new Date('2023-02-17T14:00:00')
      },
      'bookings/b3': {
        title: 'Dev Stand-up',
        room: {ref: {path: 'rooms/m1'}, title: 'Small Meeting Room'},
        fromTime: new Date('2023-02-17T08:00:00'),
        toTime: new Date('2023-02-17T08:30:00')
      },
      'rooms/boardroom': {
        title: 'Boardroom'
      },
      'rooms/m1': {
        title: 'Large Meeting Room'
      },
      'rooms/m2': {
        title: 'Small Meeting Room'
      }
    };
    /**
     * @type {module:events.EventEmitter}
     */
    this.bus = new Emitter();
  }

  /**
   * @param {DocRef} ref
   * @return {Document|undefined}
   */
  getDoc(ref) {
    return this._data[ref.path];
  }

  /**
   * @param {CollectionRef} col
   * @return {Document[]}
   */
  getCollection(col) {
    const docs = [];
    for (const ref of Object.keys(this._data)) {
      if (ref.startsWith(col.path)) {
        const docRef = {path: ref};
        docs.push({
          ref: docRef,
          document: this.getDoc(docRef)
        });
      }
    }
    return docs;
  }

  /**
   * @param {DocRef} ref
   * @param {Document} data
   */
  setDoc(ref, data) {
    console.log('[store]: setDoc', ref.path);
    const prev = this.getDoc(ref);
    this._data[ref.path] = data;
    const shallowCopy = {...data};
    delete shallowCopy.lastWrittenTime;
    if (isEqual(prev, shallowCopy)) {
      return;
    }
    this.bus.emit('change', {
      ref,
      document: data
    });
  }
}

module.exports = {
  Store
};
