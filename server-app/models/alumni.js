const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: String,
    email: String,
    batch: Number,
    department: String
});

module.exports = mongoose.model("Alumni", alumniSchema);
