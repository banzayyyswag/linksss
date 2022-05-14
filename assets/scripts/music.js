function play() {
    alert ('🎶')
    if ("mediaSession" in navigator) {
        let audio = document.createElement("audio");
        let _playlist = ["sobaka", "tellem""pesenka"];
        let playlist = [];
        metadata = {
            sobaka: { title: "This Could Build Us a Home", artist: "The Garden", album: "haha" },
            pesenka: { title: "Shom Me How", artist: "Men I Trust", album: "Show Me How" },
        };
        function loadTracks() {
            for (sound in _playlist) {
                playlist.push("/assets/sounds/" + _playlist[sound] + ".mp3");
            }
            return true;
        }
        let index = 0;
        loadTracks();
        console.log(playlist.toString());
        playAudio();
        navigator.mediaSession.metadata = new MediaMetadata({ title: metadata[_playlist[index]].title, artist: metadata[_playlist[index]].artist, album: metadata[_playlist[index]].album });
        navigator.mediaSession.setActionHandler("play", function () {
            audio.play();
            navigator.mediaSession.playbackState = "playing";
        });
        navigator.mediaSession.setActionHandler("pause", function () {
            audio.pause();
            navigator.mediaSession.playbackState = "paused";
        });
        navigator.mediaSession.setActionHandler("previoustrack", function () {
            index = (index - 1 + playlist.length) % playlist.length;
            playAudio();
        });
        navigator.mediaSession.setActionHandler("nexttrack", function () {
            index = (index + 1) % playlist.length;
            playAudio();
        });
        audio.onended = function () {
            console.log("audio ended");
            index = (index + 1) % playlist.length;
            playAudio();
        };
      function playAudio() {         
             audio.src = playlist[index];
             audio.loop = false;
             audio
                 .play()
                 .then((_) => {
                     navigator.mediaSession.metadata = new MediaMetadata({ title: metadata[_playlist[index]].title, artist: metadata[_playlist[index]].artist, album: metadata[_playlist[index]].album });
                     console.log("metadata setted");
                 })
                 .then((_) => {
                     audio.onended = function () {
                        console.log("audio ended");
                         index = (index + 1) % playlist.length;
                         playAudio();
                     };
                     console.log("onended setted");
                 })
                 .catch((error) => {
                     console.log(error);
                 });
        }  
    }
}
