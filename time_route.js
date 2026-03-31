// time_route.js
const http = require('http');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/time') {
        const now = new Date().toISOString(); // ISO timestamp
        const body = JSON.stringify({ now }); // {"now": "<ISO_TIMESTAMP>"}

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(body);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});