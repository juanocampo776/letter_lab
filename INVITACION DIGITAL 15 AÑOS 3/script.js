document.addEventListener('DOMContentLoaded', () => {
    const prologue = document.getElementById('prologue');
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

    // 1. Fairy Tale Book Opening
    const bookCover = document.getElementById('book-cover');
    const dustContainer = document.getElementById('fairy-dust-burst');

    const startWorld = (e) => {
        document.removeEventListener('click', startWorld);
        document.removeEventListener('touchstart', startWorld);

        const bookOpenAudio = document.getElementById('book-open-audio');
        audio.volume = 0.2; // Very soft ambient background volume
        bookOpenAudio.play().catch(() => { });
        audio.play().catch(err => console.log("User interaction required for audio"));

        bookCover.classList.add('open');

        // Fairy Dust Explosion with enchanted colors
        for (let i = 0; i < 60; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dust-particle');

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 500 + 100;
            const tx = Math.cos(angle) * distance + 'px';
            const ty = Math.sin(angle) * distance + 'px';

            particle.style.setProperty('--tx', tx);
            particle.style.setProperty('--ty', ty);

            // Alternate colors between gold, green, and white
            const colors = ['#D4AF37', '#00ff88', '#ffffff', '#ffffbb'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px 2px ${color}, 0 0 20px 5px ${color}`;

            particle.style.animation = `dust-explosion ${Math.random() * 1.5 + 0.8}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;
            dustContainer.appendChild(particle);
        }

        setTimeout(() => {
            prologue.style.opacity = '0';
            setTimeout(() => {
                prologue.style.display = 'none';
                hero.classList.add('active');
                // Start fairy tale animations after book opens
                createAllFairyAnimations();
            }, 2000);
        }, 1500);
    };

    prologue.addEventListener('click', startWorld);
    prologue.addEventListener('touchstart', startWorld);

    // ==================== FAIRY TALE ANIMATIONS ====================

    function createAllFairyAnimations() {
        createSparkles();
        createButterflies();
        createFairyLeaves();
        createMagicDust();
    }

    // ✨ Floating Sparkles
    function createSparkles() {
        const container = document.getElementById('sparkles-container');
        for (let i = 0; i < 25; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = Math.random() * 100 + 'vw';
            sparkle.style.top = (Math.random() * 60 + 40) + 'vh';
            sparkle.style.setProperty('--duration', (Math.random() * 6 + 4) + 's');
            sparkle.style.setProperty('--delay', (Math.random() * 8) + 's');

            const size = Math.random() * 4 + 3;
            sparkle.style.width = size + 'px';
            sparkle.style.height = size + 'px';
            container.appendChild(sparkle);
        }
    }

    // 🪄 Magical Glowing Orbs (replaces butterflies)
    function createButterflies() {
        const container = document.getElementById('butterflies-container');

        for (let i = 0; i < 12; i++) {
            const orb = document.createElement('div');
            orb.classList.add('butterfly');
            orb.style.left = Math.random() * 90 + 5 + 'vw';
            orb.style.top = (Math.random() * 50 + 50) + 'vh';
            orb.style.setProperty('--fly-duration', (Math.random() * 14 + 10) + 's');
            orb.style.setProperty('--fly-delay', (Math.random() * 12) + 's');

            // Vary orb size
            const size = Math.random() * 8 + 6;
            orb.style.width = size + 'px';
            orb.style.height = size + 'px';
            container.appendChild(orb);
        }
    }

    // ✨ Glowing Golden Petals (replaces leaves)
    function createFairyLeaves() {
        const container = document.getElementById('fairy-leaves-container');

        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.classList.add('fairy-leaf');
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.top = '-20px';
            petal.style.setProperty('--leaf-duration', (Math.random() * 18 + 12) + 's');
            petal.style.setProperty('--leaf-delay', (Math.random() * 18) + 's');
            petal.style.setProperty('--leaf-x', (Math.random() * 200 - 100) + 'px');

            // Vary petal size
            const size = Math.random() * 5 + 4;
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            container.appendChild(petal);
        }
    }

    // ✦ Magic Dust particles around cards
    function createMagicDust() {
        const container = document.getElementById('magic-dust-container');
        for (let i = 0; i < 40; i++) {
            const dust = document.createElement('div');
            dust.classList.add('magic-dust');
            dust.style.left = Math.random() * 100 + 'vw';
            dust.style.top = Math.random() * 100 + 'vh';
            dust.style.setProperty('--twinkle-dur', (Math.random() * 4 + 2) + 's');
            dust.style.setProperty('--twinkle-del', (Math.random() * 5) + 's');

            const size = Math.random() * 3 + 2;
            dust.style.width = size + 'px';
            dust.style.height = size + 'px';
            container.appendChild(dust);
        }
    }

    // 2. Fireflies Generation (Enhanced)
    const fireflyCount = 35;
    const ffContainer = document.getElementById('fireflies-container');
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

        // Vary firefly colors (warm golden to green)
        const colors = ['#ffffbb', '#D4AF37', '#aaffcc', '#ffddaa'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        firefly.style.background = color;
        firefly.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}40`;

        ffContainer.appendChild(firefly);
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

    // 4. Parallax 3D Tilt for Cards (enhanced with fairy glow)
    document.addEventListener('mousemove', (e) => {
        document.querySelectorAll('.card').forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const cardX = e.clientX - rect.left;
                const cardY = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((cardY - centerY) / centerY) * -4;
                const rotateY = ((cardX - centerX) / centerX) * 4;

                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
        });
    });

    // Mouse leave reset
    document.addEventListener('mouseleave', () => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)';
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

    // 6. RSVP Flow (The Enchanted Key Ceremony)
    rsvpKey.addEventListener('click', () => {
        rsvpKey.classList.add('key-unlocking');
        document.getElementById('rsvp-instruction').textContent = '✨ El cerrojo mágico se ha abierto... ✨';
        setTimeout(() => {
            rsvpForm.style.display = 'block';
            rsvpForm.classList.add('fade-in-up');
            rsvpForm.scrollIntoView({ behavior: 'smooth' });
        }, 800);
    });

    // 7. Intersection Observer for Scroll Animations
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

        const btn = rsvpForm.querySelector('button');
        btn.textContent = '✨ Enviando Mensaje... ✨';

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.textContent = '✨ Confirmar Asistencia ✨';
        }, 800);
    });

    // 8. Magical Cursor Trail Effect
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastTrailTime < 50) return;
        lastTrailTime = now;

        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.width = '4px';
        trail.style.height = '4px';
        trail.style.background = '#D4AF37';
        trail.style.borderRadius = '50%';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.boxShadow = '0 0 6px #D4AF37, 0 0 12px #00ff88';
        trail.style.transition = 'all 0.8s ease-out';
        document.body.appendChild(trail);

        requestAnimationFrame(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(0) translateY(-20px)';
        });

        setTimeout(() => trail.remove(), 900);
    });

    // Easter Egg
    if (treeShadow) {
        treeShadow.addEventListener('click', () => {
            eggMsg.style.display = 'block';
            setTimeout(() => { eggMsg.style.display = 'none'; }, 4000);
        });
    }
});
