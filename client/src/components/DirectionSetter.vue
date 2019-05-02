<template>
  <md-card>
    <md-card-header class="md-title">
      Treadmill Direction
    </md-card-header>
    <md-card-content class="wrapper">
      <md-button 
        class="md-raised md-icon-button md-raised"
        v-bind:class="{ 'md-primary': direction === 'reverse' }"
        v-on:click="setDirection('reverse')">
        <md-icon class="md-size-5x">arrow_back</md-icon>
      </md-button>
      <md-button 
        class="md-raised md-icon-button md-raised" 
        v-bind:class="{ 'md-primary': direction === 'forward' }"
        v-on:click="setDirection('forward')">
        <md-icon class="md-size-5x">arrow_forward</md-icon>
      </md-button>
    </md-card-content>
  </md-card>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class DirectionSetter extends Vue {
  private direction: 'forward' | 'reverse' = 'forward';

  private setDirection(dir: 'forward' | 'reverse') {
    this.direction = dir;
  }
}
</script>
<style scoped>
.md-card {
  margin: 4px;
  vertical-align: top;
  width: 100%;
}

.wrapper {
  text-align: center
}

.md-icon-button {
  height: 150px;
  width: 150px;
  margin: 20px;
}
</style>
