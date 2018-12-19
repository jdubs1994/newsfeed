const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title:{
    type:String,
    required: true
  },
  body:{
    type: String,
    required: true
  },
  edited: {
      type: Boolean,
      default: false
  },
  articleLikes: {
      type: Number,
      default: 0
  },
  comments: [{
      commentBody: {
          type: String,
          required: true
      }, 
      commentDate: {
          type: Date,
          default: Date.now
      },
      commentUser: {
          type: Schema.Types.ObjectId,
          ref: 'users'
      },
      commentLikes: {
        type: Number,
        default: 0
      }
  }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('articles', ArticleSchema, 'articles');