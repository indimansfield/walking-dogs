<template>
  <md-card> 
    <md-card-header class="md-title">
      {{ title }}
    </md-card-header>
    <md-card-content class="wrapper">
      <div class="value">
        <span class="set-label">{{ title }}:</span>
        <md-button
          @click="showDialog"
          class="setter-button md-raised">
          {{ value }} 
        </md-button>
        <span class="set-label"> {{ units }} </span>
      </div>  
      <div class="button_decrement">
        <md-button class="md-raised md-icon-button md-accent" v-on:click="decrement">
          <md-icon class="md-size-5x">remove</md-icon>
        </md-button>
      </div>
      <div class="button_increment">
        <md-button class="md-raised md-icon-button md-raised" v-on:click="increment">
          <md-icon class="md-size-5x">add</md-icon>
        </md-button>
      </div>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import SetDialog from './SetDialog.vue';

@Component({
  components: {
    SetDialog
  }
})
export default class SetterCard extends Vue {
  @Prop() private readonly title: string;
  @Prop() private readonly units: string;
  @Prop() private readonly value: string;
  @Prop() private readonly type: string;

  get textValue(): string {
    return this.value;
  }

  set textValue(val: string) {
    this.$emit('change', Number(val));
  }

  private increment() {
    this.$emit('increment');
  }

  private decrement() {
    this.$emit('decrement');
  }

  private showDialog() {
    this.$store.dispatch('showSetDialog', { type: this.type });
  }


}
</script>

<style scoped>
  .md-card {
    vertical-align: top;
    width: 100%;
  }
  .wrapper {
    display: grid;
    grid-gap: 10px;
    justify-items: center;
  }
  .value {
    grid-row: 1;
    grid-column:  1 / 3;
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }
  .button_increment {
    grid-column: 2;
    grid-row: 2;
  }
  .button_decrement {
    grid-column: 1;
    grid-row: 2;
  }
  .md-icon-button {
    height: 150px;
    width: 150px;
  }
  .set-label {
    margin: auto;
  }
  .setter-button {
    width: 50%;
  }
</style>
