const express = require("express")
const router = express.Router();
const moviesModel = require("../models/movies");


const paginationAndGettingMoviesFromRouting = () => {
  router.get("/routing-movies", (req, res) => {
    const movieByType = req.query.movieByType;
    const movieByGenre = req.query.movieByGenre;
    const topType = req.query.topType || "";
    const yearValue = req.query.yearValue;
    const sortedBy = req.query.sortedBy;
    const page = req.query.page;
    const word = req.query.word;
    const limit = 40;
    const offset = Number((page - 1) * limit);
    const currentPage = Math.ceil(offset / limit);
    (yearValue) ? yearValue.split("-")[0] : null;

    const searchOptions = {
      Type: String(movieByType)
    };

    (movieByGenre) ? searchOptions.Genre = { $regex: movieByGenre, $options: "ig" } : null;
    (yearValue) ? searchOptions.Year = { $regex: yearValue, $options: "ig" } : null;

    const signature = `смотреть все ${movieByType} ${topType || movieByGenre || ""}`

    if (searchOptions.Type === "top-100") {
      moviesModel
        .find()
        .where("Type", topType)
        .limit(100)
        .sort({ [sortedBy]: -1 })
        .exec((err, result) => {
          if (err || !result.length) {
            res.status(404)
          }
          res.json({ result, signature })
        });

    } else if (searchOptions.Type === "search") {
      if (word.length <= 1) res.status(404).send("Введите пожалуста 2 или больше символов");

      moviesModel.find(
        { "Title": { $regex: word, $options: "igx" } },
        { Title: 1, Genre: 1, Year: 1, Type: 1, Released: 1, Poster: 1 }
      ).sort({ [sortedBy]: -1 })
        .skip(offset)
        .limit(limit)
        .exec((err, result) => {
          if (err) res.status(404)
          moviesModel.countDocuments({ "Title": { $regex: word, $options: " ig" } }, (err, count) => {
            res.json({ result, count, currentPage, signature })
          });
        });

    } else {
      moviesModel
        .find(searchOptions, function (err, result) {
          if (err) res.status(404);
          moviesModel.countDocuments(searchOptions, (err, count) => {
            res.json({ result, count, currentPage, signature })
          });
        })
        .sort({ [sortedBy]: -1 })
        .skip(offset)
        .limit(limit)
    }
  });
  return router
}


module.exports = paginationAndGettingMoviesFromRouting;