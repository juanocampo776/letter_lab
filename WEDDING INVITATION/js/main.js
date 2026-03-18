document.addEventListener("DOMContentLoaded", () => {

    // --- Envelope Animation ---
    const envelopeScreen = document.getElementById('envelope-screen');
    const envelopeContainer = document.querySelector('.envelope-container');
    const envelope = document.querySelector('.envelope');

    if (envelopeScreen && envelopeContainer && envelope) {
        // Prevent scrolling during envelope screen
        document.body.classList.add('no-scroll');

        envelopeContainer.addEventListener('click', () => {
            if (!envelope.classList.contains('open')) {
                envelope.classList.add('open');
                
                // Hide envelope screen after animation finishes
                setTimeout(() => {
                    envelopeScreen.style.opacity = '0';
                    setTimeout(() => {
                        envelopeScreen.style.display = 'none';
                        document.body.classList.remove('no-scroll');
                    }, 1500); // fade out duration
                }, 2500); // wait for letter sliding up
            }
        });
    }


    // --- Copy Bank Account ---
    const copyBtn = document.getElementById('copy-account');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const accNum = document.getElementById('account-number').innerText;
            navigator.clipboard.writeText(accNum).then(() => {
                const originalContent = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span>✅</span> Copiado';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.classList.remove('copied');
                }, 2500);
            });
        });
    }

    // --- Countdown Timer ---
    // Target date: Sept 14, 2026 16:00:00 (4:00 PM)
    const targetDate = new Date("September 14, 2026 16:00:00").getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minutesEl && secondsEl) {
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // --- Scroll Animations (Intersection Observer) ---
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Lightbox Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-img';

    const lightboxClose = document.createElement('div');
    lightboxClose.className = 'lightbox-close';
    lightboxClose.innerHTML = '&times;';

    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(lightboxClose);
    document.body.appendChild(lightbox);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            // Assuming the background color trick for placeholders, we'll just check if it has a valid src and not SVG
            if (img.src && !img.src.includes('data:image/svg+xml')) {
                // If using real images
                lightboxImg.src = img.src;
            } else {
                // If using plain background colors for testing
                lightboxImg.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" style="background-color:#F3E9DC"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Playfair Display" font-size="24" fill="#C6A97A">Foto Romántica</text></svg>');
            }

            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // --- RSVP Form Handling ---
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = rsvpForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = "<span>⌛</span> Enviando...";
            btn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                btn.innerHTML = "<span>✨</span> ¡Confirmado!";
                btn.style.backgroundColor = "#4CAF50";
                btn.style.borderColor = "#4CAF50";

                // Success effect
                const canvas = document.createElement('div');
                canvas.innerHTML = "🎉";
                canvas.style.position = "fixed";
                canvas.style.bottom = "10%";
                canvas.style.left = "50%";
                canvas.style.transform = "translateX(-50%)";
                canvas.style.fontSize = "5rem";
                canvas.style.zIndex = "9999";
                canvas.style.transition = "all 1s ease";
                document.body.appendChild(canvas);
                
                setTimeout(() => {
                    canvas.style.opacity = "0";
                    canvas.style.transform = "translateX(-50%) translateY(-100px) scale(2)";
                    setTimeout(() => canvas.remove(), 1000);
                }, 100);

                rsvpForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.borderColor = "";
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
