var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/:option/:mood", function (req, res) {
    var moodId;
    db.Moods.findOne({
      where: {
        mood: req.params.mood
      }
    }).then(function (moodResult) {
      moodId = moodResult.id;
      switch (req.params.option) {
        case "listen":
          db.Songs.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.json(result);
          });
          break;
        case "stream":
          db.Shows.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.json(result);
          });
          break;
        case "eat":
          db.Recipes.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.json(result);
          });
          break;
        case "nothing":
          db.Recipes.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.json(result);
          });
          break;
      }
    });
  });


  // Create a new example
  app.post("/api/moods", function (req, res) {
    db.Moods.create(req.body).then(function (dbMoods) {
      res.json(dbMoods);
    });
  });
  app.post("/api/recipes", function (req, res) {
    db.Recipes.create(req.body).then(function (dbRecipes) {
      res.json(dbRecipes);
    });
  });
  app.post("/api/shows", function (req, res) {
    db.Shows.create(req.body).then(function (dbShows) {
      res.json(dbShows);
    });
  });
  app.post("/api/songs", function (req, res) {
    db.Songs.create(req.body).then(function (dbSongs) {
      res.json(dbSongs);
    });
  });
  app.post("/api/giphs", function (req, res) {
    db.Songs.create(req.body).then(function (dbSongs) {
      res.json(dbSongs);
    });
  });
};
