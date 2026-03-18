// script.js

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Intersección de Animación (Scroll Magic Reveal) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animación solo una vez
            }
        });
    }, {
        root: null,
        threshold: 0.1, // 10% del elemento visible para activar
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 1. Lógica del Temporizador (Cuenta Regresiva Demo) ---
    // Establecemos una fecha objetivo arbitraria (Ej. 30 días a partir de hoy)
    let targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(14, 0, 0, 0); 

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<h3>¡El momento mágico ha llegado!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Añadir una leve animación al cambiar de número (opcional, pero da un toque responsivo)
        updateTimeValue("days", days);
        updateTimeValue("hours", hours);
        updateTimeValue("minutes", minutes);
        updateTimeValue("seconds", seconds);
    };

    const updateTimeValue = (id, value) => {
        const el = document.getElementById(id);
        const formattedValue = String(value).padStart(2, '0');
        if (el.innerText !== formattedValue) {
            el.innerText = formattedValue;
            // Pequeño efecto de pulso al cambiar
            el.style.transform = 'scale(1.1)';
            el.style.color = 'var(--secondary-color)';
            setTimeout(() => {
                el.style.transform = 'scale(1)';
                el.style.color = 'var(--primary-color)';
            }, 300);
        }
    }

    // Actualizar cada segundo
    updateCountdown(); 
    setInterval(updateCountdown, 1000);


    // --- 2. Lógica del Formulario RSVP ---
    const rsvpForm = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');

    if(rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            formMessage.innerText = '';
            formMessage.className = 'form-message';

            const formData = new FormData(rsvpForm);
            const data = Object.fromEntries(formData.entries());

             // [Simulación visual para la DEMO actual]
             const btn = rsvpForm.querySelector('button');
             const originalText = btn.innerHTML; // get innerHTML to preserve icons
             btn.innerHTML = 'Tejiendo magia... <i class="fa-solid fa-spinner fa-spin"></i>';
             btn.disabled = true;
             
             setTimeout(() => {
                 formMessage.innerHTML = '<i class="fa-regular fa-circle-check"></i> ¡Tu confirmación ha sido recibida con amor!';
                 formMessage.classList.add('success');
                 rsvpForm.reset();
                 
                 btn.innerHTML = originalText;
                 btn.disabled = false;
                 
                 setTimeout(() => {
                     formMessage.innerText = '';
                     formMessage.classList.remove('success');
                 }, 6000);
             }, 2000);
             // [/Fin Simulación]
        });
    }

});
