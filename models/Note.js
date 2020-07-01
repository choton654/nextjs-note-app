const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'please add title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be more than 40 charecters'],
  },
  description: {
    type: String,
    required: [true, 'Please add description'],
    maxlength: [200, 'description cannot be more than 200 charecters'],
  },
});

module.exports = mongoose.models.Note || mongoose.model('Note', noteSchema);
