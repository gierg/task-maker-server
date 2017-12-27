const mongoose = require('mongoose');

const OAuthAccessTokenSchema = new mongoose.Schema({
  accessToken: {
    type: String,
    required: true
  },
  accessTokenExpiresAt: {
    type: Date,
    required: true
  },
  scope: {
    type: String,
    required: false
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  OAuthClient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OAuthClient',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('OAuthAccessToken', OAuthAccessTokenSchema);
