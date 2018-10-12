const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const settings = require('../config/settings'); // get settings file

module.exports = function (passport) {
   //let opts = {};
   //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
   //opts.secretOrkey = settings.secret;
   passport.use(new JwtStrategy({ jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: settings.secret }, function (jwt_payload, done) {
      User.findOne({ id: jwt_payload.id }, function(err, user) {
         if (err) {
            return done(err, false);
         }
         if (user) {
            done(null, user);
         } else {
            done(null, false);
         }
      });
   }));
};