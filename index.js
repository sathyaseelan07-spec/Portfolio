document.addEventListener('DOMContentLoaded', () => {
    // --- 1. SET COPYRIGHT YEAR ---
    document.getElementById('current-year').textContent = new Date().getFullYear();


    // --- 2. MOBILE NAVBAR TOGGLE (Hamburger Menu) ---
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.menu-toggle');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        // Toggle between hamburger and close icon
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('#nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('open');
                menuToggle.querySelector('i').classList.remove('fa-times');
                menuToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // --- 3. SCROLL ANIMATIONS (Intersection Observer) ---
    const elementsToAnimate = document.querySelectorAll('.fade-in, .slide-up');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing after it becomes visible
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });


    // --- 4. TESTIMONIALS CAROUSEL ---
    const carousel = document.querySelector('.testimonial-carousel');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Initialize the carousel
    slides[currentIndex].classList.add('active-slide');

    function updateCarousel() {
        const slideWidth = slides[0].clientWidth;
        // Smooth transition via CSS, using transform for performance
        carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Update active class for fade effect
        slides.forEach((slide, index) => {
            slide.classList.remove('active-slide');
            if (index === currentIndex) {
                slide.classList.add('active-slide');
            }
        });
    }

    // Next button functionality
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    // Previous button functionality
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    // Handle window resize for responsiveness
    window.addEventListener('resize', updateCarousel);
});