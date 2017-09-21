function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("theBear");
    ctx.drawImage(img,0,0);
    console.log("drew image");
};

$(document).ready(function() {

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

$(document).on("click","#yesbutton", function(event) {
  pickBandAid = true;
})

$(document).on("click",".bandAids", function(event) {
  myBandAid = $(this).attr("src");
  patchBear = true;
})

$(document).on("click","#canvas", function(event) {
  var c = this.getContext('2d');
  var p = c.getImageData(event.pageX, event.pageY, 1, 1).data; 
  var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
  console.log(hex);
  if (hex === "#a16121" || hex === "#834217" || hex === "#40200b") {

    database.ref().child("bandAids").push({
      xCord: event.pageX,
      yCord: event.pageY,
      bandAid: myBandAid, 
    })
  };
})

database.ref().child("bandAids").on("value", function(snapshot) {
  snapshot.forEach(function(childSnap) {
    currentBandAid = childSnap.val();
    $("body").append("<img src='" + currentBandAid.bandAid + "' style='position:absolute; top:" + currentBandAid.yCord + "px; left:" + currentBandAid.xCord + "px; z-index: 1'>");
  })
});


function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}
//<img id="demp" src="./omna.jpg"  style="position:absolute; left: 400; top: 100; width: 200;      height: 200;"/>

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


// Buttons and some functions are hidden while users click through

$("#theBear").hide();
$(".bandAids").hide();
$("#yesbutton").hide();
$("#nobutton").hide();


$("#button").on("click", function () {
  // If no characters are entered in the form, alert "Please enter name"

$("#theBear").hide();
$(".bandAids").hide();


  var name = $("#name").val();

  $.ajax({
          url: "https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=" + name + "",
          method: "GET"
        }).done(function(response) {


  $(".jumbotron").html("<h2>Trump said: <strong>" + response.message + ".</strong></h2><br><h3>Did this offend you?<h3>");
  $("#yesbutton").show();
  $("#nobutton").show();
        });


// if button clicked = No, then write a gif from Giphy to the html with the phrase, "Check back later - he's always saying something!"

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
        $("#random-gif").html(trumpImage);
        $(".jumbotron").html("<h2><strong>Are you sure? Look at this guy!</strong></h2>");
      });

})

// Else, if button clicked = Yes, ask another question, "Where did it hurt? Use the band aids below and tell us where on the bear."

$("#yesbutton").on("click", function () {

  $("#yesbutton").hide();
  $("#nobutton").hide();
  $("#theBear").show();
  $(".bandAids").show();

  $(".jumbotron").html("<h2><strong>Where did it hurt?<br>Use the band-aids below and tell us where on the Feelings Bear.</strong></h2>");


// Then create a function where the user can click on a band aid type and place it wherever they want on the bear. Save the band aid location to firebase.

var pickBandAid = true;
var patchBear = true;
var myBandAid;

$(document).on("click","#yesbutton", function(event) {
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

})

})

})