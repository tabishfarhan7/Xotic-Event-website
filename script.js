document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('overlay');

    if (hamburger && navLinks && overlay) {
        // Toggle menu and overlay
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('open');
            overlay.classList.toggle('active');
        };

        hamburger.addEventListener('click', toggleMenu);

        // Close menu when overlay is clicked
        overlay.addEventListener('click', toggleMenu);

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a, button').forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
});