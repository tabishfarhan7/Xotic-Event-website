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

        navLinks.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // --- Animated Counters and Scroll Animations Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Check if the visible element is an achievement item for counter
                if (entry.target.classList.contains('achievement-item')) {
                    const numberElement = entry.target.querySelector('.achievement-number');
                    if (numberElement && !numberElement.classList.contains('is-animated')) {
                        numberElement.classList.add('is-animated'); // Prevents re-animating
                        animateCounter(numberElement);
                    }
                }

                // Unobserve after animation to improve performance
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Function to animate the numbers counting up
    function animateCounter(element) {
        const goal = parseInt(element.getAttribute('data-goal'));
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.abs(Math.floor(duration / goal));

        const timer = setInterval(() => {
            current += 1;
            element.textContent = `${current}+`;
            if (current >= goal) {
                clearInterval(timer);
                element.textContent = `${goal}+`; // Ensure it ends on the exact number
            }
        }, stepTime);
    }

    // --- NEW: Portfolio Filtering Logic ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update button styles
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Show/hide portfolio items
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

    // --- NEW: Testimonial Slider Logic ---
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
            showTestimonial(0); // Show the first item initially

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

            // Auto-play interval
            setInterval(() => {
                currentTestimonial = (currentTestimonial + 1) % allTestimonials.length;
                showTestimonial(currentTestimonial);
            }, 6000); // Change slide every 6 seconds
        }
    }
});