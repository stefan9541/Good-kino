const expess = require("express");

const router = expess.Router();
const movieModel = require("../models/movies");

const moviePageRouter = () => {
  router.get("/get-only-one-movie", (req, res) => {
    const { movieName } = req.query;

    movieModel.findOne({ Title: movieName }, (err, film) => {
      if (!film) {
        res.status(404);
      }
      const genre = film.Genre.split(" ")
        .slice(0, 1)
        .join(" ");


      movieModel
        .aggregate()
        .match({
          // Type: film.Type,
          Genre: { $regex: genre, $options: "ig" },
          Title: { $ne: film.Title }
        })
        .sample(4)
        .exec()
        .then(similarFilm => {
          res.json({ similarFilm, film });
        })
        .catch(() => res.status(400));
    });
  });

  return router;
};

module.exports = moviePageRouter;
