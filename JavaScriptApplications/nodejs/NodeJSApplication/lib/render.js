const fs = require('fs');
const path = require('path');

function render(templateName, data) {
    fs.readFile(path.resolve('views', templateName), 'utf-8', (error, template) => {

        if (error) {
            this.writeHead(500, { 'Content-type': 'text/plain' });
            return this.end(error.message);
        }

        let html = template;

        if (data) {
            html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
                const match = data[property];
                return match || placeholder;
            });
        }

        this.writeHead(200, { 'Content-type': 'text/html' });
        this.end(html);
    });
}

module.exports = render;