// Staggered scroll reveals
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Stagger siblings that enter together
            const parent = entry.target.parentElement;
            const siblings = parent.querySelectorAll('.slide-up');
            const idx = Array.from(siblings).indexOf(entry.target);
            const delay = idx * 90;

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// Smooth scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});
