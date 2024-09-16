import { WebSocket } from "http";
import { WebSocketServer } from "ws";

const port = 1234;

const wss = new WebSocketServer()

wss.on('connection', (data) => {
    console.log(data)
})