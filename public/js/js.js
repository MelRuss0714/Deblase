var selectedOption;
var selectedMood;
var optionsArray = ["stream", "eat", "listen", "nothing"];
var moodsArray = ["dreamy", "happy", "angry", "sad", "stressed", "weird", "bored"];

var pathString = window.location.pathname.split("/");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function remakeOptionsArray() {
  var pathOption = pathString[2]
  var selectedOptionId = optionsArray.findIndex(x => x === pathOption);
  var newOptionsArray = [];
  newOptionsArray.push(optionsArray[selectedOptionId]);
  for (i = 0; i < optionsArray.length; i++) {
    if (i === selectedOptionId) {
      continue
    } else {
      newOptionsArray.push(optionsArray[i]);
    }
  }
  return newOptionsArray;
}

function remakeMoodsArray() {
  var pathMood = pathString[3]
  var selectedMoodId = moodsArray.findIndex(x => x === pathMood);
  var newMoodsArray = [];

  newMoodsArray.push(moodsArray[selectedMoodId]);
  for (i = 0; i < moodsArray.length; i++) {
    if (i === selectedMoodId) {
      continue
    } else {
      newMoodsArray.push(moodsArray[i]);
    }
  }
  return newMoodsArray;
}

function pageTitle() {
  var slash = "<h1>/</h1>"
  var options = remakeOptionsArray();
  var moods = remakeMoodsArray();

  var dropdownOption = $("<select>").attr("id", "pageOption").attr("class", "dropdown2");
  var dropdownMood = $("<select>").attr("id", "pageMood").attr("class", "dropdown2");

  for (i = 0; i < options.length; i++) {
    var optionDD = $("<option>").attr("value", options[i]).text(capitalizeFirstLetter(options[i]));
    dropdownOption.append(optionDD);
  }
  for (i = 0; i < moods.length; i++) {
    var moodDD = $("<option>").attr("value", moods[i]).text(capitalizeFirstLetter(moods[i]));
    dropdownMood.append(moodDD);
  }

  var submitButton = $("<button>").addClass("submit").attr("type", "reset").attr("id", "pageSubmit").text("Submit");
  var div1 = $("<div>").addClass("titleRes").append(slash).append(dropdownOption);
  var div2 = $("<div>").addClass("titleRes").append(slash).append(dropdownMood).append(submitButton);
  var title = $("<form>").append(div1).append(div2);
  $(".title").append(title);
}

function giphy(mood) {
  var apiKey = "bw79f5nB2UMqatnUhZCZZ2PYtuvmRjMf"
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&limit=15&q=" + mood + "&rating=PG-13&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (x) {
    var response = x;
    console.log(x)
    for (i = 0; i < response.data.length; i++) {
      var animated = response.data[i].images.fixed_height.url;
      var still = response.data[i].images.fixed_height_still.url;

      var gif = $("<img>");
      gif.attr("src", still);
      gif.attr("data-still", still);
      gif.attr("data-animate", animated);
      gif.attr("data-state", "still");
      gif.addClass("resultImg giphy")


      $(".results").append(gif);
    };
  });
  $(".results").prepend($("<p class='resultP'>").text("Click gif to animate."));

}

