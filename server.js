const http = require('http');
const app = require('./app'); // app file include
const port = process.env.PORT || 5018;
// console.log("port=>",port);
const server = http.createServer(app);

server.listen(port);


