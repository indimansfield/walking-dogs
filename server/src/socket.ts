import WebSocket from 'ws'
import { Session } from './lib/session'

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
        console.log('brus look out')
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
    }
    return {
      type: 'NONE',
      value: 0
    }
  }

}