var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    title: String,
  
    body: String
});


var Comments = mongoose.model("Comment", CommentSchema);

module.exports = Comments;
