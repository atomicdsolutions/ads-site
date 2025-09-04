// Hero Carousel & Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    
    // Hero Carousel Functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        showSlide(next);
    }
    
    function prevSlide() {
        const prev = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(prev);
    }
    
    // Event listeners for carousel controls
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // Auto-play carousel (optional - uncomment to enable)
    // setInterval(nextSlide, 6000);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Touch/swipe support for mobile
    let startX = null;
    let startY = null;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        
        let diffX = startX - endX;
        let diffY = startY - endY;
        
        // Only process horizontal swipes that are longer than vertical
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
        
        startX = null;
        startY = null;
    });
    const hamburger = document.querySelector('.hamburger');
    const navMenuMobile = document.querySelector('.nav-menu-mobile');

    if (hamburger && navMenuMobile) {
        hamburger.addEventListener('click', function() {
            // Toggle hamburger animation
            const bars = hamburger.querySelectorAll('span');
            bars[0].classList.toggle('rotate-45');
            bars[0].classList.toggle('translate-y-2');
            bars[1].classList.toggle('opacity-0');
            bars[2].classList.toggle('-rotate-45');
            bars[2].classList.toggle('-translate-y-2');
            
            // Toggle mobile menu visibility
            navMenuMobile.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.nav-menu-mobile a').forEach(link => {
        link.addEventListener('click', function() {
            if (navMenuMobile) {
                navMenuMobile.classList.add('hidden');
                
                // Reset hamburger animation
                const bars = hamburger.querySelectorAll('span');
                bars[0].classList.remove('rotate-45', 'translate-y-2');
                bars[1].classList.remove('opacity-0');
                bars[2].classList.remove('-rotate-45', '-translate-y-2');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background change on scroll
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.remove('bg-white');
                header.classList.add('bg-white/95', 'backdrop-blur-md');
            } else {
                header.classList.add('bg-white');
                header.classList.remove('bg-white/95', 'backdrop-blur-md');
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }, observerOptions);

    // Observe service cards and other elements for animation
    document.querySelectorAll('[class*="hover:-translate-y-2"]').forEach(card => {
        card.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
        observer.observe(card);
    });

    // Form validation function (for future use)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add click tracking for buttons (for analytics)
    document.querySelectorAll('a[class*="bg-white"], a[class*="btn"]').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const isWhiteButton = this.classList.contains('bg-white');
            const buttonType = isWhiteButton ? 'primary' : 'secondary';
            
            // Log button click (replace with your analytics tracking)
            console.log(`Button clicked: ${buttonText} (${buttonType})`);
        });
    });

    // Add loading states to buttons
    document.querySelectorAll('a[href="#contact"]').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.classList.add('opacity-75', 'cursor-not-allowed');
            
            // Reset after a short delay (replace with actual form submission logic)
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('opacity-75', 'cursor-not-allowed');
            }, 2000);
        });
    });

    // Dark Mode Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const sunIcon = darkModeToggle?.querySelector('.sun-icon');
    const moonIcon = darkModeToggle?.querySelector('.moon-icon');
    
    // Check for saved dark mode preference or default to light mode
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || 
                       (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        if (sunIcon && moonIcon) {
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
        }
    }
    
    // Dark mode toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('darkMode', isDark);
            
            if (sunIcon && moonIcon) {
                if (isDark) {
                    sunIcon.classList.add('hidden');
                    moonIcon.classList.remove('hidden');
                } else {
                    sunIcon.classList.remove('hidden');
                    moonIcon.classList.add('hidden');
                }
            }
        });
    }

    // Enhanced card animations and interactions
    const cards = document.querySelectorAll('[class*="hover:-translate-y-2"]');
    cards.forEach(card => {
        card.classList.add('card-hover');
        
        // Add ripple effect on click
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('div');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(71, 159, 248, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Parallax effect for floating elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating, .parallax-slow');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallax() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallax);

    // Enhanced smooth reveal animations (only for specific elements, not sections)
    const revealElements = document.querySelectorAll('.card-hover, h2:not(section h2), h3:not(section h3)');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        
        revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            revealObserver.observe(el);
        });
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});