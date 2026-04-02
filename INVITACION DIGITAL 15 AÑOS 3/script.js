document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
    const prologueText = document.getElementById('prologue-text');
    const hero = document.getElementById('hero');
    const rsvpKey = document.getElementById('rsvp-key-btn');
    const rsvpForm = document.getElementById('rsvp-form');
    const audio = document.getElementById('background-audio');
    const treeShadow = document.getElementById('tree-shadow');
    const eggMsg = document.getElementById('egg-message');
    const hojarascaAudio = document.getElementById('hojarasca-audio');

    // 0. Personalized Greeting from URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('invitado') || 'Invitado';
    const heroSubtitle = document.querySelector('.hero-subtitle');
    heroSubtitle.textContent = `Despierta, ${guestName}. Tu capítulo comienza ahora.`;

    // 1. Initial click to enter the experience (Open the book)
    const bookCover = document.getElementById('book-cover');
    const dustContainer = document.getElementById('fairy-dust-burst');

    const startWorld = (e) => {
        // Prevent double clicks
        document.removeEventListener('click', startWorld);
        document.removeEventListener('touchstart', startWorld);

        // Audio elements
        const bookOpenAudio = document.getElementById('book-open-audio');

        // Play audios (user interaction triggered)
        audio.volume = 1.0; // Max volume for the forest music
        bookOpenAudio.play().catch(() => { });
        audio.play().catch(err => console.log("User interaction required for audio"));

        // 1. Open the book cover (CSS rotateY)
        bookCover.classList.add('open');

        // 2. Trigger Fairy Dust Explosion
        for (let i = 0; i < 40; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');

            // Random direction from the center
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 400 + 100;
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';

            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);
            particle.style.animation = `dust-explosion ${Math.random() * 1 + 1}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;
            dustContainer.appendChild(particle);
        }

        // 3. Fade out the whole book layer and reveal hero
        setTimeout(() => {
            prologue.style.opacity = '0';
            setTimeout(() => {
                prologue.style.display = 'none';
                hero.classList.add('active'); // Light up the hero photo
            }, 2000);
        }, 1500); // Wait for the book to finish opening before fading out
    };

    // Attach to the prologue container
    prologue.addEventListener('click', startWorld);
    prologue.addEventListener('touchstart', startWorld);

    // 2. Fireflies Generation (Enhanced)
    const fireflyCount = 30;
    const container = document.getElementById('fireflies-container');
    for (let i = 0; i < fireflyCount; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.left = Math.random() * 100 + 'vw';
        firefly.style.top = Math.random() * 100 + 'vh';

        const animationTime = Math.random() * 10 + 10;
        firefly.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
        firefly.style.setProperty('--y', (Math.random() * 200 - 100) + 'px');
        firefly.style.animation = `fly-fire ${animationTime}s infinite alternate`;
        firefly.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(firefly);
    }

    // 3. Countdown Logic - April 20th, 2026
    const eventTime = new Date('April 20, 2026 20:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = eventTime - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = mins.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
        }
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 4. Parallax 3D Tilt for Cards
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const cardX = e.clientX - rect.left;
                const cardY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((cardY - centerY) / centerY) * -5;
                const rotateY = ((cardX - centerX) / centerX) * 5;

                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    });

    // 5. Audio Management (Hojarasca)
    let lastScrollSound = 0;
    window.addEventListener('scroll', () => {
        if (prologue.style.display === 'none') {
            const now = Date.now();
            if (now - lastScrollSound > 3500) {
                hojarascaAudio.currentTime = 0;
                hojarascaAudio.volume = 0.35;
                hojarascaAudio.play().catch(() => { });
                lastScrollSound = now;
            }
        }
    });

    // 6. RSVP Flow (The Unlocking Ceremony)
    rsvpKey.addEventListener('click', () => {
        rsvpKey.classList.add('key-unlocking');
        document.getElementById('rsvp-instruction').textContent = 'El cerrojo se ha abierto...';
        setTimeout(() => {
            rsvpForm.style.display = 'block';
            rsvpForm.classList.add('fade-in-up');
            rsvpForm.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });

    // 7. Intersection Observer for Scroll Hints
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => observer.observe(card));

    // Scroll Hint Navigation
    document.getElementById('scroll-hint').addEventListener('click', () => {
        document.getElementById('location').scrollIntoView({ behavior: 'smooth' });
    });

    // Compass Map Redirect
    const compass = document.getElementById('open-map');
    compass.addEventListener('click', () => {
        compass.style.transform = 'scale(0.95) rotate(180deg)';
        setTimeout(() => {
            window.open('https://www.google.com/maps/place/Hacienda+El+Bosque', '_blank');
            compass.style.transform = '';
        }, 800);
    });

    // RSVP WhatsApp Integration
    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const guestInput = document.getElementById('guest-name').value;
        const attendanceInput = document.getElementById('attendance').value;
        const requestsInput = document.getElementById('requests').value;

        let attendanceText = '';
        let closingText = '';

        if (attendanceInput === 'si') {
            attendanceText = '*¡Sí, allí estaré!* ✨';
            closingText = '¡Nos vemos pronto en el Claro de la Luna! 🌕🌲';
        } else {
            attendanceText = '*Lo siento, no puedo asistir...* 🍂';
            closingText = '¡Deseo que tengas una noche mágica y llena de luz! ✨✨';
        }

        // Themed Message for WhatsApp
        const message = `🌿✨ *¡Saludos, Isabella!* ✨🌿\n\nHe recibido el susurro del bosque. Soy *${guestInput}* y mi destino ya está sellado: ${attendanceText}.\n${requestsInput ? '\n📜 *Mensaje desde mi corazón:* ' + requestsInput : ''}\n\n${closingText}`;

        const whatsappUrl = `https://wa.me/573006563447?text=${encodeURIComponent(message)}`;

        // Visual feedback before redirect
        const btn = rsvpForm.querySelector('button');
        btn.textContent = 'Enviando Mensaje...';

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.textContent = 'SELLAR PERGAMINO';
        }, 800);
    });
});
