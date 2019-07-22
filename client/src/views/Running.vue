<template>
  <div class="running-view">
    <setter-card 
      title="Speed"
      :value="speed"
      type="speed"
      units="m/sec"
      class="running-setter-speed"
      @increment="incrementSpeed"
      @decrement="decrementSpeed"
      @change="setSpeed"/>
    <setter-card 
      title="Water Level"
      type="waterLevel"
      :value="waterLevel"
      units="mm"
      class="running-setter-water-level"
      @increment="incrementWaterLevel"
      @decrement="decrementWaterLevel"
      @change="setWaterLevel"/>
    <session-progress-card
      class="running-progress-card"
      round="1"
      :remainingDuration="remainingDuration"
    ></session-progress-card>
    <md-card class="running-start-card">
      <md-card-header class="md-title">
        Running
      </md-card-header>
      <md-card-content class="running-start-card-content">
        <md-button
          class="pause-button md-raised md-icon-button md-primary control-button">
          <md-icon class="md-size-5x">pause</md-icon>
        </md-button>
        <md-button
          class="start-button md-raised md-icon-button md-primary control-button">
          <md-icon class="md-size-5x">play_arrow</md-icon>
        </md-button>
        <md-button
          @click="$emit('stop')"
          class="stop-button md-raised md-icon-button md-primary control-button">
          <md-icon class="md-size-5x">stop</md-icon>
        </md-button>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

import SetterCard from '../components/SetterCard.vue';
import DirectionSetter from '../components/DirectionSetter.vue';
import SessionProgressCard from '../components/SessionProgressCard.vue';

import Component from 'vue-class-component';

@Component({
  components: {
    SetterCard,
    SessionProgressCard,
  },
  methods: {
    ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
      'incrementWaterLevel',
      'decrementWaterLevel',
    ]),
  },
})
export default class RunningView extends Vue {


  get remainingDuration() {
    return this.$store.getters.remainingDuration;
  }

  get speed() {
    return this.$store.getters.speed;
  }

  get duration() {
    return this.$store.getters.duration;
  }

  get waterLevel() {
    return this.$store.getters.waterLevel;
  }

  private setSpeed(value: number) {
    this.$store.dispatch('setSpeed', { speed: value });
  }
  private setWaterLevel(value: number) {
    this.$store.dispatch('setWaterLevel', { waterLevel: value });
  }
}
</script>

<style>
.running-view {
  width: 1200px;
  text-align: left;
  margin: 0px auto;
  display: grid;
  justify-items: center;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: repeat( 3, minmax(360px, 1fr) );
}
.control-button {
  height: 200px;
  width: 200px;
}
.running-setter-water-level {
  grid-row: 1;
  grid-column: 2;
}
.running-setter-speed {
  grid-row: 1;
  grid-column: 1;
}
.running-start-card {
  grid-row: 2;
  grid-column-start: 1;
  grid-column-end: 4;
  width: 100%;
}
.running-progress-card {
  grid-row: 1;
  grid-column: 3;
  width: 100%;
}
.running-start-card-content {
  display: flex;
  justify-content: space-around;
}
</style>
