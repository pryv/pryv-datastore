const server = require('./server');

const dummy = require('../dummy');

function debugMiddleware (req, res, next) {
  console.log({ method: req.method, url: req.url, body: req.body });
  next();
}

server(dummy, 5005, { middleware: debugMiddleware });
