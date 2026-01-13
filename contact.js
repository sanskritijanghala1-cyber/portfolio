let audioContext, analyser, dataArray, source;
const audio = document.getElementById('bg-music');
const phoneImg = document.getElementById('phone-img');

// Listen for first click to start audio (Browser requirement)
window.addEventListener('click', () => {
    if (!audioContext) {
        setupAudio();
    }
    audio.play();
}, { once: true });

function setupAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 64;
    dataArray = new Uint8Array(analyser.frequencyBinCount);
    animateBeat();
}

function animateBeat() {
    requestAnimationFrame(animateBeat);
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate volume of the "beat" frequencies
    let sum = 0;
    for (let i = 0; i < 5; i++) sum += dataArray[i];
    let avg = sum / 5;
    
    // Send data to CSS
    let pulseValue = avg / 255;
    phoneImg.style.setProperty('--pulse', pulseValue);
}

function pickupPhone() {
    const container = document.getElementById('phone-container');
    const card = document.getElementById('contact-card');
    
    container.style.opacity = '0';
    container.style.transform = 'scale(0.5)';

    setTimeout(() => {
        container.style.display = 'none';
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('show'), 50);
    }, 500);
}

function toggleMute() {
    audio.muted = !audio.muted;
    document.getElementById('mute-icon').innerText = audio.muted ? "🔇" : "🔊";
}