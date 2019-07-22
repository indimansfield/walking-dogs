<template>
  <div id="app">
    <set-dialog></set-dialog>
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
      v-on:continue="onContinue"
      v-on:end="onEnd()">
    ></round-view>
    <summary-view
      v-if="view === 'summary'">
    </summary-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';
import Component from 'vue-class-component';
import InitialView from './views/Initial.vue';
import RunningView from './views/Running.vue';
import RoundView from './views/Round.vue';
import SummaryView from './views/Summary.vue';
import Header from './components/Header.vue';
import SetDialog from './components/SetDialog.vue';
import Session from '@/helpers/session';
import { IncrementingTimer } from '@/helpers/incrementingTimer';

@Component({
  name: 'app',
  components: {
    InitialView,
    RunningView,
    RoundView,
    SummaryView,
    'header-view': Header,
    SetDialog,
  },
  computed: {
    ...mapGetters([
      'duration',
      'remainingDuration',
      'speed',
    ]),
  },
})
export default class App extends Vue {
  private dog = '';
  private session: Session;
  private restTimer: IncrementingTimer;
  private duration: number;
  private remainingDuratin: number;
  private speed: number;

  public mounted() {
    this.session = new Session();
    this.session.on('FINISHED', (remaining: number) => {
      this.stop();
    });
    this.session.on('STOPPED', (remaining: number) => {
      this.stop();
    });
    this.session.on('TICK', (remaining: number) => {
      this.$store.dispatch('setRemainingDuration', { remaining });
    });

    this.restTimer = new IncrementingTimer();
    this.restTimer.on('TICK', (time: number) => {
      this.$store.dispatch('setRestDuration', { restDuration: time });
    });
  }

  get view() {
    return this.$store.state.view;
  }

  get showDialog() {
    return this.$store.state.setDialog.show;
  }

  private onStart() {
    this.$store.commit('SET_VIEW', 'running');
    this.session.start(this.duration, this.speed);
    this.$store.dispatch('startRound');

  }

  private setView(view: 'initial' | 'running'| 'round' | 'summary') {
    this.$store.commit('SET_VIEW', view);
  }

  private onContinue(restDuration: number) {
    this.restTimer.stop();
    this.$store.dispatch('saveRoundInformation');
    this.setView('running');
    this.session.start(this.duration, this.speed);
    this.$store.dispatch('startRound');

  }

  private onEnd() {
    this.restTimer.stop();
    this.$store.dispatch('saveRoundInformation');
    this.setView('summary');
  }

  private onStop() {
    this.session.stop();
  }

  private stop() {
    this.$store.dispatch('stopRound');
    this.restTimer.start();
    this.setView('round');
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
