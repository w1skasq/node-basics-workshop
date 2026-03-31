const http = require('http');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    // 4.1 ROOT ROUTE
    if (req.method === 'GET' && pathname === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Manual HTTP Router');

    // 4.2 TIME ROUTE
    } else if (req.method === 'GET' && pathname === '/time') {
        const now = new Date().toISOString();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ now }));

    // 4.3 ECHO ROUTE
    } else if (req.method === 'GET' && pathname === '/echo') {
        const msg = query.msg || '';
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(msg);

    // 4.4 SUM ROUTE
    } else if (req.method === 'GET' && pathname === '/sum') {
        const a = parseFloat(query.a);
        const b = parseFloat(query.b);
        if (!isNaN(a) && !isNaN(b)) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ sum: a + b }));
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid numbers" }));
        }

    // 4.5 NOT FOUND ROUTE
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Not found" }));
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});