import { TreadmillInterface } from "./treadmill";
import { IMachine } from './machine'
import { Timer } from './timer'
import { EventEmitter } from "events";

interface ISession {
  totalRounds: () => number;
  incrementRoundDuration: () => number;
  decrementRoundDuration: () => number;
  setRoundDuration: (duration: number) => number;
  getRoundDuration: () => number;
  start: () => Promise<boolean>;
  stop: () => number;
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

export interface RoundSummary {
  round: number;
  speed: number;
  duration: number;
  distance: number;
  waterDepth: number;
  restTime: number;
}


export class Session extends EventEmitter implements ISession {
  private rounds = 0
  private durationInMillis = 30000
  private speed = 0
  private waterLevel = 0
  private running = false
  private timer: Timer
  private direction = 'forward'

  private readonly TIMER_INCREMENTS = 10000

  private machine: IMachine


  constructor(machine: IMachine, timer: Timer) {
    super()
    this.machine = machine
    this.timer = timer
    this.timer.on('FINISHED', () => {
      this.finish()
    })
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
    this.machine.setSpeed(this.getSpeed());
    this.timer.start(this.durationInMillis)
    return true
  }


  onStop() {
    this.machine.setSpeed(0)
    console.log(`Round ${this.rounds} ended`);
    this.rounds ++     
  }

  stop() {
    this.machine.setSpeed(0)
    this.timer.stop()
    this.emit('ROUND_STOPPED', {
      rounds: this.rounds,
      speed: this.speed,
      duration: this.durationInMillis,
      distance: 0,
      waterDepth: this.waterLevel,
      restTime: this.durationInMillis
    })
    return this.timer.stop()
  }

  finish() {
    this.machine.setSpeed(0)
    this.emit('ROUND_FINISHED', {
      rounds: this.rounds,
      speed: this.speed,
      duration: this.durationInMillis,
      distance: 0,
      waterDepth: this.waterLevel,
      restTime: this.durationInMillis
    })
  }

  setDirection(direction: 'forward' | 'reverse') {
    this.direction = direction
    return this.direction
  }

  getDirection() {
    return this.direction
  }

  status() {
    return {
      duration: this.durationInMillis,
      speed: this.speed,
      waterLevel: this.waterLevel,
      direction: this.direction
    }
  }
}