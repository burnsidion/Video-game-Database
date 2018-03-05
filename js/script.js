$('document').ready(function() {
  console.log("JS is connected!");

  $("#search-button").on("click", function() {
    $("#results").empty();
  })
  $("#search-button").on("click", function() {
    var query = $("#search-input").val();
    var url = `https://www.giantbomb.com/api/games/?api_key=38cff389d031a893f76688dcf11e5024bdf0f523&sort=original_release_date:asc`;

    if (query === '') {
      alert("Please enter a game to search for ya DINGUS!!")

    } else {

      $.ajax({
        url: "http://api.giantbomb.com/search",
        dataType: "jsonp",
        jsonp: "json_callback",
        data: {
          api_key: '38cff389d031a893f76688dcf11e5024bdf0f523',
          limit: 100,
          query: `"${query}"`,
          format: "jsonp",
          field_list: "name,image,original_release_date,description,expected_release_year,platforms",
          resources: "game,platform",
          results: 100
        },

        success: function(results) {
          //console.log(results);
          console.log('RESULTS: ', results.results);
          for (var i = 0; i < results.results.length; i++) {
            let name = results.results[i].name;
            let image = results.results[i].image.small_url;
            let expecRel = results.results[i].expected_release_year;
            let releaseDate = results.results[i].original_release_date;
            let platformList = results.results[i].platforms;
            let description = results.results[i].description;
            //console.log(i, description);

            let platformsArr = []

            if(platformList === null){
              platformsArr = "UH-OH! No Platforms could be found!!!"
            } else {
               platformsArr = platformList.map(function(platform) {

                return platform.name
              })
            }

            // console.log(i, platformList, platformsArr);

            if (releaseDate === null) {
              releaseDate = "TBA"
            }

            releaseDate = releaseDate.replace('00:00:00', '')

            //var platforms = results.results[i].api_detail_url[];
            //console.log(platforms);
            let game = `<div class="game">
            <h2> ${name} </h2>
            <p> Released: ${releaseDate} </p>
            <p> Platforms: ${platformsArr} </p>
            <img class="image" src= ${image}>
            </div>`

            $('#results').append(game);
          }
        }

      });
    }
  })
});
