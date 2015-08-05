var nproxy2 = require('./');

var options = {
  timeout: 10,
  debug: true
};

var port = 8989;
nproxy2(port, options );
