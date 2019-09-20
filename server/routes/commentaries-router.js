/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require("express");

const router = express.Router();
const commentariesModel = require("../models/commentaries");

const { ObjectId } = require("mongoose").Types;

module.exports = () => {
  router.get("/get-commentaries", (req, res) => {
    commentariesModel.find({
      movieId: ObjectId(req.query.movieId)
    })
      .then(commentaries => {
        commentaries.reverse();
        res.json(commentaries);
      });
  });

  router.post("/post-commentaries", (req, res) => {
    const commentar = new commentariesModel({ ...req.body });
    commentar.save()
      .then(commentar => {
        res.json(commentar);
      })
      .catch(err => console.error(err));
  });

  return router;
};
