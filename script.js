/* ========================================
   NAVIGATION MENU
   ======================================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/* ========================================
   ACTIVE LINK ON SCROLL
   ======================================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

/* ========================================
   CHANGE HEADER BACKGROUND ON SCROLL
   ======================================== */
function scrollHeader() {
    const header = document.getElementById('header');
    // When scroll is greater than 50 viewport height, add scroll-header class
    if (this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

/* ========================================
   SHOW SCROLL UP BUTTON
   ======================================== */
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When scroll is higher than 350 viewport height, show scroll up button
    if (this.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
}

window.addEventListener('scroll', scrollUp);

/* ========================================
   SMOOTH SCROLLING FOR ALL LINKS
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/* ========================================
   CONTACT FORM HANDLING
   ======================================== */
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            consultationType: formData.get('consultation-type'),
            preferredDate: formData.get('preferred-date'),
            message: formData.get('message')
        };
        
        // Basic validation
        if (!data.name || !data.email || !data.phone || !data.consultationType || !data.message) {
            showMessage('error', 'Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showMessage('error', 'Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(data.phone)) {
            showMessage('error', 'Please enter a valid phone number.');
            return;
        }
        
        // Show success message
        showMessage('success', 'Thank you! Redirecting to WhatsApp...');
        
        // Reset form
        contactForm.reset();
        
        // ⭐ WHATSAPP INTEGRATION - Form data sent to your WhatsApp
        // TODO: Replace YOUR_PHONE_NUMBER with your actual WhatsApp number
        // Format: Country code + number (no spaces, no + sign)
        // Example for India: 919876543210
        setTimeout(() => {
            const whatsappMessage = encodeURIComponent(
                `🩺 *New Appointment Request*\n\n` +
                `👤 *Name:* ${data.name}\n` +
                `📧 *Email:* ${data.email}\n` +
                `📱 *Phone:* ${data.phone}\n` +
                `💊 *Consultation Type:* ${data.consultationType}\n` +
                `📅 *Preferred Date:* ${data.preferredDate || 'Not specified'}\n` +
                `📝 *Message:*\n${data.message}`
            );
            // WhatsApp number: 918855001450
            window.open(`https://wa.me/918855001450?text=${whatsappMessage}`, '_blank');
        }, 1500);
    });
}

function showMessage(type, message) {
    formMessage.textContent = message;
    formMessage.className = `form__message ${type}`;
    
    // Auto hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form__message';
    }, 5000);
}

/* ========================================
   SIMPLE AOS (ANIMATE ON SCROLL) IMPLEMENTATION
   ======================================== */
function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    aosElements.forEach(element => {
        observer.observe(element);
    });
}

// Add CSS for AOS animations
const aosStyles = document.createElement('style');
aosStyles.textContent = `
    [data-aos] {
        opacity: 0;
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-up"].aos-animate {
        transform: translateY(0);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-30px);
    }
    
    [data-aos="fade-right"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(30px);
    }
    
    [data-aos="fade-left"].aos-animate {
        transform: translateX(0);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.9);
    }
    
    [data-aos="zoom-in"].aos-animate {
        transform: scale(1);
    }
`;
document.head.appendChild(aosStyles);

// Initialize AOS on page load
window.addEventListener('load', initAOS);

/* ========================================
   PRELOADER (OPTIONAL)
   ======================================== */
window.addEventListener('load', () => {
    // Hide preloader if exists
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

/* ========================================
   LAZY LOADING FOR IMAGES (OPTIONAL)
   ======================================== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

/* ========================================
   DYNAMIC YEAR IN FOOTER
   ======================================== */
function updateYear() {
    const yearElements = document.querySelectorAll('.footer__copy');
    const currentYear = new Date().getFullYear();
    
    yearElements.forEach(element => {
        element.innerHTML = element.innerHTML.replace(/\d{4}/, currentYear);
    });
}

updateYear();

/* ========================================
   TESTIMONIAL AUTO-ROTATION (OPTIONAL)
   ======================================== */
function initTestimonialRotation() {
    const testimonials = document.querySelectorAll('.testimonial__card');
    if (testimonials.length <= 3) return; // Only rotate if more than 3 testimonials
    
    let currentIndex = 0;
    const rotationInterval = 5000; // 5 seconds
    
    function rotateTestimonials() {
        testimonials.forEach((testimonial, index) => {
            if (index >= currentIndex && index < currentIndex + 3) {
                testimonial.style.display = 'block';
            } else {
                testimonial.style.display = 'none';
            }
        });
        
        currentIndex = (currentIndex + 1) % testimonials.length;
    }
    
    // Uncomment to enable auto-rotation
    // setInterval(rotateTestimonials, rotationInterval);
}

initTestimonialRotation();

/* ========================================
   FORM INPUT ANIMATIONS
   ======================================== */
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
    // Add focus effect
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    // Remove focus effect if empty
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});

