var rproxy = require('./');

var options = {
  timeout: 10,
  debug: true
};

var port = 8989;
rproxy(port, options );
