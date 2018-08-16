var db = require("../models");
var unirest = require("unirest");

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
      moodId = moodResult.id;
      switch (req.params.option) {
        case "listen":
          db.Songs.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (res) {
            res.render(req.params.option);
          });
          break;
        case "stream":
          db.Shows.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (res) {
            res.render(req.params.option);
          });
          break;
        case "eat":
          db.Recipes.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (res) {
            res.render(req.params.option);
          });
          break;
        case "nothing":
          db.Giphs.findAll({
            where: {
              moodId: moodId
            },
            include: [db.Moods]
          }).then(function (res) {
            res.render(req.params.option);
          });
          break;
      }
    });
  });
  //Put Suggestions into Databases
  app.put("/api/suggestion/:option/:mood", function (req, res) {
    var moodId;
    db.Moods.findOne({
      where: {
        mood: req.params.mood
      }
    }).then(function (moodResult) {
      moodId = moodResult.id;
      switch (req.params.option) {
        case "listen":
          var songURL, image;
          request('http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + req.body.songName + '&artist=' + req.body.artist + '&api_key=57ee3318536b23ee81d6b27e36997cde&format=json', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var response = res.body;

            songURL = JSON.stringify(response.results.trackmatches.track[0].url);
            image = JSON.stringify(response.results.trackmatches.track[0].image[4].text);

            //Logging responses we return to insert into mySQL DB
            console.log("url: " + songURL + "Image: " + image);

          });
          db.Songs.update({
            songName: req.body.songName,
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
          break;
        case "stream":
          var service, showURL, image;
          unirest.get("https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?term=" + req.body.showName + "&country=uk")
            .header("X-Mashape-Key", "fYk8PFc8Eumsh9DDi5Z1Np9cafM2p1HflPwjsndzj8fU4KVIgn")
            .header("X-Mashape-Host", "utelly-tv-shows-and-movies-availability-v1.p.mashape.com")
            .end(function (result) {
              service = JSON.stringify(result.body.results[0].locations[0].display_name);
              showURL = JSON.stringify(result.body.results[0].locations[0].url);
              image = JSON.stringify(result.body.results[0].picture);

            });
          db.Shows.update({
            showName: req.body.showName,
            service: service,
            url: showURL,
            image: image
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
          break;
        case "eat":
          var recipeURL, image;
          unirest.get("https://api.edamam.com/search?q=" + req.body.recipeName + "&app_id=3e1489a2&app_key=97f8278ee92eb615fc479b170a1c5171&from=0&to=1")
            .header("Accept-Encoding", "gzip")
            .header("Content-Encoding", "gzip")
            .end(function (result) {

              //recipeName | ingredients | directions
              image = JSON.stringify(result.body.hits[0].recipe.image);
              recipeURL = JSON.stringify(result.body.hits[0].recipe.url);

              console.log(" this is recipe: " + url)//  + image + label);

            });
          db.Recipes.update({
            recipeName: req.body.recipeName,
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
          break;
        case "nothing":
          var giphyURL;
          request('https://api.giphy.com/v1/gifs/search?q=' + req.params.mood + '&limit=10&offset=0&rating=R&api_key=qCHU3WJfRnuaeWrO8zjwX5qq3CVgRF3x', { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            var response = res.body;

            giphyURL = JSON.stringify(response.data[0].url);
            //Logging responses we return to insert into mySQL DB
            console.log("url: " + giphyURL);

          });
          db.Giphs.update({
            url: giphyURL
          }, {
              where: {
                moodId: moodId
              }
            }).then(function (dbGiphs) {
              res.json(dbGiphs);
            })
            .catch(function (err) {
              // Whenever a validation or flag fails, an error is thrown
              // We can "catch" the error to prevent it from being "thrown", which could crash our node app
              res.json(err);
            });
          break;
      };
      // Render 404 page for any unmatched routes
      app.get("*", function (req, res) {
        res.render("404");
      });
    };





