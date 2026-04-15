// Global config object
let config = {};
let currentSlide = 0;
let slideInterval;

// Predefined fallback images for banners
const fallbackImages = [
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
];

// Load configuration
async function loadConfig() {
    try {
        const response = await fetch('/config.json');
        config = await response.json();
        console.log('Config loaded successfully:', config);
        applyConfig();
        hidePreloader();
    } catch (error) {
        console.error('Error loading config:', error);
        config = getFallbackConfig();
        applyConfig();
        hidePreloader();
    }
}

// Fallback config
function getFallbackConfig() {
    return {
        brand: {
            name: 'Winsocial',
            slogan: 'Hệ thống Seeding #1 Việt Nam',
            primaryColor: '#6C5CE7',
            secondaryColor: '#00CEC9'
        },
        banner: {
            slides: [
                {
                    image: fallbackImages[0],
                    title: 'Hệ Thống Seeding Tự Động',
                    subtitle: 'Kết nối với 10,000+ creator chất lượng'
                },
                {
                    image: fallbackImages[1],
                    title: 'Triển Khai Trong 24 Giờ',
                    subtitle: 'Nhanh chóng - Hiệu quả - Tối ưu chi phí'
                },
                {
                    image: fallbackImages[2],
                    title: 'Báo Cáo Minh Bạch',
                    subtitle: 'Theo dõi realtime, đánh giá chính xác'
                }
            ]
        },
        features: {
            title: 'Tất Cả Trong Một Nền Tảng',
            items: [
                {
                    icon: '💰',
                    title: 'Giá Cả Hợp Lý',
                    desc: 'Chi phí tối ưu, không phát sinh, nhiều gói linh hoạt'
                },
                {
                    icon: '🕐',
                    title: 'Hỗ Trợ 24/7',
                    desc: 'Đội ngũ hỗ trợ luôn sẵn sàng 24 giờ mỗi ngày'
                },
                {
                    icon: '👥',
                    title: 'Người Dùng Thật',
                    desc: '100% creator có hồ sơ xác minh, tương tác tự nhiên'
                },
                {
                    icon: '🎨',
                    title: 'Giao Diện Thân Thiện',
                    desc: 'Dashboard trực quan, dễ sử dụng, báo cáo chi tiết'
                }
            ]
        },
        whyChoose: {
            title: 'Vì Sao Chọn Winsocial?',
            items: [
                {
                    title: 'Quy Mô Lớn',
                    desc: 'Mạng lưới hơn 10,000 creator chất lượng trên khắp Việt Nam'
                },
                {
                    title: 'Công Nghệ Vượt Trội',
                    desc: 'Hệ thống AI phân tích và tối ưu campaign tự động'
                },
                {
                    title: 'Báo Cáo Chi Tiết',
                    desc: 'Dashboard realtime với đầy đủ metrics: reach, engagement, sentiment'
                },
                {
                    title: 'Triển Khai Nhanh',
                    desc: 'Từ brief đến launch chỉ trong 24 giờ làm việc'
                },
                {
                    title: 'An Toàn Tuyệt Đối',
                    desc: 'Đảm bảo seeding tự nhiên, không vi phạm chính sách nền tảng'
                },
                {
                    title: 'Hỗ Trợ Chuyên Nghiệp',
                    desc: 'Account manager 1:1, tư vấn chiến lược miễn phí'
                }
            ]
        },
        agencyPricing: {
            title: 'Bảng Giá Đại Lý',
            subtitle: 'Đăng ký làm đại lý để nhận ưu đãi đặc biệt',
            plans: [
                {
                    name: 'Đại Lý Cá Nhân',
                    price: 'Liên hệ',
                    period: '/tháng',
                    features: [
                        'Chiết khấu 20-30%',
                        'Hỗ trợ tư vấn khách hàng',
                        'Tool marketing miễn phí',
                        'Hỗ trợ 24/7',
                        'Dashboard cơ bản'
                    ],
                    highlight: false,
                    color: '#6C5CE7'
                },
                {
                    name: 'Đại Lý Doanh Nghiệp',
                    price: 'Liên hệ',
                    period: '/tháng',
                    features: [
                        'Chiết khấu 30-40%',
                        'API tích hợp hệ thống',
                        'Dashboard riêng cho đại lý',
                        'Đào tạo đội ngũ',
                        'Hỗ trợ priority',
                        'Báo cáo nâng cao'
                    ],
                    highlight: true,
                    color: '#00CEC9'
                },
                {
                    name: 'Đối Tác Chiến Lược',
                    price: 'Liên hệ',
                    period: '/năm',
                    features: [
                        'Chiết khấu 40-50%',
                        'Hợp đồng độc quyền',
                        'Hỗ trợ tài chính marketing',
                        'Tham gia chia sẻ lợi nhuận',
                        'Ưu tiên phát triển tính năng',
                        'Support VIP 24/7'
                    ],
                    highlight: false,
                    color: '#FD79A8'
                }
            ]
        },
        contact: {
            hotline: '0384327608',
            zalo: '0384327608',
            email: 'contact@winsocial.vn',
            address: 'Hà Nội, Việt Nam'
        },
        cta: {
            title: 'Sẵn Sàng Tăng Trưởng Cùng Chúng Tôi?',
            subtitle: 'Liên hệ ngay để được tư vấn chiến lược seeding phù hợp',
            buttonText: 'Đăng Ký Ngay'
        }
    };
}

