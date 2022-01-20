const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



let port = 3000

const users = []

server.listen(port, () => {
    console.log("listening at port 3000")
});
io.on('connection', (socket) => {
    console.log('connected to', socket.id)
    const room = 'MYROOM'

    socket.on("adduser", (username) => {
        socket.user = username;
        users.push(username)
        console.log("latest users", users)
        io.sockets.emit("users", users)
    })
    socket.on("message", (message) => {
        io.sockets.emit("message", {
            user: socket.user,
            message: message,
        })
    })
    socket.on("disconnect", () => {
        console.log("deleting ", socket.user)

        if (socket.user) {
            users.splice(users.indexOf(socket.user), 1);
        }
        io.sockets.emit("users", users)
        console.log('remaining users: ', users)
    })
});