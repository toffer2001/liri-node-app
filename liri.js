// my-tweets
// spotify-this-song
// movie-this
// do-what-it-says

var keys = require("./keys.js") 
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");


var nodeArgs = process.argv;
var argument = "";

var command = process.argv[2];
// console.log(process.argv);


// console.log("Argument: " + argument);





if (command == "my-tweets") {

    
    
    var twitterKeys = new twitter ({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret,
    });

    var params = {
        screen_name: 'realdonaldtrump'
    };

    twitterKeys.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("Here are your tweets:");
            for (var i = 0; i < 20; i++) {
                console.log(i+1 + ") " + tweets[i].created_at + ": " + tweets[i].text);
            

                fs.appendFile("log.txt","\n\n" + i + ") " + tweets[i].created_at + ": " + tweets[i].text, function (err) {


                    if (err) {
                        return console.log(err);
                    }

                    // console.log("log.txt was updated!");

                });
                
            }
            
        }
    });
}

else if (command == "spotify-this-song") {

spotifyProgram();
    
    // if (process.argv[3] === undefined) {
    //     userSong = "The Sign Ace of Base";
    // } else {
    //     for (var i = 3; i < nodeArgs.length; i++) {

    //         // Build a string with the address.
    //         argument = argument + " " + nodeArgs[i];
    //     }
    //     userSong = argument;
    // }
    // console.log("User Song: " + userSong);


    // var spotify = new spotify({
    //     id: keys.spotifyKeys.id,
    //     secret: keys.spotifyKeys.secret
    // });

    // // Artist(s)
    // // The song's name
    // // A preview link of the song from Spotify
    // // The album that the song is from

    // spotify
    //     .search({ type: 'track', query: userSong, limit: 1 })
    //     .then(function (response) {
    //         // console.log(response.tracks.items[0]);
    //         console.log("Preview Song: " + response.tracks.items[0].album.external_urls.spotify);
    //         console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
    //         console.log("Album: " + response.tracks.items[0].album.name);
    //         console.log("Song Name: " + response.tracks.items[0].name);

    //         fs.appendFile("log.txt",
    //             "\n\nSong Name: " + response.tracks.items[0].name +
    //             "\nPreview Song: " + response.tracks.items[0].album.external_urls.spotify +
    //             "\nArtist(s): " + response.tracks.items[0].artists[0].name, function (err) {


    //                 if (err) {
    //                     return console.log(err);
    //                 }

    //                 // console.log("log.txt was updated!");

    //             });

    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     });

   

    

}


else if (command == "movie-this") {

    if (process.argv[3] === undefined) {
        userMovie = "Mr. Nobody";
    } else {
        for (var i = 3; i < nodeArgs.length; i++) {

            // Build a string with the address.
            argument = argument + " " + nodeArgs[i];
        }
        userMovie = argument;
    }
    console.log("User Search: " + userMovie);



    var apiKey = "40e9cece";

    
    request("https://www.omdbapi.com/?t=" + userMovie + "&y=&plot=short&apikey=" + apiKey, function (error, response, body) {


        if (!error && response.statusCode === 200) {
            // console.log("Movie data: " + JSON.parse(body));
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Movie Year: " + JSON.parse(body).Year);
            console.log("Movie Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language(s): " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            fs.appendFile("log.txt", "\n\nMovie Title: " + JSON.parse(body).Title +
                "\nMovie Year: " + JSON.parse(body).Year +
                "\nMovie Rating: " + JSON.parse(body).imdbRating +
                "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                "\nCountry: " + JSON.parse(body).Country +
                "\nLanguage(s): " + JSON.parse(body).Language +
                "\nPlot: " + JSON.parse(body).Plot +
                "\nActors: " + JSON.parse(body).Actors, function (err) {


                if (err) {
                    return console.log(err);
                }

                // console.log("log.txt was updated!");

            });
        }
    });


}

else if (command == "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");


        // We will then re-display the content as an array for later use.
        console.log("Data Array: " + dataArr);
        if (dataArr[0] === "spotify-this-song") {
            

            spotifyProgram(dataArr[1]);
        }

    });
}


function spotifyProgram (userSong) {
    if(userSong != undefined){
        userSong = userSong;
    }
     else if (process.argv[3] === undefined ) {
        userSong = "The Sign Ace of Base";
    } else {
        for (var i = 3; i < nodeArgs.length; i++) {

            // Build a string with the address.
            argument = argument + " " + nodeArgs[i];
        }
        userSong = argument;
    }
    console.log("User Song: " + userSong);


    var spotify = new Spotify({
        id: keys.spotifyKeys.id,
        secret: keys.spotifyKeys.secret
    });

    // Artist(s)
    // The song's name
    // A preview link of the song from Spotify
    // The album that the song is from

    spotify
        .search({ type: 'track', query: userSong, limit: 1 })
        .then(function (response) {
            // console.log(response.tracks.items[0]);
            console.log("Preview Song: " + response.tracks.items[0].album.external_urls.spotify);
            console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
            console.log("Album: " + response.tracks.items[0].album.name);
            console.log("Song Name: " + response.tracks.items[0].name);

            fs.appendFile("log.txt",
                "\n\nSong Name: " + response.tracks.items[0].name +
                "\nPreview Song: " + response.tracks.items[0].album.external_urls.spotify +
                "\nArtist(s): " + response.tracks.items[0].artists[0].name, function (err) {


                    if (err) {
                        return console.log(err);
                    }

                    // console.log("log.txt was updated!");

                });

        })
        .catch(function (err) {
            console.log(err);
        });





}
