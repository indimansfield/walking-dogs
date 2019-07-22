<template>
  <div>
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>Round</md-table-head>
        <md-table-head md-numeric>Speed</md-table-head>
        <md-table-head md-numeric>Distance</md-table-head>
        <md-table-head md-numeric>Water Depth</md-table-head>
        <md-table-head md-numeric>Run Time</md-table-head>
        <md-table-head md-numeric>Rest Time</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item) in summary" v-bind:key="item.id">
        <md-table-cell md-numeric>{{ item.round }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.speed }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.distance }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.waterLevel }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.elapsedDuration }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.restDuration }}</md-table-cell>
      </md-table-row>

    </md-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

import Component from 'vue-class-component';
import { CompletedRound } from '../store';
import { toReadableTime } from '@/helpers';

@Component({})
export default class Summary extends Vue {
  get summary(): CompletedRound[] {
    return this.$store.state.completedRounds.map((item: CompletedRound) => {
      const restDuration = item.restDuration || 0;
      return {
        ...item,
        elapsedDuration: toReadableTime(item.elapsedDuration),
        restDuration: toReadableTime(restDuration),
      };
    });
  }
}


</script>
<style>

</style>
