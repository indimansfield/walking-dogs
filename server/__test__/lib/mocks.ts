import { ITimer } from "../../src/lib/session";
import { IMachine } from "../../src/lib/machine"

export class MockMachine implements IMachine {
  fillOn() {
    return true
  }
  fillOff() {
    return false
  }
  drainOn() {
    return true
  }
  drainOff() {
    return false
  }
  treadMillOn() {
    return true
  }
  treadMillOff() {
    return false
  }
  heatOn() {
    return true
  }
  heatOff() {
    return false
  }
  heatPumpOn() {
    return true
  }
  heatPumpOff() {
    return false
  }
  setSpeed(speed: number) {
    return speed
  }
}

export class MockTimer implements ITimer {
  start(duration: number) {
    return new Promise<boolean>(resolve => {
      resolve(true)
    })
  }

}