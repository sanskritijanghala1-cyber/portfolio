// 1. SCROLL ANIMATIONS (Fade Up)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));


// 2. PAN & ZOOM EFFECT
const zoomWrappers = document.querySelectorAll('.zoom-wrapper');

zoomWrappers.forEach(wrapper => {
    const img = wrapper.querySelector('.zoom-img');

    // Track mouse movement
    wrapper.addEventListener('mousemove', function(e) {
        // Wrapper dimensions
        const width = wrapper.offsetWidth;
        const height = wrapper.offsetHeight;

        // Mouse position
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // Calculate % position
        const xPercent = (mouseX / width) * 100;
        const yPercent = (mouseY / height) * 100;

        // Move the zoom focus point
        img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    });

    // Reset when mouse leaves
    wrapper.addEventListener('mouseleave', function() {
         img.style.transformOrigin = "50% 50%";
    });
});


// 3. NAVIGATION MENU TOGGLE
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const menuText = navToggle.querySelector('span');

navToggle.addEventListener('click', () => {
    navOverlay.classList.toggle('open');
    navToggle.classList.toggle('active');
    
    // Change text logic
    if (navOverlay.classList.contains('open')) {
        menuText.textContent = "Close";
    } else {
        menuText.textContent = "Menu";
    }
});