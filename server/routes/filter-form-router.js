const express = require("express");
const router = express.Router();
const moviesModel = require("../models/movies");

const filterFormRouter = function () {
  router.get("/filter", (req, res) => {
    const sortedBy = req.query.sortedBy;
    const byType = req.query.byType;
    const year = req.query.year || "";
    const byGenre = req.query.byGenre;
    const page = req.query.page;
    const limit = 40;
    const offset = Number((page - 1) * limit);
    const currentPage = Math.ceil(offset / limit);

    const signature = `Все ${byType} жанра ${byGenre} за ${year} год`;

    const querySearch = {
      Type: byType,
      Genre: { $regex: byGenre, $options: "ig" },
      Year: { $regex: year, $options: "ig" }
    }

    moviesModel
      .find(querySearch, { Released: 1, Title: 1, Poster: 1, Year: 1, Genre: 1 })
      .sort({[sortedBy]: -1})
      .exec((err, result) => {
        if (err || !result.length) res.status(404);

        moviesModel.countDocuments(querySearch, (err, count) => {
          res.json({ result, count, signature, currentPage })
        })
      })
  })

  return router
}

module.exports = filterFormRouter;