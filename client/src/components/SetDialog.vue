<template>
  <md-dialog :md-active.sync="show">
    <md-dialog-title>Set {{ type }} </md-dialog-title>
    <div class="set-dialog-body">
      <md-field>
        <label>{{ title }} </label>
        <md-input
          v-model="value"
          v-on:keyup.enter="set"></md-input>
      </md-field>
    </div>
    <md-dialog-actions>
      <md-button @click="set" class="md-primary">Set</md-button>
    </md-dialog-actions>  
  </md-dialog>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

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

  @Watch('show')
  private setValue() {

    switch (this.type) {
      case 'speed':
        this.value = this.$store.state.session.speed;
        break;
      case 'duration':
        this.value = this.$store.state.session.duration  / 1000;
        break;
      case 'waterLevel':
       this.value = this.$store.state.session.waterLevel;
    }
  }

  private set() {
    switch (this.type) {
      case 'speed':
        this.$store.dispatch('setSpeed', { speed: this.value });
        break;
      case 'duration':
        this.$store.dispatch('setRoundDuration', { duration: this.value });
        break;
      case 'waterLevel':
        this.$store.dispatch('setWaterLevel', { level: this.value });
    }
    this.$store.commit('HIDE_SET_DIALOG');
  }
}
</script>

<style>
.set-dialog-body {
  margin: 10px;
}
</style>
