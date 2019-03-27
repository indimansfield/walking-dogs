<template>
  <md-card> 
    <md-card-header class="md-title">
      {{ title }}
    </md-card-header>
    <md-card-content class="wrapper">
      <div class="value">
        {{ value }}
      </div>
      <div class="button_increment">
        <md-button class="md-raised md-icon-button md-raised" v-on:click="increment">
          <md-icon class="md-size-4x">add</md-icon>
        </md-button>
      </div>
      <div class="button_decrement">
        <md-button class="md-raised md-icon-button md-accent" v-on:click="decrement">
          <md-icon class="md-size-4x">remove</md-icon>
        </md-button>
      </div>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SetterCard',
  props: {
    title: String,
    units: String,
    value: String
  },
  methods: {
    increment() {
      this.$emit('increment')
    },
    decrement() {
      this.$emit('decrement')
    }

  }
});
</script>

<style scoped>
  .md-card {
    /* width: 320px; */
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .wrapper {
    display: grid;
    grid-gap: 10px;
    justify-items: center;
  }
  .value {
    grid-row: 1;
    grid-column:  1 / 3;
  }
  .button_increment {
    grid-column: 1;
    grid-row: 2;
  }
  .button_decrement {
    grid-column: 2;
    grid-row: 2;
  }
  .md-icon-button {
    height: 100px;
    width: 100px;
  }
</style>
