const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const { addUser, removeUser, getUser, getUserRoom } = require('./user');

const PORT = process.env.PORT || 5000;

const app = express();
const router = require('./router/router');

const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {

    // 后端接收前端命名为join的emit, (这里还可以传入一个callback函数)
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if (error) return callback(error);

        socket.join(user.room);

        socket.emit('message', { user: 'admin', text: `${user.name}, 欢迎来到 ${user.room} 房间` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} 进入了房间` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUserRoom(user.room) });

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });


    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} 退出了群聊` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUserRoom(user.room) });
        }
    });
})



server.listen(PORT, () => console.log(`Server connected to ${PORT}`));