<template>
  <div>
    <initial-view></initial-view>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

import InitialView from './views/Initial.vue';
import DirectionSetter from './components/DirectionSetter.vue';

export default Vue.extend({
  name: 'app',
  components: {
    InitialView
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
