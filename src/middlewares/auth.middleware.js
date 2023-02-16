const { ExtractJwt, Strategy } = require('passport-jwt')
const passport = require('passport')

const { findUserById } = require('../users/users.controllers')
 
const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //? 
    secretOrKey: 'academlo'
}


//? done()
passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then(data => {
            if(data){
                done(null, tokenDecoded) //? El usuario si Existe y es valido
            } else {
                done(null, false) //? El usuario no existe
            }
        })
        .catch(err => {
            done(err, false) //? Error en la base de datos
        })
}))

module.exports = passport