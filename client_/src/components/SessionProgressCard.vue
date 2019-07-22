<template>
  <md-card> 
    <md-card-header class="md-title">
      Round Information
    </md-card-header>
    <md-card-content class="progress-content">
      <label class="progress-label"> Round: </label>
      <div class="progress-round">
        {{ round }}
      </div>
      <label class="progress-label"> Remaining Time: </label>
      <div class="progress-duration">
        {{ displayedRemainingDuration }}
      </div>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { toReadableTime } from '@/helpers';

@Component({})
export default class SessionProgressCard extends Vue {
  @Prop() private round!: number;
  @Prop() private remainingDuration!: number;

  get displayedRemainingDuration() {
    return toReadableTime(this.remainingDuration);
  }
}
</script>

<style>
.progress-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 60%
}
.progress-label {
  margin-right: auto;
}
.progress-round {
  font-size: 48px;
  margin: 20px;
}

.progress-duration {
  margin-top: 20px;
  font-size: 32px;
}
</style>
