$.getJSON("/articles", function(data) {
    
  for (var i = 0; i < data.length; i++) {
    
    $("#articles").append("<li><p class='comment-click' data-id='" + data[i]._id + "'><a href='" + data[i].link +"'>" + data[i].Headline + "<a/></p><p>" + data[i].Summary + "</p><button data-id='" + data[i]._id + "' id='comments-btn' class='btn'>Comments</button></li>");
  }

});
  
  

$(document).on("click", "#comments-btn", function() {
  $("#comments").empty();
  $("#newcommentsform").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  }).then(function(data) {
    console.log(data);
    
    $("#newcommentsform").append("<br><h2>" + data.Headline + "</h2>");
    $("#newcommentsform").append("<br><input placeholder='Name' id='nameinput' name='name'>");
    $("#newcommentsform").append("<br><input placeholder='Comment Title' id='titleinput' name='title'>");
    $("#newcommentsform").append("<br><textarea placeholder='Comment Body' id='bodyinput' name='body'></textarea>");
    $("#newcommentsform").append("<br><button data-id='" + data._id + "' id='saveComment' class='btn'>New Comment</button>");

    if (data.Comments) {
      console.log(data.Comments);

      for(let i = 0; i < data.Comments.length; i++){
        $("#comments").append("<div class='card'> <div class='card-body'> <h5 class='card-title'>" + data.Comments[i].title + "</h5><h6 class='card-subtitle mb-2 text-muted'>by " + data.Comments[i].name + "</h6><p class='card-text'>" + data.Comments[i].body + "</p></div></div>");  
      } 
    }
  });
});
  
  
$(document).on("click", "#saveComment", function() {
  
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      name: $("#nameinput").val(),
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  }).then(function(data) {
      
    console.log(data);
    $("#comments").empty();

  });


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
  