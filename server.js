//const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();
//const server = http.createServer(app);
const httpsOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/chain.pem'),
    passphrase: "abc345"
}
// as this is demo repo, passphrase exposed above ^^^ is for demo cert -- it is OK.
const server = https.createServer(httpsOptions, app);
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

const auth = require('./lib/auth')(server);

console.log('Starting server ...');

var port = parseInt(process.env.VULNSERV_PORT);
if (isNaN(port) || port <= 0 || port > 65535) {
    port = 3000; // default port
}

server.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});

process.on('uncaughtException', (err) => {
    console.log('Exception: ' + err.message);
});
