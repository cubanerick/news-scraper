var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  
  Headline: {
    type: String,
    required: true,
  },
  
  link: {
    type: String,
    required: true,
    unique: true
  },
  
  Summary: String,

  Comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});


var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
