const compression = require('compression');
const express = require('express');
const server = express();
const helmet = require("helmet");
 
const options = {
  index: 'index.html', //Fill path here.
};

server.use(compression());
server.use(helmet());
server.use(function(req, res, next) {
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'SAMEORIGIN');    
    next();
});

server.use('/', express.static('./build', options));

const port = 5000;
server.listen(port, () => console.log(`Listening on port: ${port}`));
