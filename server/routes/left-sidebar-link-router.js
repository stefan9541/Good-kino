const express = require("express");

const router = express.Router();

const genreModel = require("../models/genres");

const leftSidebarRoute = () => {
  router.get("/privet", (req, res) => {
    genreModel.find({}, (err, result) => {
      if (err) {
        res.status(404);
      }
      res.json(result);
    });
  });

  return router;
};

module.exports = leftSidebarRoute;
