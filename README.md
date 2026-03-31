const http = require('http');
const url = require('url');

const port = process.argv[2] || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // 4.1 ROOT ROUTE: Текстове вітання
  if (req.method === 'GET' && path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Manual HTTP Router');
  } 
  // 4.2 TIME ROUTE: JSON з поточним часом
  else if (req.method === 'GET' && path === '/time') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ now: new Date().toISOString() }));
  } 
  // 4.3 ECHO ROUTE: Повернення повідомлення з query-параметра msg
  else if (req.method === 'GET' && path === '/echo') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(query.msg || '');
  } 
  // 4.4 SUM ROUTE: Математика (a + b) з валідацією чисел
  else if (req.method === 'GET' && path === '/sum') {
    const a = parseFloat(query.a);
    const b = parseFloat(query.b);
    if (!isNaN(a) && !isNaN(b)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ sum: a + b }));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Invalid numbers" }));
    }
  }
  // 4.5 NOT FOUND ROUTE: Обробка неіснуючих шляхів (JSON 404)
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: "Not found" }));
  }
});

server.listen(port);
