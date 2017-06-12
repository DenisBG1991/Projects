const fs = require('Node/fs');

const file = fs.createWriteStream('text.txt');

for (let i = 0; i <= 300000; i++) {
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur excepturi, illum iste mollitia porro quae quasi sequi. Id, inventore, quidem.');
}

file.end();