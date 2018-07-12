// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append("<li><p class='comment-click' data-id='" + data[i]._id + "'><a href='" + data[i].link +"'>" + data[i].Headline + "<a/></p><p>" + data[i].Summary + "</p></li>");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(document).on("click", "comment-click", function() {
    // Empty the notes from the note section
    $("#comments").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#comments").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#comments").append("<input id='nameinput' name='name' >");
        $("#comments").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#comments").append("<button data-id='" + data._id + "' id='saveComment'>Save Comment</button>");
  
        // If there's a note in the article
        if (data.Comment) {
            $("#nameinput").val(data.Comment.name);      
            // Place the title of the note in the title input
            $("#titleinput").val(data.Comment.title);
            // Place the body of the note in the body textarea
            $("#bodyinput").val(data.Comment.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#saveComment", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        name: $("#nameinput").val(),
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  $(document).on("click","#scraper", function(){
    $.ajax({
      method: "GET",
      url: "/scrape"
    }).then(function(data){
      console.log(data);
      location.reload();
    })
  })
  