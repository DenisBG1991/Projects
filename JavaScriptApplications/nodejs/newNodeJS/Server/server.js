const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/plain',});
    res.end('OK');
}).listen(3010, () => console.log('Сервер работает!'));