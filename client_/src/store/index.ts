import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const TIMER_INCREMENTS = 10000;

export interface CompletedRound {
  round: number;
  speed: number;
  elapsedDuration: number;
  distance: number;
  waterLevel: number;
  restDuration: number;
}

interface State {
  view: 'initial' | 'running'| 'round' | 'summary';
  setDialog: {
    show: boolean;
    toSet: 'speed' | 'duration' | 'waterLevel' | ''
  };
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
    restDuration: number;
    remainingDuration: number;
    direction: 'forward' | 'reverse';
  };
  completedRounds: CompletedRound[];
}

const initialState: State = {
  view: 'initial',
  socket: {
    isConnected: false,
    reconnectError: false,
    message: '',
  },
  setDialog: {
    show: false,
    toSet: '',
  },
  session: {
    name: '',
    speed: 0,
    waterLevel: 0,
    duration: 30000,
    restDuration: 0,
    direction: 'forward',
    remainingDuration: 30000,
  },
  completedRounds: [],
};

export default new Vuex.Store({
  state: initialState,
  mutations: {
    // SOCKET_ONOPEN (state, event)  {
    //   Vue.prototype.$socket = event.currentTarget;
    //   state.socket.isConnected = true;
    // },
    // SOCKET_ONCLOSE (state, event)  {
    //   state.socket.isConnected = false;
    // },
    // SOCKET_ONERROR (state, event)  {
    //   console.error(state, event);
    // },
    // SOCKET_ONMESSAGE (state, message: string)  {
    //   console.log(message);
    //   handle(state, message);
    // },
    // SOCKET_RECONNECT(state, count) {
    //   console.info(state, count);
    // },
    // SOCKET_RECONNECT_ERROR(state) {
    //   state.socket.reconnectError = true;
    // },
    SET_NAME(state, name: string) {
      state.session.name = name;
    },
    SET_VIEW(state, view: 'initial' | 'running'| 'round' | 'summary') {
      state.view = view;
    },
    INCREMENT_SPEED(state) {
      state.session.speed ++;
    },
    DECREMENT_SPEED(state) {
      const { speed } = state.session;
      if (speed > 0) {
        state.session.speed --;
      }
    },
    SET_SPEED(state, { speed }) {
      state.session.speed = speed;
    },
    INCREMENT_WATER_LEVEL(state) {
      state.session.waterLevel ++;
    },
    DECREMENT_WATER_LEVEL(state) {
      const { waterLevel } = state.session;
      if (waterLevel > 0) {
        state.session.waterLevel --;
      }
    },
    SET_WATER_LEVEL(state, { level }) {
      state.session.waterLevel = level;
    },
    INCREMENT_DURATION(state) {
      state.session.duration += TIMER_INCREMENTS;
      state.session.remainingDuration = state.session.duration;
    },
    DECREMENT_DURATION(state) {
      const { duration } = state.session;
      if (duration > 0) {
        state.session.duration -= TIMER_INCREMENTS;
        state.session.remainingDuration = state.session.duration;
      }
    },
    SET_DURATION(state, { duration }) {
      state.session.duration = duration;
      state.session.remainingDuration = state.session.duration;
    },
    SET_DIRECTION(state, { direction }) {
      state.session.direction = direction;
    },
    ADD_COMPLETED_ROUND(state) {
      const { speed, duration, remainingDuration } = state.session;
      const elapsedDuration = duration - remainingDuration;
      const distance = speed * (elapsedDuration / 1000);
      state.completedRounds.push({
        ...state.session,
        round: state.completedRounds.length,
        distance,
        elapsedDuration,
      });
    },
    SHOW_SET_DIALOG(state) {
      state.setDialog.show = true;
    },
    HIDE_SET_DIALOG(state) {
      state.setDialog.show = false;
    },
    SET_DIALOG_TYPE(state, { type }) {
      state.setDialog.toSet = type;
    },
    SET_REST_DURATION(state, { restDuration }) {
      state.session.restDuration = restDuration;
    },
    SET_REMAINING_DURATION(state, { remaining }) {
      state.session.remainingDuration = remaining;
    },
  },
  actions: {
    incrementSpeed: ({ commit }) => {
      sendAction('INCREMENT_SPEED');
      commit('INCREMENT_SPEED');
    },
    decrementSpeed: ({ commit }) => {
      sendAction('DECREMENT_SPEED');
      commit('DECREMENT_SPEED');

    },
    setSpeed: ({ commit, state }, { speed }) => {
      if (!speed) {
        return;
      }
      if (speed === state.session.speed) {
        return;
      }
      sendAction('SET_SPEED');
      commit('SET_SPEED', { speed });
    },
    incrementWaterLevel: ({ commit }) => {
      sendAction('INCREMENT_WATER_LEVEL');
      commit('INCREMENT_WATER_LEVEL');
    },
    decrementWaterLevel: ({ commit }) => {
      sendAction('DECREMENT_WATER_LEVEL');
      commit('DECREMENT_WATER_LEVEL');

    },
    setWaterLevel: ({ commit, state }, { level }) => {
      if (level === null || level === undefined) {
        return;
      }
      if (level === state.session.waterLevel) {
        return;
      }
      sendAction('SET_WATER_LEVEL');
      commit('SET_WATER_LEVEL', { level });
    },
    setRoundDuration: ({ commit, state }, { duration }) => {
      const asMillis = duration * 1000;
      if (asMillis === state.session.duration) {
        return;
      }
      sendAction('SET_DURATION');
      commit('SET_DURATION', { duration: asMillis });
    },
    incrementDuration: ({ commit }) => {
      sendAction('INCREMENT_DURATION');
      commit('INCREMENT_DURATION');
    },
    decrementDuration: ({ commit }) => {
      sendAction('DECREMENT_DURATION');
      commit('DECREMENT_DURATION');
    },
    getStatus: ({ commit, state }) => {
      if (state.socket.isConnected) {
        sendAction('STATUS');
      }
    },
    setRestDuration: ({ commit }, { restDuration }) => {
      commit('SET_REST_DURATION', { restDuration });
    },
    stopRound: ({ commit, state }) => {
      sendAction('STOP');
    },
    setRemainingDuration: ({ commit }, { remaining }) => {
      commit('SET_REMAINING_DURATION', { remaining });
    },
    startRound: async ({ commit, state }) => {
      commit('SET_REMAINING_DURATION', { remaining: state.session.duration });
      sendAction('START');
    },
    saveRoundInformation: ({ commit }) => {
      commit('ADD_COMPLETED_ROUND');
    },
    showSetDialog({ commit }, { type }) {
      commit('SHOW_SET_DIALOG');
      commit('SET_DIALOG_TYPE', { type });
    },
  },
  getters: {
    duration: (state: State) => {
      return state.session.duration;
    },
    remainingDuration: (state: State) => {
      return state.session.remainingDuration;
    },
    speed: (state: State) => {
      return state.session.speed;
    },
    waterLevel: (state: State) => {
      return state.session.waterLevel;
    },
  },
});

function sendAction(message: string) {
  // Vue.prototype.$socket.send(message);
}


// All mutations from socket connection handled here
function handle(state: any, message: string) {
  // console.log(message);
}
