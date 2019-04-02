
// Before you can make any part of our site work, you need to create an array of strings,
// each one related to a topic that interests you. 
//Save it to a variable called `topics`.
// We chose animals for our theme, but you can make a list to your own liking.
const topics = ["Trump","Obama","Sailor Moon","Lady Gaga","Marilyn Monroe","Leonardo DiCaprio","Detective Conan","Elizabeth II","Benedict Cumberbatch","Sailor Mercury","Ziyi Zhang","Doraemon"];
$("#buttons-view").empty();

// Your app should take the topics in this array and create buttons in your HTML.
// Try using a loop that appends a button for each string in the array.

for (let i=0;i<topics.length;i++){

  var nameButton = $("<button>")
  nameButton.attr("id",topics[i]);
  nameButton.text(topics[i]);

  $("#buttons-view").append(nameButton);  
}

// When the user clicks on a button, the page should grab 10 static, 

const clickButton = function() {

  $("#gif-view").empty();

var name = $(this).attr("id");
var queryURL ="https://api.giphy.com/v1/gifs/search?api_key=K84VfPbCuUIxM6RSTgtiW1aB8Z3jgIcu&q="+name+"&limit=10&offset=0&rating=G&lang=en"

$.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function(response) {
        //console.log(response);
      var results = response.data;

       // Under every gif, display its rating (PG, G, so on).
       //This data is provided by the GIPHY API.

       for (let j=0;j<results.length;j++){

      var personDiv = $("<div>");
      var rating = results[j].rating;
       
      var p = $("<p>").text("Rating: " + rating);

      //non-animated gif images from the GIPHY API and place them on the page.

     var personImage = $("<img>");
     personImage.attr("class","image");
     personImage.attr("src", results[j].images.fixed_height_still.url);

     personDiv.prepend(p);
     personDiv.prepend(personImage);

    $("#gif-view").prepend(personDiv);

  }

    });

  }

  $("button").on("click", clickButton)


// When the user clicks one of the still GIPHY images, 
//the gif should animate. If the user clicks the gif again, it should stop playing.




// Only once you get images displaying with button presses should you move on to the next step.

// Add a form to your page takes the value from a user input box and adds it into your `topics` array. 

$("#add-name").on("click",function(){
  event.preventDefault();
  var newName = $("#name-input").val().trim();
  if(!topics.includes(newName)){
   topics.push(newName);
   $('#name-input').val('');
   //console.log(topics)

   //Then make a function call that takes each topic in the array remakes the buttons on the page.
  $("#buttons-view").empty();
 for (let i=0;i<topics.length;i++){
 var nameButton = $("<button>")
 nameButton.attr("id",topics[i]);
 nameButton.text(topics[i]);
 $("#buttons-view").append(nameButton);
 }
 $("button").on("click", clickButton)
  };

});
