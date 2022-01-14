import WebSocket, {WebSocketServer} from 'ws';

let port = process.env.PORT || 8081;
const wss = new WebSocketServer({port: port});

console.info(`Started a server on port ${port}. ws://localhost:${port}`);

wss.on('connection', async function connection(ws) {
    const sourceConnection = new WebSocket("ws://localhost:8080");

    ws.on('message', data => {
        sourceConnection.send("retransmit pls tysm -denoiser");
    });

    sourceConnection.on("message", message => {
        const signal = parseFloat(message);

        /* TODO Replace this section with an algorithm to detect the spikes / filter out the noise! */
        const corrected = signal > 50 ? 1 : 0;

        ws.send(corrected.toString());
    });
});
