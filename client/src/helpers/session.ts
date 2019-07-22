import { CountDownTimer } from './timer';
import { EventEmitter } from 'events';
export default class Session  extends EventEmitter {
  private timer: CountDownTimer;
  private speed = 0;

  constructor() {
    super();
    this.timer = new CountDownTimer();
    this.timer.on('FINISHED', (remaining: number) => {
      this.emit('FINISHED', this.distanceTravelled((remaining / 1000)));
    });
    this.timer.on('STOPPED', (remaining: number) => {
      this.emit('STOPPED', this.distanceTravelled((remaining / 1000)));
    });
    this.timer.on('TICK', (remaining: number) => {
      this.emit('TICK', remaining);
    });
  }

  public start(time: number, speed: number) {
    this.speed = speed;

    this.timer.start(time);
  }

  public async stop() {
    this.timer.stop();
  }

  private distanceTravelled(seconds: number) {
    return this.speed * seconds;
  }
}