function background() {
  if (pathString[2]) {
    switch (pathString[2]) {
      case "stream":
        switch (pathString[3]) {
          case "sad":
            $("body").attr("style", "background-image: url(/images/stream/stream-sad.svg);");
            break;
          case "angry":
            $("body").attr("style", "background-image: url(/images/stream/stream-angry.svg);");
            break;
          case "bored":
            $("body").attr("style", "background-image: url(/images/stream/stream-bored.svg);");
            break;
          case "stressed":
            $("body").attr("style", "background-image: url(/images/stream/stream-stressed.svg);");
            break;
          case "dreamy":
            $("body").attr("style", "background-image: url(/images/stream/stream-dreamy.svg);");
            break;
          case "happy":
            $("body").attr("style", "background-image: url(/images/stream/stream-happy.svg);");
            break;
          case "weird":
            $("body").attr("style", "background-image: url(/images/stream/stream-weird.svg);");
            break;
          default:
            $("body").attr("style", "background-image: url(/images/bgindex.svg);");
        };
        break;
      case "listen":
        switch (pathString[3]) {
          case "sad":
            $("body").attr("style", "background-image: url(/images/listen/listen-sad.svg);");
            break;
          case "angry":
            $("body").attr("style", "background-image: url(/images/listen/listen-angry.svg);");
            break;
          case "bored":
            $("body").attr("style", "background-image: url(/images/listen/listen-bored.svg);");
            break;
          case "stressed":
            $("body").attr("style", "background-image: url(/images/listen/listen-stressed.svg);");
            break;
          case "dreamy":
            $("body").attr("style", "background-image: url(/images/listen/listen-dreamy.svg);");
            break;
          case "happy":
            $("body").attr("style", "background-image: url(/images/listen/listen-happy.svg);");
            break;
          case "weird":
            $("body").attr("style", "background-image: url(/images/listen/listen-weird.svg);");
            break;
          default:
            $("body").attr("style", "background-image: url(/images/bgindex.svg);");
        };
        break;
      case "eat":
        switch (pathString[3]) {
          case "sad":
            $("body").attr("style", "background-image: url(/images/eat/eat-sad.svg);");
            break;
          case "angry":
            $("body").attr("style", "background-image: url(/images/eat/eat-angry.svg);");
            break;
          case "bored":
            $("body").attr("style", "background-image: url(/images/eat/eat-bored.svg);");
            break;
          case "stressed":
            $("body").attr("style", "background-image: url(/images/eat/eat-stressed.svg);");
            break;
          case "dreamy":
            $("body").attr("style", "background-image: url(/images/eat/eat-dreamy.svg);");
            break;
          case "happy":
            $("body").attr("style", "background-image: url(/images/eat/eat-happy.svg);");
            break;
          case "weird":
            $("body").attr("style", "background-image: url(/images/eat/eat-weird.svg);");
            break;
          default:
            $("body").attr("style", "background-image: url(/images/bgindex.svg);");
        };
        break;
      case "nothing":
        switch (pathString[3]) {
          case "sad":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-sad.svg);");
            break;
          case "angry":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-angry.svg);");
            break;
          case "bored":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-bored.svg);");
            break;
          case "stressed":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-stressed.svg);");
            break;
          case "dreamy":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-dreamy.svg);");
            break;
          case "happy":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-happy.svg);");
            break;
          case "weird":
            $("body").attr("style", "background-image: url(/images/nothing/nothing-weird.svg);");
            break;
          default:
            $("body").attr("style", "background-image: url(/images/bgindex.svg);");
        };
        break;
      default:
        $(body).attr("style", "background-image: url(/images/bgindex.svg");
    }
  }
}

$(function () {
  console.log("==================\n\n\n  hbs js loaded\n\n\n==================")
  background()

  if (pathString.length === 4) {
    pageTitle();
  }

  if (pathString[2] === "nothing") {
    giphy(pathString[3])

    $(document).on("click", ".resultImg", function () {
      console.log("gif clicked")

      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  }

  $(".showSuggestion").on("click", function () {
    $("#suggestion").attr("style", "display:inline;")
  })

  $("#optionSubmit").on("click", function () {
    selectedOption = $("#option").val();
    selectedMood = $("#mood").val();

    window.location.href = "/api/" + selectedOption + "/" + selectedMood;
  });

  $("#pageSubmit").on("click", function () {
    selectedOption = $("#pageOption").val();
    selectedMood = $("#pageMood").val();

    window.location.href = "/api/" + selectedOption + "/" + selectedMood;
  });

  $("#suggestSubmit").on("click", function () {
    event.preventDefault();

    if (pathString[2] === "listen") {

      var userSuggestionArtist = $(".suggestInput").filter("#suggestInputArtist").val();
      var userSuggestionSong = $(".suggestInput").filter("#suggestInputSong").val();

      var newData = {
        artist: userSuggestionArtist,
        song: userSuggestionSong
      }
      $.ajax("/suggestion/" + pathString[2] + "/" + pathString[3], {
        type: "POST",
        data: newData
      }).then(
        function () {
          console.log("suggestion: " + newData + " added to the database.")
          location.reload();
        }
      );

    } else {

      var userSuggestion = $(".suggestInput").val();

      var newData = {
        suggestion: userSuggestion
      }
      $.ajax("/suggestion/" + pathString[2] + "/" + pathString[3], {
        type: "POST",
        data: newData
      }).then(
        function () {
          console.log("suggestion: " + userSuggestion + " added to the database.")
          location.reload();
        }
      );

    }


  });
});