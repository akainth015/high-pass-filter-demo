import WebSocket, {WebSocketServer} from 'ws';

let port = process.env.PORT || 8081;
const wss = new WebSocketServer({port: port});

console.info(`Started a server on port ${port}. ws://localhost:${port}`);

wss.on('connection', async function connection(ws) {
    const sourceConnection = new WebSocket("ws://localhost:8080");


    ws.on('message', data => {
        sourceConnection.send("retransmit pls tysm -denoiser");
    });

    const alpha = 0.01;
    let backgroundNoise = 0;

    sourceConnection.on("message", message => {
        const signal = parseFloat(message);
        ws.send((signal - backgroundNoise > 0 ? 1 : 0).toString());
        backgroundNoise = backgroundNoise * (1 - alpha) + signal * alpha;
    });
});
