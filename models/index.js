const _ = require('lodash');
require('./../seeds/oauth');
require('./../config/db');

const OAuthAccessToken = require('./oauth_access_token');
const OAuthAuthorizationCode = require('./oauth_authorization_code');
const OAuthClient = require('./oauth_client');
const OAuthRefreshToken = require('./oauth_refresh_token');
const User = require('./user');

function getAccessToken(bearerToken) {
  return OAuthAccessToken
    .findOne({ accessToken: bearerToken })
    .populate('User')
    .populate('OAuthClient')
    .then((accessToken) => {
      if(!accessToken) {
        return false;
      }
      let token = accessToken;
      token.user = token.User;
      token.client = token.OAuthClient;
      return token;
    })
    .catch(() => {
      return new Error('getAccessToken - Err: ');
    });
}

function getClient(clientId, clientSecret) {
  const options = { clientID: clientId };
  if(clientSecret) {
    options.clientSecret = clientSecret;
  }

  return OAuthClient
    .findOne(options)
    .then((client) => {
      if(!client) {
        return new Error('client not found');
      }
      return client;
    }).catch(() => {
      return new Error('getClient - Err: ');
    });
}


function getUser(username, password) {
  return User
    .findOne({ username: username })
    .then((user) => {
      return user.password === password ? user : false;
    })
    .catch(() => {
      return new Error('getUser - Err: ');
    });
}

function revokeAuthorizationCode(code) {
  return OAuthAuthorizationCode.findOne({
    where: {
      authorizationCode: code.code
    }
  }).then(() => {
    let expiredCode = code;
    expiredCode.expiresAt = new Date('2015-05-28T06:59:53.000Z');
    return expiredCode;
  }).catch(() => {
    return new Error('getUser - Err');
  });
}

function revokeToken(token) {
  return OAuthRefreshToken.findOne({
    where: {
      refreshToken: token.refreshToken
    }
  }).then(function (rT) {
    if(rT) {
      rT.destroy();
    }
    /** *
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     */
    let expiredToken = token;
    expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z');
    return expiredToken;
  }).catch(() => {
    return new Error('revokeToken - Err');
  });
}


function saveToken(token, client, user) {
  return Promise.all([
    OAuthAccessToken.create({
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      OAuthClient: client._id,
      User: user._id
    }),
    token.refreshToken ? OAuthRefreshToken.create({
      refreshToken: token.refreshToken,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      OAuthClient: client._id,
      User: user._id
    }) : []

  ])
    .then(() => {
      return _.assign(
        {
          client: client,
          user: user,
          accessToken: token.accessToken,
          refreshToken: token.refreshToken
        },
        token
      );
    })
    .catch(() => {
      return new Error('revokeToken - Err');
    });
}

function getAuthorizationCode(code) {
  return OAuthAuthorizationCode
    .findOne({ authorizationCode: code })
    .populate('User')
    .populate('OAuthClient')
    .then(function (authCodeModel) {
      if(!authCodeModel) {
        return false;
      }
      let client = authCodeModel.OAuthClient;
      let user = authCodeModel.User;
      return {
        code: code,
        client: client,
        expiresAt: authCodeModel.expires,
        redirectUri: client.redirectUri,
        user: user,
        scope: authCodeModel.scope
      };
    }).catch(() => {
      return new Error('getAuthorizationCode - Err');
    });
}

function saveAuthorizationCode(code, client, user) {
  return OAuthAuthorizationCode
    .create({
      expires: code.expiresAt,
      OAuthClient: client._id,
      authorizationCode: code.authorizationCode,
      User: user._id,
      scope: code.scope
    })
    .then(() => {
      code.code = code.authorizationCode;
      return code;
    }).catch(() => {
      return new Error('saveAuthorizationCode - Err');
    });
}

function getUserFromClient(client) {
  let options = { clientID: client.clientID };
  if(client.clientSecret) {
    options.clientSecret = client.clientSecret;
  }

  return OAuthClient
    .findOne(options)
    .populate('User')
    .then((clientData) => {
      if(!clientData) {
        return false;
      }
      if(!clientData.User) {
        return false;
      }
      return clientData.User;
    }).catch(() => {
      return new Error('getUserFromClient - Err');
    });
}

function getRefreshToken(refreshToken) {
  if(!refreshToken || refreshToken === 'undefined') {
    return false;
  }
  // [OAuthClient, User]
  return OAuthRefreshToken
    .findOne({ refreshToken: refreshToken })
    .populate('User')
    .populate('OAuthClient')
    .then(function (savedRT) {
      let tokenTemp = {
        user: savedRT ? savedRT.User : {},
        client: savedRT ? savedRT.OAuthClient : {},
        refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
        refreshToken: refreshToken,
        scope: savedRT.scope
      };
      return tokenTemp;
    }).catch(() => {
      return new Error('getRefreshToken - Err');
    });
}

function verifyScope(token, scope) {
  return token.scope === scope;
}
module.exports = {
  getAccessToken: getAccessToken,
  getAuthorizationCode: getAuthorizationCode,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  revokeAuthorizationCode: revokeAuthorizationCode,
  revokeToken: revokeToken,
  saveToken: saveToken,
  saveAuthorizationCode: saveAuthorizationCode,
  verifyScope: verifyScope
};
