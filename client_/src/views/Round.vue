<template>
  <div class="round">
    <setter-card 
          title="Speed"
          :value="speed"
          type="speed"
          units="m/sec"
          class="round-setter-speed"
          @increment="incrementSpeed"
          @decrement="decrementSpeed"
          @change="setSpeed"/>
        <setter-card 
          title="Water Level"
          :value="waterLevel"
          type="waterLevel"
          units="mm"
          class="round-setter-water-level"
          @increment="incrementWaterLevel"
          @decrement="decrementWaterLevel"
          @change="setWaterLevel"/>
        <setter-card 
          title="Duration"
          type="duration"
          :value="duration"
          class="round-setter-duration"
          @increment="incrementDuration"
          @decrement="decrementDuration"
          @change="setDuration"/>
    <direction-setter
      class="direction-setter"></direction-setter>
      <md-card class="start-card">
        <md-card-header class="md-title">
          Start
        </md-card-header>
        <md-card-content class="continue-card-content">
          <md-button
            @click="onEnd()"
            class="stop-button circle-button-medium md-raised md-icon-button md-primary">
            <md-icon class="md-size-5x">stop</md-icon>
          </md-button>
          <md-button
            @click="onContinue"
            class="start-button circle-button-medium md-raised md-icon-button md-primary">
            <md-icon class="md-size-5x">arrow_forward</md-icon>
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

import Component from 'vue-class-component';

@Component({
  components: {
    SetterCard,
    DirectionSetter,
  },
  methods: {
    ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
      'incrementWaterLevel',
      'decrementWaterLevel',
      'incrementDuration',
      'decrementDuration',
    ]),
  },
})
export default class RoundView extends Vue {
  private restDuration = 0;

  private mounted() {
    this.$store.dispatch('getStatus');
  }

  get speed(): number {
    return this.$store.state.session.speed;
  }

  get waterLevel(): number {
    return this.$store.state.session.waterLevel;
  }

  get duration(): number {
    return (this.$store.state.session.duration / 1000);
  }

  private setSpeed(value: number) {
    this.$store.dispatch('setSpeed', { speed: value });
  }

  private setWaterLevel(value: number) {
    this.$store.dispatch('setWaterLevel', { waterLevel: value });
  }

  private setDuration(value: number) {
    this.$store.dispatch('setRoundDuration', { duration: value });
  }

  private onContinue() {
    this.$emit('continue', this.restDuration);
  }

  private onEnd() {
    this.$emit('end');
  }
}
</script>

<style>
.round {
  width: 1200px;
  text-align: left;
  margin: 0px auto;
  display: grid;
  justify-items: center;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: repeat( 6, minmax(180px, 1fr) );
}
.round-setter-speed {
  grid-row: 1;
  grid-column: 1 / 3;
}
.round-setter-water-level {
  grid-row: 1;
  grid-column: 3 / 5;
}
.round-setter-duration {
  grid-row: 1;
  grid-column: 5 / 7;  
}
.round-direction-setter {
  grid-row: 2;
  grid-column: 1 / 4;
}
.continue-card-content {
  display: flex;
  justify-content: space-around; 
}
</style>
