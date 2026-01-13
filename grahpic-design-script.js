/* ------------------------------------------------------------
   CAROUSEL CORE LOGIC (ORIGINAL)
   ------------------------------------------------------------ */
const carousel = document.querySelector('.carousel');
let posters = Array.from(document.querySelectorAll('.poster'));

/* Clone logic for infinite loop */
posters.forEach(p => carousel.appendChild(p.cloneNode(true)));
posters = Array.from(document.querySelectorAll('.poster'));

/* start near center */
carousel.scrollLeft = carousel.scrollWidth / 4;

/* ---------------- DRAG (ORIGINAL) ---------------- */
let isDown = false;
let startX = 0;
let scrollStart = 0;

carousel.addEventListener('mousedown', e => {
  isDown = true;
  startX = e.clientX;
  scrollStart = carousel.scrollLeft;
  carousel.classList.add('dragging');
});

window.addEventListener('mouseup', () => {
  isDown = false;
  carousel.classList.remove('dragging');
});

window.addEventListener('mousemove', e => {
  if (!isDown) return;
  carousel.scrollLeft = scrollStart - (e.clientX - startX);
});

/* ---------------- WHEEL (ORIGINAL) ---------------- */
carousel.addEventListener(
  'wheel',
  e => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      carousel.scrollLeft += e.deltaX;
    }
  },
  { passive: false }
);

/* ---------------- INFINITE LOOP (ORIGINAL) ---------------- */
carousel.addEventListener('scroll', () => {
  const half = carousel.scrollWidth / 2;
  if (carousel.scrollLeft < 5) carousel.scrollLeft += half;
  if (carousel.scrollLeft > half - 5) carousel.scrollLeft -= half;
  requestAnimationFrame(updateActive);
});

/* ---------------- HIGHLIGHT LOGIC (ORIGINAL) ---------------- */
function updateActive() {
  const carouselRect = carousel.getBoundingClientRect();
  const center = carouselRect.left + carouselRect.width / 2;

  posters.forEach(p => {
    p.classList.remove('active', 'near', 'far');

    const rect = p.getBoundingClientRect();
    const pCenter = rect.left + rect.width / 2;
    const distance = Math.abs(pCenter - center);

    if (distance < rect.width * 0.45) {
      p.classList.add('active');
    } else if (distance < rect.width * 1.2) {
      p.classList.add('near');
    } else {
      p.classList.add('far');
    }
  });
}

// Set active poster on page load
updateActive();


/* ------------------------------------------------------------
   STAR NAVIGATION LOGIC (REFINED)
   ------------------------------------------------------------ */
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

if (navToggle && navOverlay) {
    navToggle.addEventListener('click', function() {
        // Slide out the menu panel
        navOverlay.classList.toggle('open');
        
        // Stop star spin and change its shape/rotation
        navToggle.classList.toggle('active');
    });
}
