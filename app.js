require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/product');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const MongoStore = require('connect-mongo');
const db_url = process.env.DB_URL || "mongodb://127.0.0.1/27017" ;

mongoose.connect(db_url)
    .then(() => console.log('E-com-15-Oct DB connected!'))
    .catch(err => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    store: MongoStore.create({ mongoUrl: db_url }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');

    let cartItems = 0;
    req.user?.cart.forEach((item) => {
        cartItems += item.quantity;
    })
    res.locals.cartItems = cartItems;
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})
// ---------------- router
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const authRouter = require('./routes/auth');
const cartRouter = require('./routes/cart');

// ------------------- APIs
const wishList = require('./routes/api/wishlist');
const paymentAPI = require('./routes/api/payment');


app.use('/products', productRouter);
app.use(reviewRouter);
app.use(authRouter);
app.use(wishList);
app.use(cartRouter);
app.use(paymentAPI);


const PORT = 4444;
app.listen(PORT, () => {
    console.log('Server is up at port', PORT);
})