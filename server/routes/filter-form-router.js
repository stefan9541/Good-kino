const express = require("express");

const router = express.Router();
const moviesModel = require("../models/movies");

const filterFormRouter = () => {
  router.get("/filter", (req, res) => {
    const {
      sortedBy,
      byType,
      byGenre,
      page
    } = req.query;
    const year = req.query.year || "";
    const limit = 40;
    const offset = Number((page - 1) * limit);
    const currentPage = Math.ceil(offset / limit);

    const signature = `Все ${byType} жанра ${byGenre} за ${year} год`;

    const querySearch = {
      Type: byType,
      Genre: { $regex: byGenre, $options: "ig" },
      Year: { $regex: year, $options: "ig" }
    };

    // eslint-disable-next-line func-names

    const data = moviesModel
      .where(querySearch)
      .select({
        Released: 1, Title: 1, Poster: 1, Year: 1, Genre: 1
      })
      .sort({ [sortedBy]: -1 })
      .exec();

    const dataCount = moviesModel
      .countDocuments(querySearch)
      .exec();

    Promise.all([data, dataCount])
      .then(result => res.json({ result, signature, currentPage }))
      .catch(() => res.sendStatus(404));
  });

  return router;
};


module.exports = filterFormRouter;

// moviesModel
//   .where(querySearch)
//   .select({
//     Released: 1, Title: 1, Poster: 1, Year: 1, Genre: 1
//   })

//   // .find(querySearch, {
//   //   Released: 1, Title: 1, Poster: 1, Year: 1, Genre: 1
//   // })
//   .sort({ [sortedBy]: -1 })
//   .exec((err, result) => {
//     if (err || !result.length) {
//       res.status(404);
//     }

//     moviesModel.countDocuments(querySearch, (err, count) => {
//       res.json({
//         result, count, signature, currentPage
//       });
//       console.log(result);
//     });
//   });
