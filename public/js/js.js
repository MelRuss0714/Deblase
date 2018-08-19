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

  var title = $("<form>").append(slash).append(dropdownOption).append(slash).append(dropdownMood).append(submitButton);
  $(".title").append(title);
}

$(function () {
  console.log("==================\n\n\n  hbs js loaded\n\n\n==================")

  if (pathString.length === 4) {
    pageTitle();
  }

  $(".showSuggestion").on("click", function () {
    $(".suggestion").attr("style", "display:inline;")
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

      var userSuggestionArtist = $(".suggestInput").filter("#suggestInputArtist").val().trim();
      var userSuggestionSong = $(".suggestInput").filter("#suggestInputSong").val().trim();

      var newData = {
        artist: userSuggestionArtist,
        song: userSuggestionSong
      }
      $.ajax("/suggestion/" + selectedOption + "/" + selectedMood, {
        type: "POST",
        data: newData
      }).then(
        function () {
          console.log("suggestion: " + newData + " added to the database.")
          location.reload();
        }
      );

    } else {

      var userSuggestion = $(".suggestInput").val().trim();

      var newData = {
        suggestion: userSuggestion
      }
      $.ajax("/suggestion/" + selectedOption + "/" + selectedMood, {
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
