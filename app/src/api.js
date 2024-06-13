import ReconnectingWebSocket from 'reconnecting-websocket';
import {store} from '@/store';

const ws = new ReconnectingWebSocket('ws://localhost:9090');

ws.addEventListener('message', str => {
  const msg = JSON.parse(str.data);
  console.log('messageReceived', msg);
  store.dispatch('messageReceived', msg)
      .catch(err => console.error('ws message error', err));
});

ws.addEventListener('open', () => {
  console.log('connected');
  store.dispatch('connected')
      .catch(err => console.error('connected error', err));
});

/**
 * @param {Request} msg
 */
export function send(msg) {
  ws.send(JSON.stringify(msg));
}
