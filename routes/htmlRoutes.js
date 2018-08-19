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
          var giphyURL;
          request('https://api.giphy.com/v1/gifs/search?q=' + req.params.mood + '&limit=10&offset=0&rating=R&api_key=qCHU3WJfRnuaeWrO8zjwX5qq3CVgRF3x', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var response = res.body;

            giphyURL = JSON.stringify(response.data[0].url);
            //Logging responses we return to insert into mySQL DB
            console.log("url: " + giphyURL);
            db.Giphs.update({
              url: giphyURL
            }, {
                where: {
                  moodId: moodId
                }
              }).then(function (result) {
                res.render(req.params.option, result);
              })
              .catch(function (err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
              });
          });

          break;
      }
    });

    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
      res.render("404");
    });

  });
}




