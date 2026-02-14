// Particles Background Animation
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animateParticles);
}

animateParticles();

// Typing Effect for Hero Subtitle
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Software Engineer & AI Specialist',
    'Building Scalable Systems',
    'Machine Learning Engineer',
    'Distributed Systems Expert'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect after a delay
setTimeout(typeEffect, 1000);

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
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

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll with Active Link Highlighting
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Intersection Observer for Fade-In Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(`
    .timeline-item,
    .project-card,
    .skill-category,
    .award-card,
    .contact-item,
    .edu-card
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Staggered Animation for Cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});

const awardCards = document.querySelectorAll('.award-card');
awardCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Tech Tags Hover Effect - Ripple
document.querySelectorAll('.tech-tags span, .skill-items span').forEach(tag => {
    tag.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dynamic Year in Footer
const currentYear = new Date().getFullYear();
document.querySelector('.footer p').textContent = 
    `© ${currentYear} Karthik Reddy Jannupalli. All rights reserved.`;

// Click to Copy Email
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailLink.textContent;
        navigator.clipboard.writeText(email).then(() => {
            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.textContent = 'Email copied!';
            tooltip.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #10b981;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                font-weight: 600;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            `;
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }, 2000);
        });
    });
}

// Project Filter Functionality
window.addEventListener('load', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    console.log('✅ Filter system initialized');
    console.log('📊 Filter buttons found:', filterButtons.length);
    console.log('🎯 Project cards found:', projectCards.length);

    // Add counts to filter buttons
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        let count = 0;
        
        if (filter === 'all') {
            count = projectCards.length;
        } else {
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                if (categories && categories.includes(filter)) {
                    count++;
                }
            });
        }
        
        // Add count badge to button
        const countBadge = document.createElement('span');
        countBadge.className = 'filter-count';
        countBadge.textContent = count;
        button.appendChild(countBadge);
    });

    // Get results counter
    const resultsCounter = document.getElementById('projects-results');
    const resultsText = resultsCounter ? resultsCounter.querySelector('.results-text') : null;
    
    // Function to update results counter
    function updateResultsCounter(visibleCount, totalCount, filterName) {
        if (resultsText) {
            if (filterName === 'all') {
                resultsText.textContent = `Showing all ${totalCount} projects`;
            } else {
                resultsText.textContent = `Showing ${visibleCount} of ${totalCount} projects • ${filterName}`;
            }
        }
    }

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            const filterName = this.textContent.replace(/\d+/g, '').trim(); // Remove count number
            console.log('🔍 Filter selected:', filter);
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Count visible projects
            let visibleCount = 0;
            
            // Filter projects with staggered animation
            let visibleIndex = 0;
            projectCards.forEach((card) => {
                const categories = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || (categories && categories.includes(filter));
                
                if (shouldShow) {
                    visibleCount++;
                    // Show matching cards with staggered animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.classList.remove('hidden');
                    
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, visibleIndex * 80);
                    
                    visibleIndex++;
                } else {
                    // Hide non-matching cards immediately
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Update results counter
            updateResultsCounter(visibleCount, projectCards.length, filter === 'all' ? 'all' : filterName);
            
            console.log('👁️ Showing', visibleCount, 'projects');
        });
    });
    
    // Trigger initial animation for all projects
    setTimeout(() => {
        projectCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 500);
});

// Add CSS animation for tooltip
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    .ripple {
        position: absolute;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        border-radius: inherit;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-light);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Smooth scroll polyfill for older browsers
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

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedScroll = debounce(() => {
    highlightNavLink();
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Easter egg: Console message
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in the code? Check out the source!', 'font-size: 14px; color: #94a3b8;');
console.log('%c🚀 Built with vanilla JS, no frameworks needed!', 'font-size: 12px; color: #10b981;');
