<template>
  <md-dialog :md-active.sync="show">
    <md-dialog-title>Set {{ type }} </md-dialog-title>
      <md-field>
        <label>{{ title }} </label>
      <md-input v-model="value"></md-input>
      <md-button @click="set" class="md-primary">Set</md-button>
    </md-field>
  </md-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class SetDialog extends Vue {
  @Prop() private title: string;
  @Prop() private initialValue: number;

  private value: number = 0;

  get type() {
    return this.$store.state.setDialog.toSet;
  }

  get show() {
    return this.$store.state.setDialog.show;
  }

  set show(v) {
    this.$store.commit('HIDE_SET_DIALOG');
  }

  set() {
    switch(this.type) {
      case 'speed':
        this.$store.dispatch('setSpeed', { speed: this.value });
        break;
      case 'duration':
        this.$store.dispatch('setRoundDuration', { duration: this.value });
        break;
      case 'waterLevel':
        this.$store.dispatch('setWaterLevel', { level: this.value });
    }
  }
}
</script>

<style>

</style>
