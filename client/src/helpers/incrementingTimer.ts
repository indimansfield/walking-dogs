import { EventEmitter } from 'events';

export class IncrementingTimer extends EventEmitter {
  private interval: number;
  private tick = 1000;
  private total: number = 0;

  public start() {
    this.interval = setInterval(() => {
      this.total += this.tick;
      this.emit('TICK', this.total);
    }, this.tick);
    return true;
  }

  public stop() {
    clearInterval(this.interval);
  }
}
