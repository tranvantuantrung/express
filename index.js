const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views')


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
        users: [
            'trung', 'hieu', 'thien'
        ]
    });
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});

