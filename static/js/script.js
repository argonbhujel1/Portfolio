// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ==================== Theme Management ====================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or use device preference
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

// ==================== Scroll Progress & Back to Top ====================
const progressBar = document.getElementById('progressBar');
const backToTop = document.getElementById('backToTop');
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = progress + '%';
    
    // Back to top button
    if (scrollTop > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Navbar shadow
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== Mobile Menu ====================
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ==================== Typing Effect ====================
const typingText = document.getElementById('typingText');
const words = [
    'Web Designer',
    'Python Developer',
    'Frontend Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'Support Associate'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

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
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
}

// Start typing effect
setTimeout(typeEffect, 1000);

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

// ==================== Projects Data ====================
const projectsData = [
    {
        title: 'Personal Portfolio',
        description: 'Premium responsive portfolio website with dark mode, glassmorphism, and smooth animations',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        category: 'web-design',
        gradient: ['#3b82f6', '#8b5cf6']
    },
    {
        title: 'Restaurant Website',
        description: 'Elegant restaurant website with online menu, reservation system, and photo gallery',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Python'],
        category: 'web-design',
        gradient: ['#ef4444', '#f59e0b']
    },
    {
        title: 'Hotel Booking System',
        description: 'Luxury hotel website with room booking, availability check, and contact forms',
        technologies: ['HTML', 'CSS', 'Flask', 'SQLite'],
        category: 'web-app',
        gradient: ['#8b5cf6', '#6366f1']
    },
    {
        title: 'ISP Dashboard',
        description: 'Internet Service Provider management dashboard with customer and bandwidth monitoring',
        technologies: ['Python', 'Flask', 'SQLite', 'Chart.js'],
        category: 'web-app',
        gradient: ['#06b6d4', '#3b82f6']
    },
    {
        title: 'Python Billing System',
        description: 'Automated billing and invoice generation system with PDF export and email',
        technologies: ['Python', 'SQLite', 'ReportLab'],
        category: 'python',
        gradient: ['#10b981', '#059669']
    },
    {
        title: 'Attendance System',
        description: 'Employee attendance tracking system with reports, analytics, and export features',
        technologies: ['Python', 'Flask', 'SQLite'],
        category: 'python',
        gradient: ['#f59e0b', '#d97706']
    },
    {
        title: 'QR Code Generator',
        description: 'Dynamic QR code generator with logo embedding, colors, and bulk generation',
        technologies: ['Python', 'Flask', 'qrcode'],
        category: 'python',
        gradient: ['#6366f1', '#4f46e5']
    },
    {
        title: 'Weather Dashboard',
        description: 'Real-time weather dashboard with 5-day forecast, maps, and location search',
        technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
        category: 'web-app',
        gradient: ['#3b82f6', '#2563eb']
    },
    {
        title: 'Business Website',
        description: 'Professional business website with services, team, portfolio, and contact sections',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        category: 'web-design',
        gradient: ['#0ea5e9', '#0284c7']
    }
];

// ==================== Generate SVG for Projects ====================
function generateProjectSVG(title, gradient) {
    const color1 = gradient[0];
    const color2 = gradient[1];
    
    return `
        <svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad_${title.replace(/\s/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${color1};stop-opacity:0.3"/>
                    <stop offset="100%" style="stop-color:${color2};stop-opacity:0.3"/>
                </linearGradient>
            </defs>
            <rect width="400" height="250" fill="url(#grad_${title.replace(/\s/g, '')})"/>
            <rect x="50" y="30" width="300" height="190" rx="20" fill="#1e293b" stroke="${color1}" stroke-width="3" opacity="0.9"/>
            <circle cx="200" cy="20" r="25" fill="${color1}" opacity="0.8"/>
            <rect x="80" y="80" width="150" height="12" rx="6" fill="${color1}" opacity="0.7"/>
            <rect x="80" y="105" width="110" height="12" rx="6" fill="${color1}" opacity="0.5"/>
            <rect x="80" y="130" width="130" height="12" rx="6" fill="${color1}" opacity="0.6"/>
            <rect x="80" y="155" width="90" height="12" rx="6" fill="${color1}" opacity="0.4"/>
            <circle cx="330" cy="200" r="15" fill="${color2}" opacity="0.5"/>
        </svg>
    `;
}

// ==================== Render Projects ====================
function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);
    
    filteredProjects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = 'project-card glass-card';
        card.setAttribute('data-category', project.category);
        card.style.animationDelay = `${index * 0.1}s`;
        
        const techTags = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-image">
                ${generateProjectSVG(project.title, project.gradient)}
            </div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">${techTags}</div>
            <div class="project-links">
                <a href="#" class="btn btn-outline" style="padding:8px 20px; font-size:0.85rem;" onclick="alert('Live demo coming soon!')">
                    <i class="fas fa-external-link-alt"></i> Live Demo
                </a>
                <a href="#" class="btn btn-outline" style="padding:8px 20px; font-size:0.85rem;" onclick="alert('View on GitHub')">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// ==================== Project Filtering ====================
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        renderProjects(filter);
    });
});

