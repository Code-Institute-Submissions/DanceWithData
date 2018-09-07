// Get the hash of the url

const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function(initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';



// Set token
let _token = hash.access_token;


const authEndpoint = 'https://accounts.spotify.com/authorize';

// my details attained when registering app
const clientId = '53a7dc6ddb8b49f1a134b9695e65a644';
const redirectUri = 'https://dance-with-data-milestone-project-jstokes1994.c9users.io/index.html';
const scopes = [
    'user-top-read'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}

// Make a call using the token
$.ajax({
    url: "https://api.spotify.com/v1/me/top/artists",
    type: "GET",
    beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
    success: function(data) {
        // console.log(data);
        // Do something with the returned data
        data.items.map(function(artist) {
            let item = $('<li class="top-list">' + artist.name + '</li>');
            item.appendTo($('#top-artists'));
        });
    }
});

// search bar feature
$("#find-track").click(function(e) {
    let trackList = document.getElementById('track-list');
    trackList.innerHTML = "";
    let song_name = document.getElementById("song_name").value;
    $.ajax({
        url: `https://api.spotify.com/v1/search?q=${song_name}&type=track&market=gb&limit=25&offset=0`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            // console.log(data);  TEST
            data.tracks.items.map(function(track, artists, album) {
                let item = $('<li class="top-list">' + track.name + " - " + track.artists[0].name + " - " + track.album.name + '</li>');
                item.appendTo($('#track-list'));
            });
        }
    });
});

// First, clean let container = $('#my-container'); container.innerHTML = $('<div>'); // later let banana = $('<div>'); for <do_something> { banana.append($('<li>')); } container.innerhHTML = banana;


/*data.items.map(function(track) {
                let item = $('<li>' + track.name + '</li>');
                item.appendTo($('#track-list'));
            });*/
