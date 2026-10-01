// 1. Initialize Lenis for smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. Integrate GSAP with Lenis
gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// 3. Horizontal Scroll Logic (Desktop Only)
if (window.innerWidth > 768) {
    const workContainer = document.querySelector('.work-container');
    const workSection = document.querySelector('.work-horizontal');

    // Calculate how far the container needs to move left
    function getScrollAmount() {
        let containerWidth = workContainer.scrollWidth;
        return -(containerWidth - window.innerWidth);
    }

    // Create the horizontal tween
    const tween = gsap.to(workContainer, {
        x: getScrollAmount,
        ease: "none"
    });

    // Tie the tween to the vertical scroll
    ScrollTrigger.create({
        trigger: workSection,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`, // Pin duration matches the width
        pin: true,
        animation: tween,
        scrub: 1, // Smooth scrubbing effect
        invalidateOnRefresh: true // Recalculate on resize
    });
}
