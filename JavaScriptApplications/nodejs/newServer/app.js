const http = require('http');
const fs = require('fs');
const url = require('url');

class Server {
    static start(port) {
        this.getRoutes(port)
            .then(this.getImage)
            .then(this.getCSS)
            .then(this.createServer);
    };

    static getRoutes(port) {
        return new Promise(resolve => {
            fs.readFile('routes.json', { encoding: 'utf8' }, function(error, routes) {
                if (!error) {
                    resolve({
                        port: port,
                        routes: JSON.parse(routes)
                    }, console.log('Routed done!'));
                }
            });
        });
    };

    static getImage(settings) {
        return new Promise(function(resolve) {
            fs.readFile('./images/1.jpg', function(error, image) {
                if (!error) {
                    settings = Object.assign({}, settings, {image: image});
                    resolve(settings, console.log('Images done!'));
                }
            });
        });
    };

    static getCSS(settings) {
        return new Promise(function(resolve) {
            fs.readFile('./index.css', { encoding: 'utf8' }, function(error, css) {
                if (!error) {
                    settings = Object.assign({}, settings, {css: css});
                    resolve(settings, console.log('CSS done!'));
                }
            });
        });
    };

    static createServer(settings) {
        console.log(settings);
        http.createServer((req, res) => {
            fs.readFile('./index.html', {encoding: 'utf8'}, (error, file) => {
                if (!error) {
                    console.log(req.url);
                    switch (req.url) {
                        case '/':
                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(file);
                            res.end();
                            break;
                        case '/index.css':
                            res.writeHead(200, { 'Content-Type': 'text/css' });
                            res.write(settings.css);
                            res.end();
                            break;
                        case '/images/1.jpg':
                            res.writeHead(200, { 'Content-Type': 'image/webp' });
                            res.write(settings.image);
                            res.end();
                            break;
                        default :
                            res.writeHead(404, { 'Content-Type': 'text/plain' });
                            res.end(404);
                    }
                }
            });
        }).listen(settings.port);
    };
}

Server.start(3011);