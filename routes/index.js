var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	console.log(tweets);
	res.render('index', {title: 'Twitter.js', tweets: tweets , showForm: true});
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, name: name} );
});

router.get('/users/:name/tweets/:id', function(req, res){
	var name = req.params.name;
	var id = req.params.id;
	var list = tweetBank.find( {"id": id, name: name});
	res.render( 'index', { title: 'Twitter.js - Post id: ' + id + ' by ' + name, tweets: list, showForm: true, name: name} )
});

router.post('/submit', urlencodedParser, function(req, res) {
	console.log("in submit");
	if (!req.body) return res.sendStatus(400);
	console.log(req.body);
	tweetBank.add(req.body.name, req.body.text);
	// res.send('welcome, ' + req.body.name);
	res.status(200).redirect("/");
	console.log(tweetBank.list());
})


module.exports = router;