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
        guests: 4,
        fromTime: new Date('2023-02-17T10:00:00'),
        toTime: new Date('2023-02-17T11:00:00')
      },
      'bookings/b2': {
        title: 'Board Meeting',
        room: {ref: {path: 'rooms/boardroom'}, title: 'Boardroom'},
        guests: 6,
        fromTime: new Date('2023-02-17T12:00:00'),
        toTime: new Date('2023-02-17T14:00:00')
      },
      'bookings/b3': {
        title: 'Dev Stand-up',
        room: {ref: {path: 'rooms/m1'}, title: 'Small Meeting Room'},
        guests: 3,
        fromTime: new Date('2023-02-17T08:00:00'),
        toTime: new Date('2023-02-17T08:30:00')
      },
      'rooms/boardroom': {
        title: 'Boardroom',
        capacity: 12
      },
      'rooms/m1': {
        title: 'Large Meeting Room',
        capacity: 16
      },
      'rooms/m2': {
        title: 'Small Meeting Room',
        capacity: 6
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

  /**
   * @param {DocRef} refId
   * @param {DocRef} ref
   * @param {Document} data
   */
  editDoc(refId, ref, data) {
    console.log('[store]: editDoc', refId.path);
    delete this._data[refId.path];
    data.ref = ref;
    this._data[ref.path] = data;
    this.bus.emit('change', {
      ref,
      document: data,
      refId: refId
    });
  }

  /**
   * @param {DocRef} ref
   */
  deleteDoc(ref) {
    console.log('[delete]: deleteDoc', ref.path);
    delete this._data[ref.path];
    this.bus.emit('change', {
      ref: ref,
      document: null
    });
  }
}

module.exports = {
  Store
};
