const mongoose = require('mongoose');

const OAuthAuthorizationCodeSchema = new mongoose.Schema({
  authorizationCode: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true
  },
  redirectUri: {
    type: String,
    required: true
  },
  scope: {
    type: String,
    required: true
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  OAuthClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OAuthClient'
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('OAuthAuthorizationCode', OAuthAuthorizationCodeSchema);
