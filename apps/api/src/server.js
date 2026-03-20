import http from 'node:http';

const DEFAULT_PORT = 3001;
const rawPort = process.env.PORT;
const parsedPort = Number.parseInt(rawPort ?? '', 10);
const hasValidPort = Number.isInteger(parsedPort) && parsedPort >= 1 && parsedPort <= 65535;
const port = hasValidPort ? parsedPort : DEFAULT_PORT;

if (rawPort && !hasValidPort) {
  console.warn(`Invalid PORT value \"${rawPort}\". Falling back to ${DEFAULT_PORT}.`);
}

const server = http.createServer((req, res) => {
  const body = JSON.stringify({ status: 'ok', service: 'api', path: req.url || '/' });
  res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
  res.end(body);
});

server.listen(port, () => {
  console.log(`API scaffold listening on http://localhost:${port}`);
});
