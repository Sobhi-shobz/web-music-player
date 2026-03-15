const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const volumeSlider = document.getElementById('volume');
const playIcon = document.getElementById('play-icon');

// Preloaded Songs Data
const songs = [
    { title: 'Electronic Drive', artist: 'Helix One', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { title: 'Midnight Chill', artist: 'Helix Two', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { title: 'Summer Breeze', artist: 'Helix Three', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' }
];

let songIndex = 0;

// Load the song details
function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.url;
}

// Play or Pause logic
function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
}

// Update progress bar as song plays
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    }
}

// Click on progress bar to skip to a specific time
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Next Song
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
}

// Previous Song
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
    playIcon.classList.replace('fa-play', 'fa-pause');
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // Auto-play next
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Initial Load
loadSong(songs[songIndex]);
