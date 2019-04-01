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
    <img alt="Vue logo" src="./assets/logo.png">

  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import SetterCard from './components/SetterCard.vue';

export default Vue.extend({
  name: 'app',
  components: {
    SetterCard,
  },
  computed: {
    speed (): number {
      return this.$store.state.session.speed.toString();
    },
    waterLevel(): number {
      return this.$store.state.session.waterLevel.toString();
    }
  },
  methods: {
    ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
      'incrementWaterLevel',
      'decrementWaterLevel'
    ]),
    setSpeed(value: number) {
      console.log('calling speed')
      this.$store.dispatch('setSpeed', { speed: value })
    },
    setWaterLevel(value: number) {
      console.log('calling ws')
      this.$store.dispatch('setWaterLevel', { level: value })
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
</style>
