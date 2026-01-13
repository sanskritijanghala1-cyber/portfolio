const playlist = [
    { file: 'bodies.mp4', title: 'bodies', desc: 'current selection: 1 of 2' },
    { file: 'feel-the-fiyaah.mp4', title: 'feel the fiyaah', desc: 'current selection: 2 of 2' }
];

let currentIndex = 0;
const video = document.getElementById('portfolioVideo');
const overlay = document.getElementById('screenOverlay');

// MENU TOGGLE
document.getElementById('navToggle').onclick = () => document.getElementById('navOverlay').classList.add('open');
document.getElementById('closeMenu').onclick = () => document.getElementById('navOverlay').classList.remove('open');

function togglePlay() {
    if (video.paused) {
        video.play();
        overlay.style.opacity = '0';
    } else {
        video.pause();
        overlay.style.opacity = '1';
        document.getElementById('overlayText').innerText = 'paused';
    }
}

function changeVideo(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = playlist.length - 1;
    if (currentIndex >= playlist.length) currentIndex = 0;

    video.src = `assets/videos/${playlist[currentIndex].file}`;
    document.getElementById('projectTitle').innerText = playlist[currentIndex].title;
    document.getElementById('projectDesc').innerText = playlist[currentIndex].desc;
    
    video.load();
    video.play();
    overlay.style.opacity = '0';
}

function toggleMute() {
    video.muted = !video.muted;
    document.getElementById('speakerIcon').style.opacity = video.muted ? "0.3" : "1";
}

function openZoom() {
    const zoomVideo = document.getElementById('zoomVideo');
    zoomVideo.src = video.src;
    zoomVideo.currentTime = video.currentTime;
    document.getElementById('videoLightbox').style.display = 'flex';
    zoomVideo.play();
    video.pause();
}

function closeZoom() {
    document.getElementById('videoLightbox').style.display = 'none';
    const zoomVideo = document.getElementById('zoomVideo');
    zoomVideo.pause();
    video.currentTime = zoomVideo.currentTime;
} 