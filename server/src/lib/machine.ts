export interface IMachine {
  fillOn: () => boolean;
  fillOff: () => boolean;
  drainOn: () => boolean;
  drainOff: () => boolean;
  treadMillOn: () => boolean;
  treadMillOff: () => boolean;
  heatOn: () => boolean;
  heatOff: () => boolean;
  heatPumpOn: () => boolean;
  heatPumpOff: () => boolean;
  setSpeed: (speed: number) => number;
}

export class TestMachine implements IMachine {
  fillOn = () => true
  fillOff = () => false;
  drainOn = () => true;
  drainOff = () => false;
  treadMillOn = () => true;
  treadMillOff =() => false;
  heatOn = () => true;
  heatOff = () => false;
  heatPumpOn = () => true;
  heatPumpOff = () => false;
  setSpeed = (speed: number) => 0;
}