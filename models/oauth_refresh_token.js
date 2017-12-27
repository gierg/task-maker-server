const mongoose = require('mongoose');

const OAuthRefreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true
  },
  refreshTokenExpiresAt: {
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

module.exports = mongoose.model('OAuthRefreshToken', OAuthRefreshTokenSchema);
