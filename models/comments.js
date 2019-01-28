var mongoose = require("mongoose");

// SCHEMA SETUP
var commentSchema = mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users"
        },
        username: String
    }
});


module.exports = mongoose.model("Comment", commentSchema);