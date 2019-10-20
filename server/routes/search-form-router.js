const express = require("express");

const router = express.Router();
const moviesModel = require("../models/movies");

const searchFormRouter = () => {
  router.post("/search-form", (req, res) => {
    const inputValue = req.body.value.trim();

    moviesModel.find(
      {
        Title: { $regex: inputValue, $options: "igm" }
      },
      {
        Title: 1,
        Genre: 1,
        Type: 1
      }
    )
      .exec((err, result) => {
        if (err) {
          res.status(404);
        }
        res.set("Cache-Control", "public, max-age=31557600");
        res.json(result);
      });
  });

  return router;
};

module.exports = searchFormRouter;
