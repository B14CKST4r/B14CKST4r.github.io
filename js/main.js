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
    initSectionDots();
    initFullPageNav();
    initBackToTop();
    initScrollProgress();
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
        '.project-block, .skill-category, .eval-card, .job-item, .edu-card, .exp-card, .campus-card, .contact-card, .about-content, .combined-top, .section-title'
    );

    revealElements.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 400);
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

// ===== 侧边导航点 =====
function initSectionDots() {
    const dots = document.querySelectorAll('.section-dot');
    const sections = document.querySelectorAll('section[id]');

    // 点击导航点滚动到对应 section
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(dot.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 滚动时更新激活状态
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dots.forEach(d => d.classList.remove('active'));
                const activeDot = document.querySelector(`.section-dot[href="#${entry.target.id}"]`);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(s => observer.observe(s));
}

// ===== 全屏导航（滚轮切换） =====
function initFullPageNav() {
    const sections = [...document.querySelectorAll('section[id]')];
    const transition = document.getElementById('sectionTransition');
    let currentIndex = 0;
    let isAnimating = false;
    let wheelAccum = 0;
    let wheelTimeout = null;

    function getCurrentIndex() {
        let closest = 0;
        let minDist = Infinity;
        const center = window.innerHeight / 2;
        sections.forEach((s, i) => {
            const rect = s.getBoundingClientRect();
            const dist = Math.abs(rect.top + rect.height / 2 - center);
            if (dist < minDist) { minDist = dist; closest = i; }
        });
        return closest;
    }

    function animateTransition(targetIndex) {
        return new Promise(resolve => {
            const currentIdx = getCurrentIndex();
            const direction = targetIndex > currentIdx ? 'down' : 'up';

            // 扫描线动画
            transition.classList.add(direction);
            // 当前段微缩放
            const current = sections[currentIdx];
            if (current) current.classList.add('switching');

            setTimeout(() => {
                transition.classList.remove('down', 'up');
                if (current) current.classList.remove('switching');
                resolve();
            }, 800);
        });
    }

    async function scrollToSection(index) {
        if (index < 0 || index >= sections.length || isAnimating) return;
        isAnimating = true;
        currentIndex = index;

        await animateTransition(index);
        sections[index].scrollIntoView({ behavior: 'instant' });

        setTimeout(() => { isAnimating = false; }, 300);
    }

    // 滚轮事件
    window.addEventListener('wheel', (e) => {
        e.preventDefault();
        wheelAccum += e.deltaY;

        if (wheelTimeout) clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => { wheelAccum = 0; }, 400);

        if (Math.abs(wheelAccum) < 80) return;
        wheelAccum = 0;

        const idx = getCurrentIndex();
        if (e.deltaY > 0) {
            scrollToSection(idx + 1);
        } else {
            scrollToSection(idx - 1);
        }
    }, { passive: false });

    // 键盘导航
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            scrollToSection(getCurrentIndex() + 1);
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            scrollToSection(getCurrentIndex() - 1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToSection(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToSection(sections.length - 1);
        }
    });

    // 触摸滑动
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        const diff = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(diff) < 50) return;
        const idx = getCurrentIndex();
        if (diff > 0) scrollToSection(idx + 1);
        else scrollToSection(idx - 1);
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

// ===== 滚动进度条 =====
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = Math.min(progress, 100) + '%';
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
    const blocks = document.querySelectorAll('.project-block');
    const overlay = document.getElementById('projectOverlay');
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('projectModalContent');
    const modalClose = modal.querySelector('.project-modal-close');
    let activeBlock = null;
    let originalRect = null;

    function getTarget() {
        const targetWidth = 700;
        return {
            left: (window.innerWidth - targetWidth) / 2,
            top: Math.max(80, (window.innerHeight - 500) / 2),
            width: targetWidth
        };
    }

    function expand(block) {
        if (activeBlock) return;

        const rect = block.getBoundingClientRect();
        originalRect = rect;
        activeBlock = block;

        // 卡片占位（保持网格不动）
        block.classList.add('placeholder');

        // 填充浮层内容
        const detail = block.querySelector('.project-block-detail');
        modalContent.innerHTML = detail.innerHTML;

        // 浮层初始位置 = 卡片位置
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
        modal.style.width = rect.width + 'px';
        modal.classList.add('active');

        // 强制回流
        modal.offsetHeight;

        // 动画到中央
        const target = getTarget();
        modal.style.left = target.left + 'px';
        modal.style.top = target.top + 'px';
        modal.style.width = target.width + 'px';

        // 显示遮罩
        overlay.classList.add('active');
    }

    function collapse() {
        if (!activeBlock) return;

        const block = activeBlock;
        const rect = originalRect;

        // 浮层动画回到卡片位置
        modal.style.left = rect.left + 'px';
        modal.style.top = rect.top + 'px';
        modal.style.width = rect.width + 'px';
        modal.classList.remove('active');

        // 隐藏遮罩
        overlay.classList.remove('active');

        // 动画结束后清理
        setTimeout(() => {
            block.classList.remove('placeholder');
            modal.style.left = '';
            modal.style.top = '';
            modal.style.width = '';
            modalContent.innerHTML = '';
            activeBlock = null;
            originalRect = null;
        }, 500);
    }

    // 点击卡片展开
    blocks.forEach(block => {
        block.addEventListener('click', () => {
            if (activeBlock) return;
            expand(block);
        });
    });

    // 关闭按钮
    modalClose.addEventListener('click', (e) => {
        e.stopPropagation();
        collapse();
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
        const target = getTarget();
        modal.style.left = target.left + 'px';
        modal.style.top = target.top + 'px';
        modal.style.width = target.width + 'px';
    });

    // 大幅滚动时自动关闭
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
