// MENU CONTROL
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const closeMenu = document.getElementById('closeMenu');

navToggle.addEventListener('click', () => {
    navOverlay.classList.add('open');
});

closeMenu.addEventListener('click', () => {
    navOverlay.classList.remove('open');
});

// SLIDE CONTROL
let currentIdx = 1;
const totalSlides = 17;

function openLightbox() {
    const mainImgSrc = document.getElementById('mainSlide').src;
    document.getElementById('lightboxImg').src = mainImgSrc;
    document.getElementById('current').innerText = currentIdx;
    document.getElementById('lightbox').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeLightboxSlide(dir) {
    currentIdx += dir;
    if (currentIdx > totalSlides) currentIdx = 1;
    if (currentIdx < 1) currentIdx = totalSlides;
    
    document.getElementById('lightboxImg').src = `assets/presentation-design/${currentIdx}.jpg`;
    document.getElementById('current').innerText = currentIdx;
}

// SCROLL SYNC
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const slideNum = entry.target.getAttribute('data-slide');
            currentIdx = parseInt(slideNum);
            
            const mainSlide = document.getElementById('mainSlide');
            mainSlide.style.opacity = 0;
            
            setTimeout(() => {
                mainSlide.src = `assets/presentation-design/${slideNum}.jpg`;
                mainSlide.style.opacity = 1;
            }, 250);
        }
    });
}, { threshold: 0.6 });

document.querySelectorAll('.step').forEach(step => observer.observe(step));