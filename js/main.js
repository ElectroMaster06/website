// --- Lightbox ---
function openLightbox(img) {
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-image');
  overlay.style.display = 'flex';
  lightboxImg.src = img.src;
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  overlay.style.display = 'none';
  document.getElementById('lightbox-image').src = '';
  document.body.style.overflow = 'auto';
}

// Zoom in/out with mouse wheel at cursor position
const lightboxImg = document.getElementById('lightbox-image');
let scale = 1; // Initial zoom level
if (lightboxImg) {
  lightboxImg.addEventListener('wheel', event => {
    event.preventDefault();
    const zoomStep = 0.1;
    const rect = lightboxImg.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    if (event.deltaY < 0) {
      scale = Math.min(scale + zoomStep, 3);
    } else {
      scale = Math.max(scale - zoomStep, 1);
    }
    lightboxImg.style.transformOrigin = `${offsetX * 100}% ${offsetY * 100}%`;
    lightboxImg.style.transform = `scale(${scale})`;
  });
}

// Zatvorenie lightboxu klikom alebo ESC
const overlay = document.getElementById('lightbox-overlay');
if (overlay) {
  overlay.addEventListener('click', closeLightbox);
}
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});

// --- Sekcie (navigácia) ---
function showSection(sectionId) {
  const sections = document.querySelectorAll('main section');
  sections.forEach(sec => {
    sec.classList.toggle('active', sec.id === sectionId);
  });
  // ... prípadne ďalší kód pre navigáciu ...
}

window.addEventListener('DOMContentLoaded', () => {
  showSection('welcome'); // predvolene zobrazí welcome
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      // Prepni sekciu
      showSection(link.dataset.section);
      // Prepni .active na navigácii
      document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
      link.classList.add('active');
    });
  });
});

// Pridaj do svojho JS súboru
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    this.classList.add('active');
  });
});

// --- Music Controls ---
const musicBtn = document.getElementById('music-toggle');
const music = document.getElementById('bg-music');
const volSlider = document.getElementById('vol-slider');
const volValue = document.getElementById('vol-value');
let musicPlaying = true;

if (volSlider && music && volValue) {
  volSlider.addEventListener('input', () => {
    const vol = volSlider.value / 100;
    music.volume = vol;
    volValue.textContent = volSlider.value;
  });
}

window.addEventListener('DOMContentLoaded', () => {
  if (music && musicBtn && volSlider && volValue) {
    music.volume = 0.5;
    volSlider.value = 50;
    volValue.textContent = 50;
    const enableAudio = () => {
      music.muted = false;
      music.play();
      document.removeEventListener('click', enableAudio);
    };
    document.addEventListener('click', enableAudio);
    musicBtn.textContent = '⏸️ Vypnúť hudbu';
    musicBtn.addEventListener('click', () => {
      if (!musicPlaying) {
        music.muted = false;
        music.play();
        musicBtn.textContent = '⏸️ Vypnúť hudbu';
        musicPlaying = true;
      } else {
        music.pause();
        musicBtn.textContent = '🎵 Zapnúť hudbu';
        musicPlaying = false;
      }
    });
  }
});

// --- Music Controls Drag ---
const musicControls = document.getElementById('music-controls');
const musicDragger = document.getElementById('music-dragger');
let isDragging = false, dragOffsetX = 0, dragOffsetY = 0;

if (musicDragger && musicControls) {
  // Mouse events
  musicDragger.addEventListener('mousedown', function(e) {
    isDragging = true;
    dragOffsetX = e.clientX - musicControls.getBoundingClientRect().left;
    dragOffsetY = e.clientY - musicControls.getBoundingClientRect().top;
    musicDragger.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', function(e) {
    if (isDragging) {
      musicControls.style.left = (e.clientX - dragOffsetX) + 'px';
      musicControls.style.top = (e.clientY - dragOffsetY) + 'px';
      musicControls.style.right = 'auto';
      musicControls.style.bottom = 'auto';
      musicControls.style.position = 'fixed';
    }
  });
  document.addEventListener('mouseup', function() {
    isDragging = false;
    musicDragger.style.cursor = 'grab';
    document.body.style.userSelect = '';
  });

  // Touch events (mobile)
  musicDragger.addEventListener('touchstart', function(e) {
    isDragging = true;
    const touch = e.touches[0];
    dragOffsetX = touch.clientX - musicControls.getBoundingClientRect().left;
    dragOffsetY = touch.clientY - musicControls.getBoundingClientRect().top;
  });
  document.addEventListener('touchmove', function(e) {
    if (isDragging) {
      const touch = e.touches[0];
      musicControls.style.left = (touch.clientX - dragOffsetX) + 'px';
      musicControls.style.top = (touch.clientY - dragOffsetY) + 'px';
      musicControls.style.right = 'auto';
      musicControls.style.bottom = 'auto';
      musicControls.style.position = 'fixed';
    }
  }, {passive: false});
  document.addEventListener('touchend', function() {
    isDragging = false;
  });
}

// --- Mini Video (YouTube) ---
let videoStarted = false;
window.videoStarted = videoStarted;

function showMiniVideo() {
  const mini = document.getElementById('mini-video');
  const miniIframe = document.getElementById('mini-iframe');
  if (mini && miniIframe) {
    miniIframe.src = "https://www.youtube.com/embed/G5Ddy0Mrs3w?autoplay=1";
    mini.style.display = "block";
  }
}
function closeMiniVideo() {
  const mini = document.getElementById('mini-video');
  const miniIframe = document.getElementById('mini-iframe');
  if (mini && miniIframe) {
    miniIframe.src = "";
    mini.style.display = "none";
  }
}

// --- Čas a dátum (vľavo hore) ---
function updateDateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const time = `${hours}:${minutes}:${seconds}`;
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = `${day}.${month}.${year}`;
  const timeElem = document.getElementById('current-time');
  const dateElem = document.getElementById('current-date');
  if (timeElem && dateElem) {
    timeElem.textContent = time;
    dateElem.textContent = date;
  }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// --- Skryť čas na mobile ---
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
window.addEventListener('DOMContentLoaded', () => {
  if (isMobileDevice()) {
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) timeDisplay.style.display = 'none';
  }
});