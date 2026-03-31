// root_route.js
const http = require('http');

// Порт передається як перший аргумент командного рядка
const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Manual HTTP Router');
    } else {
        // Інші маршрути не тестуються, можна просто відправити 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});