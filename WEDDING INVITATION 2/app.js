document.addEventListener("DOMContentLoaded", () => {

    // --- Intro Animation & Open Invitation ---
    const envelopeScreen = document.getElementById("envelope-screen");
    const envelope = document.getElementById("envelope");
    const waxSeal = document.getElementById("wax-seal");
    const mainContent = document.getElementById("main-content");
    const btnOpen = document.getElementById("btn-open-invitation");

    // Handle envelope opening on wax seal click
    if (waxSeal && envelope && envelopeScreen) {
        waxSeal.addEventListener("click", () => {
            // 1. Open envelope flap and slide paper up
            envelope.classList.add("open");

            // 2. Wait for animations to finish, then hide envelope screen & show site
            setTimeout(() => {
                envelopeScreen.classList.add("hide-intro");
                mainContent.classList.remove("hidden");
                window.scrollTo(0, 0);
            }, 3000);
        });
    }

    // Scroll to next section smoothly on "Abrir Invitacion"
    if (btnOpen) {
        btnOpen.addEventListener("click", () => {
            const dest = document.getElementById("countdown");
            if (dest) {
                // Offset slightly because of padding
                const y = dest.getBoundingClientRect().top + window.scrollY - 50;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    }

    // --- Countdown Timer Logic ---
    // Target Date: 14 de Septiembre de 2026
    const targetDate = new Date("September 14, 2026 16:00:00").getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            return; // Target reached
        }

        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = d < 10 ? "0" + d : d;
        document.getElementById("hours").innerText = h < 10 ? "0" + h : h;
        document.getElementById("minutes").innerText = m < 10 ? "0" + m : m;
        document.getElementById("seconds").innerText = s < 10 ? "0" + s : s;
    }, 1000);

    // --- Scroll Animations (Intersection Observer) ---
    // Select all elements that need to animate on scroll
    const fadeElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-left, .fade-in-slow');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => {
        appearOnScroll.observe(el);
    });

    // --- RSVP Form Handler ---
    const rsvpForm = document.getElementById('rsvpForm');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate a success prompt
            alert("¡Gracias por confirmar tu asistencia! Tus datos han sido enviados exitosamente.");
            rsvpForm.reset();
        });
    }
});

// --- Lightbox logic (global) ---
function openLightbox(src) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightbox.style.display = "block";

    // Add a slight delay for smooth transition (since CSS has animation)
    setTimeout(() => {
        lightboxImg.src = src;
    }, 50);
}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}
