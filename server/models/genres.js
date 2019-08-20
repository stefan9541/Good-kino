const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const genreModel = new Schema({
  type: {
    type: String,
    required: true
  },
  links: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model("genres", genreModel)