const OAuthClient = require('../../models/oauth_client');
const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth = new OAuth2Server({
  debug: true,
  model: require('./../../models'),
  grants: ['password']
});

const getOauthToken = function (req, res) {
  let request = new Request(req);
  let response = new Response(res);

  oauth
    .token(request, response)
    .then(function (token) {
      // Todo: remove unnecessary values in response
      return res.json(token);
    }).catch(function (err) {
      return res.status(500).json(err);
    });
};

const addAuthorise = function (req, res) {
  let request = new Request(req);
  let response = new Response(res);

  return oauth.authorize(request, response).then(function (success) {
    //  if (req.body.allow !== 'true') return callback(null, false);
    //  return callback(null, true, req.user);
    res.json(success);
  }).catch(function (err) {
    res.status(err.code || 500).json(err);
  });
};

const getAuthorise = function (req, res) {
  OAuthClient.findOne({
    where: {
      clientID: req.query.client_id,
      redirectUrisd: { $in: [req.query.redirect_uri] }
    },
    attributes: ['id', 'name']
  })
    .then(function (model) {
      if(!model) {
        return res.status(404).json({ error: 'Invalid Client' });
      }
      return res.json(model);
    }).catch(function (err) {
      return res.status(err.code || 500).json(err);
    });
};

module.exports = {
  getOauthToken(req, res, next) {
    return getOauthToken(req, res, next);
  },
  addAuthorise(req, res, next) {
    return addAuthorise(req, res, next);
  },
  getAuthorise(req, res, next) {
    return getAuthorise(req, res, next);
  }
};
