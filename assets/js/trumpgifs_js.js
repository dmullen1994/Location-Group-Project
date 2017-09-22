 // Event listener for our trump-button
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