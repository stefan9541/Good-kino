const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const multimediaModel = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  quality: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model("multimedias", multimediaModel)