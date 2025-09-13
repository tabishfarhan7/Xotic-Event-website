document.addEventListener('DOMContentLoaded', () => {
    // --- Hamburger Menu Logic ---
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

        // MODIFIED: Added a delay to ensure scrolling starts before the menu closes.
        navLinks.querySelectorAll('a').forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    setTimeout(toggleMenu, 300);
                }
            });
        });
    }

    // --- Animated Counters and Scroll Animations Logic (IntersectionObserver) ---
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

    // --- Portfolio Filtering Logic ---
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

    // --- LightGallery Initialization (portfolio static gallery) ---
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

    // --- Testimonial Slider Logic ---
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

    // --- Dynamic Galleries for Services Section ---
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

    // --- Single Post Gallery Trigger (videos and images) ---




    // --- Why Us Accordion Logic ---
    // const accordionItems = document.querySelectorAll('.accordion-item');
    // const accordionImages = document.querySelectorAll('.why-us-image-wrapper');

    // accordionItems.forEach(item => {
    //     const header = item.querySelector('.accordion-header');
    //     header.addEventListener('click', () => {
    //         const itemNumber = header.dataset.accordion;
    //         const isActive = item.classList.contains('active');

    //         accordionItems.forEach(otherItem => {
    //             otherItem.classList.remove('active');
    //         });
    //         accordionImages.forEach(image => {
    //             image.classList.remove('active');
    //         });

    //         if (!isActive) {
    //             item.classList.add('active');
    //             document.querySelector(`.why-us-image-wrapper[data-image="${itemNumber}"]`).classList.add('active');
    //         }
    //     });
    // });
});