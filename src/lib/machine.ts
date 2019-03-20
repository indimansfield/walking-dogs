interface Machine {
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