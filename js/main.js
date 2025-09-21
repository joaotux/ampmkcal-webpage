/**
 * Main JavaScript functionality for AmpMkCal website
 * Bootstrap-compatible implementation
 */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for i18n to initialize
    setTimeout(() => {
        initializeBootstrapComponents();
        initializeLanguageSelector();
        initializeScrollEffects();
    }, 100);
});

/**
 * Initialize Bootstrap components
 */
function initializeBootstrapComponents() {
    // Initialize Bootstrap tooltips if any exist
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers if any exist
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
}

/**
 * Initialize language selector functionality
 */
function initializeLanguageSelector() {
    const langDropdown = document.getElementById('langDropdown');
    const currentLangSpan = document.getElementById('currentLang');
    
    if (langDropdown && currentLangSpan) {
        // Handle language selection
        langDropdown.addEventListener('click', function(e) {
            if (e.target.classList.contains('dropdown-item')) {
                e.preventDefault();
                
                const selectedLang = e.target.getAttribute('data-lang');
                
                if (selectedLang && window.i18n) {
                    // Change language using i18n system
                    window.i18n.setLanguage(selectedLang);
                }
            }
        });
    }
    
    // Listen for language change events from i18n system
    window.addEventListener('languageChanged', function(e) {
        if (currentLangSpan) {
            const displayMap = {
                'pt-br': 'PT',
                'en-us': 'EN',
                'es-es': 'ES'
            };
            currentLangSpan.textContent = displayMap[e.detail.language] || 'PT';
        }
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add navbar scroll effect if on homepage
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('navbar-scrolled');
                } else {
                    navbar.classList.remove('navbar-scrolled');
                }
            });
        }
    }
}

/**
 * Utility function to add fade-in animation to elements
 */
function addFadeInAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements that should fade in
    document.querySelectorAll('.card, .alert, section').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Form validation helper (for future use)
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    });
    
    return isValid;
}

/**
 * Show toast notification (Bootstrap toast)
 */
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toastHtml = `
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="me-auto">AmpMkCal</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElement = toastContainer.lastElementChild;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    // Remove toast element after it's hidden
    toastElement.addEventListener('hidden.bs.toast', function() {
        toastElement.remove();
    });
}

/**
 * Create toast container if it doesn't exist
 */
function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(container);
    return container;
}

// Export functions for global use
window.AmpMkCal = {
    showToast,
    validateForm,
    addFadeInAnimation
};
