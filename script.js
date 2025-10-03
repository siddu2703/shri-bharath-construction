// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Animated counter for statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');

            // Animate counters when hero is visible
            if (entry.target.classList.contains('stat-number') || entry.target.classList.contains('stat-number-modern')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // 3D Scroll Animation Observer for Hero Content Section
    const scroll3DObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animate');
            } else {
                entry.target.classList.remove('scroll-animate');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe hero content section elements
    const heroTextContent = document.querySelector('.hero-text-content');
    const heroStatsModern = document.querySelector('.hero-stats-modern');

    if (heroTextContent) scroll3DObserver.observe(heroTextContent);
    if (heroStatsModern) scroll3DObserver.observe(heroStatsModern);

    // Add stagger animation to stat cards with flying effect
    document.querySelectorAll('.stat-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.25}s`;
    });

    // Observe section headers
    document.querySelectorAll('.section-tag, .section-title, .section-description').forEach(el => {
        observer.observe(el);
    });

    // Observe service cards with stagger effect
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe project cards with stagger effect
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe stat numbers
    document.querySelectorAll('.stat-number, .stat-number-modern').forEach(stat => {
        observer.observe(stat);
    });
});

// Testimonial slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');

const showTestimonial = (index) => {
    testimonials.forEach((testimonial, i) => {
        testimonial.classList.remove('active', 'prev');
        if (i === index) {
            testimonial.classList.add('active');
        } else if (i < index) {
            testimonial.classList.add('prev');
        }
    });
};

const nextTestimonial = () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
};

const prevTestimonial = () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
};

nextBtn.addEventListener('click', nextTestimonial);
prevBtn.addEventListener('click', prevTestimonial);

// Auto-advance testimonials
let testimonialInterval = setInterval(nextTestimonial, 5000);

// Pause auto-advance on hover
document.querySelector('.testimonials-slider').addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});

document.querySelector('.testimonials-slider').addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(nextTestimonial, 5000);
});

// Smooth scroll with offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with animation
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const button = contactForm.querySelector('.btn-primary');
    const originalText = button.textContent;

    // Animate button
    button.textContent = 'Sending...';
    button.style.transform = 'scale(0.95)';

    // Simulate form submission
    setTimeout(() => {
        button.textContent = '✓ Message Sent!';
        button.style.background = '#28a745';

        // Reset form
        setTimeout(() => {
            contactForm.reset();
            button.textContent = originalText;
            button.style.background = '';
            button.style.transform = '';
        }, 2000);
    }, 1500);
});

