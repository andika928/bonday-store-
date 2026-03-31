document.addEventListener('DOMContentLoaded', () => {
    // ---- TABS FILTERING LOGIC ----
    const filterBtns = document.querySelectorAll('.tab-btn');
    const filterItems = document.querySelectorAll('.filter-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            filterItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // NOTE: Buy buttons are now direct <a> links to Discord.
    // No modal logic needed anymore.

    // ---- HERO TYPING EFFECT ----
    const typingEl = document.getElementById('typingText');
    const phrases = [
        'OFFICIAL STORE /// ROLEPLAY & ASSETS',
        'FIVEM SHOP /// GUNSKIN & CLOTHES',
        'ROBLOX SHOP /// MAP & ROBUX',
        'SOCIAL MEDIA /// NITRO & ASSETS',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function typeLoop() {
        if (!typingEl) return;
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            typingEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 2000);
                return;
            }
        } else {
            typingEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }
        setTimeout(typeLoop, isDeleting ? 40 : 80);
    }
    typeLoop();

    // ---- HERO STATS COUNTER ----
    const statNums = document.querySelectorAll('.stat-num');
    let counted = false;

    function runCounters() {
        if (counted) return;
        counted = true;
        statNums.forEach(el => {
            const target = parseInt(el.dataset.target);
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 16);
        });
    }

    // Trigger counter when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) runCounters();
    }, { threshold: 0.3 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) heroObserver.observe(heroSection);

    // ---- HERO CANVAS PARTICLES ----
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const section = canvas.closest('.hero-section');
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const PARTICLE_COUNT = 60;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.4,
            dy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.1,
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 70, 85, ${p.alpha})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
        });

        // Draw connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 70, 85, ${0.05 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(drawParticles);
    }
    drawParticles();
});


