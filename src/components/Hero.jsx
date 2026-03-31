import React, { useEffect, useRef, useState } from 'react';

const Hero = () => {
    const typingRef = useRef(null);
    const canvasRef = useRef(null);
    const heroSectionRef = useRef(null);
    const [stats, setStats] = useState({ clients: 0, sold: 0, categories: 0 });

    // Typing Effect
    useEffect(() => {
        const phrases = [
            'OFFICIAL STORE /// ROLEPLAY & ASSETS',
            'FIVEM SHOP /// GUNSKIN & CLOTHES',
            'ROBLOX SHOP /// MAP & ROBUX',
            'SOCIAL MEDIA /// NITRO & ASSETS',
        ];
        let phraseIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let timer;

        const typeLoop = () => {
            if (!typingRef.current) return;
            const current = phrases[phraseIdx];

            if (!isDeleting) {
                typingRef.current.textContent = current.substring(0, charIdx + 1);
                charIdx++;
                if (charIdx === current.length) {
                    isDeleting = true;
                    timer = setTimeout(typeLoop, 2000);
                    return;
                }
            } else {
                typingRef.current.textContent = current.substring(0, charIdx - 1);
                charIdx--;
                if (charIdx === 0) {
                    isDeleting = false;
                    phraseIdx = (phraseIdx + 1) % phrases.length;
                }
            }
            timer = setTimeout(typeLoop, isDeleting ? 40 : 80);
        };

        typeLoop();
        return () => clearTimeout(timer);
    }, []);

    // Canvas Particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            if (heroSectionRef.current) {
                canvas.width = heroSectionRef.current.offsetWidth;
                canvas.height = heroSectionRef.current.offsetHeight;
            }
        };
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

        const drawParticles = () => {
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

            animationFrameId = requestAnimationFrame(drawParticles);
        };
        drawParticles();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // Stats Counter
    useEffect(() => {
        let counted = false;
        const currentHeroRef = heroSectionRef.current;

        const runCounters = () => {
            if (counted) return;
            counted = true;

            const targets = { clients: 500, sold: 1200, categories: 6 };
            const duration = 1800;

            const animateValue = (key, target) => {
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
                }, 16);
            };

            animateValue('clients', targets.clients);
            animateValue('sold', targets.sold);
            animateValue('categories', targets.categories);
        };

        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) runCounters();
        }, { threshold: 0.3 });

        if (currentHeroRef) {
            heroObserver.observe(currentHeroRef);
        }

        return () => {
            if (currentHeroRef) heroObserver.unobserve(currentHeroRef);
        };
    }, []);

    return (
        <section className="hero-section" ref={heroSectionRef}>
            {/* Animated Canvas Particles */}
            <canvas ref={canvasRef} className="hero-canvas"></canvas>

            {/* Decorative animated shapes */}
            <div className="hero-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>

            <div className="hero-text-box">
                <span className="hero-badge">
                    <span className="badge-dot"></span>
                    <span ref={typingRef}></span><span className="typing-cursor">|</span>
                </span>
                <h1 className="hero-title glitch-text" data-text="ELEVATE YOUR">
                    ELEVATE YOUR <br /><span className="text-val-red hero-red-line">SERVER &amp; GAMEPLAY.</span>
                </h1>
                <p className="hero-desc">Pusat supply aset FiveM, Roblox, dan kelengkapan Discord terbaik. Sistem pemesanan cepat via Tiket Discord menjamin transaksi yang aman dan personal.</p>

                {/* Animated Stats */}
                <div className="hero-stats">
                    <div className="stat-item">
                        <span className="stat-num">{stats.clients}</span><span className="stat-plus">+</span>
                        <span className="stat-label">Happy Clients</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num">{stats.sold}</span><span className="stat-plus">+</span>
                        <span className="stat-label">Assets Sold</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-num">{stats.categories}</span>
                        <span className="stat-label">Categories</span>
                    </div>
                </div>

                <a href="#catalog" className="val-btn hero-cta">
                    <span className="btn-text">LIHAT KATALOG KAMI</span>
                </a>
            </div>
        </section>
    );
};

export default Hero;
