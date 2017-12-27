const OAuth2Server = require('oauth2-server');

const oauth = new OAuth2Server({
  debug: true,
  model: require('../models/index'),
  grants: ['password'],
  allowBearerTokensInQueryString: true
});

module.exports = oauth;
