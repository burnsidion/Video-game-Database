$('document').ready(function() {
  //console.log("JS is connected!");
  $("#destroy").on("click", function() {
    $("#results").empty();
  })
  $("#search-button").on("click", function() {
    var query = $("#search-input").val();
    var url = `https://www.giantbomb.com/?apikey=38cff389d031a893f76688dcf11e5024bdf0f523`;



    $.ajax({
      url: "http://api.giantbomb.com/search",
      dataType: "jsonp",
      jsonp: "json_callback",
      data: {
        api_key: '38cff389d031a893f76688dcf11e5024bdf0f523',
        limit: 15,
        query: `"${query}"`,
        format: "jsonp",
        field_list: "name,image,original_release_date,description,expected_release_year,platforms",
        resources: "game,platform",
        results: 15
      },
      success: function(results) {
        console.log(results);
        console.log('RESULTS: ', results.results);
        for (var i = 0; i < results.results.length; i++) {
          let name = results.results[i].name;
          //console.log(game);
          let image = results.results[i].image.small_url;

          let expecRel = results.results[i].expected_release_year
          //console.log(expecRel);
          let releaseDate = results.results[i].original_release_date
          console.log(releaseDate);

          let platforms = results.results[i].platforms[0].name
          console.log(platforms);

          if (releaseDate === null) {
            releaseDate = "TBA"
          }

          releaseDate = releaseDate.replace('00:00:00', '')

          //var platforms = results.results[i].api_detail_url[];
          //console.log(platforms);
          let game = `<div class="game"> <h3> ${name} </h3> <h2> Released: ${releaseDate} </h2> <h3> ${platforms} </h3> <img class="image" src= ${image}>  </div>`
          //var icon_url= results.icon_url;
          //var platform= results.results[i].platform;
          $('#results').append(game);
        }
      }

    });
  })
});
