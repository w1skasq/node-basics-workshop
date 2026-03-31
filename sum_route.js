const http = require('http');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (req.method === 'GET' && pathname === '/sum') {
        const a = parseFloat(query.a);
        const b = parseFloat(query.b);

        if (!isNaN(a) && !isNaN(b)) {
            const result = { sum: a + b };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        } else {
            const error = { error: "Invalid numbers" };
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(error));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});