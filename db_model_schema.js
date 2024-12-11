const db_connection = require('./db')


// DB Schema (In mongo db we need to create a schema first)
const userSchema = db_connection.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passWord: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    }
}, { timestamps: true })

// DB Model
const User = db_connection.model('user', userSchema);

const userRtdbSchema = db_connection.Schema({
    socketId: {
        type: String,
        required: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    connectedAt: {
        type: String,
        required: false
    }, 
    disconnectedAt: {
        type: String,
        required: false
    }
})

const RTDBUser = db_connection.model('rtdb', userRtdbSchema)

module.exports = { User, RTDBUser }



