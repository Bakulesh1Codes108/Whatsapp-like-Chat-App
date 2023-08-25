const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

let onlineUsersCount = 0; // To track the number of online users

app.use(express.static('public')); // Serve static files from a 'public' directory

io.on('connection', (socket) => {
    console.log('a user connected');
    onlineUsersCount += 1;  // Increase count when a user connects
    io.emit('online users count', onlineUsersCount); // Emit the updated count to all clients

    socket.on('chat message', (msg, username) => {
        io.emit('chat message', msg, username);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        onlineUsersCount -= 1;  // Decrease count when a user disconnects
        io.emit('online users count', onlineUsersCount); // Emit the updated count to all clients
    });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
