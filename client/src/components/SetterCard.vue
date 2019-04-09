<template>
  <md-card> 
    <md-card-header class="md-title">
      {{ title }}
    </md-card-header>
    <md-card-content class="wrapper">
      <md-field class="value">
        <label>{{ title }}</label>
        <md-input v-model="textValue"></md-input>
        <span class="md-suffix"> {{ units }} </span>
      </md-field>
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
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class SetterCard extends Vue {
  @Prop() readonly title: string;
  @Prop() readonly units: string;
  @Prop() readonly value: string;

  get textValue(): string {
    return this.value
  }

  set textValue(val: string) {
    this.$emit('change', val)
  }

  increment() {
    this.$emit('increment')
  }

  decrement() {
    this.$emit('decrement')
  }
}
</script>

<style scoped>
  .md-card {
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
