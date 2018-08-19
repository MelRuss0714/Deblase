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

  var submitButton = $("<button>").addClass("submit").attr("type", "submit").attr("id", "pageSubmit").text("Submit");

  var title = $("<form>").append(slash).append(dropdownOption).append(slash).append(dropdownMood).append(submitButton);
  $(".title").append(title);
}

$(function () {
  console.log("==================\n\n\n  hbs js loaded\n\n\n==================")

  if (pathString.length === 4) {
    pageTitle();
  }
  // if ($("#svg")) {
  //   $(".st0").attr("fill","yellow");
  // // }
  // var svgDoc = document.getElementById("svgId").contentDocument.getElementsByClassName("st0");
  // var svgObject = document.getElementById("svgId").contentDocument;
  // var svg = svgObject.getElementsByClassName("st0"); // .getElementById("Layer_3") getElementsByClassName("st1");
  // var jqSvg = svg.setAttribute("fill","red")
  // jqSvg
  // console.log(jqSvg);
  // 	// Get the Object by ID
  // var a = document.getElementById("svgId");
  // // Get the SVG document inside the Object tag
  // var svgDoc = a.contentDocument;
  // // Get one of the SVG items by ID;
  // var svgItem = svgDoc.getElementsByClassName("st0");
  // // Set the colour to something else
  // svgItem.setAttribute("fill", "lime");



  // $(".container").attr("style","background-color:red;")
  // //console.log(container)

  // $(".svgClass").on("load", function() {
  //   document.querySelector(".svgClass").getSVGDocument().getElementsByClassName("st0").setAttribute("fill", "red");
  //   document.querySelector(".svgClass").getSVGDocument().getElementsByClassName("st1").setAttribute("fill", "#080808");
  //   document.querySelector(".svgClass").getSVGDocument().getElementsByClassName("st2").setAttribute("fill", "#a1a1a1");

  // });

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

    if ($("#suggestInputArtist")) {

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