const express = require('express');
var app = express();
const hbs = require('hbs');
const fs = require('fs');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + '/views/partial');
hbs.registerHelper('getFullYear', () => {
	return new Date().getFullYear()
});
hbs.registerHelper('upprText', (text) => {
	return text.toUpperCase();
});

/*app.use((req, res, next) => {
	res.render('maintenance');
});*/

app.use((req, res, next) => {
	var date = new Date().toString();
	var log = `Date = ${date} '\n' Method =  '${req.method}' '\n' Url = '${req.url}'`
	console.log(log);
	fs.appendFileSync('server.log', log);
	next()
});


/* app.get('/', (req, res) => {
	res.send({
		playing : 'Cricket',
		food : 'Junk Food',
		liking : ['Snooker', 'Video Game', 'Gym']
	});
}); */

app.get('/', (req, res) => {
	res.render('index', {
		title : 'Home',
		welcomeMsg : 'Welocme to the Home Page',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title : 'About',
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMsg : 'Unable to handle the request'
	});
});


app.listen(3000, () => {
	console.log('App Has Started');
});