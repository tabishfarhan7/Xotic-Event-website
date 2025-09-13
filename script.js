document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');

    if (hamburger && navLinks && overlay) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            overlay.classList.toggle('active');
        };
        hamburger.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    setTimeout(toggleMenu, 300);
                }
            });
        });
    }

    const heroSwiper = new Swiper('.hero-swiper', {
        loop: true,
        effect: 'fade',
        speed: 200,
        autoplay: {
            delay: 7000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            init: function () {
                animateSlideText(this.slides[this.activeIndex]);
            },
            slideChangeTransitionStart: function () {
                this.slides.forEach(slide => {
                    gsap.to(slide.querySelectorAll('.hero-content > *'), { opacity: 0, y: 20, duration: 0 });
                });
            },
            slideChangeTransitionEnd: function () {
                animateSlideText(this.slides[this.activeIndex]);
            }
        }
    });

    function animateSlideText(activeSlide) {
        const contentElements = activeSlide.querySelectorAll('.hero-content > *');
        gsap.to(contentElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
        });
    }

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('achievement-item')) {
                    const numberElement = entry.target.querySelector('.achievement-number');
                    if (numberElement && !numberElement.classList.contains('is-animated')) {
                        numberElement.classList.add('is-animated');
                        animateCounter(numberElement);
                    }
                }
            }
        });
    }, { threshold: 0.1 });
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    function animateCounter(element) {
        const goal = parseInt(element.getAttribute('data-goal'));
        let current = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / goal));
        const timer = setInterval(() => {
            current += 1;
            element.textContent = `${current}+`;
            if (current >= goal) {
                clearInterval(timer);
                element.textContent = `${goal}+`;
            }
        }, stepTime);
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    const galleryContainer = document.getElementById('lightgallery-container');
    if (galleryContainer) {
        if (window.lgModules && window.lgModules.video) {
            lightGallery.lgModules.video = window.lgModules.video;
        }
        lightGallery(galleryContainer, {
            selector: '.portfolio-item',
            speed: 500,
            download: false,
            getCaptionFromTitleOrAlt: true,
            plugins: window.lgVideo ? [window.lgVideo] : [],
        });
    }

    const testimonialContainer = document.getElementById('testimonial-container');
    if (testimonialContainer) {
        const allTestimonials = testimonialContainer.querySelectorAll('.testimonial-item');
        const prevButton = document.getElementById('prev-testimonial');
        const nextButton = document.getElementById('next-testimonial');
        let currentTestimonial = 0;
        function showTestimonial(index) {
            allTestimonials.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }
        if (allTestimonials.length > 0) {
            showTestimonial(0);
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', () => {
                    currentTestimonial = (currentTestimonial - 1 + allTestimonials.length) % allTestimonials.length;
                    showTestimonial(currentTestimonial);
                });
                nextButton.addEventListener('click', () => {
                    currentTestimonial = (currentTestimonial + 1) % allTestimonials.length;
                    showTestimonial(currentTestimonial);
                });
            }
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % allTestimonials.length;
                showTestimonial(currentTestimonial);
            }, 6000);
        }
    }

    const serviceCards = document.querySelectorAll('.service-card[data-gallery]');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const galleryId = card.dataset.gallery;
            const galleryContainer = document.getElementById(galleryId);
            if (galleryContainer) {
                const galleryItems = Array.from(galleryContainer.children).map(el => {
                    return {
                        src: el.href,
                        thumb: el.querySelector('img').src,
                        subHtml: el.dataset.subHtml || ""
                    }
                });
                const plugin = (window.lgVideo !== undefined) ? window.lgVideo : (window.lgModules ? window.lgModules.video : undefined);
                const dynamicGallery = lightGallery(card, {
                    plugins: plugin ? [plugin] : [],
                    dynamic: true,
                    dynamicEl: galleryItems,
                    download: false,
                    speed: 500
                });
                dynamicGallery.openGallery();
            }
        });
    });
});