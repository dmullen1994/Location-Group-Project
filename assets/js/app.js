// Initialize Firebase
var config = {
  apiKey: "AIzaSyA0Q_j5yNdCDCwWd7ZzUnPHxZzY4fO4y-g",
  authDomain: "trumpattack-c7cb1.firebaseapp.com",
  databaseURL: "https://trumpattack-c7cb1.firebaseio.com",
  projectId: "trumpattack-c7cb1",
  storageBucket: "",
  messagingSenderId: "351130597661"
};

firebase.initializeApp(config);

var database = firebase.database();

var pickBandAid = true;
var patchBear = true;
var myBandAid;

$(document).on("click","#offendedButton", function(event) {
  pickBandAid = true;
})

$(document).on("click",".bandAids", function(event) {
  myBandAid = $(this).attr("src");
  patchBear = true;
})

$(document).on("click","#theBear", function(event) {
  database.ref().child("bandAids").push({
    xCord: event.pageX,
    yCord: event.pageY,
    bandAid: myBandAid, 
  })
  console.log(event);
})

$("#yeah").on("click", function(){

  var yeah = $("#searchTerm").val();

  $.ajax({
          url: "https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=" + yeah + "",
          method: "GET"
        }).done(function(response) {
          console.log(response);

 $(".location").html("<h3>" + response.message + "." + "</h3>");

        });
});

    $("#trump-button").on("click", function() {

      // Storing our giphy API URL for a random trump image
      var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=Trump";

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      }) .done(function(response) {
         console.log(response);

        // Saving the image_original_url property
        var imageUrl = response.data.image_original_url;

        // Creating and storing an image tag
        var trumpImage = $("<img>");

        // Setting the trumpImage src attribute to imageUrl
        trumpImage.attr("src", imageUrl);
        trumpImage.attr("alt", "trump image");

        // Prepending the trumpImage to the random-gif div
        $("#random-gif").prepend(trumpImage);
      });
    });
