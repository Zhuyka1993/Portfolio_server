const mongoose = require('mongoose');

const mailSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: Number,
  mail: String,
  subject: String,
  message: String,
});

const Mail = mongoose.model('Mail', mailSchema);

module.exports = Mail;