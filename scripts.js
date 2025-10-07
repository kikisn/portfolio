/* ============================================
   ANNA SASIL PORTFOLIO - JAVASCRIPT
   ============================================ */

/* ============================================
   WORK DISPLAY CAROUSEL
   ============================================ */

// Configuration
let currentIndex = 0;
const totalItems = 5;  // Total number of work items
const itemsToShow = 3; // Number of items visible at once

/**
 * Updates the visibility of work items based on current index
 * Shows items from currentIndex to currentIndex + itemsToShow
 */
function updateWorkDisplay() {
    const workItems = document.querySelectorAll('.work-item');
    
    workItems.forEach((item, index) => {
        if (index >= currentIndex && index < currentIndex + itemsToShow) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * Changes the visible slide by moving the current index
 * @param {number} direction - Direction to move (1 for next, -1 for previous)
 */
function changeSlide(direction) {
    currentIndex += direction;
    
    // Wrap around logic - cycle back to start/end
    if (currentIndex > totalItems - itemsToShow) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = totalItems - itemsToShow;
    }
    
    updateWorkDisplay();
}

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
   AUTO-CYCLE CAROUSEL
   ============================================ */

/**
 * Automatically advances carousel every 8 seconds
 */
setInterval(() => {
    changeSlide(1);
}, 8000);

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

/**
 * Handles keyboard shortcuts for navigation
 * Arrow Right: Next slide
 * Arrow Left: Previous slide
 * Escape: Close sections/lightbox
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    }
    if (e.key === 'Escape') {
        closeSection();
        closeLightbox();
    }
});

/* ============================================
   INITIALIZATION
   ============================================ */

/**
 * Initialize carousel on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    updateWorkDisplay();
});

// Add this to your existing scripts.js
function renderEcommerceProjects() {
    const projectsContainer = document.getElementById('ecommerce-projects-container');
    
    const projects = [
        {
            title: "Service Industry Platform A",
            tags: ["Brand Identity", "SEO Copywriting", "Website Design"],
            improvements: [
                "Optimized button interactions with micro-animations",
                "Refined color palette for increased visual hierarchy",
                "Rewrote copy to improve conversion rate"
            ],
            colorPalette: ["#D2312F", "#8C7F80", "#F4F1E8"],
            desktopImage: "path/to/desktop-image.jpg",
            mobileImage: "path/to/mobile-image.jpg"
        },
        {
            title: "E-commerce Platform B",
            tags: ["Brand Identity", "SEO Copywriting", "Website Design"],
            improvements: [
                "Streamlined navigation structure",
                "Implemented responsive design best practices",
                "Enhanced product description clarity"
            ],
            colorPalette: ["#D2312F", "#8C7F80", "#E8DCC0"],
            desktopImage: "path/to/desktop-image-2.jpg",
            mobileImage: "path/to/mobile-image-2.jpg"
        }
    ];

    let projectsHTML = projects.map((project, index) => `
        <div class="ecommerce-project" data-project-index="${index}">
            <div class="project-header">
                <h3>${project.title}</h3>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
            <div class="project-content">
                <div class="project-details">
                    <h4>Key Improvements</h4>
                    <ul>
                        ${project.improvements.map(improvement => `<li>${improvement}</li>`).join('')}
                    </ul>
                    <div class="color-palette">
                        ${project.colorPalette.map(color => `
                            <div class="color-swatch" style="background-color: ${color};"></div>
                        `).join('')}
                    </div>
                </div>
                <div class="project-images">
                    <div class="desktop-view">
                        <h4>Desktop View</h4>
                        <img src="${project.desktopImage}" alt="${project.title} Desktop View">
                    </div>
                    <div class="mobile-view">
                        <h4>Mobile View</h4>
                        <img src="${project.mobileImage}" alt="${project.title} Mobile View">
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', renderEcommerceProjects);
