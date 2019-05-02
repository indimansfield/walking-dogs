// Run a session with rounds and a true timer

import { Session, ITimer, Timer } from "../../src/lib/session";
import { throwStatement } from "@babel/types";
import { MockMachine, MockTimer } from './mocks'
import { Treadmill } from '../../src/lib/treadmill'
import { IMachine } from '../../src/lib/machine'

describe('Run Session', () => {
  const machine = new MockMachine()
  const timer = new Timer()
  const session = new Session(machine, timer)
  it('Should run a session', async () => {

  });
});