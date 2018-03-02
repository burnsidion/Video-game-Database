$('document').ready(function(){
   //console.log("JS is connected!");
   $("#destroy").on("click", function(){
     $("#results").empty();
   })
   $("#search-button").on("click", function(){
     var query = $("#search-input").val();
     var url = `https://www.giantbomb.com/?apikey=38cff389d031a893f76688dcf11e5024bdf0f523`;



     $.ajax({
         url:"http://api.giantbomb.com/search",
         dataType: "jsonp",
         jsonp: "json_callback",
         data: {
           api_key: '38cff389d031a893f76688dcf11e5024bdf0f523',
           limit: 15,
           query: `"${query}"`,
           format: "jsonp",
           field_list: "name,platforms,image",
           resources: "game,franchise,platforms",
           results: 15,
         },
         success:function(results) {
           //console.log(results);
           //console.log('RESULTS: ', results.results);
           for(var i=0; i< results.results.length; i++){
             var name = results.results[i].name;
             //console.log(game);
             var image = results.results[i].image.small_url;
             //console.log(image);
             // var platforms = results.results[i].api_detail_url[];
             // console.log(platforms);
             var game = '<div class="game"> <h3>' + name + '</h3> <img class="image" src=' + image + '> </div>'
             //var icon_url= results.icon_url;
             //var platform= results.results[i].platform;
             $('#results').append(game);
           }


      }

     });
   })
 });
