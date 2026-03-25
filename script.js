// ===== Typing Animation (only on home page) =====
const typingEl = document.getElementById('typing-text');

if (typingEl) {
    const typingTexts = [
        'print("Hello, Security!")',
        'nmap -sV target',
        'openssl enc -aes-256-cbc',
        'ollama run exaone3.5',
        'gpio readall',
        'tailscale status',
        'console.log("Portfolio");',
        'sage: factor(n)',
        'whisper --model base',
        'echo "Hack the Planet"',
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const current = typingTexts[textIndex];

        if (isDeleting) {
            typingEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === current.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}

// ===== Navbar Scroll Effect (only on home page) =====
const navbar = document.getElementById('navbar');

if (navbar && !navbar.classList.contains('scrolled')) {
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// ===== Mobile Menu Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// ===== Scroll Reveal Animation =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.lang-card, .security-card, .project-card').forEach(card => {
    observer.observe(card);
});

// ===== Progress Bar Animation =====
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target.querySelector('.lang-progress');
            if (bar) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.lang-card').forEach(card => {
    barObserver.observe(card);
});
