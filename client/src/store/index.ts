import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Message {
  type: string;
  value: any;
}

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      reconnectError: false,
      message: '',
    },
    session: {
      speed: 0,
    },
  },
  mutations: {
    SOCKET_ONOPEN (state, event)  {
      Vue.prototype.$socket = event.currentTarget;
      state.socket.isConnected = true;
    },
    SOCKET_ONCLOSE (state, event)  {
      state.socket.isConnected = false;
    },
    SOCKET_ONERROR (state, event)  {
      console.error(state, event);
    },
    SOCKET_ONMESSAGE (state, message: MessageEvent)  {
      console.log(message);
      const data: Message = JSON.parse(message.data);
      handle(state, data);
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count);
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
  },
  actions: {
    incrementSpeed: () => {
      console.log('Called increment');
      sendAction({
        type: 'INCREMENT_SPEED',
      });
    },
    decrementSpeed: () => {
      console.log('Called decrement');
      sendAction({
        type: 'DECREMENT_SPEED',
      });
    }
  }
});

function sendAction(message: { type: string, value?: string}) {
  Vue.prototype.$socket.send(JSON.stringify(message));
}


// All mutations from socket connection handled here
function handle(state: any, message: Message) {
  const { type, value } = message;
  console.log(type, value);
  switch (type) {
    case 'SET_SPEED':
      state.session.speed = value;
  }
  console.log(state)
}
