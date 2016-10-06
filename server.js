var fs = require('fs');
var express = require('express');

var app = express();

app.use(express.static('pub'));

var publicPath = __dirname + "/pub/";

app.get('/', function (req, res) {
  res.sendFile(publicPath + "\\index.html");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.info("App running at http://%s:%s", host, port);
});
