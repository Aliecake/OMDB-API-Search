const express = require ('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + 'public'));


app.get('/', (req, res) => {
    res.render('index');
});
app.get('/results', (req, res) => {
    const searchQuery = req.query.search;
    request(`http://www.omdbapi.com/?s=${searchQuery}&apikey=thewdb`, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            res.render('results', {data: data, searchQuery: searchQuery});
        } else {
            console.log('error', error);
        }
    });
});


app.get('*', (req, res) => {
    res.send('404 - Page not found <a href="/">Home</a>');
});


app.listen(3000, () => {
    console.log("listening on 3000");
});
