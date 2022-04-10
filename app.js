const express = require('express')
const path = require('path');
const request = require('request');
const app = express();


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));

app.get('/search', (req, res)=>{
    res.render('search');
});
app.get('/results', (req, res)=>{
    let query = req.query.query
    request('https://api.themoviedb.org/3/search/movie?api_key=f6a2ff838d1093f5e593141d09dd495b&query=' + query, (error, response, body)=>{
        if(error){
            console.log(error);
        }
        let data = JSON.parse(body);
        res.render('results', {data: data});
    });
});
app.listen(3000, ()=>{
    console.log('the serach app project started at port 3000');
});