const express = require("express")
const router = express.Router();
const moviesModel = require("../models/movies");

const homeRouter = () => {
  router.get("/home-page", (req, res) => {
    moviesModel.aggregate([
      { $sort: { "Year": -1 } },
      {
        $group: {
          _id: "$Type",
          doc: {
            $push: {
              Type: "$Type",
              Poster: "$Poster",
              Genre: "$Genre",
              Title: "$Title",
              Year: "$Year",
              Released: "$Released"
            }
          },
        },
      },
      {
        $project: {
          _id: "$_id",
          doc: { $slice: ["$doc", 10] },
        }
      }
    ]).exec((err, movies) => {
      res.json(movies)
    })
  })

  return router
}

module.exports = homeRouter;