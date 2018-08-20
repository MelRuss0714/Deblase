var db = require("../models");
var unirest = require("unirest");

module.exports = function (app) {
  // Get all examples
  //app.get("/api/:option/:mood", function (req, res) {

  //  });

  app.post("/suggestion/:option/:mood", function (req, res) {
    var moodId;

    db.Moods.findOne({
      where: {
        mood: req.params.mood
      }
    }).then(function (moodResult) {
      console.log("Body.mood is as follows: " + req.params.mood);
      console.log("Body.option is as follows: " + req.params.option);

      moodId = moodResult.id;

      switch (req.params.option) {

        case "listen":
          var songURL, image;
          request('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + req.data.song + '&artist=' + req.data.artist + '&api_key=57ee3318536b23ee81d6b27e36997cde&format=json', { json: true }, (err, res, body) => {

            var response = res.body;

            songURL = JSON.stringify(response.results.trackmatches.track[0].url);
            image = JSON.stringify(response.results.trackmatches.track[0].image[4].text);
            console.log("url: " + songURL);
            console.log(req.data.suggestion);
            //Logging responses we return to insert into mySQL DB
            console.log("url: " + songURL + "Image: " + image);
            db.Songs.create({
              songName: req.body.suggestion,
              artist: req.body.artist,
              url: songURL,
              image: image
            }, {
                where: {
                  moodId: moodId
                }
              }).then(function (dbSongs) {
                res.json(dbSongs);
              })
              .catch(function (err) {
                // Whenever a validation or flag fails, an error is thrown
                // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                res.json(err);
              });

          });

          break;
        case "stream":
          var service, showURL, image;
          unirest.get("https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=" + req.body.suggestion + "&country=us")
            .header("X-Mashape-Key", "fYk8PFc8Eumsh9DDi5Z1Np9cafM2p1HflPwjsndzj8fU4KVIgn")
            .header("X-Mashape-Host", "utelly-tv-shows-and-movies-availability-v1.p.mashape.com")
            .end(function (result) {
              console.log(result.body.results)

              service = JSON.stringify(result.body.results[0].locations[0].display_name);
              showURL = JSON.stringify(result.body.results[0].locations[0].url);
              image = JSON.stringify(result.body.results[0].picture);
              console.log(req.body.suggestion)
              console.log("service: " + service + "showURL: " + showURL + "image: " + image);
              db.Shows.create({
                showName: req.body.suggestion,
                service: service,
                link: showURL,
                imageURL: image
              }, {
                  where: {
                    moodId: moodId
                  }
                }).then(function (dbShows) {
                  res.json(dbShows);
                })
                .catch(function (err) {
                  // Whenever a validation or flag fails, an error is thrown
                  // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                  res.json(err);
                });
            });

          break;
        case "eat":
          var recipeURL, image;
          unirest.get("https://api.edamam.com/search?q=" + req.body.suggestion + "&app_id=3e1489a2&app_key=97f8278ee92eb615fc479b170a1c5171&from=0&to=1")
            .header("Accept-Encoding", "gzip")
            .header("Content-Encoding", "gzip")
            .end(function (result) {

              //recipeName | ingredients | directions
              image = JSON.stringify(result.body.hits[0].recipe.image);
              recipeURL = JSON.stringify(result.body.hits[0].recipe.url);

              console.log(" this is recipe: " + recipeURL)//  + image + label);
              db.Recipes.create({
                recipeName: req.body.suggestion,
                url: recipeURL,
                image: image
              }, {
                  where: {
                    moodId: moodId
                  }
                }).then(function (dbRecipes) {
                  res.json(dbRecipes);
                })
                .catch(function (err) {
                  // Whenever a validation or flag fails, an error is thrown
                  // We can "catch" the error to prevent it from being "thrown", which could crash our node app
                  res.json(err);
                });
            });

          break;
      };
      // Render 404 page for any unmatched routes
      app.get("*", function (req, res) {
        res.render("404");
      });
    })
  })
};
