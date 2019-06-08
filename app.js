const express = require ('express');
const app = express();
const request = require('request');

app.get('/', () => {
    res.send('Front page');
});

app.get('/results', (req, res) => {
    request('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb', (error, response, body) => {
        if(!error && response.statusCode === 200) {
            res.send(JSON.parse(body));
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
