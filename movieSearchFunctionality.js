// INITIAL SEARCH
request("school", "search");
request("tt0302886", "id");

// SELECT LIST ELEMENT TO DISPLAY
$("#results").on("click", "li", function(e) { 
             
    request($(this).attr("id"), "id"); 

});

// INPUT SEARCH FUNCTION
$( "#searchBtn" ).click(function() {

    request($( "#title" ).val(), "search");
    $( "#title" ).val("");

});

// API's REQUEST FUNCTION
function request(string, kind){

    if(kind == "search"){
        $.post("http://www.omdbapi.com/?s=" + string, function(data) {
            displaySearchResults(eval("(" + data + ")").Search);
        });
    } else if (kind == "id"){
        $.post("http://www.omdbapi.com/?i=" + string, function(data) {
            displayMovie(eval("(" + data + ")"));
            console.log(data);
        });
    }

}

// FUNCTION TO DISPLAY SEARCH RESULT
function displaySearchResults(searchResults){

    $("ul").empty();
    for (var i = 0; i < searchResults.length; i++) {
        $("#results").append(
            ($("<li>").append(searchResults[i].Title)).attr(
                "id", searchResults[i].imdbID));
    }

}

// FUNCTION TO DISPLAY MOVIE INFO
function displayMovie(searchResult){

    $( "#movieTitle" ).text("");
    $( "#movieTitle" ).append( searchResult.Title + " ( " + searchResult.Year + " )" );
    $( "#duration" ).text("");
    $( "#duration" ).append( searchResult.Runtime + " - " + searchResult.Genre  );
    $( "#imdbScore" ).text("");
    $( "#imdbScore" ).append(  searchResult.imdbRating  );
    $( "#metaScore" ).text("");
    $( "#metaScore" ).append(  searchResult.Metascore  );
    $( "#plot" ).text("");
    $( "#plot" ).append(searchResult.Plot );
    $( "#director" ).text("");
    $( "#director" ).append(":" + searchResult.Director );
    $( "#actors" ).text("");
    $( "#actors" ).append("Actors:" + searchResult.Actors );
    $( "#movieImg" ).attr("src", (
        (searchResult.Poster != "N/A")? searchResult.Poster: "missing.png"));

}
