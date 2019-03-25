export interface TreadmillInterface {
  setSpeed: (speed: number) => number
  getSpeed: () => number
  setWaterLevel: (level: number) => number
  getWaterLevel: () => number 
}

export class Treadmill implements TreadmillInterface {
  private speed = 0
  private waterLevel = 0
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
}
