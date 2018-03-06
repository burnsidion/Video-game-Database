$('document').ready(function() {
  console.log("JS is connected!");

  $("#search-button").on("click", function() {
    $("#results").empty();
  })

  $("#search-form").on("submit", searchHandler);

  function searchHandler(e) {
    e.preventDefault();
    var query = $("#search-input").val();
    var url = `https://www.giantbomb.com/api/games/?api_key=38cff389d031a893f76688dcf11e5024bdf0f523`;

    $.ajax({
      url: "http://api.giantbomb.com/search",
      dataType: "jsonp",
      jsonp: "json_callback",
      data: {
        api_key: '38cff389d031a893f76688dcf11e5024bdf0f523',
        limit: 100,
        query: `"${query}"`,
        format: "jsonp",
        field_list: "name,image,original_release_date,deck,expected_release_year,platforms",
        resources: "game,platform",
        results: 100
      },

      success: function(results) {
        console.log("Results: ", results.results);

        for (var i = 0; i < results.results.length; i++) {
          let name = results.results[i].name;
          let image = results.results[i].image.small_url;
          let releaseDate = results.results[i].original_release_date;
          let platformList = results.results[i].platforms;
          let description = results.results[i].deck
          //console.log(description);

          // let platformsArr = []
          //
          // if(platformList === null){
          //   platformsArr = "UH-OH! No Platforms could be found!!!"
          // } else {
          //    platformsArr = platformList.map(function(platform) {
          //
          //     return platform.name
          //   })
          // }

          const platformsArr = (platformList === null) ?
            `Uh OH! No platforms could be found!!` :
            platformList.map(p => p.name);

          if (releaseDate === null) {
            releaseDate = "TBA"
          }

          releaseDate = releaseDate.replace('00:00:00', '')

          //MAKE EACH TITLE A CLICKABLE LINK TO THE DESCRIPTION

          let game = `<div class="game col-sm-4">
          <h3> ${name} </h3>
          <p> Released: ${releaseDate} </p>
          <p> Platforms: ${platformsArr} </p>
          <img class="image" src= ${image}>
          </div>`

          //
          //   <div class="image"></div>
          // $(myDiv).css('background-image', 'url("${image}")')



          $('#results').append(game);
        }
      }

    });

  }
});
