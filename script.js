// --- 1. Theme Toggle, OS Pref & Mobile Menu Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.documentElement;
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Check user's OS preference on initial load
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    body.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '🌙';
}

themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        body.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌓';
    } else {
        body.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙';
    }
});

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// --- 2. Typewriter Effect ---
const words = ["Developer", "Innovator", "Problem Solver", "Tech Enthusiast"];
const typewriterElement = document.getElementById('typewriter');
let wordIndex = 0; let charIndex = 0; let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1); charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1); charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;
    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 500; 
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', () => setTimeout(type, 1000));

// --- 3. Scroll Animations ---
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show'); observer.unobserve(entry.target); 
        }
    });
}, observerOptions);
document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