// Apply configuration to DOM
function applyConfig() {
    console.log('Applying configuration...');

    applyBrandColors();
    applySEO();
    applyContactInfo();
    applyFeatures();
    applyWhyChoose();
    applyPricing();
    applyCTA();
    applyFooter();

    // Init slider after content applied
    initSlider();

    setTimeout(() => {
        initCounters();
        updateActiveNav();
    }, 500);
}

// Apply brand colors
function applyBrandColors() {
    const root = document.documentElement;
    const primary = config.brand?.primaryColor || '#6C5CE7';
    const secondary = config.brand?.secondaryColor || '#00CEC9';

    root.style.setProperty('--primary-color', primary);
    root.style.setProperty('--secondary-color', secondary);
    root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`);
    root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${secondary} 0%, ${primary} 100%)`);
}

// Apply SEO
function applySEO() {
    const title = config.brand?.name || 'Winsocial';
    const slogan = config.brand?.slogan || 'Hệ thống Seeding #1 Việt Nam';

    document.title = `${title} - ${slogan}`;

    document.querySelectorAll('.brand-name').forEach(el => {
        el.textContent = title;
    });

    document.querySelectorAll('#brandSlogan, .brand-tagline').forEach(el => {
        el.textContent = slogan;
    });
}

// Apply contact info
function applyContactInfo() {
    const contact = config.contact || {};

    document.querySelectorAll('#hotlineNumber, #mobileHotline, #footerHotline').forEach(el => {
        el.textContent = contact.hotline || '0384327608';
    });

    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.href = `tel:${contact.hotline || '0384327608'}`;
    });

    const zaloElement = document.getElementById('footerZalo');
    if (zaloElement) {
        zaloElement.textContent = contact.zalo || '0384327608';
        const zaloParent = zaloElement.closest('a');
        if (zaloParent) zaloParent.href = `https://zalo.me/${contact.zalo || '0384327608'}`;
    }

    const emailElement = document.getElementById('footerEmail');
    if (emailElement) {
        emailElement.textContent = contact.email || 'contact@winsocial.vn';
        const emailParent = emailElement.closest('a');
        if (emailParent) emailParent.href = `mailto:${contact.email || 'contact@winsocial.vn'}`;
    }

    const addressElement = document.getElementById('footerAddress');
    if (addressElement) {
        addressElement.textContent = contact.address || 'Hà Nội, Việt Nam';
    }
}

