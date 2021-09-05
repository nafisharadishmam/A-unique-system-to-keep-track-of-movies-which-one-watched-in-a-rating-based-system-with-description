const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./util/messages');
const bot = require('./chatbot-server');
const {
    userJoin,
    getCurrentUser,
    userLeave
} = require('./util/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


//set folder static
app.use(express.static(path.join(__dirname, 'messenger')));

const roomName = 'Movie Gossip room';
// user connection
io.on('connection', socket => {

    socket.on('joinRoom', ({
        username,
        email,
        room
    }) => {
        const user = userJoin(socket.id, username, email, room);
        socket.join(room);

        //Welcome only user
        socket.emit('message', formatMessage(roomName, 'Welcome to gossip galaxy', user.email));

        // Welcome message connect
        socket.broadcast.to(user.room).emit("message", formatMessage(roomName, `${user.username} join the room `, user.email));

    });

    // Message listen;
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg, user.email));
    });

    // User when left
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if(user){
            io.emit('message', formatMessage(roomName, `${user.username}  left group`, ""));
        }
        });


});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));