var express = require( 'express' );
var app = express();
var port = 3000;

app.use(function(req,res,next) {
	console.log(req.method + " " + req.path + " " + res.statusCode);
	next();
})

app.get("/", function(req, res, next) {
	res.send("Hello World");
});

app.get("/news", function(req, res, next) {
	res.send("This is the news page.");
});




app.listen(port, function() {
	console.log("server listening");
});