/**
 * 樊燊 - 个人主页 JavaScript
 * 包含：打字机效果、粒子背景、鼠标光晕、进度条动画、
 *       导航栏效果、滚动动画、主题切换、回到顶部
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initTypingEffect();
    initParticles();
    initMouseGlow();
    initNavbarScroll();
    initScrollReveal();
    initAccordion();
    initSmoothScroll();
    initActiveNavLink();
    initBackToTop();
});

// ===== 主题切换 =====
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ===== 打字机效果 =====
function initTypingEffect() {
    const texts = [
        '> 应届毕业生 · 数据科学与大数据技术',
        '> AI编程工程师',
        '> Spring Boot / Python / ECharts / MySQL',
        '> build(); deploy(); iterate();'
    ];
    const typingEl = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 120;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// ===== 粒子背景 =====
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');

    let particles = [];
    const particleCount = 60;

    function resize() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.6;
            this.vy = (Math.random() - 0.5) * 0.6;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // 连线
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 255, 136, ${0.08 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

// ===== 鼠标光晕 =====
function initMouseGlow() {
    const glow = document.getElementById('mouseGlow');
    if (!glow) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animate);
    }

    animate();
}

// ===== 导航栏滚动效果 =====
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== 滚动显示动画 =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.project-block, .skill-category, .eval-card, .edu-card, .exp-card, .campus-card, .contact-card, .about-content'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 300);
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== 当前导航高亮 =====
function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + current) {
                link.style.color = '#00ff88';
            }
        });
    });
}

// ===== 回到顶部 =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 视差效果（Hero区域） =====
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.scrollY;
        heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// ===== 项目网格居中展开/收起 =====
function initAccordion() {
    const grid = document.getElementById('projectsGrid');
    const blocks = document.querySelectorAll('.project-block');
    const overlay = document.getElementById('projectOverlay');
    let activeBlock = null;
    let originalRect = null;

    function expand(block) {
        if (activeBlock) return;

        const rect = block.getBoundingClientRect();
        originalRect = rect;
        activeBlock = block;

        // 设置 fixed 定位的初始位置（当前屏幕位置）
        block.style.position = 'fixed';
        block.style.left = rect.left + 'px';
        block.style.top = rect.top + 'px';
        block.style.width = rect.width + 'px';
        block.style.margin = '0';

        // 强制回流后开始动画
        block.offsetHeight;

        // 目标：居中，宽度 700px
        const targetWidth = 700;
        const targetLeft = (window.innerWidth - targetWidth) / 2;
        const targetTop = Math.max(80, (window.innerHeight - 500) / 2);

        block.style.left = targetLeft + 'px';
        block.style.top = targetTop + 'px';
        block.style.width = targetWidth + 'px';
        block.classList.add('expanded');

        // 其他卡片变暗
        blocks.forEach(b => {
            if (b !== block) b.classList.add('dimmed');
        });

        // 显示遮罩
        overlay.classList.add('active');
    }

    function collapse() {
        if (!activeBlock) return;

        const block = activeBlock;
        const rect = originalRect;

        // 动画回到原位
        block.style.left = rect.left + 'px';
        block.style.top = rect.top + 'px';
        block.style.width = rect.width + 'px';
        block.classList.remove('expanded');

        // 隐藏遮罩
        overlay.classList.remove('active');

        // 等主卡片归位动画完成（0.5s）后，同步恢复其他卡片并清理
        setTimeout(() => {
            blocks.forEach(b => b.classList.remove('dimmed'));
            block.style.position = '';
            block.style.left = '';
            block.style.top = '';
            block.style.width = '';
            block.style.margin = '';
            if (activeBlock === block) {
                activeBlock = null;
                originalRect = null;
            }
        }, 500);
    }

    // 点击卡片展开
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            if (block.classList.contains('expanded')) return;
            if (activeBlock) return;
            expand(block);
        });
    });

    // 关闭按钮
    document.querySelectorAll('.project-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            collapse();
        });
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', () => {
        collapse();
    });

    // ESC 关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeBlock) {
            collapse();
        }
    });

    // 窗口大小变化时更新位置
    window.addEventListener('resize', () => {
        if (!activeBlock) return;
        const targetWidth = 700;
        const targetLeft = (window.innerWidth - targetWidth) / 2;
        const targetTop = Math.max(80, (window.innerHeight - 500) / 2);
        activeBlock.style.left = targetLeft + 'px';
        activeBlock.style.top = targetTop + 'px';
        activeBlock.style.width = targetWidth + 'px';
    });

    // 大幅滚动时自动关闭（避免回归位置错乱）
    let scrollThreshold = 0;
    window.addEventListener('scroll', () => {
        if (!activeBlock) {
            scrollThreshold = window.scrollY;
            return;
        }
        if (Math.abs(window.scrollY - scrollThreshold) > 100) {
            collapse();
        }
    });
}
