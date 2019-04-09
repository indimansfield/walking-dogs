<template>
  <div id="app">
    <div class="md-layout">
      <div class="md-layout-item">
        <setter-card 
          title="Speed"
          :value="speed"
          units="m/min"
          v-on:increment="incrementSpeed"
          v-on:decrement="decrementSpeed"
          v-on:change="setSpeed"/>
      </div>
      <div class="md-layout-item">
        <setter-card 
          title="Water Level"
          :value="waterLevel"
          units="mm"
          v-on:increment="incrementWaterLevel"
          v-on:decrement="decrementWaterLevel"
          v-on:change="setWaterLevel"/>
      </div>
      <div class="md-layout-item">
        <setter-card 
          title="Speed"
          :value="speed"
          v-on:increment="incrementSpeed"
          v-on:decrement="decrementSpeed"/>
      </div>
    </div>
    <direction-setter></direction-setter>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import SetterCard from './components/SetterCard.vue';
import DirectionSetter from './components/DirectionSetter.vue';

import Component from 'vue-class-component'

@Component({
  components: {
    SetterCard,
    DirectionSetter
  },
  ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
      'incrementWaterLevel',
      'decrementWaterLevel'
    ])
})
export default class InitialView extends Vue {
  get speed (): number {
    return this.$store.state.session.speed.toString();
  }
  get waterLevel(): number {
    return this.$store.state.session.waterLevel.toString();
  }
  setSpeed(value: number) {
    this.$store.dispatch('setSpeed', { speed: value })
  }
  setWaterLevel(value: number) {
    this.$store.dispatch('setWaterLevel', { level: value })
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
</style>
