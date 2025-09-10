document.addEventListener('DOMContentLoaded', () => {

    gsap.registerPlugin(ScrollTrigger);
    const body = document.body;

    const timeline = gsap.timeline();
    timeline
        .to('.loader-text', { opacity: 0, duration: 0.5, delay: 1.5 })
        .to('.loader', { y: '-100%', duration: 1, ease: 'power2.inOut' })
        .from('#header', { y: -50, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.5")
        .from('.hero-title .char', { y: 100, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.5")
        .to('.hero-title', { opacity: 1, duration: 0.1 }, "<")
        .from('.hero-subtitle', { y: 50, opacity: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6")
        .to('.scroll-indicator', { opacity: 1, duration: 1 }, "-=0.5");


    const cursor = document.querySelector('.cursor');
    const magneticElements = document.querySelectorAll('.magnetic');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: 'power2.out'
        });
        body.style.setProperty('--mouse-x', `${e.clientX}px`);
        body.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    magneticElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));

        el.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(this, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        el.addEventListener('mouseleave', function () {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });


    gsap.utils.toArray(['.section-heading', '.section-subheading', '.service-card', '.about-image-wrapper', '.about-text', '#testimonials .swiper']).forEach(el => {
        gsap.from(el, {
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' },
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: el.classList.contains('service-card') ? 0.2 : 0,
        });
    });

    document.querySelectorAll('.counter-number').forEach(counter => {
        const target = +counter.dataset.target;
        gsap.from(counter, {
            textContent: 0,
            duration: 2,
            ease: 'power1.inOut',
            snap: { textContent: 1 },
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
        });
    });


    new Swiper('.testimonials-slider', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            1200: { slidesPerView: 3, spaceBetween: 30 }
        }
    });

    const themeToggleButton = document.getElementById('theme-toggle');
    if (themeToggleButton) {
        const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
        const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
        const setTheme = (isLight) => { /* ... logic ... */ };
        const loadTheme = () => { /* ... logic ... */ };
        themeToggleButton.addEventListener('click', () => { /* ... logic ... */ });

        const setThemeFull = (isLight) => {
            body.classList.toggle('light-theme', isLight);
            themeToggleButton.innerHTML = isLight ? moonIcon : sunIcon;
            localStorage.setItem('isLightTheme', isLight);
        }
        const loadThemeFull = () => {
            const isLight = localStorage.getItem('isLightTheme') === 'true';
            setThemeFull(isLight);
        }
        themeToggleButton.addEventListener('click', () => {
            const isLight = body.classList.contains('light-theme');
            setThemeFull(!isLight);
        });
        loadThemeFull();
    }
});