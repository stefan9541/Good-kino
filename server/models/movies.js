const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const moviesModel = new Schema({
  Title: {
    type: String,
    required: true
  },
  Year: {
    type: String,
    required: true
  },
  Rated: {
    type: String
  },
  Runtime: {
    type: String,
    required: true
  },
  Genre: {
    type: String,
    required: true
  },
  Director: {
    type: String
  },
  Writer: {
    type: String
  },
  Actors: {
    type: String
  },
  Plot: {
    type: String,
    required: true
  },
  Language: {
    type: String
  },
  Country: {
    type: String,
    required: true
  },
  Awards: {
    type: String
  },
  Poster: {
    type: String,
    required: true
  },
  Ratings: {
    type: Array,
    default: []
  },
  Metascore: {
    type: String,
  },
  imdbRating: {
    type: String,
    required: true
  },
  imdbVotes: {
    type: Number,
    // required: true
  },
  Type: {
    type: String,
    required: true
  },
  DVD: {
    type: String
  },
  BoxOffice: {
    type: String
  },
  Production: {
    type: String
  },
  WebSite: {
    type: String
  },
  Response: {
    type: String,
    default: "True"
  },
  Released: {
    type: String,
    required: true
  },
  imdbID: {
    type: String
  },
});

module.exports = mongoose.model("movies", moviesModel)