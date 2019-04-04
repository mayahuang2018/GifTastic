
// Before you can make any part of our site work, you need to create an array of strings,
//Save it to a variable called `topics`.
const topics = ["Trump","Obama","Simba","Sailor Moon","Marilyn Monroe","Leonardo DiCaprio","Detective Conan","Jackie Chan","Elizabeth II","Totoro","Benedict Cumberbatch","Sailor Mercury","Ziyi Zhang","Doraemon"];

$("#buttons-view").empty();

// Your app should take the topics in this array ...
// and create buttons in your HTML.
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
  }).then(function(response) {
      var results = response.data;

       // Under every gif display its rating (PG, G, so on)...

      for (let j=0;j<results.length;j++){

      var personDiv = $("<div>");
      var rating = results[j].rating;     
      var p = $("<p>").text("Rating: " + rating);

      // non-animated gif images from the GIPHY API ...
       var stillView = results[j].images.fixed_height_still.url;

      // ( When the user clicks one of the still GIPHY images,the gif should animate. )
       var imageView = results[j].images.fixed_height.url;
       var personImage = $("<img>").attr("src", stillView).attr('data-animate', imageView).attr('data-still', stillView);
           
           personImage.attr("data-stored","still");
           personImage.on("click",clickImage)

      // and place them on the page.
     personDiv.prepend(p);
     personDiv.prepend(personImage);
     $("#gif-view").prepend(personDiv);

    }

  });


// When the user clicks one of the still GIPHY images, 
//the gif should animate. If the user clicks the gif again, it should stop playing.
  const clickImage = function () {
    var stored = $(this).attr("data-stored");
  
    if (stored == "still"){
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-stored", "animate");
          } else{
              $(this).attr("src", $(this).data("still"));
              $(this).attr("data-stored", "still");  
          }  
     }
  }

$("button").on("click", clickButton)


// Add a form to your page takes the value from a user input box ,
// and adds it into your `topics` array. 

$("#add-name").on("click",function(){
   
   event.preventDefault();
   var newName = $("#name-input").val().trim();
 
   if(!topics.includes(newName)){
   topics.push(newName);
   $('#name-input').val('');

   //Then make a function call that takes each topic in the array ,
   //remakes the buttons on the page.  
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
