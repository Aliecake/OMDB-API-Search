const express = require ('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + 'public'));


app.get('/', (req, res) => {
    res.send('Front page');
});
app.get('/results', (req, res) => {
    request('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb', (error, response, body) => {
        if(!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            res.render('results', {data: data});
        } else {
            console.log('error', error);
        }
    });
});


app.get('*', (req, res) => {
    res.send('404');
});


app.listen(3000, () => {
    console.log("listening on 3000");
});
