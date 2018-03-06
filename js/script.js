$('document').ready(function() {
  console.log("JS is connected!");

  $("#search-button").on("click", function() {
    $("#results").empty();
    $("#descrip-list").empty();

  })

  $("#results").on("click", ".favorite", function(event) {
    let game = $(event.target).closest(".game")
    let name = $(game).find(".game-title").text()
    setFavorite(name, true)
    updateSidebar()


  })

  function setFavorite(name,value){
    let favorites = JSON.parse(localStorage.getItem("favorites") || '{}')
    console.log(favorites);
    favorites[name] = value

    localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  function updateSidebar(){
  let favorites =  JSON.parse(localStorage.getItem("favorites") || '{}')
  $(game)

  }




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
            `UH-OH! No platforms could be found!!` :
            platformList.map(p => p.name);

          if (releaseDate === null) {
            releaseDate = "TBA"
          }

          releaseDate = releaseDate.replace('00:00:00', '')



          let game = `<div class="game col-sm-4">
          <h3> <a class="game-title" href="#modal${i}" data-target="#modal${i}" data-toggle="modal"> ${name} </a> </h3>
          <p class="release-date"> Released: ${releaseDate} </p>
          <p class = "platform-list"> Platforms: ${platformsArr} </p>
          <img class="image" src= ${image}>
          <button class = "favorite"> Favorite </button>
          </div>`

          //MAKE EACH TITLE A CLICKABLE LINK TO THE DESCRIPTION

          let gameDescrip = `<div class="modal fade" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">${name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p class="game-descrip">${description}</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>`





          $('#results').append(game);
          $('#descrip-list').append(gameDescrip)
        }




      }

    });

  }
});