// ==================== Animated Counters ====================
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// ==================== Animated Skills ====================
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        const progress = item.querySelector('.skill-progress');
        const targetWidth = item.getAttribute('data-skill') + '%';
        
        setTimeout(() => {
            progress.style.width = targetWidth;
        }, index * 100);
    });
}

// ==================== Intersection Observer ====================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            
            if (sectionId === 'about') {
                document.querySelectorAll('.stat-number').forEach(counter => {
                    animateCounter(counter);
                });
            }
            
            if (sectionId === 'skills') {
                animateSkills();
            }
            
            // Unobserve after animation
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// ==================== Contact Form ====================
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // In a static site, we can't send to backend, so show success message
    // In production, you'd connect this to an API endpoint
    console.log('Form submitted:', formData);
    
    alert('✨ Thank you for your message! I will get back to you soon.\n\nFor immediate contact:\n📧 contact@arganbhujel.info.np\n📞 +977 9714064931');
    
    e.target.reset();
});

// ==================== Download Resume ====================
document.getElementById('downloadResume').addEventListener('click', () => {
    // Create a simple text resume for demo
    const resumeContent = `
ARGAN BHUJEL
Web Designer & Python Developer
Dharan, Koshi Province, Nepal

CONTACT
📧 contact@arganbhujel.info.np
📞 +977 9714064931
🌐 arganbhujel.info.np

SKILLS
• Frontend: HTML5, CSS3, JavaScript, Responsive Design
• Backend: Python, Flask, SQLite
• Tools: Git, GitHub, VS Code, Linux, Termux
• Other: Cloudflare, cPanel, DNS Management, Networking

EXPERIENCE
Support Associate - iZone Pvt. Ltd.
• Customer & Technical Support
• Internet Troubleshooting & Network Diagnostics
• DNS Configuration & Hosting Support
• Ticket Management & Website Assistance

EDUCATION & CERTIFICATES
• Python Development Certification
• Web Design Professional Certification
• Flask Framework Certification

PROJECTS
• Personal Portfolio Website
• Restaurant & Hotel Websites
• ISP Dashboard
• Python Billing System
• QR Code Generator
• Weather Dashboard
    `.trim();
    
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Argan_Bhujel_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('📄 Resume downloaded successfully!\n\nFor PDF version, please contact me at:\n📧 contact@arganbhujel.info.np');
});

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== 404 Error Handler ====================
function showError() {
    document.getElementById('errorOverlay').style.display = 'flex';
}

function hideError() {
    document.getElementById('errorOverlay').style.display = 'none';
}

// Handle hash changes for potential 404
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const validHashes = ['#home', '#about', '#skills', '#projects', '#services', '#experience', '#certificates', '#contact'];
    
    if (hash && !validHashes.includes(hash)) {
        showError();
    }
});

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', () => {
    // Render all projects initially
    renderProjects('all');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Press 'T' to toggle theme
        if (e.key === 't' && e.ctrlKey) {
            e.preventDefault();
            themeToggle.click();
        }
    });
    
    // Log welcome message
    console.log(`
    ╔══════════════════════════════════════╗
    ║   Welcome to Argan Bhujel's        ║
    ║   Premium Portfolio Website        ║
    ║                                  ║
    ║   🚀 Web Designer                ║
    ║   🐍 Python Developer            ║
    ║   📍 Dharan, Nepal              ║
    ║                                  ║
    ║   📧 contact@arganbhujel.info.np ║
    ╚══════════════════════════════════════╝
    `);
});

// ==================== Performance Optimization ====================
// Debounce function for resize events
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

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any position-dependent elements if needed
}, 250));

// ==================== Service Worker Registration (Optional PWA) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment to enable PWA functionality
        // navigator.serviceWorker.register('/sw.js').then(registration => {
        //     console.log('ServiceWorker registered:', registration.scope);
        // }).catch(err => {
        //     console.log('ServiceWorker registration failed:', err);
        // });
    });
}