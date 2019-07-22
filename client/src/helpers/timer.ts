import { EventEmitter } from 'events';

export interface ITimer {
  start: (duration: number) => boolean;
  stop: () => number;
}

export class CountDownTimer extends EventEmitter implements ITimer {
  private interval: number;
  private remaining: number = 0;
  public start(duration: number) {
    this.remaining = duration;
    this.interval = setInterval(() => {
      this.remaining -= 1000;
      this.emit('TICK', this.remaining);
      if (this.remaining === 0) {
        clearInterval(this.interval);
        this.emit('FINISHED');
      }
    }, 1000);
    return true;
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.emit('STOPPED', this.remaining);
    }
    return this.remaining;
  }
}
