import { Session, ITimer, Timer } from "../../src/lib/session";
import { throwStatement } from "@babel/types";
import { MockMachine, MockTimer } from './mocks'
import { Treadmill } from '../../src/lib/treadmill'
import { IMachine } from '../../src/lib/machine'



describe('Session', () => {
  let treadmill: Treadmill
  let machine: IMachine
  let timer: ITimer
  let session: Session

  beforeEach(() => {
    treadmill = new Treadmill()
    machine = new MockMachine()
    timer = new MockTimer()
    session = new Session(machine, timer)
  })

  it('should set correct number of rounds', () => {
    session.setRounds(5)
    expect(session.totalRounds()).toEqual(5)
  })

  it('it should start until rounds expired', async () => {
    session.setRounds(2)
    expect(session.totalRounds()).toEqual(2)
    await session.start()
    await session.start()
    expect(session.roundsRemaining()).toEqual(0)
  })

  it('should increment duration', () => {
    session.incrementRoundDuration()
    expect(session.getRoundDuration()).toBe(10000)
  })

  it('should set a valid duration', () => {
    session.setRoundDuration(30000)
    expect(session.getRoundDuration()).toBe(30000)
  })

  it('should not set a negative duration', () => {
    session.setRoundDuration(-20000)
    expect(session.getRoundDuration()).toBe(0)
  })

  it('should not decrement below zero', () => {
    session.setRoundDuration(1000)
    session.decrementRoundDuration()
    expect(session.getRoundDuration()).toBe(0)
  })

  it('should decrement', () => {
    session.setRoundDuration(30000)
    session.decrementRoundDuration()
    expect(session.getRoundDuration()).toBe(20000)
  })
})