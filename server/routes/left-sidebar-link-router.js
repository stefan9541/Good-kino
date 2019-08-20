const express = require("express");
const router = express.Router();

const genreModel = require("../models/genres");

const leftSidebarRoute = () => {
  router.get("/privet", (req, res) => {
    genreModel.find({}, function(err, result) {
      if (err) res.json({err: true, label: "bad response"});
      res.json(result);
    })
  });

  return router;
}

module.exports = leftSidebarRoute;