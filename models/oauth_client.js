const mongoose = require('mongoose');

const OAuthClientSchema = new mongoose.Schema({
  clientID: {
    type: String,
    required: true,
    unique: true
  },
  clientSecret: {
    type: String,
    required: true
  },
  redirectUris: {
    type: Array,
    required: true
  },
  grants: {
    type: Array,
    required: true
  },
  accessTokenLifetime: {
    type: Number,
    required: true
  },
  refreshTokenLifetime: {
    type: Number,
    required: true
  },
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('OAuthClient', OAuthClientSchema);
