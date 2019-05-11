import WebSocket from 'ws'
import { Session, RoundSummary } from './lib/session'

interface Message {
  type: string,
  value: any
}

export class Socket {
  private wss = new WebSocket.Server({ port: 3000 });

  private session: Session
  constructor(session: Session) {
    this.session = session
  }

  public listen = () => {
    this.wss.on('connection',  (ws) => {
      console.log('connected')
      ws.send(JSON.stringify(this.handle({ type: 'STATUS', value: '' })))
      this.session.on('ROUND_FINISHED', (summary: RoundSummary) => {
        console.log('ROUND_FINISHED')
        ws.send(
          JSON.stringify({
            type: 'ROUND_FINISHED',
            value: summary
          }))
      })
      this.session.on('ROUND_STOPPED', (summary: RoundSummary) => {
        ws.send(
          JSON.stringify({
            type: 'ROUND_STOPPED',
            value: summary
          }))
      })

      ws.on('message', (message: any) => {
        ws.send(
          JSON.stringify(this.handle(JSON.parse(message)))
        )
      });
    });
  }

  private handle = (message: { type: string, value: string}): Message => {
    console.log("Received:", message.value)
    console.log("Type:", message.type)

    switch (message.type) {
      case('INCREMENT_SPEED'):
        const speed = this.session.incrementSpeed()
        return {
          type: 'SET_SPEED',
          value: speed
        }
      case('DECREMENT_SPEED'):
        const value = this.session.decrementSpeed()
        return {
          type: 'SET_SPEED',
          value
        }
      case('SET_SPEED'):
        this.session.setSpeed(Number(message.value))
        return {
          type: 'SET_SPEED',
          value: this.session.getSpeed()
        }
      case('INCREMENT_WATER_LEVEL'):
        this.session.incrementWaterLevel()
        return {
          type: 'SET_WATER_LEVEL',
          value: this.session.getWaterLevel()
        }
      case('DECREMENT_WATER_LEVEL'):
        this.session.decrementWaterLevel()
        return {
          type: 'SET_WATER_LEVEL',
          value: this.session.getWaterLevel()
        }
      case('SET_WATER_LEVEL'):
        this.session.setWaterLevel(Number(message.value))
        return {
          type: 'SET_WATER_LEVEL',
          value: this.session.getWaterLevel()
        }
      case('SET_DURATION'):
        console.log(message.value)
        this.session.setRoundDuration(Number(message.value))
        return {
          type: 'SET_DURATION',
          value: this.session.getRoundDuration()
        }
      case('INCREMENT_DURATION'):
        this.session.incrementRoundDuration()
        return {
          type: 'SET_DURATION',
          value: this.session.getRoundDuration()
        }
      case('DECREMENT_DURATION'):
        this.session.decrementRoundDuration()
        return {
          type: 'SET_DURATION',
          value: this.session.getRoundDuration()
        }
      case('SET_DIRECTION'):
        this.session.setDirection(message.value as ('forward' | 'reverse'))
        return {
          type: 'SET_DIRECTION',
          value: this.session.getDirection()
        }
      case('STATUS'):
        return {
          type: 'STATUS',
          value: this.session.status()
        }
      case('START'):
        this.session.start()
        return {
          type: 'START',
          value: ''
        }
      case('STOP'):
        this.session.stop()

    }
    return {
      type: 'NONE',
      value: 0
    }
  }

}