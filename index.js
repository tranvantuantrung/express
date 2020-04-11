const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()


app.set('view engine', 'pug');
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res) {
    let nameSearch = req.query.name;
    let nameFilter = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(nameSearch.toLowerCase()) !== -1;
    });
    
    res.render('users/index.pug', {
        users: nameFilter,
        nameSearch: nameSearch
    })
});

app.get('/users/create', function(req, res) {
    res.render('users/create/index.pug');
});

app.post('/users/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.get('/users/:id', function(req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id: id}).value();
    res.render('users/view', {
        user: user
    });
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});

