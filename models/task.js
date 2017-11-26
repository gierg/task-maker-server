const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  isPriority: {
    type: [{
      type: String,
      enum: ['low', 'medium', 'high']
    }],
    default: ['low']
  },
  dueDate: {
    type: Date,
    default: Date.now
  },
  userID: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
});

module.exports = mongoose.model('Task', TaskSchema);
