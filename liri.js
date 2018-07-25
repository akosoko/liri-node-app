require('dotenv').config();

var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];

var value = "";

for (var x = 3; x < process.argv.length; x++) {
    value += process.argv[x] 
    if(x != process.argv.length) {
        value = value + "+"
    }
}

switch (command) {
    case 'my-tweets':
        getTweets();
        break;
    case 'spotify-this-song':
        spotifySong(value);
        break;
    case 'movie-this':
        OMDB(value);
        break;
    case 'do-what-it-says':
        whatItSays();
        break;
    default:
        console.log('You entered an unknown command');
        break;
}

function getTweets() {
	client.get('statuses/user_timeline', {
		status: "I am a tweet"
	}, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log("")
				fs.appendFile('log.txt', "my-tweets: " + tweets[i].text + "\n", function(err) {
					if (err) throw err;
				});
			}
		}
	});
}

function spotifySong(song) {
	song = song || 'The Sign by Ace of Base';
	spotify.search({
		type: 'track',
		query: song,
		limit: 1
	}, function(error, data) {
		if (error) {
			return console.log('Error Occurred: ' + error);
		}
        console.log('Song’s Name: ' + data.tracks.items[0].name);
        console.log("")
        console.log('Artist(s): ' + data.tracks.items[0].artists[0].name);
        console.log("")
        console.log('Spotify Link Preview: ' + data.tracks.items[0].preview_url);
        console.log("")
		console.log('Song’s Name: ' + data.tracks.items[0].album.name);
	});
}

function OMDB(movie) {
	movie = movie || 'Mr. Nobody';
	request('http://www.omdbapi.com/?t=' + value + '&y=&plot=short&apikey=trilogy', function(error, response, body) {
		if (!error && response.statusCode === 200) {
            console.log('Movie: ' + JSON.parse(body).Title);
            console.log("")
            console.log('Year: ' + JSON.parse(body).Year);
            console.log("")
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log("")
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[0].Value);
            console.log("")
            console.log('Country: ' + JSON.parse(body).Country);
            console.log("")
            console.log('Language: ' + JSON.parse(body).Language);
            console.log("")
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log("")
			console.log('Actors: ' + JSON.parse(body).Actors);
		}
	});
}

function whatItSays() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log("Error:" + error);
		}
		liri((data.split(",")[0]), (data.split(",")[1]));
	});
}

