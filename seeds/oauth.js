'use strict';
// let config = require('./../config/db');

const OAuthClient = require('./../models/oauth_client');
const OAuthScope = require('./../models/oauth_scope');
const User = require('./../models/user');

// 1. Create Oauth Client
OAuthScope.find({}).remove()
  .then(() => {
    OAuthScope.create({
      scope: 'profile',
      isDefault: false
    }, {
      scope: 'defaultscope',
      isDefault: true
    });
  });

User.find({}).remove()
  .then(function () {
    User.create({
      username: 'administrator',
      password: 'administrator',
      email: 'administrator@example.com',
      name: 'administrator',
      scope: 'profile'
    })
      .then(function (user) {
        return OAuthClient.find({}).remove()
          .then(function () {
            OAuthClient.create({
              clientID: 'democlient',
              clientSecret: 'democlientsecret',
              redirectUris: ['http://127.0.0.1/3000'],
              grants: ['authorization_code', 'password', 'refresh_token', 'client_credentials'],
              User: user._id
            });
          });
      });
  });
