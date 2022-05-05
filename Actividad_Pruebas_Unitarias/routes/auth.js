var express = require('express');
const passport = require('../passport/configPassport');
var router = express.Router();

router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/usuarios/login'
}))

router.get('/login', (req, res, next)=> {
    if (req.user) {
        res.redirect('/');
    }
    res.render('usuarios/login')
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
})

router.get('/register', (req, res, next) => {
    res.render('usuarios/create')
})

router.post("/register_login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) {
            return res.status(401).send({ errors: err })
        }

        if (!user) {
            return res.status(400).send({ errors: "No user found" })
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.status(401).send({ errors: err })
            }

            return res.status(200).send({
                success: `Iniciaste sesion como ${user.id}` 
            })
        })

    })(req, res, next); 
})

module.exports = router;