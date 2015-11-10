var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');
var fs = require('fs');

router.get('/', function(req, res) {
	var tweets = tweetBank.list();
	console.log(tweets.length);
	console.log(tweets);
	res.render('index', {title: 'Twitter.js', tweets: tweets });
});

//use css
router.use('/public', function(req, res, next){
	// var fileNames = fs.readdirSync(__dirname + "/../public/stylesheets");
	// console.log(fileNames);
	var options = {
		root: __dirname + '/../public'
	};
	res.sendFile(req.path, options, function(err){
		if (err) next(err);
		else next();
	})
});
module.exports = router;