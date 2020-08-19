var bcrypt = require('bcrypt');
var User = require('./models/User.js');

const LocalStrategy = require('passport-local').Strategy;

function initalize(passport, user){
  console.log('initalizing passport');
  passport.serializeUser((user, done) => {
    console.log('Serialize user called. ' + user.id);
    done(null,user.id)
  }
);
passport.deserializeUser((id, done) => {
    console.log('DeSerialize user called.' + id);
    User.findById(id, function(err, user){
      if(err) return done(err);
      if(!user){
        return done(null, false, {message: 'user not autenticated'});
      }
      return done(null, user);
    })
});
  passport.use(new LocalStrategy(
    function(username, password, done){
      User.findOne({ username: username }, async function(err, user) {
        console.log(password);
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (await bcrypt.compare(password, user.password)) {
          console.log("returned user");
          return done(null, user);
        }
        else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    }));
}

module.exports = initalize;