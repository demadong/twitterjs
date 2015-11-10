var swig = require('swig');
var express = require( 'express' );
var app = express();
var port = 3000;
var routes = require("./routes/");

app.use(function(req,res,next) {
	console.log(req.method + " " + req.path + " " + res.statusCode);
	next();
})

app.use('/', routes);

app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });


// swig.renderFile(__dirname + "/views/index.html", data, function(err, output) {
// 	// console.log(output);
// });

app.listen(port, function() {
	console.log("server listening");
});