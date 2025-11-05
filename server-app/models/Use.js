const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: String,
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  password: String,
  created_at: { type: Date, default: Date.now }
});

userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

module.exports = mongoose.model("User", userSchema);
