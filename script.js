const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const volumeSlider = document.getElementById('volume');
const playIcon = document.getElementById('play-icon');

// Song list
const songs = [
    { name: 'Song One', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { name: 'Song Two', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { name: 'Song Three', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.name;
    audio.src = song.url;
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
        audio.pause();
        playIcon.classList.replace('fa-pause', 'fa-play');
    }
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});
nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
});
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', (e) => audio.volume = e.target.value);

// Init
loadSong(songs[songIndex]);
