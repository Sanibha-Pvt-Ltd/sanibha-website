import http from 'http';

const TARGET_PORT = 3000;
const LISTEN_PORT = 3030;

const server = http.createServer((req, res) => {
  const headers = { ...req.headers, host: `localhost:${TARGET_PORT}` };
  
  const options = {
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers,
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.statusCode = 502;
    res.end('Proxy Error: ' + err.message);
  });

  req.pipe(proxyReq, { end: true });
});

server.on('upgrade', (req, clientSocket, head) => {
  const headers = { ...req.headers, host: `localhost:${TARGET_PORT}` };
  
  const proxyReq = http.request({
    hostname: '127.0.0.1',
    port: TARGET_PORT,
    path: req.url,
    method: req.method,
    headers,
  });

  proxyReq.on('upgrade', (proxyRes, targetSocket, proxyHead) => {
    let headersStr = `HTTP/${proxyRes.httpVersion} 101 Switching Protocols\r\n`;
    for (const [key, val] of Object.entries(proxyRes.headers)) {
      headersStr += `${key}: ${val}\r\n`;
    }
    headersStr += '\r\n';

    clientSocket.write(headersStr);
    if (proxyHead && proxyHead.length) clientSocket.write(proxyHead);

    targetSocket.pipe(clientSocket);
    clientSocket.pipe(targetSocket);
  });

  proxyReq.on('error', () => {
    clientSocket.destroy();
  });

  proxyReq.end();
});

server.listen(LISTEN_PORT, '0.0.0.0', () => {
  console.log(`Port bridge active: 0.0.0.0:${LISTEN_PORT} -> 127.0.0.1:${TARGET_PORT}`);
});
