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



// search bar feature

function searchSong(name) {
    $("#find-track").click(function(e) {
        let searchResults = document.getElementById('search-results-body');
        searchResults.innerHTML = "";
        let song_name = document.getElementById("song_name").value;
        $.ajax({
            url: `https://api.spotify.com/v1/search?q=${song_name}&type=track&market=gb&limit=50&offset=0`,
            type: "GET",
            beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
            success: function(data) {
                // console.log(data);  TEST
                //Need to add feedback to user if there is no results found
                data.tracks.items.map(function(track, artists, album) {
                    let item = $('<tr>' + '<td>' + track.name + '</td>' + '<td>' + track.artists[0].name + "</td>" + '<td>' + track.album.name + '</td>' +
                        '<td id="hidden" class="hidden-track">' + track.id + '</td>' + '<td id="hidden" class="hidden-artist">' + track.artists[0].id + '</td>' +
                        '<td id="hidden" class="hidden-album">' + track.album.id + '</td>' + '</tr>');
                    item.appendTo($('#search-results-body'));

                    findSongId();
                    
                });
            }
        });
    });
}


// when a row is clicked, the track id of that row is stored as a variable and passed to the functions for each container
// also the containers holding track info is emptied on row click.
function findSongId() {
    $("tr").click(function() {
        let trackListInfo = document.getElementById("track-list");
        trackListInfo.innerHTML = "";
        let albumInfo = document.getElementById("album-info");
        albumInfo.innerHTML = "";
        var $songId = $(this).find(".hidden-track").text();
        //console.log($songId); //Test
        var $artistId = $(this).find(".hidden-artist").text(); 
        //console.log($artistId);
        trackInfo($songId);
        artistInfo($artistId);
        
        
    });
}


function trackInfo(id) {
    //console.log(id);
    let songIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/tracks/${songIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item = $('<ul class="list-style section-text">' + '<li>' + "Track Name: " + data.name + '</li>' + '<li>' + "Length: " + data.duration_ms + '</li>' + '<li>' +
                "Popularity: " + data.popularity + '</li>' + '<li>' + "Explicit: " + data.explicit + '</li>' + '</ul>');
            item.appendTo($('#track-list'));
        }
    });
}


function artistInfo(id){
    let artistIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/artists/${artistIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item = $('<ul class="list-style section-text">' + '<li>' + "Artist Name: " + data.name + '</li>' + '<li>' + "Followers: " + data.followers.total +
            '</li>' + '<li>' + "Genres: " + data.genres + '</li>' + '<li>' + "Popularity: " + data.popularity + '</li>' + '</ul>');
            item.appendTo($('#album-info'));
        }
    });
    
}

function albumInfo(){
    
}

function trackData(){
    
}


/* example of how to call using token and use data

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

*/
