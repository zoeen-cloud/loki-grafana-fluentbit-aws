const http = require('http');
const host = '127.0.0.1', port = 9880;

function post(tag, obj) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(obj);
    const req = http.request({ host, port, path: `/${tag}`, method: 'POST',
      headers: { 'Content-Type':'application/json','Content-Length':Buffer.byteLength(body) } },
      res => (res.statusCode>=200 && res.statusCode<300) ? resolve() : reject(new Error('HTTP '+res.statusCode)));
    req.on('error', reject); req.write(body); req.end();
  });
}

exports.logApi = (obj)=>post('gps.api', obj);
exports.logRaw = (obj)=>post('gps.raw', obj);
