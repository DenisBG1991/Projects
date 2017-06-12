const fs = require('Node/fs');
const http = require('Node/http');
/*
http.createServer((req, res) => {
    fs.readFile('text.txt', (error, data) => {
        if (error) throw error;
        res.end(data);
    });
}).listen(3001);

http.createServer((req, res) => {
    const file = fs.readFileSync('text.txt');
    res.end(file);
}).listen(3001);
*/

http.createServer((req, res) => {
    const stream = fs.createReadStream('text.txt');

    stream.pipe(res);
}).listen(3001);