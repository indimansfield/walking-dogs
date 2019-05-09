<template>
  <div id="app">
    <h1> Hydrotreadmill Co Canine2100</h1>
    <header-view
      class="header-card"
    ></header-view>
    <initial-view 
      v-if="view === 'initial'"
      :dog="dog"
      v-on:startRunning="onStart">
    </initial-view>
    <running-view
      v-if="view === 'running'"
      v-on:stop="setView('round')">
    </running-view>
    <round-view
      v-if="view === 'round'"
      v-on:continue="setView('running')"
      v-on:end="setView('summary')">
    ></round-view>
    <summary-view
      v-if="view === 'summary'">
    </summary-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import InitialView from './views/Initial.vue';
import RunningView from './views/Running.vue';
import RoundView from './views/Round.vue';
import SummaryView from './views/Summary.vue';
import Header from './components/Header.vue';

export default Vue.extend({
  name: 'app',
  components: {
    InitialView,
    RunningView,
    RoundView,
    SummaryView,
    'header-view': Header
  },
  data: () => {
    return {
      view: 'initial',
      dog: ''
    };
  },
  methods: {
    onStart() {
      this.view = 'running';
    },
    setView(view: 'initial' | 'running'| 'round' | 'summary') {
      this.view = view;
    }
  }
});
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  width: 1200px;
  text-align: left;
   margin: 0px auto;
}
.header-card {
  margin-bottom: 15px;
}
</style>
