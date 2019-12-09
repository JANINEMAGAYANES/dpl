var mongoose = require("mongoose");
var mongoosastic = require("mongoosastic");
var Schema = mongoose.Schema;

// LOG IN USER MODEL
var LinkSchema = new mongoose.Schema({
    invalidurl: String,
});

LinkSchema.plugin(mongoosastic, {
    hosts: [
        "localhost:9200"
    ]
});


module.exports = mongoose.model("Link", LinkSchema);