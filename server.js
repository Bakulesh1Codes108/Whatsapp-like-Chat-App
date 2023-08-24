const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public')); // Serve static files from a 'public' directory

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg, username) => {
        io.emit('chat message', msg, username);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
