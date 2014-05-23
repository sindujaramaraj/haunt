var input = require('./input.js').track;
var mailer = require('./mailer.js');
var http = require('http');

var site,
	track,
	email,
	client,
	request;
for (var idx = 0, len = input.length; idx < len; idx++) {
	site = input[idx].site;
	track = input[idx].track;
	email = input[idx].email;
	
	request = http.request({
		host: site,
		path: '/'
	}, function(res) {
		var data = '';
		res.on('data', function(chunk) {
			data = data + chunk;
		});
		
		res.on('end', function() {
			process(data, track, email, site);
		});
	});
	
	request.on('error', function(err) {
		console.log(err);
	});
	request.end();
}

function process(data, text, email, site) {
	if (data.indexOf(text) == -1) {
		mailer.sendMail(email, "Content " + text + " has changed on site " + site);
	} else {
		console.log("Same old");
		mailer.sendMail(email, "No change");
	}
}