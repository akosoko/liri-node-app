require("dotenv").config();

var action = process.argv[2];
// var value = process.argv[3]; (THIS ONLY TAKES IN ONE NODE ARGUMENT FOR THE 3RD NODE SO ADDED CODE BELOW)

// STORE ALL OF THE ARGUMENTS IN AN ARRAY
var nodeArgs = process.argv;

// CREATE AN EMPTY VARIABLE FOR HOLDING USERS INPUT VALUE
var value = "";

// LOOPS THROUGH ALL THE WORDS IN THE NODE ARGUMENT 
// DO A LOOP TO GET EVERYTHING AFTER THE INDEX OF 2 NODE ARGUMENT
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        value = value + "+" + nodeArgs[i];

    } else {

        value = value + nodeArgs[i];
    }
}

// SWITCH STATEMENT FOR RUNNING DIFFERENT APPS 
// THIS WILL DIRECT WHICH FUNCTION TO RUN
switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotify();
        break;

    case 'movie-this':
        imdb();
        break;
}



//TWITTER

function twitter() {
    var fs = require('fs');
    var twitterKey = require('./keys.js');
    var Twitter = require('twitter');
    var client = new Twitter(twitterKey.twitterKeys);

    var params = { screen_name: value, count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            console.log("tweets:");

            for (var i = 0; i < tweets.length; i++) {

                console.log("_____________________________________________");
                console.log("Tweeted on: " + tweets[i].created_at);
                console.log(tweets[i].text);

            }
        }
    });
}





//SPOTIFY

function spotify() {

    if (value != false) {
        var spotify = require('node-spotify-api');

        spotify.search({
            type: 'track',
            query: value + '&limit=1&'
        }, function(error, data) {
            if (error) {
                console.log('Error occurred: ' + error);
                return;
            }
            console.log("song " + value + ".");
            console.log("track: " + data.tracks.items[0].name);
            console.log("artist: " + data.tracks.items[0].artists[0].name);
            console.log("url: " + data.tracks.items[0].preview_url);
        });
    } else {
        {
            var spotify = require('spotify');

            spotify.search({
                type: 'track',
                query: 'ace+of+base+sign' + '&limit=1&'
            }, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                
                console.log("track: " + data.tracks.items[0].name);
                console.log("artist: " + data.tracks.items[0].artists[0].name);
                console.log("url: " + data.tracks.items[0].preview_url);
            });
        }

    }
}





//IMDB

function imdb() {

    // INCLUDE THE REQUEST NPM PACKAGE (DONT FORGET TO RUN "NPM INSTALL REQUEST" IN THIS FOLDER FIRST!) 
    var request = require('request');

    // RUN A REQUEST TO THE OMDB API WITH THE MOVIE SPECIFIED (CAN BE MULTI WORD MOVIES)
    request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

        // IF THE REQUEST IS SUCCESFUL (i.e. IF THE RESPONSE STATUS CODE IS 200)
        //if (!error && response.statusCode == 200) {
        if (value != false) {

            // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
            console.log("======================================================================");
            console.log("The movie's name is: " + JSON.parse(body).Title);
            console.log("");
            console.log("The movie was released in: " + JSON.parse(body).Year);
            console.log("");
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            console.log("");
            console.log("This movie was produced in the: " + JSON.parse(body).Country);
            console.log("");
            console.log("The language for this movie is in: " + JSON.parse(body).Language);
            console.log("");
            console.log("The movie's Plot: " + JSON.parse(body).Plot);
            console.log("");
            console.log("The movie's Actor's: " + JSON.parse(body).Actors);
            console.log("");
            console.log("");
            console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
            console.log("");
            console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
            console.log("");
        } else {

            //IF THERE IS MOVIE NETERED BY THE USER IT WILL DEFAULT TO THE MOVIE PRELAODED HERE MR. NOBODY.     
            var request = require('request');

            // RUN A REQUEST TO THE OMDB API WITH THE MOVIE SPECIFIED (CAN BE MULTI WORD MOVIES)
            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {

                // PARSE THE BODY OF THE SITE WITH THE FOLLWING INFORMATION 
                console.log("======================================================================");
                console.log("The movie's name is: " + JSON.parse(body).Title);
                console.log("");
                console.log("The movie was released in: " + JSON.parse(body).Year);
                console.log("");
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
                console.log("");
                console.log("This movie was produced in the: " + JSON.parse(body).Country);
                console.log("");
                console.log("The language for this movie is in: " + JSON.parse(body).Language);
                console.log("");
                console.log("The movie's Plot: " + JSON.parse(body).Plot);
                console.log("");
                console.log("The movie's Actor's: " + JSON.parse(body).Actors);
                console.log("");
                console.log("The Rotten Tomato rating is: " + JSON.parse(body).tomatoRating);
                console.log("");
                console.log("The Rotten Tomato URL is: " + JSON.parse(body).tomatoURL);
                console.log("");
            });
        }
    });
}
