import WebSocket from 'ws'
import { Session } from './lib/session'

interface Message {
  action: String,
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
      ws.on('message', (message: string) => {
        ws.send(
          JSON.stringify(this.handle(message))
        )
      });
    });
  }

  private handle = (message: string): Message => {
    const parsed: Message = JSON.parse(message)
    console.log("Received:", parsed)
    console.log("Action:", parsed.action)

    switch (parsed.action) {
      case('INCREMENT_SPEED'):
        this.session.setSpeed(parsed.value)
        return {
          action: 'INCREMENT_SPEED',
          value: parsed.value
        }
    }
    return {
      action: 'NONE',
      value: 0
    }
  }

}