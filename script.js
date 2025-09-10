document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);
    const body = document.body;

    const timeline = gsap.timeline();
    timeline
        .to('.loader-text', {
            opacity: 0,
            duration: 0.5,
            delay: 1.5
        })
        .to('.loader', {
            y: '-100%',
            duration: 1,
            ease: 'power2.inOut'
        })
        .from('#header', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, "-=0.5")
        .from('.hero-title .char', {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'back.out(1.7)'
        }, "-=0.5")
        .to('.hero-title', {
            opacity: 1,
            duration: 0.1
        }, "<")
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        }, "-=0.6")
        .to('.scroll-indicator', {
            opacity: 1,
            duration: 1,
        }, "-=0.5");


    document.addEventListener('mousemove', (e) => {
        body.style.setProperty('--mouse-x', `${e.clientX}px`);
        body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });


    const sectionHeadings = document.querySelectorAll('.section-heading');
    sectionHeadings.forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                end: 'bottom 60%',
                toggleActions: 'play none none reverse',
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    const sectionSubheadings = document.querySelectorAll('.section-subheading');
    sectionSubheadings.forEach(sub => {
        gsap.from(sub, {
            scrollTrigger: {
                trigger: sub,
                start: 'top 90%',
                end: 'bottom 70%',
                toggleActions: 'play none none reverse',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power2.out'
        });
    });

    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '#services',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    gsap.from('#contact > div > *', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    });


    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        const moonIcon = `<svg xmlns="http://www.w.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const sunIcon = `<svg xmlns="http://www.w.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

        const setTheme = (isLight) => {
            body.classList.toggle('light-theme', isLight);
            themeToggleButton.innerHTML = isLight ? moonIcon : sunIcon;
            localStorage.setItem('isLightTheme', isLight);
        }

        const loadTheme = () => {
            const isLight = localStorage.getItem('isLightTheme') === 'true';
            setTheme(isLight);
        }

        themeToggleButton.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            setTheme(!isLight);
        });

        loadTheme();
    }
});