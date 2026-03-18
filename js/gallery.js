// Gallery-specific scripts for refined Uniform Grid Gallery
const galleryGrid = document.getElementById('galleryGrid');
const SHUFFLE_INTERVAL = 8000;
const SPOTLIGHT_INTERVAL = 5000;
let currentFilter = 'all';

// --- Staggered Entrance ---
function revealGalleryItems() {
    const items = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
    items.forEach((item, index) => {
        // Remove reveal class first to re-trigger for filtering
        item.classList.remove('reveal');
        setTimeout(() => {
            item.classList.add('reveal');
        }, index * 100); // 100ms stagger between each card
    });
}

// --- Spotlight Effect ---
function triggerSpotlight() {
    // Only target items that are NOT hidden by filtering
    const visibleItems = Array.from(document.querySelectorAll('.gallery-item')).filter(item => item.style.display !== 'none');
    if (visibleItems.length === 0) return;

    // Remove old spotlight
    document.querySelectorAll('.gallery-item.spotlight').forEach(el => el.classList.remove('spotlight'));

    // Pick random new one from visible set
    const randomItem = visibleItems[Math.floor(Math.random() * visibleItems.length)];
    randomItem.classList.add('spotlight');

    // Fade out after 2 seconds
    setTimeout(() => {
        randomItem.classList.remove('spotlight');
    }, 2000);
}

// --- Lightbox Logic ---
function openLightbox(element) {
    if (window.shuffleTimer) clearInterval(window.shuffleTimer);
    
    const img = element.querySelector('img');
    const imgSrc = img.src;
    const imgAlt = img.alt;
    const overlay = element.querySelector('.image-overlay');
    const title = overlay ? overlay.querySelector('h4').innerText : '';
    const desc = overlay ? overlay.querySelector('p').innerText : '';
    
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imgSrc;
    lightboxImg.alt = imgAlt;
    
    let caption = document.getElementById('lightbox-caption');
    if (!caption) {
        caption = document.createElement('div');
        caption.id = 'lightbox-caption';
        caption.style.color = 'white';
        caption.style.textAlign = 'center';
        caption.style.marginTop = '1.5rem';
        caption.style.fontSize = '1.2rem';
        lightboxImg.parentNode.appendChild(caption);
    }
    caption.innerHTML = `<strong>${title}</strong><br><span style='font-size:0.9em; opacity: 0.8;'>${desc}</span>`;
    
    document.getElementById('lightbox').classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    startShuffleTimer();
}

document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

document.addEventListener('keydown', function(e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
});

// --- Filtering Logic ---
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        // Toggle active state
        filterButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        currentFilter = this.getAttribute('data-filter');
        
        // Apply filter immediately
        applyFilter();
    });
});

function applyFilter() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (currentFilter === 'all' || category === currentFilter) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });

    // Re-trigger staggered reveal for visible items
    revealGalleryItems();
}

// --- Living Gallery: Shuffling Logic ---
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function animateShuffle() {
    const allItems = Array.from(document.querySelectorAll('.gallery-item'));
    
    // Fade out only visible items
    allItems.forEach(item => {
        if (item.style.display !== 'none') {
            item.classList.add('shuffling');
        }
    });
    
    setTimeout(() => {
        const shuffled = shuffleArray([...allItems]);
        
        // Re-append in new order
        galleryGrid.innerHTML = '';
        shuffled.forEach(item => {
            galleryGrid.appendChild(item);
        });
        
        // Restore reveal state and fade in
        requestAnimationFrame(() => {
            shuffled.forEach(item => {
                item.offsetHeight; // force reflow
                item.classList.remove('shuffling');
                // We don't re-stagger here, just fade back in for the "living" feel
                item.classList.add('reveal');
            });
        });
    }, 800);
}

function startShuffleTimer() {
    if (window.shuffleTimer) clearInterval(window.shuffleTimer);
    window.shuffleTimer = setInterval(animateShuffle, SHUFFLE_INTERVAL);
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    revealGalleryItems();
    startShuffleTimer();
    setInterval(triggerSpotlight, SPOTLIGHT_INTERVAL);
});

// Pause shuffling on hover
galleryGrid.addEventListener('mouseenter', () => {
    if (window.shuffleTimer) clearInterval(window.shuffleTimer);
});
galleryGrid.addEventListener('mouseleave', () => startShuffleTimer());

// --- Submission Form ---
document.getElementById('photoSubmissionForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('photoSubmissionMsg').innerText =
        'Elite status incoming! Your photo has been received for review.';
    this.reset();
});
