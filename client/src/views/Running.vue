<template>
  <div id="app">
    <setter-card 
      title="Speed"
      :value="speed"
      units="m/min"
      class="setter-speed"
      v-on:increment="incrementSpeed"
      v-on:decrement="decrementSpeed"
      v-on:change="setSpeed"/>
    <setter-card 
      title="Water Level"
      :value="waterLevel"
      units="mm"
      class="setter-water-level"
      v-on:increment="incrementWaterLevel"
      v-on:decrement="decrementWaterLevel"
      v-on:change="setWaterLevel"/>
    <session-progress-card
      round="1"
      :remainingDuration="remainingDuration"
    ></session-progress-card>
    <md-card class="start-card">
      <md-card-header class="md-title">
        Running
      </md-card-header>
      <md-card-content class="start-card-content">
        <md-button
          class="start-button md-raised md-icon-button md-primary">
          <md-icon class="md-size-5x">pause</md-icon>
        </md-button>
        <md-button
          class="start-button md-raised md-icon-button md-primary">
          <md-icon class="md-size-5x">arrow_forward</md-icon>
        </md-button>
        <md-button
          class="start-button md-raised md-icon-button md-primary">
          <md-icon class="md-size-5x">stop</md-icon>
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import SetterCard from '../components/SetterCard.vue';
import DirectionSetter from '../components/DirectionSetter.vue';
import SessionProgressCard from '../components/SessionProgressCard.vue';

import Component from 'vue-class-component';

@Component({
  components: {
    SetterCard,
    SessionProgressCard
  },
  methods: {
    ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
      'incrementWaterLevel',
      'decrementWaterLevel'
    ])
  }
})
export default class InitialView extends Vue {
  private remainingDuration: number = 1500;

  private mounted() {
    this.remainingDuration = 15000;
    this.displayTimer();
  }

  get speed (): number {
    return this.$store.state.session.speed.toString();
  }
  get waterLevel(): number {
    return this.$store.state.session.waterLevel.toString();
  }
  private setSpeed(value: number) {
    this.$store.dispatch('setSpeed', { speed: value });
  }
  private setWaterLevel(value: number) {
    this.$store.dispatch('setWaterLevel', { level: value });
  }

  private displayTimer() {
    const interval = setInterval(() => {
      this.remainingDuration -= 1000;
      if (this.remainingDuration === 0) {
        clearInterval(interval);
      }
    }, 1000);
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  width: 1200px;
  text-align: left;
  margin: 0px auto;
  display: grid;
  justify-items: center;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
.control-button {
  height: 150px;
  width: 150px;
}
</style>
