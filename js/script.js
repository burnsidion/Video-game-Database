$('document').ready(function() {
  console.log("JS is connected!")
  updateSidebar()

  $("#spinner").hide()

  $(".favesmenu-icon").on("click", function() {
    $("#faves").addClass("faves-show")
  })

  $(".exit").on("click", function() {
    $("#faves").removeClass("faves-show")
  })

  $("#results").on("click", function(ev) {
    let target = $(ev.target)
    if(target.hasClass("add-fave-btn")) {
      let game = target.closest(".game")[0]
      let id = $(game).data('id')
      let title = $(game).find(".game-title").text().trim()
      setFavorite(id, title)
      updateSidebar()
    }
  })

  function setFavorite(myId, myTitle) {
    let favorites = JSON.parse(localStorage.getItem("favorites") || '[]')
    // push on a new object representing a game, into the array
    favorites.push({
      id: myId,
      title: myTitle
    })

    // save to localstorage
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }

  function updateSidebar() {
    favorites = JSON.parse(localStorage.getItem("favorites") || '[]')

    // clear out sidebar list element
    $('#faves-list').empty()

    for (var i = 0; i < favorites.length; i++) {
      $('#faves-list').append(`<li>
        <span class="list-of-favorites"> ${favorites[i].title} </span>
        <i class="fas fa-trash-alt fave-remove" data-gameid="${favorites[i].id}"></i>
      </li>`);
    }
  }

  // Handle unfavorite-ing
  $("#faves-list").on("click", function(event) {
    // test event.target
    console.log('target', event.target)
    let gameid = $(event.target).data('gameid')
    console.log('gameid', gameid)

    // remove from the DOM list
    let gameEle = $(event.target).parent()
    gameEle.remove()

    //remove from local storage
    let favesArr = JSON.parse(localStorage.getItem("favorites") || '[]')
    for (let i = 0; i < favesArr.length; i++) {
      if (favesArr[i].id === gameid) {
        favesArr.splice(i, 1)
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favesArr))
  })

  $("#search-form").on("submit", searchHandler)

  function searchHandler(e) {

    // clear out results list
    $("#results").empty()
    $("#descrip-list").empty()

    // indicate something is loading
    $("#spinner").show()

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
        field_list: "name,image,original_release_date,deck,expected_release_year,platforms,id",
        resources: "game,platform",
        results: 100
      },

      success: function(results) {
        console.log("Results: ", results.results);

        $("#spinner").hide()

        for (var i = 0; i < results.results.length; i++) {
          let name = results.results[i].name;
          let image = results.results[i].image.medium_url;
          let releaseDate = results.results[i].original_release_date;
          let platformList = results.results[i].platforms;
          let description = results.results[i].deck
          let gameID = results.results[i].id
          // console.log(gameID);

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

          let game = `<div class="game col-sm-4" data-id="${gameID}">
            <h4><a class="game-title" href="#modal${i}" data-target="#modal${i}" data-toggle="modal">${name}</a></h4>
            <p class="release-date">Released: ${releaseDate}</p>
            <p class="platform-list">Platforms: ${platformsArr}</p>
            <img class="image" src="${image}" />
            <button class="btn btn-secondary add-fave-btn">Favorite</button>
          </div>`

          //MAKE EACH TITLE A CLICKABLE LINK TO THE DESCRIPTION

          let gameDescrip = `
          <div class="modal fade" id="modal${i}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
          </div>
          `

          $('#results').append(game);
          $('#descrip-list').append(gameDescrip);
        }
      }

    }) // end ajax
  } // end search handler

}) // end document ready
