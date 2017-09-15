$("#button").on("click", function () {
	// If no characters are entered, alert "Please enter name"



	var name = $("#name").val();

  $.ajax({
          url: "https://api.whatdoestrumpthink.com/api/v1/quotes/personalized?q=" + name + "",
          method: "GET"
        }).done(function(response) {


 	$(".jumbotron").html("<h2>Trump said: <strong>" + response.message + "</strong></h2><br><h3>Did this offend you?</h3>" + "<button>Yes</button><br><button>No</button>");
 	

        });


// if button clicked = No, then write a gif from Giphy to the html with the phrase, "Check back later - he's always saying something!"



// Else, if button clicked = Yes, ask another question, "Where did it hurt? Use the band aids below and tell us where on the bear."

// Then create a function where the user can click on a band aid type and place it wherever they want on the bear. Save the band aid location to firebase.











})