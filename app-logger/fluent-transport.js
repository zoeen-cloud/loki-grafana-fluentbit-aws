const Transport = require('winston-transport');
const axios = require('axios');

class FluentTransport extends Transport {
  constructor(opts) {
    super(opts);
    this.host = opts.host || '127.0.0.1';
    this.port = opts.port || 9880;
    this.tag  = opts.tag  || 'gps.api';
  }
  log(info, callback) {
    setImmediate(()=>this.emit('logged', info));
    axios.post(`http://${this.host}:${this.port}/${this.tag}`, info)
      .catch(e => console.error('Fluent transport error:', e.message));
    callback();
  }
}
module.exports = FluentTransport;
