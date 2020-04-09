const express = require('express');
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.send('hello, codersX');
});

app.get('/name', function(req, res) {
    res.send('my name is Trung');
});

app.listen(port, function() {
    console.log('server listening on port ' + port);
});

