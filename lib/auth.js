/**
 * Simple authentication example for MITM workshop.
 *
 * @module auth
  */
const socket_io = require('socket.io');

module.exports = function(server) {
    var module = {};
    const io = socket_io.listen(server);

    io.on('connection', async (socket) => {

        console.log(`Incoming connection from client with socket.id = ${socket.id}`);

        try {
            _auth(socket);
            _sendMsg(socket, "Connection successful");
            console.log(`Auth successful from client with socket.id = ${socket.id}`);
        } catch (err) {
            console.log(err.message);
            socket.disconnect(true);
            return;
        }

        socket.on('error', function (error) {
            console.log(`Connection error for client with socket.id = ${socket.id}: ${error}`);
        });

        socket.on('disconnecting', function (reason) {
            console.log(`Client with socket.id = ${socket.id} disconnecting: ${reason}`);
        });

        socket.on('disconnect', function (reason) {
            console.log(`Client with socket.id = ${socket.id} disconnected: ${reason}`);
        });
    });

    return module;
}

var _knownUsers = [
  { username: 'alice', password: 'abc123' },
  { username: 'bob', password: 'qwerty' }
];

function _auth(socket) {

    console.log(socket.handshake.query);

    for (let known of _knownUsers) {
        if (known.username == socket.handshake.query.username &&
            known.password == socket.handshake.query.password) {
            console.log(`Known.username=${known.username}`)
            return;
            }
    }
    throw (Error('Authentication failed'));
}

function _sendMsg(socket, msg) {
    console.log(`Sending msg (${msg}) to client with socket.id = ${socket.id}`);
    socket.emit(msg);
}
