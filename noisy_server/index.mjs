import {WebSocketServer} from 'ws';
import {MessageTransmission} from "./protocol.mjs";

let port = process.env.PORT || 8080;
const wss = new WebSocketServer({port: port});

console.info(`Started a server on port ${port}. ws://localhost:${port}`);

wss.on('connection', async function connection(ws) {
    const message = new MessageTransmission("https://youtu.be/dQw4w9WgXcQ", 100);

    ws.on('message', data => {
        message.retransmit();
    });

    const interference = 0.02;

    setInterval(() => {
        if (!message.transmissionOver()) {
            let signal = message.nextSignalNoisy(interference);
            ws.send(signal.toString());
        }
    }, 50);
});
