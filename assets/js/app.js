function draw() {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("theBear");
    ctx.drawImage(img,0,0);
    console.log("drew image");
};


$(document).ready(function() {

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
var clickCounter = 0;
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

// Buttons and some functions are hidden while users click through


$(".bandAids").hide();
$("#yesbutton").hide();
$("#nobutton").hide();

var name = $("#name").val()


$("#submitbutton").on("click", function() {
  // If no characters are entered in the form, alert "Please enter name"
  if (!$("#name").val()) {
    alert("Didn't enter your name yet. SAD!");
  }

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

  // clickCounter++;

  // database.ref().set(){
  //   clickCount: clickCounter
  // } 
    $(".trumppic").html("<h2><strong>Congratulations, you are one of the " + "10" + " people offended! Place a band aid with your peers on the Feelings Bear.<strong></h2>");
  
 

  $("#yesbutton").hide();
  $("#nobutton").hide();
  $("#canvas").show();
  $(".bandAids").show();
  $("trumppic").hide();


// Then create a function where the user can click on a band aid type and place it wherever they want on the bear. Save the band aid location to firebase.




})

        // MAKING A RESET FUNCTION TO RESET TO HOME PAGE

        function reset() {
            $("#submitbutton").show();
            $("#canvas").hide();
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