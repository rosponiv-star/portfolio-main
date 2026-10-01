// Intersection Observer — smooth, staggered scroll reveals
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Small stagger based on position in DOM for grouped siblings
            const siblings = entry.target.parentElement.querySelectorAll('.slide-up');
            const index = Array.from(siblings).indexOf(entry.target);
            const delay = index * 80; // 80ms between each sibling

            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('.slide-up').forEach(el => observer.observe(el));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
