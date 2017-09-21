$(document).ready(function() {

// Initialize Firebase
var config = {
        apiKey: "AIzaSyCKhdA1h-Zil97L2CG0lCIG3FxbEW33NT0",
        authDomain: "trumpproject-1aeeb.firebaseapp.com",
        databaseURL: "https://trumpproject-1aeeb.firebaseio.com",
        projectId: "trumpproject-1aeeb",
        storageBucket: "",
        messagingSenderId: "825405882430"
};

firebase.initializeApp(config);

var database = firebase.database();
var clickCounter = 0;


// Buttons and some functions are hidden while users click through

$("#theBear").hide();
$(".bandAids").hide();
$("#yesbutton").hide();
$("#nobutton").hide();

var name = $("#name").val()


$("#submitbutton").on("click", function() {
  // If no characters are entered in the form, alert "Please enter name"
  if (!$("#name").val()) {
    alert("Didn't enter your name yet. SAD!");
  }

$("#theBear").hide();
$(".bandAids").hide();
$("#name").hide();
$("#submitbutton").hide();


  var name = $("#name").val();

  $.ajax({
          url: "https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=" + name + "",
          method: "GET"
        }).done(function(response) {


  $(".display-3").html("<h2>Trump said: <strong>" + response.message + ".</strong></h2>");
  $(".trumppic").html("<h3>Did this offend you?</h3>");
  $("#yesbutton").show();
  $("#nobutton").show();

        });

// if button clicked = No, then write a gif from Giphy to the html with a phrase

$("#nobutton").on("click", function() {

  $("#yesbutton").hide();
  $("#nobutton").hide();
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
        $(".trumppic").html(trumpImage);
        $(".display-3").html("<h2><strong>Are you sure? Look at this guy!</strong></h2>");
      });

})

// Else, if button clicked = Yes, ask another question.



$("#yesbutton").on("click", function () {

  clickCounter++;

  database.ref().on("value", function(snapshot) {
    clickCount = snapshot.val().clickCounter
    console.log(snapshot.val())
    $(".display-3").html("<h2><strong>Congratulations, you are one of the " + clickCount + " people offended! Place a band aid with your peers on the Feelings Bear.<strong></h2>");
  })

 

  $("#yesbutton").hide();
  $("#nobutton").hide();
  $("#theBear").show();
  $(".bandAids").show();
  $("trumppic").hide();


// Then create a function where the user can click on a band aid type and place it wherever they want on the bear. Save the band aid location to firebase.




})

        // MAKING A RESET FUNCTION TO RESET TO HOME PAGE

        function reset() {
            $("#submitbutton").show();
            $("#theBear").hide();
            $(".bandAids").hide();
            $("#yesbutton").hide();
            $("#nobutton").hide();
            $(".trumppic").empty();
            $("display-3").html("<h1 class='display-3'>Has Trump offended you today?</h1>" +
                '<input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name">' +
                "<br>" + '<a class="btn btn-primary btn-lg" id="submitButton" href="#" role="button">Click this button</a>');
        }

        })


    })