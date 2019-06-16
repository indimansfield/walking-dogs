import { Timer } from './timer';
export default class Session {
  private timer: Timer;
  private speed = 0;

  constructor() {
    this.timer = new Timer();
  }

  public async start(time: number, speed: number) {
    this.speed = speed;
    return new Promise((resolve) => {
      this.timer.on('FINISHED', () => {
        resolve(this.distanceTravelled((time / 1000)));
      });
      this.timer.on('STOPPED', (remaining: number) => {
        resolve(this.distanceTravelled((remaining / 1000)));
      });
      this.timer.start(time);
    });
  }

  public async stop() {
    this.timer.stop();
  }

  private distanceTravelled(seconds: number) {
    return this.speed * seconds;
  }
}
