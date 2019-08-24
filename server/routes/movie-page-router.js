const expess = require("express")
const router = expess.Router()
const movieModel = require("../models/movies")

const moviePageRouter = () => {

  router.get("/get-only-one-movie", (req, res) => {
    const { movieName } = req.query;

    movieModel.findOne({Title: movieName}, (err, result) => {
      if (!result) res.status(404);
      
      res.json(result)
    })

  });

  return router
};

module.exports = moviePageRouter;