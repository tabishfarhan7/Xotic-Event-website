// preloader.js

document.addEventListener('DOMContentLoaded', () => {
    // Select the preloader elements
    const preloader = document.querySelector('.preloader');
    const preloaderLogo = document.querySelector('.preloader-logo');

    // Ensure elements exist before running animations
    if (preloader && preloaderLogo) {

        // Create a GSAP timeline for a controlled sequence
        const tl = gsap.timeline();

        // 1. Fade the logo in
        tl.to(preloaderLogo, {
            opacity: 1,
            duration: 1.5, // Slower fade-in for a premium feel
            ease: 'power2.inOut'
        })
            // 2. Hold the logo for a moment, then fade it out
            .to(preloaderLogo, {
                opacity: 0,
                duration: 0.8,
                delay: 0.5, // The pause duration
                ease: 'power2.inOut'
            })
            // 3. Slide the preloader screen up
            .to(preloader, {
                y: '-100%',
                duration: 1.2, // A slightly slower, more elegant exit
                ease: 'expo.inOut'
            }, "-=0.5"); // Overlap animations slightly for a smoother transition
    }
});