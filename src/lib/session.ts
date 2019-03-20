interface ISession {
  setRounds: (amount: number) => number
  roundsRemaining: () => number
  totalRounds: () => number
  setRoundDuration: (duration: number) => number
  start: () => Promise<boolean>
  stop: () => boolean
}

interface Timer {
  start: (duration: number) => Promise<boolean>
}

class timer implements Timer {
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
  private running = false
  private timer: Timer

  private treadmill: TreadMillInterface
  private machine: Machine

  constructor(treadmill: TreadMillInterface, machine: Machine, timer: Timer) {
    this.treadmill = treadmill
    this.machine = machine
    this.timer = timer
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
    this.machine.setSpeed(this.treadmill.getSpeed())
    await this.timer.start(this.durationInMillis)
    this.machine.setSpeed(0)
    this.stop
    return this.running
  }

  stop() {
    return this.running
  }


}