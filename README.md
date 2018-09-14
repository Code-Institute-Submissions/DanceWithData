## DanceWithData

This project utilises the Spotify API produced by Spotify developers. I was
interested by the way in which Spotify use machine-learning to analyse tracks
and produce data on each song such as 'danceability' and 'valence'. The data
produced on each track is what is used for the application to suggest new songs
based on a users' library or create playlists such as 'Feel Good Friday' - a 
playlist containing songs that have a minimum valence.

A user is able to search for a song and find out different features about the 
song as well as information about the artist and the album.

## UX

I wanted this project to appeal to music fans. I wanted anyone interested in 
music to be able to easily search for their song and find out some interesting
insights into them.

To achieve this I wanted the design to be minimalist and obvious in its
functionality. A single page application presented a search box with a button
reading 'search song'. I felt this provided ample information to a user.

The color scheme is similar to Spotify, to give familiarity to a user and 
subconciously credit Spotify for the data provided.

I knew that some of the song features were difficult to understand such as 
'energy' and 'speechiness'. For this reason I added a tooltip so that when the
feature is hovered an explanation is given.

My work was based on a wireframe I had created that can be found in the
wireframes directory.

## Features

The application at the moment is single-purpose. It is purely capable of 
searching for a track and then populating the page with information on that
track.

Future features I would look to implement would be using the song data to 
suggest similar songs to a user. Also using the API to provide a 30 second
sample of the song.

## Technologies used

* [HTML](https://html.com/) - Used to provide basic page structure
* [jQuery](https://jquery.com/) - Used to provide easier DOM manipulation.
* [JavaScript](https://www.javascript.com/) - Used to allow client-sided
interaction with the web-page
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Used for styling of
the web-page elements
* [BootStrap](https://getbootstrap.com/) - Supported the structural 
representation of the application
* [GoogleFonts](https://fonts.google.com/) - Provided the two fonts used on 
the web-page

## Testing

During the development process I tested that the data requested from Spotify
was being received using console.log - which can be seen in various places in
the main.js file.

I had issues with authorization in using the API which really slowed down 
development in the beginning. I originally planned to implement the 
authorization code flow where a user would grant permission only once. This 
caused issues as the request needed to be made server-side to be secure and
my experience limited my ability to do this. I settled for implicit grant flow
which means a user needs to log-in to a Spotify account when loading the 
application. As the application is purely client-side, it is entirely suitable
for the purpose.

I had an error when clicking a song from the rendered table. If the first song
on the list was clicked I would get 100 duplications in each containerfor the
requested song. If the second some was clicked there would be 98, this pattern
continued through the search results table until the last result where one
result was printed - providing the desired functionality. It appeared to be an
issue with the jQuery map() function and how the code was structured. I
originally had the code structured to invoke a 'findId()' function that based
on the selected row, it would find the ID of the song from the hidden part of
the table. By directly using the JSON data eg: track.id and passing this to
the trackInfo() function, removed the duplications.

I also had issues accessing certain data. When trying to console.log the data
after using map() I was getting undefined or [object][object] returned. 
Downloading and using Postman to see exactly how the JSON data was structured
allowed me to implement the correct syntax to 'unpack' the data properly.

## Credits

* Authorization - https://glitch.com/edit/#!/spotify-implicit-grant?path=script.js:13:0
Came across this which spelled out how the implicit grant flow should be 
structured. Provided me with an understanding of how authorization works with
APIs.
* https://developer.spotify.com/community/showcase/musical-data/ - This was
the inspiration for my app. Wanted to base mine on this and provide similar
functionality.
