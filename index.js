document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Fixed Navbar and Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-resume-download-btn');

    const toggleMobileNav = () => {
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : 'auto';
    };

    hamburger.addEventListener('click', toggleMobileNav);
    closeBtn.addEventListener('click', toggleMobileNav);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('open')) {
                toggleMobileNav(); // Close menu after clicking a link
            }
        });
    });

    // --- 2. Smooth Scrolling for Navbar Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 3. Dynamic Typing Effect (Hacker Feel) ---
    const dynamicTextElement = document.querySelector('.dynamic-text');
    const texts = ["Database Test Engineer", "SQL Expert", "QA Specialist", "Data Validation Pro"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 75; // Faster deletion
        } else {
            charIndex++;
            typingSpeed = 150; // Normal typing
        }

        dynamicTextElement.textContent = currentText.substring(0, charIndex) + " |";

        if (!isDeleting && charIndex === currentText.length) {
            // Pause at end of line
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500; // Pause before starting new word
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter(); // Start the effect

    // --- 4. Scroll Reveal Animations (Intersection Observer) ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, { 
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: '0px 0px -50px 0px' // Slightly delayed trigger
    });

    // Elements to animate:
    document.querySelectorAll('.objective-container, .skill-group, .project-card').forEach(element => {
        observer.observe(element);
    });

    // --- 5. Testimonials Carousel Initialization ---
    $('.testimonial-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        cssEase: 'ease-in-out'
    });
    
    // --- 6. Set Current Year for Footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();
});