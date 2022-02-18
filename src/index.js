import express from 'express';
import { Server as WebSocketServer } from 'socket.io';
const cors = require('cors');

import http from 'http';

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new WebSocketServer(server, {
	cors: {}
});

io.on('connection', (socket) => {
	const idHandShake = socket.id;
	const { nameRoom } = socket.handshake.query;

	console.log(`id: ${idHandShake} => ${nameRoom}`);

	socket.join(nameRoom);

	socket.on('event', (res) => {
		const data = res;

		console.log(res);

		socket.to(nameRoom).emit('event', data);
	});
});

server.listen(5000, () => {
	console.log('run in 5000');
});
