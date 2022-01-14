import {WebSocketServer} from 'ws';
import {MessageTransmission} from "./protocol.mjs";

const wss = new WebSocketServer({port: 8080});

wss.on('connection', async function connection(ws) {
    const message = new MessageTransmission("https://youtu.be/dQw4w9WgXcQ", 100);

    ws.on('message', data => {
        message.retransmit();
    });

    // TODO add a 1s noise calibration leader
    const interference = 0.02;

    setInterval(() => {
        if (!message.transmissionOver()) {
            let signal = message.nextSignalNoisy(interference);
            ws.send(signal.toString());
        }
    }, 50);
});
