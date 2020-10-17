const compression = require('compression');
const crypto = require('crypto');
const express = require('express');
const server = express();
const helmet = require('helmet');

const options = {
  index: 'index.html', //Fill path here.
};

server.use(compression());
server.use(helmet());

server.use((req, res, next) => {
  res.locals.cspNonce = crypto.randomBytes(16).toString('hex');
  next();
});

server.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"],
      'base-uri': ["'self'"],
      'block-all-mixed-content': [],
      'font-src': ["'self'", 'https:', 'data:'],
      'frame-ancestors': ["'self'"],
      'img-src': ["'self'", 'data:'],
      'object-src': ["'none'"],
      'script-src': [
        "'self'",
        "'sha256-ef1cxjU3pREO73RsCRO9iYds2sW6Hr4gXlMwR8ZXyB4='",
        'example.com',
      ],
      'script-src-attr': ["'none'"],
      'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      'upgrade-insecure-requests': [],
    },
  })
);

server.use(function (req, res, next) {
  res.header(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );
  res.header('X-Content-Type-Options', 'nosniff');
  res.header('X-Frame-Options', 'SAMEORIGIN');
  next();
});

server.use('/', express.static('./build', options));

const port = 5000;
server.listen(port, () => console.log(`Listening on port: ${port}`));
