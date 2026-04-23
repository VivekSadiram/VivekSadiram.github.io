document.addEventListener('DOMContentLoaded', () => {

    // --- 1. OS-Aware Light/Dark Mode Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check system preference and local storage
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        htmlElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
    } else {
        // Default to OS preference if no local storage, else dark (set in HTML)
        const themeToSet = prefersDarkScheme.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', themeToSet);
        updateThemeIcon(themeToSet);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentDataTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentDataTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun'; // Show sun to toggle light
        } else {
            themeIcon.className = 'fas fa-moon'; // Show moon to toggle dark
        }
    }

    // --- 2. Mobile Menu Fullscreen Overlay ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const menuIcon = menuToggle.querySelector('i');

    function toggleMenu() {
        mobileOverlay.classList.toggle('active');
        const isActive = mobileOverlay.classList.contains('active');
        
        // Toggle icon between hamburger and close
        menuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }

    menuToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- 3. Typing Effect ---
    const typingTextElement = document.querySelector('.typing-text');
    const words = JSON.parse(typingTextElement.dataset.words);
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    
    // Start typing effect slightly after load
    setTimeout(type, 1000);

    // --- 4. Intersection Observer for Scroll Reveal Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing once revealed
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-card').forEach(card => {
        revealObserver.observe(card);
    });
});
