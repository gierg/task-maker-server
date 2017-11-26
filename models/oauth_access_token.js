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
