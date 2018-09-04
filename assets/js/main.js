function getData() {

    var xhr = new XMLHttpRequest();

    var song_name = document.getElementById("song_name").value;
    xhr.open("GET", `https://api.spotify.com/v1/search?query=${song_name}&type=track&market=GB&offset=0&limit=30`); //Captures the user's search string 
    xhr.setRequestHeader("Authorization", "Bearer BQCBIeWp3-v-jVDynfVbDdaCVUctprRzbeb4p9dzkl9qBzYicNqzmtwztwrt_EemmxCy1Nx6BGOgXKKIxkaK8dGsBaWH-mbdc6MgR-SN21S7f3Uozo84kza7QzMIEuWPZQIhXbCwNvVLQKMK"); //oAuth token provided by Spotify Developers after registering app
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
}

