const passport = require('koa-passport');
const config = require('./config').value;
const JwtStrategy = require('passport-jwt').Strategy;

const jwtStrategy = new JwtStrategy({
  jwtFromRequest: (req) =>
    req.cookies.get(config.jwt.accessTokenName),
  // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: config.jwt.publicKey,
  algorithms: ['RS256', 'RS384'],
}, (jwtPayload, done) => {
  const user = {
    id: +jwtPayload.sub,
    username: jwtPayload.username
  };
  done(null, user);
});
passport.use(jwtStrategy);
module.exports = passport.authenticate('jwt', { session: false });