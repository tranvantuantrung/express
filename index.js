require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const userRoute = require('./routes/users.route');
const authRoute = require('./routes/auth.route');
const productRoute = require('./routes/products.route');
const cartRoute = require('./routes/cart.route');

const apiProductRoute = require('./api/routes/product.route');

const authMiddleware = require('./middlewares/auth.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

const port = process.env.PORT || 3001;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.use(express.static('public'));

app.get('/', authMiddleware.requireAuth, function (req, res) {
  res.render('index.pug');
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/api/products', apiProductRoute);

app.listen(port, function () {
  console.log('server listening on port ' + port);
});
