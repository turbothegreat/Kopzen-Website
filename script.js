const audio = document.getElementById('djAudio');
const progressBar = document.getElementById('progressBar');
const currentTimeLabel = document.getElementById('currentTime');
const durationLabel = document.getElementById('totalDuration');

// Format seconds into MM:SS
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Set total duration once metadata loads
audio.addEventListener('loadedmetadata', () => {
  durationLabel.textContent = formatTime(audio.duration);
});

// Update progress bar and current time on timeupdate
audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${percentage}%`;
    currentTimeLabel.textContent = formatTime(audio.currentTime);
  }
});

// Click to seek functionality
function seekTrack(event) {
  const container = event.currentTarget;
  const width = container.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  
  if (duration) {
    audio.currentTime = (clickX / width) * duration;
  }
}

function playTrack() {
  audio.play();
}

function pauseTrack() {
  audio.pause();
}

function stopTrack() {
  audio.pause();
  audio.currentTime = 0;
}