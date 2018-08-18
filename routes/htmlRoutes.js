var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/api/:option/:mood", function (req, res) {
    var moodId;

    db.Moods.findOne({
      where: {
        mood: req.params.mood
      }
    }).then(function (moodResult) {
      console.log("Body.mood is as follows: " + req.params.mood);
      console.log("Body.mood is as follows: " + req.params.option);

      moodId = moodResult.id;
      switch (req.params.option) {
        case "listen":
          db.Songs.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.render(req.params.option, result);
          });
          break;
        case "stream":
          db.Shows.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.render(req.params.option, result);
            console.log("Streaming Results: " + result);
          });
          break;
        case "eat":
          db.Recipes.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.render(req.params.option, result);
          });
          break;
        case "nothing":
          db.Giphs.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (result) {
            res.render(req.params.option, result);
          });
          break;
      }
    });
    console.log('im in html routes');
    console.log(res);
    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
      res.render("404");
    });

  });
}




