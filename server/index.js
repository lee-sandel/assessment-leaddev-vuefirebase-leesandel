const { WebSocketServer } = require('ws');
const crypto = require('crypto');
const {Store} = require('./store');
const functions = require('../functions');

const port = 9090;

const wss = new WebSocketServer({ port });

const store = new Store();

// run all our functions on change
store.bus.on('change', change => {
  for (const func of Object.values(functions)) {
    func(change, store);
  }
});

wss.on('listening', () => {
  console.log('server started on', port);
});

// handle client connections
wss.on('connection', ws => {
  // sent all changes to client
  store.bus.on('change', change => {
    ws.send(JSON.stringify(change));
  });

  /**
   * @param {string} msg
   */
  const onMessage = msg => {
    /** @type {Request} */
    const req = JSON.parse(msg);
    if (!req.type || !req.ref) {
      return;
    }
    console.log('[server] handle request', req.type);
    switch (req.type) {
      case 'get-documents':
        ws.send(JSON.stringify({ref: req.ref, documents: store.getCollection(req.ref)}));
        break;
      case 'get-document':
        ws.send(JSON.stringify({ref: req.ref, document: store.getDoc(req.ref)}));
        break;
      case 'set-document':
        const ref = req.ref;
        if (ref.path.split('/').length % 2 === 1) {
          // generate a new ID
          ref.path += '/' + crypto.randomBytes(8).toString('hex')
        }
        store.setDoc(ref, req.document);
        break;
    }
  }

  ws.on('error', console.error);
  ws.on('message', onMessage);
});