// Initialize slider
function initSlider() {
    const slides = config.banner?.slides || [];
    const container = document.getElementById('sliderContainer');
    const dotsContainer = document.getElementById('sliderDots');

    if (!container || slides.length === 0) return;

    // Reset slide index
    currentSlide = 0;

    // Clear existing content
    container.innerHTML = '';
    if (dotsContainer) dotsContainer.innerHTML = '';

    // Create slides
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slider-slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `url('${slide.image}')`;
        slideElement.innerHTML = `
            <div class="slide-overlay"></div>
            <div class="slide-content">
                <h1 class="slide-title">${slide.title}</h1>
                <p class="slide-subtitle">${slide.subtitle}</p>
                <a href="#contact" class="btn-slide glow-effect">
                    <span>Bắt đầu ngay</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        container.appendChild(slideElement);

        // Create dot
        if (dotsContainer) {
            const dot = document.createElement('span');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.setAttribute('data-index', index);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        }
    });

    // Remove old listeners by cloning buttons
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');

    if (prevBtn) {
        const newPrev = prevBtn.cloneNode(true);
        prevBtn.parentNode.replaceChild(newPrev, prevBtn);
        newPrev.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        const newNext = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNext, nextBtn);
        newNext.addEventListener('click', nextSlide);
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);

    // Touch support
    let touchStartX = 0;
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? nextSlide() : prevSlide();
        }
    }, { passive: true });
}

// Slide functions
function goToSlide(index) {
    const slideElements = document.querySelectorAll('.slider-slide');
    const dots = document.querySelectorAll('.slider-dot');

    if (slideElements.length === 0) return;

    currentSlide = index;

    slideElements.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    const slideElements = document.querySelectorAll('.slider-slide');
    if (slideElements.length === 0) return;
    currentSlide = (currentSlide + 1) % slideElements.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    const slideElements = document.querySelectorAll('.slider-slide');
    if (slideElements.length === 0) return;
    currentSlide = (currentSlide - 1 + slideElements.length) % slideElements.length;
    goToSlide(currentSlide);
}

function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
}

function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
        slideInterval = null;
    }
}

// Apply features
function applyFeatures() {
    const features = config.features?.items || [];
    const container = document.getElementById('featuresContainer');

    if (!container) return;

    container.innerHTML = features.map((feature, index) => `
        <div class="feature-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="feature-icon">${feature.icon}</div>
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-desc">${feature.desc}</p>
            <div class="feature-hover">
                <i class="fas fa-arrow-right"></i>
            </div>
        </div>
    `).join('');
}

// Apply why choose
function applyWhyChoose() {
    const items = config.whyChoose?.items || [];
    const container = document.getElementById('whyChooseContainer');

    if (!container) return;

    container.innerHTML = items.map((item, index) => `
        <div class="why-card" data-aos="fade-up" data-aos-delay="${index * 100}">
            <div class="why-number">${String(index + 1).padStart(2, '0')}</div>
            <h3 class="why-title">${item.title}</h3>
            <p class="why-desc">${item.desc}</p>
            <div class="why-decoration">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
            </div>
        </div>
    `).join('');
}

// Apply pricing
function applyPricing() {
    const pricing = config.agencyPricing;
    const container = document.getElementById('pricingContainer');

    if (!container || !pricing?.plans) return;

    const subtitleElement = document.getElementById('pricingSubtitle');
    if (subtitleElement && pricing.subtitle) {
        subtitleElement.textContent = pricing.subtitle;
    }

    container.innerHTML = pricing.plans.map((plan, index) => `
        <div class="pricing-card ${plan.highlight ? 'popular' : ''}"
             data-aos="fade-up"
             data-aos-delay="${index * 150}">

            ${plan.highlight ? '<div class="popular-badge">PHỔ BIẾN</div>' : ''}

            <div class="pricing-header">
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">
                    <span class="price-amount">${plan.price}</span>
                    <span class="price-period">${plan.period || ''}</span>
                </div>
            </div>

            <ul class="plan-features">
                ${plan.features.map(feature => `
                    <li>
                        <i class="fas fa-check-circle"></i>
                        <span>${feature}</span>
                    </li>
                `).join('')}
            </ul>

            <a href="#contact" class="btn-pricing ${plan.highlight ? 'btn-primary' : 'btn-secondary'}">
                <span>Liên hệ ngay</span>
                <i class="fas fa-arrow-right"></i>
            </a>

            ${plan.highlight ? '<div class="pricing-glow"></div>' : ''}
        </div>
    `).join('');

    initPricingTabs();
}

// Initialize pricing tabs
function initPricingTabs() {
    const tabs = document.querySelectorAll('.pricing-tab');
    const cards = document.querySelectorAll('.pricing-card');

    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            cards.forEach((card, cardIndex) => {
                if (cardIndex === index) {
                    card.style.opacity = '1';
                    card.style.transform = card.classList.contains('popular')
                        ? 'translateY(-10px) scale(1.02)'
                        : 'translateY(-10px)';
                    card.style.boxShadow = 'var(--shadow-xl)';
                } else {
                    card.style.opacity = '0.5';
                    card.style.transform = 'translateY(0) scale(0.97)';
                    card.style.boxShadow = 'var(--shadow-md)';
                }
            });
        });
    });
}

// Apply CTA
function applyCTA() {
    const cta = config.cta;
    if (!cta) return;

    const titleElement = document.getElementById('ctaTitle');
    const subtitleElement = document.getElementById('ctaSubtitle');
    const buttonElement = document.getElementById('ctaButton');

    if (titleElement && cta.title) titleElement.textContent = cta.title;
    if (subtitleElement && cta.subtitle) subtitleElement.textContent = cta.subtitle;
    if (buttonElement && cta.buttonText) buttonElement.textContent = cta.buttonText;
}

// Apply footer
function applyFooter() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const copyrightEl = document.getElementById('copyrightName');
    if (copyrightEl && config.brand?.name) copyrightEl.textContent = config.brand.name;

    const footerBrandEl = document.getElementById('footerBrandName');
    if (footerBrandEl && config.brand?.name) footerBrandEl.textContent = config.brand.name;

    const footerSloganEl = document.getElementById('footerSlogan');
    if (footerSloganEl && config.brand?.slogan) footerSloganEl.textContent = config.brand.slogan;
}

// Initialize counters
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || '0');
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// Update active navigation
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${id}` ||
                        link.getAttribute('data-scroll') === id
                    );
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// Initialize scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTop?.classList.add('visible');
        } else {
            backToTop?.classList.remove('visible');
        }
    });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const body = document.body;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle?.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            root.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            root.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    menuToggle?.addEventListener('click', () => {
        mobileMenu?.classList.toggle('active');
        menuToggle.classList.toggle('open');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            menuToggle?.classList.remove('open');
        });
    });

    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input[type="email"]');
        if (input && input.value) {
            input.value = '';
            showToast('Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.', 'Cảm ơn!');
        }
    });

    // Toast Close
    const closeToast = document.getElementById('closeToast');
    const toast = document.getElementById('notificationToast');
    closeToast?.addEventListener('click', () => {
        toast?.classList.remove('active');
    });

    // Initialize randomized toasts
    initRandomToasts();
}

