/* ============================================
   ANNA SASIL PORTFOLIO - JAVASCRIPT
   ============================================ */

/* ============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/* ============================================
   SECTION NAVIGATION
   ============================================ */

/**
 * Opens a full-screen section overlay (Work, About, or Contact)
 * @param {string} sectionName - Name of the section to open
 */
function openSection(sectionName) {
    const section = document.getElementById(sectionName + '-section');
    section.classList.add('active');
}

/**
 * Closes all open section overlays
 */
function closeSection() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
}

/* ============================================
   LIGHTBOX FUNCTIONALITY
   ============================================ */

/**
 * Opens the lightbox with project details
 * @param {string} id - Project identifier
 * @param {string} imgSrc - Image source URL
 * @param {string} title - Project title
 * @param {string} description - Project description
 * @param {string} link - External project link
 */
function openLightbox(id, imgSrc, title, description, link) {
    // Update lightbox content
    document.getElementById('lightbox-img').src = imgSrc;
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-desc').textContent = description;
    
    // Handle project link
    const linksContainer = document.getElementById('lightbox-links');
    if (link && link !== '#') {
        linksContainer.innerHTML = `<a href="${link}" target="_blank">View Project</a>`;
    } else {
        linksContainer.innerHTML = '';
    }
    
    // Display lightbox
    document.getElementById('lightbox').style.display = 'flex';
}

/**
 * Closes the lightbox overlay
 */
function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

/**
 * Add animations to elements as they scroll into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

/**
 * Handles keyboard shortcuts for navigation
 * Escape: Close sections/lightbox
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeSection();
        closeLightbox();
    }
});

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    // No carousel initialization needed - using grid layout
    console.log('Portfolio loaded successfully');
});
