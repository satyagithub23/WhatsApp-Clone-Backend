const express = require('express');
const app = express();
const port = 3001;
const login = require('./login')
const contactCheck = require('./contactCheck')
const userStatusCheck = require('./userstatuscheck')
const rtdb = require('./db_model_schema')


const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const io = require('socket.io')(server, {
    cors: {
        origin: "http://127.0.0.1:3001",
        methods: ["GET", "POST"]
    }
});

const users = {};

app.use(login)
app.use(contactCheck)
app.use(userStatusCheck)

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.on('new-user-joined', async user => {
        let date = new Date()
        let hour = date.getHours().toLocaleString()
        let minute = date.getMinutes().toLocaleString()
        users[socket.id] = user;
        socket.broadcast.emit('users-joined', user);
        const rtdbuser = await rtdb.RTDBUser.updateOne(
            {mobileNo: `${user.contact_no}`},
            {$set: {socketId: `${socket.id}`, connectedAt: `${hour}:${minute}`}},
            {upsert: true}
        )
    });

    socket.on('message-sent', message => {
        console.log(message);
        socket.emit('message-received', { message: message, name: users[socket.id] });
    });

    socket.on('message-received', data => {
        console.log(data);
    });

    socket.on('disconnect', async () => {
        console.log(`User disconnected ${socket.id}`);
        socket.broadcast.emit('user-disconnected', {socketId: `${socket.id}`})
        const rmvUser = await rtdb.RTDBUser.deleteOne({socketId: `${socket.id}`})
    })
})

app.get('/', (req, res) => {
    res.send("Hello");
});