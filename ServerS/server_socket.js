import { json } from 'express';
import {WebSocketServer} from 'ws';

import database from '../Data/database.js';

let clients = {};

async function onConnection(ws) {
    
    ws.on('message', (data) =>{
        const parsed = json.parse(data);

        if (parsed.type === 'start_chat') {
            const {fromUser, toUser} = parsed;
            clients[fromUser] = ws;
            console.log(`Chat iniciado entre ${fromUser} e ${toUser}`);
        }

        if (parsed.type === 'send_message') {
            const {fromUser, toUser, message} = parsed;
            console.log(`Message enviado por ${fromUser} para ${toUser}: ${message}`);

            database.query('insert into Messages (sender_id, receiver_id, text, status, created_at) values ($1, $2, $3, $4, $5)',[fromUser, toUser, message, NOW()]);

            if (clients[toUser]) {
                clients[toUser].send(json.stringify({
                    type: 'new_message',
                    from: fromUser,
                    message: message,
                }));
            }
        }
    });

    ws.on('close', () => {
        for(const id in clients){
            if (clients[id] === ws) {
                delete clients[id];
                console.log(`Usuário ${id} desconectado `);
            }
        }
    });
};

function onMessage(ws,data) {
    
}








export default () => {
    const wss = new WebSocketServer({
        port: 2001
    });
    
    wss.on('connection', onConnection);




    console.log('')
    console.log('|-------------------------------------------|')
    console.log('| Socket Server iniciado na porta 2001      |')
    console.log('|-------------------------------------------|')
    console.log('')
}