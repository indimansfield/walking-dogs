import { TreadmillInterface } from "./treadmill";
import { IMachine } from './machine'

interface ISession {
  setRounds: (amount: number) => number
  roundsRemaining: () => number
  totalRounds: () => number
  setRoundDuration: (duration: number) => number
  start: () => Promise<boolean>
  stop: () => boolean
  setSpeed: (speed: number) => number
  getSpeed: () => number
  setWaterLevel: (level: number) => number
  getWaterLevel: () => number 
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
  private remainingRounds = 0
  private durationInMillis = 0
  private speed = 0
  private waterLevel = 0
  private running = false
  private timer: ITimer

  private machine: IMachine

  constructor(machine: IMachine, timer: ITimer) {
    this.machine = machine
    this.timer = timer
  }

  setSpeed(speed: number) {
    this.speed = 0
    return speed
  }

  getSpeed() {
    return this.speed
  }
  
  setWaterLevel(level: number) {
    this.waterLevel = level
    return level
  };
  
  getWaterLevel() {
    return this.waterLevel
  }
  
  setRounds = (amount: number) => {
    this.rounds = amount
    this.remainingRounds = amount
    return this.rounds
  }

  roundsRemaining() {
    return this.remainingRounds
  }

  totalRounds() {
    return this.rounds
  }

  setRoundDuration(duration: number) {
    this.durationInMillis = duration
    return this.durationInMillis
  }

  async start() {
    if (this.remainingRounds == 0) {
      return false
    }
    this.machine.setSpeed(this.getSpeed())
    await this.timer.start(this.durationInMillis)
    this.machine.setSpeed(0)
    this.stop
    this.remainingRounds --
    return this.running
  }

  stop() {
    return this.running
  }


}