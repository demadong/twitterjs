var swig = require('swig');
var express = require( 'express' );
var app = express();
var port = 3000;

app.use(function(req,res,next) {
	console.log(req.method + " " + req.path + " " + res.statusCode);
	next();
})

var data = { title: "An Example",
 	people: [
 		{ name: "Gandalf" },
 		{ name: "Frodo"},
 		{ name: "Hermione"}
 ]};

app.get("/", function(req, res, next) {
	res.render( 'index', data)
});

app.get("/news", function(req, res, next) {
	res.send("This is the news page.");
});

app.engine("html", swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
swig.setDefaults({ cache: false });


swig.renderFile(__dirname + "/views/index.html", data, function(err, output) {
	console.log(output);
});

app.listen(port, function() {
	console.log("server listening");
});