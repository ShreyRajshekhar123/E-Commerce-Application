const express = require('express');
const router = express.Router();
const { validator } = require('../middlewares/validator');
const { registerSchema } = require('../validators/registerSchema');
const User = require('../models/user');
const passport = require('passport');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/register', validator(registerSchema), async (req, res) => {
    const { username, password, email, role } = req.body;

    const user = new User({ username, email, role });
    await User.register(user, password);

    res.redirect('/login');
})

router.post('/login', 
            passport.authenticate('local', {
                failureRedirect: '/login'
            }),
            (req, res)=>{
                req.flash('success', 'Logged in successfully!');
                res.redirect('/products');
            })


router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged out successfully!!');
        res.redirect('/login');
    });
});

module.exports = router;
