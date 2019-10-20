const express = require("express");

const router = express.Router();
const moviesModel = require("../models/movies");


const paginationAndGettingMoviesFromRouting = () => {
  router.get("/routing-movies", (req, res) => {
    const {
      movieByType,
      movieByGenre,
      topType = "",
      yearValue,
      sortedBy,
      page,
      word
    } = req.query;
    const limit = 40;
    const offset = +(page - 1) * limit;
    const currentPage = Math.ceil(offset / limit);

    const searchOptions = {
      Type: String(movieByType)
    };

    if (movieByGenre) {
      searchOptions.Genre = { $regex: movieByGenre, $options: "ig" };
    }
    if (yearValue) {
      searchOptions.Year = { $regex: yearValue, $options: "ig" };
    }

    let signature = `смотреть все ${movieByType} ${topType || movieByGenre || ""}`;

    if (searchOptions.Type === "top-100") {
      moviesModel
        .where("Type", topType)
        .limit(100)
        .sort({ [sortedBy]: -1 })
        .exec((err, items) => {
          if (err || !items.length) {
            res.sendStatus(404);
          }
          res.set("Cache-Control", "public, max-age=31557600");
          const result = [[...items], 33];
          res.json({ result, signature });
        });
    } else if (searchOptions.Type === "search") {
      if (word.length <= 1) {
        res.sendStatus(404);
      }

      const data = moviesModel
        .find(
          { Title: { $regex: word, $options: "igx" } },
        )
        .select({
          Title: 1, Genre: 1, Year: 1, Type: 1, Released: 1, Poster: 1
        })
        .sort({ [sortedBy]: -1 })
        .skip(offset)
        .limit(limit)
        .exec();

      const countDocuments = moviesModel
        .countDocuments({ Title: { $regex: word, $options: " ig" } })
        .exec();

      signature = `Результаты поиска ${word}`;

      Promise.all([data, countDocuments])
        .then(result => res.json({ result, currentPage, signature }))
        .catch(err => res.sendStatus(404));
    } else {
      // eslint-disable-next-line func-names
      const data = moviesModel
        .find(searchOptions)
        .sort({ [sortedBy]: -1 })
        .skip(offset)
        .limit(limit)
        .exec();

      const dataCountDocuments = moviesModel
        .countDocuments(searchOptions)
        .exec();

      Promise.all([data, dataCountDocuments])
        .then(result => {
          res.set("Cache-Control", "public, max-age=31557600");
          res.json({ result, currentPage, signature });
        })
        .catch(err => res.sendStatus(404));
    }
  });

  return router;
};

module.exports = paginationAndGettingMoviesFromRouting;
