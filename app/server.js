// import {createMessage} from '../frontend/actions/message_actions';

const WebSocket = require('ws');

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on('connection', (webSocket) => {

    webSocket.on('message', (message) => {

        // createMessage(message); //this should work, but won't let me import this function

        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});