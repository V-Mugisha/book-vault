function loadComponent(componentId) {
    const targetElement = document.getElementById(componentId);
    if (!targetElement) {
        console.warn(`Element with id "${componentId}" not found`);
        return;
    }

    const componentPath = `components/${componentId}.html`;
    
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            return response.text();
        })
        .then(html => {
            targetElement.innerHTML = html;
            
            // Initialize component-specific functionality
            if (componentId === 'navigation') {
                initNavigation();
            }
        })
        .catch(error => {
            console.error('Error loading component:', error);
            targetElement.innerHTML = '<p>Error loading navigation</p>';
        });
}

// Initialize navigation functionality
function initNavigation() {
    // Highlight active link based on current page
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

// Load navigation component
loadComponent('navigation');