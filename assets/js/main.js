// Implicit Grant Flow
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

// My details attained when registering app
const clientId = '53a7dc6ddb8b49f1a134b9695e65a644';
const redirectUri = 'https://dance-with-data-milestone-project-jstokes1994.c9users.io/index.html';
const scopes = [
    'user-top-read'
];

// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
}


// Search bar feature
// Function is called on button click

function searchSong() {
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

                // Append the returned data to a scrolling table for user selection
                // As returned JSON is an array need .map()
                data.tracks.items.map(function(track, artists, album) {
                    let item = $('<tr> <td>' + track.name + '</td> <td>' + track.artists[0].name + '</td> <td>' + track.album.name +
                        '</td> <td class="hidden-track">' + track.id + '</td> <td class="hidden-artist">' + track.artists[0].id + '</td> <td class="hidden-album">' + track.album.id + '</td> </tr>');
                    item.appendTo($('#search-results-body'));

                    $("tr").click(function() {
                        // Empty containers on click
                        // Track Info
                        let trackListInfo = document.getElementById("track-list");
                        trackListInfo.innerHTML = "";
                        // Artist info
                        let artistListInfo = document.getElementById("artist-info");
                        artistListInfo.innerHTML = "";
                        // Album info
                        let albumListInfo = document.getElementById("album-info");
                        albumListInfo.innerHTML = "";
                        // Track data info
                        let trackDataInfo1 = document.getElementById("track-data-1");
                        trackDataInfo1.innerHTML = "";
                        let trackDataInfo2 = document.getElementById("track-data-2");
                        trackDataInfo2.innerHTML = "";
                        let dataDesc = document.getElementById("data-track-hover");
                        dataDesc.innerHTML = "";

                        // Invoke each function passing in the relevant ids for the GET calls
                        $(this)(trackInfo(track.id), artistInfo(track.artists[0].id), albumInfo(track.album.id), trackData(track.id));
                    });
                });
            }
        });
    });
}

// Collect the track ID for the selected song and insert it in the URL. Append the selected results to the container.
function trackInfo(id) {
    //console.log(id) //TEST;
    let songIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/tracks/${songIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item = $('<ul class="list-style section-text"> <li> <span class="list-heading">Track Name: </span>' + data.name +
                '</li> <li> <span class="list-heading">Length (ms): </span>' + data.duration_ms + '</li> <li>' + '<span class="list-heading">Popularity: </span>' +
                data.popularity + '</li> <li>' + '<span class="list-heading">Explicit: </span>' + data.explicit + '</li> </ul>');
            item.appendTo($('#track-list'));
        }
    });
}

// Collect the artist ID for the selected song and insert it in the URL. Append the selected results to the container.
function artistInfo(id) {
    let artistIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/artists/${artistIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item = $('<ul class="list-style section-text"> <li>' + '<span class="list-heading">Artist Name: </span>' + data.name + '</li> <li>' +
                '<span class="list-heading">Followers: </span>' + data.followers.total + '</li> <li> <span class="list-heading">Genres: </span>' +
                data.genres + '</li> <li>' + '<span class="list-heading">Popularity: </span>' + data.popularity + '</li> </ul>');
            item.appendTo($('#artist-info'));
        }
    });
}

// Collect the album ID for the selected song and insert it in the URL. Append the selected results to the container.
function albumInfo(id) {
    let albumIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/albums/${albumIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item = $('<ul class="list-style section-text"> <li>' + '<span class="list-heading">Album Name:</span> ' + data.name + '</li> <li>' +
                '<span class="list-heading">Release Date:</span> ' + data.release_date + '</li> <li>' + '<span class="list-heading">Total Tracks:</span> ' +
                data.total_tracks + '</li> <li>' + '<span class="list-heading">Popularity:</span> ' + data.popularity + '</li> </ul>');
            item.appendTo($('#album-info'));
        }
    });
}

// Collect the track ID for the selected song and insert it in the URL. Append the selected results to the container.
function trackData(id) {
    let trackIdentifier = id;
    $.ajax({
        url: `https://api.spotify.com/v1/audio-features/${trackIdentifier}`,
        type: "GET",
        beforeSend: function(xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function(data) {
            let item1 = $('<ul class="list-style section-text"> <li title="How acoustic the track is (0.0-1.0)">' + '<span class="list-heading">Acousticness:</span> ' + data.acousticness +
                '</li> <li title="How suitable a track is to dance too based on a combination of elements (0.0-1.0)">' + '<span class="list-heading">Danceability:</span> ' + data.danceability +
                '</li> <li title="A perceptual measure of intensity and activity">' + '<span class="list-heading">Energy:</span> ' + data.energy + '</li> <li title="The key that the track is in">' +
                '<span class="list-heading">Key:</span> ' + data.key + '</li> <li title="Predicts how many vocals a track has (0.0-1.0)">' + '<span class="list-heading">Instrumentalness:</span> ' +
                data.instrumentalness + '</li>' + '</ul>');
            item1.appendTo($('#track-data-1'));
            let item2 = $('<ul class="list-style section-text"> <li title="Detects presence of an audience. Probabability the track was performed live (0.0-1.0)">' + '<span class="list-heading">Liveness:</span> ' +
                data.liveness + '</li> <li title="Overall Loudness of track in dB (-60-0dB)">' + '<span class="list-heading">Loudness:</span> ' + data.loudness +
                '</li> <li title="Detects presence of spoken word on the track (0.0-1.0)">' + '<span class="list-heading">Speechiness:</span> ' + data.speechiness + '</li> <li title="Overall tempo of the track in BPM">' +
                '<span class="list-heading">Tempo:</span> ' + data.tempo + '</li> <li title="Muscial positiveness conveyed from the track (0.0-1.0)">' + '<span class="list-heading">Valence</span> : ' + data.valence +
                '</li> </ul>');
            item2.appendTo($('#track-data-2'));
            let item3 = $('<p class="section-text data-desc">Hover over each feature to find out what they mean</p>');
            item3.appendTo($('#data-track-hover'));

            // Tooltip function using jQuery UI to give details to user about what each feature means
            $(function() {
                $(document).tooltip();
            });

        }
    });
}
