console.log("welcome to spotify");

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song1.mpeg');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songBannerImage = document.getElementById('songBannerImage');

let songs = [
    {songName: "Asal mein-Darshan Raval", filepath: "song1.mpeg", coverpath: "image1.jpeg"},
    {songName: "Dard-Darshan Raval", filepath: "song2.mpeg", coverpath: "image2.jpeg"},
    {songName: "Tu mileya-Darshan Raval", filepath: "song3.mpeg", coverpath: "image3.jpeg"},
    {songName: "Mahiye jinna sonna-DarshanRaval", filepath: "song4.mpeg", coverpath: "image4.jpeg"},
    {songName: "Chogada-Darshan Raval", filepath: "song5.mpeg", coverpath: "image5.jpeg"},
    {songName: "Love Aaj Kal-Darshan Raval", filepath: "song6.mpeg", coverpath: "image6.jpeg"},
    {songName: "soni soni-Darshan Raval", filepath: "song7.mpeg", coverpath: "image7.jpeg"},
    {songName: "Kamariya-Darshan Raval", filepath: "song8.mpeg", coverpath: "image8.jpeg"},
    {songName: "Tere zikr-Darshan Raval", filepath: "song9.mpeg", coverpath: "image9.jpeg"},
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
 
// Handle play/pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    // Update seek bar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// seekbar change event
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        songIndex = i;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = songs[songIndex].filepath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // Update song banner image
        songBannerImage.src = songs[songIndex].coverpath;
    });
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    // Update song banner image
    songBannerImage.src = songs[songIndex].coverpath;
});

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    } 
    audioElement.src = songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0; 
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
    // Update song banner image
    songBannerImage.src = songs[songIndex].coverpath;
});
   