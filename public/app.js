// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//   // For each one
//   for (var i = 0; i < data.length; i++) {
//     // Display the apropos information on the page
//     $(".card").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//   }
// });


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
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
      var articles = [];
      articles.push(data);
      
      console.log(data);
      // The title of the article
      $("#comment").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#comment").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#comment").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment </button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.comment.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.comment.body);
      }
    });
    return articles;
});

// When you click the savenote button
$(document).on("click", "#savecomment", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
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
      $("#comments").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
// /Scrape Button
$(document).on("click", ".scrape-new", function() {
console.log("newArticleBtn")
$(".container-fluid").empty();
 // Save the id from the article
 var thisId = $(this).attr("data-id");
 // Now make an ajax call for the Article
 $.ajax({
   method: "GET",
   url: "/articles/" + thisId
 })
  // add comments
  .then(function(data) {
    console.log(data);

    // The title of the article
    $(".container-fluid").append("<h3>" + data.title + "</h3>");
    // An input to enter a new title
    $(".container-fluid").append("<input id='titleinput' name='title' >");
    // A textarea to add a new note body
    $(".container-fluid").append("<textarea id='bodyinput' name='body'></textarea>");
    // A button to submit a new note, with the id of the article saved to it
    $(".container-fluid").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");

    // If there's a comment in the article
    if (data.comment) {
      // Place the title of the comment in the title input
      $("#titleinput").val(data.comment.title);
      // Place the body of the note in the body textarea
      $("#bodyinput").val(data.comment.body);
    }
  });
})