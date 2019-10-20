const express = require("express");

const router = express.Router();

const genreModel = require("../models/genres");

const leftSidebarRoute = () => {
  router.get("/privet", (req, res) => {
    genreModel.find({}, (err, result) => {
      if (err) {
        res.status(404);
      }
      res.set("Cache-Control", "public, max-age=31557600");
      res.json(result);
    });
  });

  return router;
};

module.exports = leftSidebarRoute;
