const http = require('Node/http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log(req.url);

    res.end("End!");
});

server.on('error', error => console.log(error));

/*
const server = http.createServer((req, res) => {
    console.log(req.url);
    res.end("End!");
});
*/

server.listen(3002);