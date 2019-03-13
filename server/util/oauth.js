import passport from 'passport'
import FacebookStrategy from 'passport-facebook'
import User from '../models/user';
import logger from './logger';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.findOne({ oauthId: user.oauthId }, function(err, dbUser) {
    done(err, dbUser);
  });
});

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_SAY_SOMETHING_APP_ID,
    clientSecret: process.env.FACEBOOK_SAY_SOMETHING_APP_SECRET,
    callbackURL: `${process.env.APP_URL}/auth/facebook/callback`,
    profileFields: ['id', 'emails', 'displayName', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({
        'oauthId': profile.id, provider: 'facebook'
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
        	logger.debug("fetched profile ", JSON.stringify(profile))
          user = new User({
              name: profile.displayName,
              provider: 'facebook',
              email: profile.emails[0].value,
              oauthId: profile.id
          });
          user.save(function(err) {
              if (err) logger.error("saving user failed", err);
              return done(err, user);
          });
        } else {
            return done(err, user);
        }
    });
}
));

export default passport;