const http = require('http');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // true => query як об’єкт
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (req.method === 'GET' && pathname === '/echo') {
        const msg = query.msg || ''; // якщо msg немає, пустий рядок
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(msg);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});