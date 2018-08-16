$(function () {
  var selectedOption;
  var selectedMood;

  // $("h1").attr("style","background-color: red;")

  $("#resultsCarousel").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3
  });

  if (selectedOption && selectedMood) {
    $("#option").val(selectedOption);
    $("#mood").val(selectedMood);
  }

  $(".showSuggestion").on("click", function () {
    $(".suggestion").attr("style", "display:inline;")
  })

  $("#optionSubmit").on("click", function () {
    selectedOption = $("#option").val();
    selectedMood = $("#mood").val();

    var newData = {
      option: selectedOption,
      mood: selectedMood
    }

    $.ajax("/api/" + selectedOption + "/" + selectedMood, {
      type: "PUT",
      data: newData
    }).then(
      function () {
        console.log(newData);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  $("#pageSubmit").on("click", function () {
    selectedOption = $("#option").val();
    selectedMood = $("#mood").val();

    var newData = {
      option: selectedOption,
      mood: selecredMood
    }

    $.ajax("/api/" + selectedOption + "/" + selectedMood, {
      type: "PUT",
      data: newData
    }).then(
      function () {
        console.log(newData);
        // Reload the page to get the updated list
        location.reload();
      }
    )
  });

  $("#suggestSubmit").on("click", function () {
    event.preventDefault();

    var userSuggestion = $("#suggestInput").val().trim();

    var newData = {
      suggestion: userSuggestion
    }
    $.ajax("/suggestion/" + selectedOption + "/" + selctedMood, {
      type: "POST",
      data: newData
    }).then(
      function () {
        console.log("suggestion: " + userSuggestion + " added to the database.")
        location.reload();
      }
    );

    $("#suggestInput").val(" ")
  });
});