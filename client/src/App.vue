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
      v-on:stop="onStop()">
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
import { mapActions } from 'vuex';


import Component from 'vue-class-component';
import InitialView from './views/Initial.vue';
import RunningView from './views/Running.vue';
import RoundView from './views/Round.vue';
import SummaryView from './views/Summary.vue';
import Header from './components/Header.vue';

@Component({
  name: 'app',
  components: {
    InitialView,
    RunningView,
    RoundView,
    SummaryView,
    'header-view': Header
  }
})
export default class App extends Vue {
  private dog = '';
  get view() {
    return this.$store.state.view;
  }

  private onStart() {
    this.$store.commit('SET_VIEW', 'running');
  }

  private setView(view: 'initial' | 'running'| 'round' | 'summary') {
    this.$store.commit('SET_VIEW', view);
  }

  private onStop() {
    this.$store.dispatch('stopRound');
  }
}
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
