import { EventEmitter } from 'events';

export interface ITimer {
  start: (duration: number) => boolean;
  stop: () => number;
}

export class Timer extends EventEmitter implements ITimer {
  private interval: any;
  private remaining: number = 0;
  public start(duration: number) {
    this.remaining = duration;
    this.interval = setInterval(() => {
      this.remaining -= 1000;
      console.log(this.remaining / 1000);
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
