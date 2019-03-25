
import { Socket } from "./socket"
import { Session, Timer, TestMachine } from "./lib"
const machine = new TestMachine()
const timer = new Timer()
const session = new Session(machine, timer)

const socket = new Socket(session)
socket.listen()


