<template>
  <md-card
      class="metadata-card">
      <md-card-content class="metadata-card-content">
        <md-field class="dog-name-input">
          <label>Name</label>
          <md-input v-model="dogName"></md-input>
        </md-field>
        <div class="">
        <h3>{{ date }}</h3>
        </div>
      </md-card-content>
    </md-card>
</template>
<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component({})
export default class Header extends Vue {
    get date(): string {
    return '8/09/2019';
  }

  get dogName(): string {
    return this.$store.state.session.dogName;
  }

  set dogName(val: string) {
    this.$store.commit('SET_NAME', val);
  }
}
</script>

<style>

</style>
