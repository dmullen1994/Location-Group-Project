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

