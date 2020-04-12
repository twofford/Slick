const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', (webSocket) => {

    webSocket.on('message', (message) => {

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});