// Parallax effect for hero image and 3D scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroContentWrapper = document.querySelector('.hero-content-wrapper');

    // Hero image parallax
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(1)`;
    }

    // 3D parallax for hero content section
    if (heroContentWrapper) {
        const contentSection = document.querySelector('.hero-content-section');
        const rect = contentSection.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const scrollProgress = (scrolled - offsetTop + window.innerHeight) / window.innerHeight;

        if (scrollProgress > 0 && scrollProgress < 1.5) {
            const rotateAmount = (scrollProgress - 0.5) * 2;
            heroContentWrapper.style.transform = `perspective(1000px) rotateX(${rotateAmount}deg)`;
        }
    }
});

// Add hover effect to project cards with tilt
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Service Card Expansion - New Design
const subcategoriesData = {
    residential: {
        title: 'Residential Construction',
        subtitle: 'Building Your Dream Home',
        items: [
            { name: 'Luxury Villas', desc: 'Premium custom-built villas with modern amenities and elegant design' },
            { name: 'Independent Houses', desc: 'Standalone homes designed specifically for families' },
            { name: 'Duplex Homes', desc: 'Two-story residential buildings with elegant architecture' },
            { name: 'Farmhouses', desc: 'Spacious countryside properties with beautiful gardens' }
        ]
    },
    commercial: {
        title: 'Commercial Projects',
        subtitle: 'Professional Business Spaces',
        items: [
            { name: 'Office Buildings', desc: 'Corporate spaces with modern infrastructure and facilities' },
            { name: 'Retail Spaces', desc: 'Shopping complexes and showrooms with prime locations' },
            { name: 'Warehouses', desc: 'Industrial storage facilities with efficient layouts' },
            { name: 'Hotels & Resorts', desc: 'Hospitality construction projects with world-class amenities' }
        ]
    },
    renovation: {
        title: 'Renovation & Remodeling',
        subtitle: 'Transform Your Space',
        items: [
            { name: 'Kitchen Remodeling', desc: 'Modern kitchen upgrades with latest appliances and design' },
            { name: 'Bathroom Renovation', desc: 'Complete bathroom transformation with luxury fittings' },
            { name: 'Interior Redesign', desc: 'Full interior space makeover with contemporary aesthetics' },
            { name: 'Exterior Updates', desc: 'Facade and outdoor space renovation for curb appeal' }
        ]
    },
    design: {
        title: 'Design & Planning',
        subtitle: 'Expert Architectural Services',
        items: [
            { name: 'Architectural Design', desc: 'Complete building design and detailed blueprints' },
            { name: 'Interior Design', desc: 'Space planning and interior aesthetics consultation' },
            { name: '3D Visualization', desc: 'Realistic renders and virtual walkthroughs of projects' },
            { name: 'Structural Planning', desc: 'Engineering and structural design for safety' }
        ]
    }
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const servicesMainGrid = document.getElementById('servicesMainGrid');
    const subcategoriesContainer = document.getElementById('subcategoriesContainer');
    const subcategoriesContent = document.getElementById('subcategoriesContent');
    const closeSubcategories = document.getElementById('closeSubcategories');

    console.log('Services elements:', {
        servicesMainGrid,
        subcategoriesContainer,
        subcategoriesContent,
        closeSubcategories
    });

    if (!servicesMainGrid || !subcategoriesContainer || !subcategoriesContent || !closeSubcategories) {
        console.error('Service elements not found!');
        return;
    }

    // Make entire service card clickable
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const serviceType = card.getAttribute('data-service');
            const data = subcategoriesData[serviceType];

            // Clone the clicked card
            const cardClone = card.cloneNode(true);

            // Update subcategories content with card and images
            subcategoriesContent.innerHTML = `
                <div class="subcategories-main-card">
                    ${cardClone.outerHTML}
                </div>
                <div class="subcategories-info">
                    <h3>${data.title}</h3>
                    <h4>${data.subtitle}</h4>
                    <div class="subcategory-grid">
                        ${data.items.map(item => `
                            <div class="subcategory-item">
                                <div class="subcategory-item-image"></div>
                                <div class="subcategory-item-overlay">
                                    <h5>${item.name}</h5>
                                    <p>${item.desc}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            // Show subcategories container
            subcategoriesContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeSubcategories.addEventListener('click', () => {
        // Close subcategories
        subcategoriesContainer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Add 3D effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Cursor trail effect (optional - subtle)
const createParticle = (x, y) => {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '5px';
    particle.style.height = '5px';
    particle.style.background = 'var(--primary-color)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    particle.style.transition = 'all 0.5s ease';
    particle.style.zIndex = '9999';

    document.body.appendChild(particle);

    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = 'scale(0)';
    }, 100);

    setTimeout(() => {
        particle.remove();
    }, 600);
};

let particleTimeout;
document.addEventListener('mousemove', (e) => {
    clearTimeout(particleTimeout);
    particleTimeout = setTimeout(() => {
        if (Math.random() > 0.9) { // Only create particles occasionally
            createParticle(e.clientX, e.clientY);
        }
    }, 50);
});

// Add floating animation to icons
const floatingAnimation = () => {
    document.querySelectorAll('.service-icon, .info-icon').forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
    });
};

// Add float keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

floatingAnimation();

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add stagger animation to nav items
document.querySelectorAll('.nav-menu li').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Projects Auto-Scroll - Duplicate content for infinite loop
const projectsCollage = document.getElementById('projectsCollage');
if (projectsCollage) {
    const projectCards = projectsCollage.innerHTML;
    // Duplicate the content for seamless infinite scroll
    projectsCollage.innerHTML += projectCards;
}

console.log('🏗️ BuildPro Construction - Landing Page Loaded Successfully!');
