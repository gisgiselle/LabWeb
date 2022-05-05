const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario')
const passport = require('passport')
const LocalStrategy = require('passport-local');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);
    })
})


passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true,
    }, (req, email, password, done) => {
        Usuario.findOne({email: email})
        .then(user => {
            if (!user) {
                return done(null, false, req.flash('message', 'El usuario no existe' ))
            } 
            else {
                bcrypt.compare(password, user.password, (err, success) => {
                    if (err) throw err;
                    if (success) {
                        return done(null, user);
                    } else {
                        return done(null, false, req.flash('message', 'Algo salió mal'))
                    }
                });
            }
        })
        .catch(err => {
            return done(null, false, {message: err});
        })
    })
)


module.exports = passport;