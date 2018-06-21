$(document).ready(function() {
 

var AllGiphy= ['awesome', 'sad', 'angry', "mad", 'crazy', 'tired', 'love'];

function findButtons(){
    $('#view').empty(); 
    for (var i = 0; i < AllGiphy.length; i++){ 
        
        var a = $('<button>') 
        a.addClass('typeEmotion'); 
        a.attr('data-name', AllGiphy[i]);
        a.text(AllGiphy[i]); 
        $('#view').append(a); 
    }


    $('button').on('click', function () {
            $('#gif').empty(); 
            var emotion = $(this).data('name'); 
            var queryURL = "https://api.giphy.com/v1/gifs/search?" + emotion + "api_key=tU1whokDrlsIcxakAnomMfQx1gC41tie&q=&limit=25"; 

            $.ajax({
                url: queryURL,
                method: 'GET'
                })
                .done(function(response) {
                    console.log(response) 
                    var results = response.data;

                    for (var i = 0; i < results.length; i++) {
                        var GifDiv = $('<div>')
                        GifDiv.addClass('imagestyle');
                        var p = $('<p>').text("Rating: " + results[i].rating);

                        var GIfImage = $('<img>');

                        GIfImage.attr('data-animate', results[i].images.fixed_height.url);
                        GIfImage.attr('data-still', results[i].images.fixed_height_still.url);
                        GIfImage.attr('src', results[i].images.fixed_height_still.url);
                        GIfImage.attr('data-state', "still");

                        GifDiv.append(p);
                        GifDiv.append(GIfImage);
                        GifImage.addClass("TheImage")
                        $('#gif').prepend(GifDiv);
                    };


                     
                    $(".TheImage").on('click', function(){
                        console.log("works");
                        var state = $(this).attr('data-state');
                        if (state == 'still') {
                        
                            $(this).attr('data-state',"animate" );
                        
                            $(this).attr('src', $(this).data('animate'));
                        }
                        else{
                        
                                $(this).attr('src', $(this).data('still'));
                        
                                $(this).attr('data-state','still' );
                        }
                    });
                });
    });
};
findButtons();


$('#addgif').on('click', function(){
    var gifText = $('#input').val().trim();
    AllGiphy.push(gifText);
    findButtons();
    return false;
});

 });
