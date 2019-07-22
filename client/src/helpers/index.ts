export function toReadableTime(time: number) {
  return new Date(time).toISOString().substr(11, 8);
}

