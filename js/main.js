// Modern Portfolio Website - JavaScript

// Language and Translation
let currentLanguage = localStorage.getItem('language') || 'en';

// DOM Elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');
const titleRotate = document.getElementById('titleRotate');
const progressBars = document.querySelectorAll('.progress-fill');
const langToggle = document.getElementById('langToggle');
const currentLangDisplay = document.getElementById('currentLang');

// Navigation Toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Translation Functions
function getNestedTranslation(obj, path) {
    return path.split('.').reduce((o, p) => o && o[p], obj);
}

function translatePage(lang) {
    if (!translations[lang]) return;

    const t = translations[lang];
    currentLanguage = lang;
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', lang);
    localStorage.setItem('language', lang);

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                // Don't translate input/textarea content, only placeholders
                return;
            }
            element.innerHTML = translation;
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const translation = getNestedTranslation(t, key);
        if (translation) {
            element.placeholder = translation;
        }
    });

    // Update language button
    if (currentLangDisplay) {
        currentLangDisplay.textContent = lang.toUpperCase();
    }

    // Update title rotation titles
    if (t.hero && t.hero.titles) {
        updateTitleRotation(t.hero.titles);
    }
}

// Language Toggle
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const newLang = currentLanguage === 'en' ? 'de' : 'en';
        translatePage(newLang);
    });
}

// Title Rotation Animation
let titles = translations[currentLanguage]?.hero?.titles || ['Developer', 'Creator', 'Engineer'];
let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function updateTitleRotation(newTitles) {
    titles = newTitles;
    currentTitleIndex = 0;
    currentCharIndex = 0;
    isDeleting = false;
    if (titleRotate) {
        titleRotate.textContent = '';
    }
}

function typeTitle() {
    if (!titleRotate || !titles || titles.length === 0) return;

    const currentTitle = titles[currentTitleIndex];

    if (isDeleting) {
        titleRotate.textContent = currentTitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        typingSpeed = 50;
    } else {
        titleRotate.textContent = currentTitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && currentCharIndex === currentTitle.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeTitle, typingSpeed);
}

// Start title rotation
if (titleRotate) {
    typeTitle();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate progress bars
            if (entry.target.classList.contains('progress-fill')) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.width = progress + '%';
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .portfolio-item, .about-text, .contact-info, .contact-form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Observe progress bars
progressBars.forEach(bar => {
    observer.observe(bar);
});

// EmailJS Configuration
// Loaded from emailjs.config.js (generated from GitHub Secrets during deployment)
// For local development, create js/emailjs.config.js with your credentials
const EMAILJS_SERVICE_ID = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG.SERVICE_ID : 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG.TEMPLATE_ID : 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = typeof EMAILJS_CONFIG !== 'undefined' ? EMAILJS_CONFIG.PUBLIC_KEY : 'YOUR_PUBLIC_KEY';

// Initialize EmailJS
if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Form Handling
if (contactForm) {
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button
        if (submitButton) {
            submitButton.disabled = true;
            const sendingText = translations[currentLanguage]?.contact?.form?.sending || 'Sending...';
            submitButton.textContent = sendingText;
        }

        // Get form data
        const formData = new FormData(contactForm);
        const now = new Date();
        const timeString = now.toLocaleString(currentLanguage === 'de' ? 'de-DE' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        const templateParams = {
            name: formData.get('name'),
            from_email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            time: timeString,
            to_email: 'mattesnico@gmail.com' // Your email address
        };

        try {
            // Check if EmailJS is configured
            if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
                EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' ||
                EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
                // Fallback: Show form data in console for development
                console.error('EmailJS not configured properly!');
                console.error('SERVICE_ID:', EMAILJS_SERVICE_ID);
                console.error('TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
                console.error('PUBLIC_KEY:', EMAILJS_PUBLIC_KEY ? 'SET (hidden)' : 'NOT SET');
                console.log('Form data:', templateParams);
                console.log('To enable email sending, configure EmailJS secrets in GitHub repository settings.');

                // Show error message
                const errorMessage = translations[currentLanguage]?.contact?.errorMessage || 'There was an error sending your message. Please try again later or contact me directly via email.';
                showFormMessage(errorMessage, 'error');

                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
                return;
            }

            // Send email using EmailJS
            if (typeof emailjs !== 'undefined') {
                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

                // Show success message
                const successMessage = translations[currentLanguage]?.contact?.successMessage || 'Thank you for your message! I will get back to you soon.';
                showFormMessage(successMessage, 'success');

                // Reset form
                contactForm.reset();
            } else {
                throw new Error('EmailJS library not loaded');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            const errorMessage = translations[currentLanguage]?.contact?.errorMessage || 'There was an error sending your message. Please try again later or contact me directly via email.';
            showFormMessage(errorMessage, 'error');
        } finally {
            // Re-enable submit button
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}

// Function to show form messages
function showFormMessage(message, type) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message form-message-${type}`;
    messageDiv.textContent = message;

    // Insert before submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        contactForm.insertBefore(messageDiv, submitButton);
    } else {
        contactForm.appendChild(messageDiv);
    }

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            messageDiv.style.transition = 'opacity 0.3s ease';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

// Initialize particles on load
function initParticles() {
    // Particles.js Configuration - PanterSoft Cyberpunk Circuit Design
    if (typeof particlesJS !== 'undefined' && !window.particlesInitialized) {
        window.particlesInitialized = true;
        particlesJS('particles', {
        particles: {
            number: {
                value: 120,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ['#00E5FF', '#39FF14', '#BC13FE'], // PanterSoft Neon Colors
                animation: {
                    enable: true,
                    speed: 10,
                    sync: false
                }
            },
            shape: {
                type: ['circle', 'triangle'],
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.2,
                    sync: false
                }
            },
            size: {
                value: 2.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 120,
                color: '#00E5FF', // Neon Cyan connections
                opacity: 0.3,
                width: 1,
                shadow: {
                    enable: true,
                    blur: 5,
                    color: '#00E5FF'
                }
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.8,
                        color: '#39FF14' // Neon Green on interaction
                    }
                },
                bubble: {
                    distance: 300,
                    size: 8,
                    duration: 2,
                    opacity: 0.8,
                    speed: 3,
                    color: '#BC13FE' // Neon Purple bubbles
                },
                repulse: {
                    distance: 150,
                    duration: 0.4
                },
                push: {
                    particles_nb: 3
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });
    }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Initialize on load
window.addEventListener('load', () => {
    // Initialize language
    translatePage(currentLanguage);

    // Initialize particles
    initParticles();

    // Animate elements on initial load
    document.querySelectorAll('.hero-text, .hero-image').forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Highlight initial section
    highlightNavigation();
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

