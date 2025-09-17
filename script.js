document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');

    // --- Mobile Menu Logic ---
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

    // --- Hero Swiper ---
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
                    gsap.to(slide.querySelectorAll('.hero-content > *'), {
                        opacity: 0,
                        y: 20,
                        duration: 0
                    });
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

    // --- Scroll Animations & Counter ---
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
    }, {
        threshold: 0.1
    });
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

    // --- (REMOVED) Old Portfolio Filter ---
    // The portfolio section this belonged to was deleted from the HTML.

    // --- Testimonial Slider ---
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

    // --- [NEW] Fancybox Dynamic Gallery for Service Cards ---
    const serviceCards = document.querySelectorAll('.service-card[data-gallery]');
    serviceCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const galleryId = card.dataset.gallery;
            const galleryContainer = document.getElementById(galleryId);

            if (galleryContainer) {
                const galleryLinks = galleryContainer.querySelectorAll('a');
                const galleryItems = Array.from(galleryLinks).map(link => {
                    return {
                        src: link.href,
                        thumb: link.querySelector('img').src,
                        caption: link.dataset.subHtml || '' // Fancybox uses 'caption'
                    };
                });

                if (galleryItems.length > 0) {
                    Fancybox.show(galleryItems, {
                        Thumbs: {
                            autoStart: true,
                        },
                        Toolbar: {
                            display: {
                                left: ["infobar"],
                                middle: [],
                                right: ["thumbs", "close"],
                            },
                        },
                    });
                }
            }
        });
    });

    // --- Reels Loading Animation ---
    const reelCards = document.querySelectorAll('.reel-card');
    reelCards.forEach(card => {
        card.classList.add('loading');
        const img = card.querySelector('img');
        if (img) {
            if (img.complete) {
                card.classList.remove('loading');
            } else {
                img.addEventListener('load', () => card.classList.remove('loading'));
                img.addEventListener('error', () => card.classList.remove('loading'));
            }
        } else {
            card.classList.remove('loading');
        }
    });

    // --- Fancybox Initialization for Reels Gallery ---
    Fancybox.bind('[data-fancybox="reels-gallery"]', {
        mainClass: 'fancybox-reel',
        on: {
            load: (fancybox, slide) => {
                const iframe = slide.$el.querySelector('iframe');
                if (iframe) {
                    iframe.addEventListener('load', () => {
                        slide.$el.classList.remove('loading');
                    });
                }
            }
        },
        touch: {
            vertical: false,
            momentum: true
        },
        idle: false,
        animated: true,
        showClass: 'f-zoom-in',
        hideClass: 'f-zoom-out',
        dragToClose: true,
        contentClick: 'close',
    });
});