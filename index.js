const compression = require('compression');
const express = require('express');
const server = express();
const helmet = require("helmet");
 
 
server.use(helmet());

const options = {
  index: 'index.html', //Fill path here.
};

server.use(compression());
server.use('/', express.static('./build', options));

const port = 5000;
server.listen(port, () => console.log(`Listening on port: ${port}`));
