const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    percentage: Number,
    city: String
});

module.exports = mongoose.model("Student", studentSchema);