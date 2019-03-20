import WebSocket from 'ws'
import { State } from './index'

interface Message {
  action: String,
  value: any
}

export class Socket {
  private wss = new WebSocket.Server({ port: 3000 });
  private ws = new WebSocket('localhost:8080')

  state: State
  
  constructor(state: State) {
    this.state = state

  }

  public listen = () => {
    this.wss.on('connection',  () => {
      this.ws.on('message', (message: string) => {
        this.ws.send(
          JSON.stringify(this.handle(message))
        )
      });
    });
  }

  private handle = (message: string): Message => {
    const parsed: Message = JSON.parse(message)
    switch (parsed.action) {
      case('INCREMENT_SPEED'):
        this.state.speed ++
        return {
          action: 'INCREMENT_SPEED',
          value: this.state.speed 
        }
    }
    return {
      action: 'NONE',
      value: 0
    }
  }

}