/* ========================================
   PREVENT FORM RESUBMISSION ON PAGE REFRESH
   ======================================== */
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

/* ========================================
   WHATSAPP CLICK TRACKING (OPTIONAL)
   ======================================== */
const whatsappButtons = document.querySelectorAll('.whatsapp-float, .button--secondary');

whatsappButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Track WhatsApp clicks (integrate with Google Analytics if needed)
        console.log('WhatsApp button clicked');
        
        // You can add Google Analytics tracking here
        // gtag('event', 'click', { 'event_category': 'WhatsApp', 'event_label': 'Contact Button' });
    });
});

/* ========================================
   KEYBOARD ACCESSIBILITY
   ======================================== */
// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
});

// Trap focus in mobile menu when open
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            } else if (!e.shiftKey && document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    });
}

if (navMenu) {
    trapFocus(navMenu);
}

/* ========================================
   COUNTER ANIMATION FOR STATISTICS (IF ADDED)
   ======================================== */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Usage example (uncomment if you add counter elements):
// const counters = document.querySelectorAll('.counter');
// const counterObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             const target = parseInt(entry.target.dataset.target);
//             animateCounter(entry.target, target);
//             counterObserver.unobserve(entry.target);
//         }
//     });
// });
// counters.forEach(counter => counterObserver.observe(counter));

/* ========================================
   CONSOLE MESSAGE
   ======================================== */
console.log('%c🩺 Dr. Khatib Homoeopathy', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #2196F3; font-size: 14px;');
console.log('%cFor appointments: WhatsApp or call us directly', 'color: #666; font-size: 12px;');

/* ========================================
   SERVICE WORKER FOR PWA (OPTIONAL - ADVANCED)
   ======================================== */
// Uncomment to enable Progressive Web App features
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js')
//             .then(registration => console.log('SW registered:', registration))
//             .catch(error => console.log('SW registration failed:', error));
//     });
// }

/* ========================================
   GOOGLE ANALYTICS INTEGRATION (OPTIONAL)
   ======================================== */
// Add your Google Analytics tracking code here
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');

/* ========================================
   COOKIE CONSENT (OPTIONAL)
   ======================================== */
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        // Show cookie consent banner
        // You can implement your own cookie consent UI here
        console.log('Cookie consent not given');
    }
}

// Uncomment to enable cookie consent
// initCookieConsent();

/* ========================================
   ERROR HANDLING
   ======================================== */
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You can add error reporting service here (e.g., Sentry)
});

/* ========================================
   PERFORMANCE MONITORING
   ======================================== */
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    }
});

/* ========================================
   PRINT STYLES HELPER
   ======================================== */
window.addEventListener('beforeprint', () => {
    console.log('Preparing to print...');
    // Add any print-specific JavaScript here
});

/* ========================================
   DATE PICKER MINIMUM DATE (TODAY)
   ======================================== */
const dateInput = document.getElementById('preferred-date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

/* ========================================
   AUTOMATIC PHONE NUMBER FORMATTING
   ======================================== */
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        // Remove non-numeric characters
        let value = e.target.value.replace(/\D/g, '');
        
        // Format as needed (example for Indian numbers)
        // You can customize this based on your region
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        e.target.value = value;
    });
}

/* ========================================
   INITIALIZE ALL FUNCTIONS
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    // Add any initialization code here
    
    // Smooth scroll on page load if hash exists
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});
