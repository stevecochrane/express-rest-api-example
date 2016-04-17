var mongoose = require("mongoose");

var elementSchema = mongoose.Schema({
    name: String,
    description: String
});

var Element = mongoose.model("Element", elementSchema);

module.exports = Element;
