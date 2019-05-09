<template>
  <div class="initial-view">
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
    <setter-card 
      title="Speed"
      :value="speed"
      class="setter-duration"
      v-on:increment="incrementSpeed"
      v-on:decrement="decrementSpeed"/>
    <direction-setter
      class="direction-setter"></direction-setter>
    <md-card class="start-card">
        <md-card-header class="md-title">
          Start
        </md-card-header>
        <md-card-content class="start-card-content">
          <md-button
            v-on:click="startRunning" 
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
// import { Prop } from 'vue-property-decorator';

@Component({
  components: {
    SetterCard,
    DirectionSetter
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
  // @Prop() public dog: string;
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
  private startRunning() {
    this.$emit('startRunning');
  }
}
</script>

<style>
.initial-view {
  width: 1200px;
  text-align: left;
  margin: 0px auto;
  display: grid;
  justify-items: center;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
  grid-template-columns: repeat( 6, minmax(180px, 1fr) );
}
.metadata-card {
  grid-row: 1;
  grid-column: 1 / 7;
  width: 100%;
}
.metadata-card-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.dog-name-input {
  width: 30%;
}
.setter-speed {
  grid-row: 1;
  grid-column: 1 / 3;
}
.setter-water-level {
  grid-row: 1;
  grid-column: 3 / 5;
}
.setter-duration {
  grid-row: 1;
  grid-column: 5 / 7;  
}
.direction-setter {
  grid-row: 2;
  grid-column: 1 / 4;
}
.start-card {
  width: 100%;
  grid-row: 2;
  grid-column: 4 / 7;
}
.start-card-content {
  text-align: center;
}

</style>
