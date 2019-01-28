var mongoose = require("mongoose");

// SCHEMA SETUP
var movieSchema = new mongoose.Schema({
    title: String,
    score: String,
    image: String,
    description: String,
       author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Users"
      },
      username: String
   },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Movie", movieSchema);