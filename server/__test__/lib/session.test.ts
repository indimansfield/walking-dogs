import { Session, ITimer } from "../../src/lib/session";
import { throwStatement } from "@babel/types";
import { MockMachine, MockTimer } from './mocks'
import { Treadmill } from '../../src/lib/treadmill'



describe('Session', () => {
  let treadmill: Treadmill
  let machine: Machine
  let timer: ITimer

  beforeEach(() => {
    treadmill = new Treadmill()
    machine = new MockMachine()
    timer = new MockTimer()
  })

  it('should set correct number of rounds', () => {
    const session = new Session(machine, timer)
    session.setRounds(5)
    expect(session.totalRounds()).toEqual(5)
  })

  it('it should start until rounds expired', async () => {
    const session = new Session(machine, timer)
    session.setRounds(2)
    expect(session.totalRounds()).toEqual(2)
    await session.start()
    await session.start()
    expect(session.roundsRemaining()).toEqual(0)
  })
})