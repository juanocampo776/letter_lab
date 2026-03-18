// Global Lightbox Functions
window.openLightbox = function (src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "flex";
    lightbox.style.justifyContent = "center";
    lightbox.style.alignItems = "center";
    lightboxImg.src = src;
    document.body.classList.add('no-scroll');
};

window.closeLightbox = function () {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    document.body.classList.remove('no-scroll');
};

document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const btnOpen = document.getElementById('btn-open-invitation');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');

    // Prevent scrolling while on intro
    document.body.classList.add('no-scroll');

    // Make stars/sparkles in intro screen
    createSparkles();

    // Event Listener for "Abrir invitación"
    btnOpen.addEventListener('click', () => {
        // Fade out intro
        introScreen.classList.add('hide');

        // After transition, hide it completely from DOM flow and show main content
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden-content');
            mainContent.classList.add('show');
            document.body.classList.remove('no-scroll');

            // Trigger Hero animations
            triggerHeroAnimations();

        }, 1500); // matches the CSS transition time
    });

    // Intersection Observer for Scroll Animations (Reveal)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // trigger when 15% visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    // Observe elements with .reveal class
    function observeElements() {
        const reveals = document.querySelectorAll('.reveal:not(.active)');
        reveals.forEach(el => revealObserver.observe(el));
    }

    // Initial call to observe elements on page load
    observeElements();

    // Helpers
    function triggerHeroAnimations() {
        // Find elements inside hero to reveal immediately
        const heroReveals = document.querySelectorAll('#hero .reveal');
        heroReveals.forEach(el => {
            el.classList.add('active');
        });
    }

    function createSparkles() {
        const container = document.querySelector('.intro-decorations');
        if (!container) return;

        const colors = ['#b8860b', '#ffd700', '#FFFFFF', '#fce4ec'];

        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            const size = Math.random() * 5 + 2;
            sparkle.style.position = 'absolute';
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            sparkle.style.borderRadius = '50%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.opacity = Math.random() * 0.7 + 0.3;
            sparkle.style.boxShadow = `0 0 ${Math.random() * 15 + 5}px ${sparkle.style.backgroundColor}`;

            // More varied animation
            const duration = Math.random() * 4 + 3;
            sparkle.style.animation = `float ${duration}s ease-in-out infinite`;
            sparkle.style.animationDelay = `${Math.random() * 5}s`;

            // Random scale animation too
            sparkle.animate([
                { transform: 'scale(1)', opacity: 0.3 },
                { transform: 'scale(1.5)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0.3 }
            ], {
                duration: Math.random() * 3000 + 2000,
                iterations: Infinity,
                easing: 'ease-in-out'
            });

            container.appendChild(sparkle);
        }
    }

    // Countdown Timer Logic
    function startCountdown() {
        // Event Date: 12 de Octubre de 2026 21:00:00
        const countDownDate = new Date("Oct 12, 2026 21:00:00").getTime();

        const x = setInterval(function () {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(x);
                document.getElementById("days").innerHTML = "00";
                document.getElementById("hours").innerHTML = "00";
                document.getElementById("minutes").innerHTML = "00";
                document.getElementById("seconds").innerHTML = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
            document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
            document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
            document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        }, 1000);
    }

    startCountdown();
});
