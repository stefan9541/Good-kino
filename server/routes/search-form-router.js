const express = require("express");
const router = express.Router();
const moviesModel = require("../models/movies");

const searchFormRouter = () => {

  router.post("/search-form", (req, res) => {
    const inputValue = req.body.value.trim();

    moviesModel.find(
      {
        "Title": { $regex: inputValue, $options: "igm" }
      },
      {
        Title: 1,
        Genre: 1,
        Type: 1,
      }).exec((err, result) => {
        if (err) res.status(404);

        res.json(result);
      })
  });

  router.get("/search-form", (req, res) => {
    const { inputValue } = req.query;
    const page = req.query.page;
    const limit = 40;
    const offset = Number((page - 1) * limit);
    const currentPage = Math.ceil(offset / limit);

    const label = {
      signature: `Результаты Поиска ${inputValue}`
    };

    moviesModel.find(
      {
        "Title": { $regex: inputValue, $options: "ig" }
      },
      {
        Poster: 1,
        Title: 1,
        Genre: 1,
        Released: 1,
        Type: 1
      })
      .skip(offset)
      .limit(limit)
      .exec((err, result) => {
        moviesModel.countDocuments({ "Title": { $regex: inputValue, $options: "ig" } }, (err, count) => {
          res.json({ result, count, currentPage, ...label })
        });
        if (err) res.status(404);
      })
  })

  return router;
}

module.exports = searchFormRouter