function showToast(message, title = 'Thông báo') {
    const toast = document.getElementById('notificationToast');
    const messageEl = document.getElementById('toastMessage');
    const titleEl = toast?.querySelector('.toast-title');

    if (toast && messageEl) {
        if (titleEl) titleEl.textContent = title;
        messageEl.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 5000);
    }
}

function initRandomToasts() {
    const messages = [
        'Một khách hàng vừa đăng ký gói Đại lý cá nhân.',
        'Hệ thống vừa hoàn thành 1,500 seeding cho một chiến dịch.',
        'Đã có 10,240 Creator đang hoạt động hôm nay.',
        'Chiến dịch Marketing của bạn đã sẵn sàng tăng trưởng.',
        'Người dùng mới vừa nạp tiền vào hệ thống.'
    ];

    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every 20 seconds
            const randomMsg = messages[Math.floor(Math.random() * messages.length)];
            showToast(randomMsg, 'Hoạt động gần đây');
        }
    }, 20000);
}

// Initialize particles
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: config.brand?.primaryColor || '#6C5CE7' },
                shape: { type: 'circle' },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: config.brand?.secondaryColor || '#00CEC9',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'repulse' },
                    onclick: { enable: true, mode: 'push' }
                }
            },
            retina_detect: true
        });
    }
}

// Hide preloader
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    }
}

// Make functions available globally
window.loadConfig = loadConfig;
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.initParticles = initParticles;
window.initScrollEffects = initScrollEffects;
window.initCounters = initCounters;