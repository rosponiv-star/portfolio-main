// Simple Intersection Observer for basic scroll fade-ins
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Only animate once
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with slide-up class
document.querySelectorAll('.slide-up').forEach(el => {
    observer.observe(el);
});

// Basic smooth scroll for internal links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});
