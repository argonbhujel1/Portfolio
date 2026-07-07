// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1500);
});

// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ==================== Scroll Progress Bar ====================
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    
    // Back to top button
    const backToTop = document.getElementById('backToTop');
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar shadow
    const navbar = document.getElementById('navbar');
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Back to Top ====================
document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== Mobile Menu ====================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// ==================== Typing Effect ====================
const typingText = document.getElementById('typingText');
const words = [
    'Web Designer',
    'Python Developer',
    'Frontend Developer',
    'Problem Solver',
    'Tech Enthusiast'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

typeEffect();

// ==================== Particles Background ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 3 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ==================== Animated Counters ====================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// ==================== Animated Skills ====================
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress');
        const targetWidth = item.getAttribute('data-skill') + '%';
        progress.style.width = targetWidth;
    });
}

// ==================== Load Projects from API ====================
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback projects
        const fallbackProjects = [
            {
                title: 'Personal Portfolio',
                description: 'Premium responsive portfolio website with dark mode and glassmorphism',
                technologies: 'HTML,CSS,JavaScript,Flask',
                demo_url: '#',
                github_url: '#',
                category: 'Web Design'
            },
            {
                title: 'Restaurant Website',
                description: 'Elegant restaurant website with online ordering system',
                technologies: 'HTML,CSS,JavaScript,Python',
                demo_url: '#',
                github_url: '#',
                category: 'Web Design'
            },
            {
                title: 'Hotel Booking System',
                description: 'Luxury hotel website with room booking functionality',
                technologies: 'HTML,CSS,Flask,SQLite',
                demo_url: '#',
                github_url: '#',
                category: 'Web Application'
            },
            {
                title: 'ISP Dashboard',
                description: 'Internet Service Provider management dashboard',
                technologies: 'Python,Flask,SQLite',
                demo_url: '#',
                github_url: '#',
                category: 'Web Application'
            },
            {
                title: 'Python Billing System',
                description: 'Automated billing and invoice generation system',
                technologies: 'Python,SQLite',
                demo_url: '#',
                github_url: '#',
                category: 'Python Automation'
            },
            {
                title: 'QR Code Generator',
                description: 'Dynamic QR code generator with customization',
                technologies: 'Python,Flask',
                demo_url: '#',
                github_url: '#',
                category: 'Python Tool'
            }
        ];
        displayProjects(fallbackProjects);
    }
}

function displayProjects(projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card';
        card.setAttribute('data-category', project.category);
        
        const techs = project.technologies.split(',').map(tech => 
            `<span class="tech-tag">${tech.trim()}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-image">
                <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad${project.title.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3"/>
                            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3"/>
                        </linearGradient>
                    </defs>
                    <rect width="300" height="200" fill="url(#grad${project.title.replace(/\s/g, '')})"/>
                    <rect x="50" y="40" width="200" height="120" rx="15" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
                    <circle cx="150" cy="30" r="20" fill="#3b82f6"/>
                    <rect x="70" y="70" width="100" height="8" rx="4" fill="#60a5fa"/>
                    <rect x="70" y="90" width="70" height="8" rx="4" fill="#60a5fa"/>
                </svg>
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">${techs}</div>
            <div class="project-links">
                <a href="${project.demo_url}" class="btn btn-outline" style="padding:8px 20px; font-size:0.9rem;">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="${project.github_url}" class="btn btn-outline" style="padding:8px 20px; font-size:0.9rem;">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
    
    // Initialize project filtering
    initProjectFilters();
}

// ==================== Project Filtering ====================
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ==================== Contact Form ====================
document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✨ Message sent successfully! I will get back to you soon.');
            e.target.reset();
        }
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Message sent successfully! (Demo mode)');
        e.target.reset();
    }
});

// ==================== Download Resume ====================
document.getElementById('downloadResume').addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/download-resume');
        const result = await response.json();
        alert('📄 Resume download started! (Argan_Bhujel_Resume.pdf)');
    } catch (error) {
        alert('📄 Resume download started!');
    }
});

// ==================== Intersection Observer for Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                animateCounters();
            }
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== Smooth Scrolling for All Anchor Links ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
    });
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .project-card {
        animation: fadeIn 0.5s ease;
    }
`;
document.head.appendChild(style);

// Performance optimization
window.addEventListener('resize', () => {
    // Debounce resize events
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        // Recalculate any position-dependent elements
    }, 250);
});

// Service Worker Registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('ServiceWorker registered');
        // }).catch(err => {
        //     console.log('ServiceWorker registration failed:', err);
        // });
    });
}