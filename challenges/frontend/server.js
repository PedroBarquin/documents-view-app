"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const port = 1234;
const wss = new ws_1.WebSocketServer();
wss.on('connection', (data) => {
    console.log(data);
});
