import WebSocket from 'ws'
import { Session } from './lib/session'

interface Message {
  action: String,
  value: any
}

export class Socket {
  private wss = new WebSocket.Server({ port: 3000 });
  private ws = new WebSocket('localhost:8080')

  private session: Session
  constructor(session: Session) {
    this.session = session

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
        this.session.setSpeed(parsed.value)
    }
    return {
      action: 'NONE',
      value: 0
    }
  }

}