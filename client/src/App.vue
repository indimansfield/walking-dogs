<template>
  <div id="app">
    <div class="md-layout">
      <div class="md-layout-item">
        <setter-card 
          title="Speed"
          :value="speed"
          units="m/s"
          v-on:increment="incrementSpeed"
          v-on:decrement="decrementSpeed"
          v-on:change="setSpeed"/>
      </div>
      <div class="md-layout-item">
        <setter-card 
          title="Water Level"
          :value="speed"
          v-on:increment="incrementSpeed"
          v-on:decrement="decrementSpeed"/>
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
      console.log(this.$store.state.session.speed)
      return this.$store.state.session.speed.toString();
    }
  },
  methods: {
    ...mapActions([
      'incrementSpeed',
      'decrementSpeed',
    ]),
    setSpeed(value: number) {
      console.log('speed', value)
      this.$store.dispatch('setSpeed', { speed: value })
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
