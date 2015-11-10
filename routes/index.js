var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');

router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	console.log(tweets);
	res.render('index', {title: 'Twitter.js', tweets: tweets });
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list } );
});

router.get('/users/:name/tweets/:id', function(req, res){
	var name = req.params.name;
	var id = req.params.id;
	var list = tweetBank.find( {"id": id, name: name});
	res.render( 'index', { title: 'Twitter.js - Post id: ' + id + ' by ' + name, tweets: list} )
})

module.exports = router;