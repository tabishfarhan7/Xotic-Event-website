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

                // New: Check if the visible element is an achievement item
                if (entry.target.classList.contains('achievement-item')) {
                    const numberElement = entry.target.querySelector('.achievement-number');
                    if (numberElement && !numberElement.classList.contains('is-animated')) {
                        numberElement.classList.add('is-animated'); // Prevents re-animating
                        animateCounter(numberElement);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // New: Function to animate the numbers counting up
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
});