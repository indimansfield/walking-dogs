import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface Message {
  type: string;
  value?: any;
}

export interface CompletedRound {
  round: number;
  speed: number;
  duration: number;
  distance: number;
  waterDepth: number;
  restTime: number;
}

interface State {
  socket: {
    isConnected: boolean;
    reconnectError: boolean;
    message: string;
  };
  session: {
    name: string;
    speed: number;
    waterLevel: number;
    duration: number;
  };
  completedRounds: CompletedRound[];
}

const initialState: State = {
    socket: {
      isConnected: false,
      reconnectError: false,
      message: '',
    },
    session: {
      name: '',
      speed: 0,
      waterLevel: 0,
      duration: 30000
    },
    completedRounds: []
};

export default new Vuex.Store({
  state: initialState,
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
    SET_NAME(state, name: string) {
      state.session.name = name;
    }
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
    },
    setSpeed: ({ commit, state }, { speed }) => {
      if (speed === null || speed === undefined) {
        return;
      }
      if (speed === state.session.speed) {
        return;
      }
      sendAction({
        type: 'SET_SPEED',
        value: speed
      });
    },
    incrementWaterLevel: () => {
      console.log('Called increment');
      sendAction({
        type: 'INCREMENT_WATER_LEVEL',
      });
    },
    decrementWaterLevel: () => {
      console.log('Called decrement');
      sendAction({
        type: 'DECREMENT_WATER_LEVEL',
      });
    },
    setWaterLevel: ({ commit, state }, { level }) => {
      if (level === null || level === undefined) {
        return;
      }
      if (level === state.session.waterLevel) {
        return;
      }
      sendAction({
        type: 'SET_WATER_LEVEL',
        value: level
      });
    },
    setRoundDuration: ({ commit, state }, { duration }) => {
      const asMillis = duration * 1000;
      if (asMillis === state.session.duration) {
        return;
      }
      sendAction({
        type: 'SET_DURATION',
        value: asMillis
      });
    },
    incrementDuration: () => {
      sendAction({
        type: 'INCREMENT_DURATION'
      });
    },
    decrementDuration: () => {
      sendAction({
        type: 'DECREMENT_DURATION'
      });
    },
    getStatus: ({commit, state}) => {
      if (state.socket.isConnected) {
        sendAction({
          type: 'STATUS'
        });
      }
    },
    stopRound: ({}) => {
      sendAction({
        type: 'STOP'
      });
    },
    startRound: () => {
      console.log('starting')
      sendAction({
        type: 'START'
      });
    }

  }
});

function sendAction(message: Message) {
  Vue.prototype.$socket.send(JSON.stringify(message));
}


// All mutations from socket connection handled here
function handle(state: any, message: Message) {
  const { type, value } = message;
  console.log(type, value);
  switch (type) {
    case 'SET_SPEED':
      state.session.speed = value;
      break;
    case 'SET_WATER_LEVEL':
      state.session.waterLevel = value;
      break;
    case 'SET_DURATION':
      state.session.duration = value;
      break;
    case 'STATUS':
      const {
        waterLevel,
        speed,
        duration,
        directiom
      } = value;
      state.session.waterLevel = waterLevel;
      state.session.speed = speed;
      state.session.duration = duration;
      state.session.directiom = directiom;
      break;
    case 'ROUND_FINISHED':
      console.log(value);
  }
  console.log(state);
}
