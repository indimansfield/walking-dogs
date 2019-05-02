import { TreadmillInterface } from "./treadmill";
import { IMachine } from './machine'

interface ISession {
  totalRounds: () => number;
  incrementRoundDuration: () => number;
  decrementRoundDuration: () => number;
  setRoundDuration: (duration: number) => number;
  getRoundDuration: () => number;
  start: () => Promise<boolean>;
  stop: () => boolean;
  incrementSpeed: () => number;
  decrementSpeed: () => number;
  setSpeed: (speed: number) => number;
  getSpeed: () => number;
  setWaterLevel: (level: number) => number;
  getWaterLevel: () => number;
  incrementWaterLevel: () => number;
  decrementWaterLevel: () => number;
  setDirection: (direction: 'forward' | 'reverse') => string;
  getDirection: () => string;
}

export interface ITimer {
  start: (duration: number) => Promise<boolean>
}

export class Timer implements ITimer {
  start(duration: number) {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(true)
      }, duration)
    })
  }
}

export class Session implements ISession {
  private rounds = 0
  private durationInMillis = 0
  private speed = 0
  private waterLevel = 0
  private running = false
  private timer: ITimer
  private direction = 'forward'

  private readonly TIMER_INCREMENTS = 10000

  private machine: IMachine

  constructor(machine: IMachine, timer: ITimer) {
    this.machine = machine
    this.timer = timer
  }

  incrementSpeed() {
    this.speed ++
    return this.speed
  }

  decrementSpeed() {
    if (this.speed == 0) {
      return 0
    }
    this.speed --
    return this.speed
  }

  setSpeed(speed: number) {
    this.speed = speed
    return speed
  }

  getSpeed() {
    return this.speed
  }

  incrementWaterLevel() {
    this.waterLevel ++
    return this.waterLevel
  }

  decrementWaterLevel() {
    if (this.waterLevel == 0) {
      return 0
    }
    this.waterLevel --
    return this.waterLevel
  }
  
  setWaterLevel(level: number) {
    this.waterLevel = level
    return level
  };
  
  getWaterLevel() {
    return this.waterLevel
  }

  totalRounds() {
    return this.rounds
  }

  incrementRoundDuration() {
    this.durationInMillis += this.TIMER_INCREMENTS
    return 0
  }

  decrementRoundDuration() {
    if (this.durationInMillis - this.TIMER_INCREMENTS < 0) {
      this.durationInMillis = 0
      return this.durationInMillis
    }
    this.durationInMillis -= this.TIMER_INCREMENTS
    return this.durationInMillis
  }

  getRoundDuration(): number {
    return this.durationInMillis
  }

  setRoundDuration(duration: number) {
    if ( duration < 0 ) {
      return this.durationInMillis
    }
    this.durationInMillis = duration
    return this.durationInMillis
  }

  async start() {
    console.log(`Round ${this.rounds} started`);
    this.machine.setSpeed(this.getSpeed())
    await this.timer.start(this.durationInMillis)
    this.machine.setSpeed(0)
    this.stop
    console.log(`Round ${this.rounds} ended`);
    this.rounds ++
    return this.running
  }

  stop() {
    this.machine.setSpeed(0)
    this.stop
    return this.running
  }

  setDirection(direction: 'forward' | 'reverse') {
    this.direction = direction
    return this.direction
  }

  getDirection() {
    return this.direction
  }
}