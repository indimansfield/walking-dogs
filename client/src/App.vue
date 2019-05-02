<template>
  <div>
    <initial-view 
      v-if="view === 'initial'"
      v-on:startRunning="onStart">
    </initial-view>
    <running-view
      v-if="view === 'running'">
    </running-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import InitialView from './views/Initial.vue';
import RunningView from './views/Running.vue';
import DirectionSetter from './components/DirectionSetter.vue';

export default Vue.extend({
  name: 'app',
  components: {
    InitialView,
    RunningView
  },
  data: () => {
    return {
      view: 'initial'
    };
  },
  methods: {
    onStart() {
      this.view = 'running';
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
