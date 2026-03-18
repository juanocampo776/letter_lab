// script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Reveal Elements on Scroll ---
    const revealSections = document.querySelectorAll('.reveal-section');
    const observerOptions = {
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    revealSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 2. Open Invitation Logic ---
    const openBtn = document.getElementById('open-invitation');
    const mainContent = document.getElementById('main-content');
    const hero = document.getElementById('hero');

    openBtn.addEventListener('click', () => {
        mainContent.classList.remove('hidden');
        // Smooth scroll to the next section
        document.getElementById('story').scrollIntoView({ behavior: 'smooth' });
        
        // Start background music placeholder (real implementation would need an actual audio file)
        toggleAudio(true);
    });

    // --- 3. Audio Toggle ---
    let audioPlaying = false;
    const audioToggle = document.getElementById('audio-toggle');
    // Using a placeholder audio logic as no file was provided yet
    const toggleAudio = (forceState) => {
        audioPlaying = forceState !== undefined ? forceState : !audioPlaying;
        if (audioPlaying) {
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            audioToggle.classList.add('playing');
            console.log('Audio playing...'); // In reality: audio.play()
        } else {
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            audioToggle.classList.remove('playing');
            console.log('Audio paused.'); // In reality: audio.pause()
        }
    };

    audioToggle.addEventListener('click', () => toggleAudio());

    // --- 4. Countdown Logic ---
    const targetDate = new Date('October 25, 2026 20:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.querySelector('.countdown-grid').innerHTML = "<h3>¡El día ha llegado!</h3>";
        }
    };

    const timerInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // --- 5. Magic Particles Creation ---
    const particlesContainer = document.getElementById('particles-container');
    const createParticle = () => {
        const p = document.createElement('div');
        p.classList.add('particle');
        
        const size = Math.random() * 5 + 2;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;
        
        p.style.left = `${Math.random() * 100}vw`;
        p.style.bottom = `-20px`;
        
        const duration = Math.random() * 5 + 5;
        p.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(p);
        
        setTimeout(() => {
            p.remove();
        }, duration * 1000);
    };

    setInterval(createParticle, 300);

    // --- 6. Butterflies Creation ---
    const butterfliesContainer = document.getElementById('butterflies-container');
    const createButterfly = () => {
        const b = document.createElement('div');
        b.classList.add('butterfly');
        
        b.style.left = `${Math.random() * 100}vw`;
        b.style.top = `${Math.random() * 100}vh`;
        
        const duration = Math.random() * 10 + 10;
        b.style.animationDuration = `${duration}s`;
        
        butterfliesContainer.appendChild(b);
        
        setTimeout(() => {
            b.remove();
        }, duration * 1000);
    };

    // Initially create a few butterflies
    for(let i=0; i<10; i++) setTimeout(createButterfly, Math.random() * 3000);
    // Then periodically
    setInterval(createButterfly, 2500);

    // --- 7. RSVP Form Submission ---
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpStatus = document.getElementById('rsvp-status');

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = rsvpForm.querySelector('button');
        submitBtn.disabled = true;
        submitBtn.innerText = 'Enviando...';

        // Simulate network delay
        setTimeout(() => {
            rsvpForm.reset();
            submitBtn.innerText = '¡Confirmado!';
            rsvpStatus.innerText = '¡Muchas gracias! Tu asistencia ha sido registrada.';
            rsvpStatus.classList.remove('hidden');
            rsvpStatus.style.color = '#7F5AF0';
            rsvpStatus.style.fontWeight = 'bold';
            rsvpStatus.style.marginTop = '1rem';
        }, 1500);
    });

    // --- 8. Fireflies Creation ---
    const firefliesContainer = document.getElementById('fireflies-container');
    const createFirefly = () => {
        const f = document.createElement('div');
        f.classList.add('firefly');
        f.style.left = `${Math.random() * 100}vw`;
        f.style.bottom = `${Math.random() * 50}vh`; // Start fireflies from lower half
        const duration = Math.random() * 10 + 15;
        f.style.animationDuration = `${duration}s, ${Math.random() * 2 + 2}s`;
        firefliesContainer.appendChild(f);
        setTimeout(() => { f.remove(); }, duration * 1000);
    };
    for(let i=0; i<15; i++) createFirefly();
    setInterval(createFirefly, 2000);

    // --- 9. Leaves Creation ---
    const leavesContainer = document.getElementById('leaves-container');
    const createLeaf = () => {
        const l = document.createElement('div');
        l.classList.add('leaf');
        l.style.left = `${Math.random() * 100}vw`;
        const size = Math.random() * 10 + 10;
        l.style.width = `${size}px`;
        l.style.height = `${size}px`;
        const duration = Math.random() * 10 + 10;
        l.style.animationDuration = `${duration}s`;
        leavesContainer.appendChild(l);
        setTimeout(() => { l.remove(); }, duration * 1000);
    };
    for(let i=0; i<5; i++) setTimeout(createLeaf, Math.random() * 5000); // Initial staggered
    setInterval(createLeaf, 3000);
});
