const mongoose = require('mongoose');

const OAuthScopeSchema = new mongoose.Schema({
  scope: {
    type: String,
    required: true
  },
  isDefault: {
    type: Boolean,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('OAuthScope', OAuthScopeSchema);
