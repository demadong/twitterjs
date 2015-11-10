var swig = require('swig');
var express = require( 'express' );
var mime = require('mime');
var fs = require('fs');
var socketio = require('socket.io');
var app = express();
var port = 3000;
var routes = require("./routes/");

var router = routes(io);

app.use(function(req,res,next) {
	console.log(req.method + " " + req.path + " " + res.statusCode);
	next();
})

app.use(function(req, res, next) {
  console.log(req.path)
  var mimeType = mime.lookup(req.path)
  fs.readFile('./public/' + req.path, function(err, fileBuffer) {
    if(err) return next()
    res.header('Content-Type', mimeType)
    res.send(fileBuffer)
  })
})

app.use('/', router);

app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });


// swig.renderFile(__dirname + "/views/index.html", data, function(err, output) {
// 	// console.log(output);
// });

var server = app.listen(port);
var io = socketio.listen(server);