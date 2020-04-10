const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')

let users = ['Trung', 'Hieu', 'Thien'];

app.get('/', function(req, res) {
    res.render('say-hello/index.pug', {
        name: "codersX"
    });
});

app.get('/name', function(req, res) {
    res.render('my-name/index.pug');
});

app.get('/users', function(req, res) {
    res.render('users/index.pug', {
        users: users
    });
});

app.get('/users/search', function(req, res) {
    let nameSearch = req.query.name;
    let nameFilter = users.filter(function(name) {
        return name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1;
    });
    
    res.render('users/index.pug', {
        users: nameFilter,
        nameSearch: nameSearch
    })
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});

