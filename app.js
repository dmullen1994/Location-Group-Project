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


// After user answers questions, the bear activity will prompt. Users will place a bandaid on the bear where applicable.
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


$("#button").on("click", function () {
	// If no characters are entered in the form, alert "Please enter name"
	$("#theBear").hide();
	$(".bandAids").hide();


	var name = $("#name").val();

  $.ajax({
          url: "https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=" + name + "",
          method: "GET"
        }).done(function(response) {


 	$(".jumbotron").html("<h2>Trump said: <strong>" + response.message + ".</strong></h2>");
 	$("#yesnobutton").html("<h3>Did this offend you?</h3>");

 	






        });


// if button clicked = No, then write a gif from Giphy to the html with the phrase, "Check back later - he's always saying something!"



// Else, if button clicked = Yes, ask another question, "Where did it hurt? Use the band aids below and tell us where on the bear."

// Then create a function where the user can click on a band aid type and place it wherever they want on the bear. Save the band aid location to firebase.











})