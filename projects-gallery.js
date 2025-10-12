/* ============================================
   PROJECTS GALLERY - FILTERING & INTERACTIONS
   ============================================ */

/* ============================================
   FILTER FUNCTIONALITY
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter);
        });
    });
});

/**
 * Filter projects based on selected category
 * @param {string} category - Category to filter by ('all' or specific category)
 */
function filterProjects(category) {
    const projectItems = document.querySelectorAll('.project-item');
    let visibleCount = 0;
    
    projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (category === 'all' || itemCategory === category) {
            item.classList.remove('hidden');
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.classList.add('hidden');
            // Delay hiding to allow fade out animation
            setTimeout(() => {
                if (item.classList.contains('hidden')) {
                    item.style.display = 'none';
                }
            }, 400);
        }
    });
    
    // Show empty state if no projects match filter
    showEmptyState(visibleCount);
}

/**
 * Show/hide empty state message when no projects match filter
 * @param {number} count - Number of visible projects
 */
function showEmptyState(count) {
    const container = document.querySelector('.projects-container');
    let emptyState = document.querySelector('.empty-state');
    
    if (count === 0) {
        if (!emptyState) {
            emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <h3>No projects found</h3>
                <p>Try selecting a different category</p>
            `;
            container.appendChild(emptyState);
        }
    } else {
        if (emptyState) {
            emptyState.remove();
        }
    }
}

/* ============================================
   QUICK VIEW MODAL
   ============================================ */

/**
 * Open quick view modal for a project
 * @param {HTMLElement} element - The project element clicked
 */
function openQuickView(element) {
    const title = element.getAttribute('data-title');
    const desc = element.getAttribute('data-desc');
    const img = element.getAttribute('data-img');
    const link = element.getAttribute('data-link');
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    document.getElementById('modalImage').src = img;
    document.getElementById('modalImage').alt = title;
    
    const modalLink = document.getElementById('modalLink');
    if (link && link !== '#') {
        modalLink.href = link;
        modalLink.style.display = 'inline-block';
    } else {
        modalLink.style.display = 'none';
    }
    
    // Show modal
    const modal = document.getElementById('quickViewModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close quick view modal
 */
function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Close modal on Escape key
 */
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQuickView();
    }
});

/* ============================================
   ANIMATIONS ON SCROLL
   ============================================ */

/**
 * Animate projects as they scroll into view
 */
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all project items
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach((item, index) => {
        // Stagger initial animation
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        projectObserver.observe(item);
    });
});



