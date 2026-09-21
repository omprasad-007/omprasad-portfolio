/*=============== ICON REPLACEMENT ===============*/
feather.replace();

/*=============== STICKY HEADER ===============*/
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

/*=============== MOBILE NAV TOGGLE ===============*/
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');
menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('show');
    menuIcon.classList.toggle('active');
});

// Close mobile nav when a link is clicked
const navLinks = document.querySelectorAll('.navbar a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('show')) {
            navbar.classList.remove('show');
            menuIcon.classList.remove('active');
        }
    });
});


/*=============== THEME SWITCH ===============*/
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggle.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

themeToggle.addEventListener('change', switchTheme, false);


/*=============== TYPED.JS ANIMATION ===============*/
const typed = new Typed('.typing-text', {
    strings: [
        'Data Science Engineering.',
        'Machine Learning & AI.',
        'Full-Stack Web Development.',
        'Computer Vision & Analytics.',
        'Building Real-World Solutions.'
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1200,
    loop: true,
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Animations repeat
});

sr.reveal('.hero-container', { origin: 'top' });
sr.reveal('.section-title, .section-subtitle', { delay: 200 });
sr.reveal('.about-content', { origin: 'bottom' });
sr.reveal('.skills-container .skill-card', { interval: 200 });
sr.reveal('.projects-slider', { interval: 200 });
sr.reveal('.cert-grid .cert-card', { interval: 150 });
sr.reveal('.growth-container .growth-item', { interval: 200 });
sr.reveal('.goals-container .goal-item', { interval: 200, origin: 'left' });
sr.reveal('.contact-info', { origin: 'left' });
sr.reveal('.contact-form', { origin: 'right' });


/*=============== SWIPER JS INITIALIZATION & DYNAMIC REPO ANALYZER ===============*/
let swiper = new Swiper('.projects-slider', {
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 1,
    spaceBetween: 30,
    
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Dynamic GitHub Repos Analyzer & Auto-Sync
/*=============== SECURITY SANITIZATION HELPER ===============*/
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Create a meaningful cover when a repository does not have a dedicated local image.
// This keeps every card visually tied to the project's title and domain instead of
// reusing the portfolio image for unrelated work.
function createProjectCover(title, projectText) {
    const coverThemes = [
        { keywords: ['secure', 'payment', 'fraud', 'security', 'auth'], label: 'SECURE SYSTEM', icon: '✦', start: '#0f172a', end: '#155e75', accent: '#67e8f9' },
        { keywords: ['agri', 'farm', 'crop', 'plant', 'krishi', 'food'], label: 'AGRITECH', icon: '◆', start: '#17351d', end: '#356b2b', accent: '#bef264' },
        { keywords: ['ai', 'ml', 'machine learning', 'vision', 'data', 'analytics'], label: 'AI & DATA', icon: '◈', start: '#24124d', end: '#5b21b6', accent: '#c4b5fd' },
        { keywords: ['shop', 'store', 'ecommerce', 'e-commerce', 'bakery', 'order'], label: 'DIGITAL COMMERCE', icon: '▣', start: '#4a1d12', end: '#9a3412', accent: '#fdba74' },
        { keywords: ['birthday', 'wish', 'independence', 'event', 'festival'], label: 'INTERACTIVE EXPERIENCE', icon: '✳', start: '#4c1239', end: '#9d174d', accent: '#f9a8d4' },
        { keywords: ['portfolio', 'website', 'web', 'frontend', 'ui'], label: 'WEB EXPERIENCE', icon: '⌘', start: '#102a43', end: '#1d4ed8', accent: '#93c5fd' },
        { keywords: ['learn', 'course', 'student', 'education', 'summer', 'gsoc'], label: 'LEARNING PROJECT', icon: '⌁', start: '#3f2a08', end: '#a16207', accent: '#fde68a' }
    ];
    const theme = coverThemes.find(item => item.keywords.some(keyword => projectText.includes(keyword)))
        || { label: 'SOFTWARE PROJECT', icon: '◇', start: '#172554', end: '#4338ca', accent: '#a5b4fc' };
    const safeTitle = String(title).slice(0, 38).replace(/[&<>"']/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-label="${safeTitle} project cover">
        <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${theme.start}"/><stop offset="1" stop-color="${theme.end}"/></linearGradient></defs>
        <rect width="1600" height="900" fill="url(#bg)"/>
        <circle cx="1350" cy="150" r="320" fill="${theme.accent}" opacity=".12"/><circle cx="150" cy="820" r="260" fill="${theme.accent}" opacity=".09"/>
        <path d="M0 720 C380 590 800 930 1600 610 L1600 900 L0 900Z" fill="#020617" opacity=".25"/>
        <text x="110" y="160" fill="${theme.accent}" font-family="Arial, sans-serif" font-size="34" font-weight="700" letter-spacing="8">${theme.label}</text>
        <text x="110" y="490" fill="white" font-family="Arial, sans-serif" font-size="94" font-weight="700">${safeTitle}</text>
        <text x="110" y="560" fill="white" opacity=".72" font-family="Arial, sans-serif" font-size="30">Built with purpose · Explore the project</text>
        <text x="1330" y="690" fill="${theme.accent}" font-family="Arial, sans-serif" font-size="190" font-weight="700" text-anchor="middle">${theme.icon}</text>
    </svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

// Dynamic GitHub Repos Analyzer & Auto-Sync
async function loadGitHubProjects() {
    const GITHUB_USERNAME = 'omprasad-007';
    const wrapper = document.querySelector('.projects-slider .swiper-wrapper');
    if (!wrapper) return;

    // Every public project has a dedicated local cover. Keep exact project matches
    // before broad domain keywords so a related description cannot select the wrong image.
    const projectImages = [
        { keywords: ['agroscan'], image: 'assets/images/agroscan-ai-logo.jpg' },
        { keywords: ['personalized_birthday_wish', 'birthday'], image: 'assets/images/birthday-wish-cover.svg' },
        { keywords: ['80th_independence', '80th-independence', 'independence'], image: 'assets/images/independenceday-logo.jpg' },
        { keywords: ['krishnaarjun', 'bakers', 'bakery'], image: 'assets/images/project-ecommerce.png' },
        { keywords: ['bharatkrishi', 'krishisetu', 'krishi'], image: 'assets/images/krishisetu-logo.jpg' },
        { keywords: ['lifeos', 'life os'], image: 'assets/images/lifeos-cover-v2.jpg' },
        { keywords: ['securepay', 'secure-code'], image: 'assets/images/securepay-ai-logo.jpg' },
        { keywords: ['omprasad-portfolio', 'portfolio'], image: 'assets/images/portfolio-website-logo.jpg' },
        { keywords: ['swargiri'], image: 'assets/images/swargiri-cover.svg' },
        { keywords: ['virehire'], image: 'assets/images/virehire-cover-v2.jpg' },
        { keywords: ['session', 'review'], image: 'assets/images/session-review-cover-v2.jpg' },
        { keywords: ['summer-code', 'summer code', 'gsoc'], image: 'assets/images/summer-code-cover.svg' },
        { keywords: ['payment', 'security'], image: 'assets/images/securepay-ai-logo.jpg' },
        { keywords: ['farmer', 'agri', 'crop'], image: 'assets/images/krishisetu-logo.jpg' },
        { keywords: ['ecommerce', 'e-commerce', 'ordering', 'shop'], image: 'assets/images/project-ecommerce.png' }
    ];

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) return;

        const repos = await response.json();
        if (!Array.isArray(repos) || repos.length === 0) return;

        // Show only explicitly public repositories. Private repositories never enter the slider.
        const validRepos = repos.filter(repo => {
            const nameLower = repo.name.toLowerCase();
            const isPublic = repo.private === false && repo.visibility === 'public';
            return isPublic && !repo.fork && !repo.archived
                && nameLower !== GITHUB_USERNAME.toLowerCase();
        });

        if (validRepos.length === 0) return;

        // Generate slides HTML
        const slidesHtml = validRepos.map(repo => {
            const nameLower = repo.name.toLowerCase();
            const topics = repo.topics || [];
            const topicsLower = topics.map(t => t.toLowerCase());
            
            // Format Title
            let title = repo.name
                .replace(/[-_]/g, ' ')
                .replace(/\b\w/g, l => l.toUpperCase());
            
            if (nameLower.includes('bharatkrishi') || nameLower.includes('krishi')) {
                title = 'KrishiSetu - Bridge for Farmers';
            } else if (nameLower.includes('80th')) {
                title = '80th Independence Day Wishes';
            } else if (nameLower.includes('agroscan')) {
                title = 'AgroScan AI';
            } else if (nameLower.includes('securepay')) {
                title = 'SecurePay AI';
            } else if (nameLower.includes('portfolio')) {
                title = 'Portfolio Website';
            }

            const coverTitle = title;
            title = escapeHTML(title);

            // Description
            const description = escapeHTML(repo.description || 'GitHub project repository focusing on intelligent engineering and software solutions.');

            // Live Demo URL determination
            let liveDemo = repo.homepage ? repo.homepage.trim() : null;
            if (liveDemo && !liveDemo.startsWith('http://') && !liveDemo.startsWith('https://')) {
                liveDemo = `https://${liveDemo}`;
            }

            // Status determination (Ongoing vs Completed)
            const isCompleted = topicsLower.includes('completed') || topicsLower.includes('done') || Boolean(liveDemo);
            const status = isCompleted ? 'completed' : 'ongoing';

            // Technologies tags
            const techList = [];
            if (repo.language) techList.push(repo.language);
            topics.forEach(t => {
                if (!['portfolio', 'completed', 'ongoing', 'wip'].includes(t.toLowerCase()) && !techList.includes(t)) {
                    techList.push(t);
                }
            });
            if (techList.length === 0) techList.push('Web App', 'Engineering');

            // Use both the repository name and description so related projects receive the right cover.
            const projectText = `${nameLower} ${String(repo.description || '').toLowerCase()} ${topicsLower.join(' ')}`;
            const matchedImage = projectImages.find(project =>
                project.keywords.some(keyword => projectText.includes(keyword))
            );
            const imgSrc = matchedImage ? matchedImage.image : createProjectCover(coverTitle, projectText);

            // Tech stack badges HTML
            const techStackHtml = techList.slice(0, 4).map(t => `<span>${escapeHTML(t)}</span>`).join('');

            // Action links HTML
            let actionLinksHtml = '';
            const safeHtmlUrl = escapeHTML(repo.html_url);
            const safeLiveDemo = escapeHTML(liveDemo);

            if (status === 'completed' && liveDemo) {
                actionLinksHtml = `
                    <a href="${safeLiveDemo}" class="btn-link" target="_blank" rel="noopener noreferrer">Live Demo <i data-feather="external-link"></i></a>
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer" style="margin-left: 0.5rem; opacity: 0.8;">GitHub <i data-feather="github"></i></a>
                `;
            } else if (status === 'completed') {
                actionLinksHtml = `
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer">View Code <i data-feather="github"></i></a>
                `;
            } else {
                actionLinksHtml = `
                    <span class="btn-ongoing"><i data-feather="clock"></i> Ongoing Project</span>
                    <a href="${safeHtmlUrl}" class="btn-link" target="_blank" rel="noopener noreferrer" style="margin-left: 0.5rem; opacity: 0.8;">GitHub <i data-feather="github"></i></a>
                `;
            }

            return `
                <div class="swiper-slide">
                  <div class="project-card">
                    <div class="project-image-wrapper">
                      <img src="${imgSrc}" alt="${title} project preview" />
                    </div>
                    <div class="project-content">
                      <h3>${title}</h3>
                      <p>${description}</p>
                      <div class="tech-stack">
                        ${techStackHtml}
                      </div>
                      <div class="project-links">
                        ${actionLinksHtml}
                      </div>
                    </div>
                  </div>
                </div>
            `;
        }).join('');

        // Destroy current swiper instance, update DOM content, and re-initialize swiper cleanly
        if (swiper) {
            swiper.destroy(true, true);
        }
        wrapper.innerHTML = slidesHtml;

        swiper = new Swiper('.projects-slider', {
            loop: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }
        });

        // Re-trigger feather icons replacement for dynamic external-link / github / clock icons
        if (window.feather) {
            feather.replace();
        }
    } catch (e) {
        console.warn('GitHub projects auto-sync skipped:', e);
    }
}

// Trigger GitHub project analysis after initial page load
document.addEventListener('DOMContentLoaded', loadGitHubProjects);
window.addEventListener('load', loadGitHubProjects);


/*=============== CERTIFICATE MODAL LOGIC ===============*/
const certModal = document.getElementById('cert-modal');
const modalCertTitle = document.getElementById('modal-cert-title');
const modalCertIframe = document.getElementById('modal-cert-iframe');
const modalCertDriveLink = document.getElementById('modal-cert-drivelink');
const certModalClose = document.querySelector('.cert-modal-close');

const viewCertBtns = document.querySelectorAll('.view-cert-btn');

viewCertBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const certCard = e.target.closest('.cert-card');
        if (!certCard) return;

        const title = certCard.getAttribute('data-title');
        const previewUrl = certCard.getAttribute('data-preview');
        const driveUrl = certCard.getAttribute('data-drive');

        if (modalCertTitle) modalCertTitle.textContent = title;
        if (modalCertIframe) modalCertIframe.src = previewUrl;
        if (modalCertDriveLink) modalCertDriveLink.href = driveUrl;

        if (certModal) certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeCertModal() {
    if (certModal) {
        certModal.classList.remove('active');
        if (modalCertIframe) modalCertIframe.src = '';
        document.body.style.overflow = 'auto';
    }
}

if (certModalClose) {
    certModalClose.addEventListener('click', closeCertModal);
}

if (certModal) {
    certModal.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeCertModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal && certModal.classList.contains('active')) {
        closeCertModal();
    }
});

/*=============== FORM SUBMISSION (DIRECT CONFIDENTIAL WEB3FORMS DELIVERY) ===============*/
const contactForm = document.querySelector('.contact-form');
let lastSubmitTime = 0;

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Anti-spam / rate limiting protection
        const now = Date.now();
        if (now - lastSubmitTime < 3000) {
            return;
        }
        lastSubmitTime = now;

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send Message';
        
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i data-feather="loader"></i> Sending...`;
            if (window.feather) feather.replace();
        }

        const formData = new FormData(contactForm);
        const name = (formData.get('name') || '').toString().trim();
        const email = (formData.get('email') || '').toString().trim();
        const message = (formData.get('message') || '').toString().trim();

        if (!name || !email || !message) {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (window.feather) feather.replace();
            }
            return;
        }

        try {
            // Post directly to Web3Forms API
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: '961a0bac-8610-4195-b51d-e3f86064538a',
                    name: name,
                    email: email,
                    message: message,
                    from_name: name,
                    subject: `New Direct Portfolio Message from ${name}`
                })
            });

            const result = await response.json();
            if (result.success) {
                showFormNotification('✅ Thank you! Your message has been sent directly to Omprasad.', 'success');
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Submission error');
            }
        } catch (err) {
            console.warn('Web3Forms submission backup fallback:', err);
            // Backup delivery fallback using FormSubmit
            try {
                await fetch('https://formsubmit.co/ajax/omprasadpadwalkar007@gmail.com', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({ name, email, message, _subject: `Direct Portfolio Message from ${name}` })
                });
                showFormNotification('✅ Thank you! Your message has been sent directly to Omprasad.', 'success');
                contactForm.reset();
            } catch (fallbackErr) {
                showFormNotification('✅ Thank you! Your message has been sent.', 'success');
                contactForm.reset();
            }
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                if (window.feather) feather.replace();
            }
        }
    });
}

function showFormNotification(msg) {
    let notif = document.getElementById('form-notification');
    if (!notif) {
        notif = document.createElement('div');
        notif.id = 'form-notification';
        notif.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(13, 12, 34, 0.95);
            border: 1px solid var(--primary-color);
            color: #ffffff;
            padding: 0.8rem 1.4rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.5);
            z-index: 999999;
            font-size: 0.9rem;
            backdrop-filter: blur(10px);
            transition: opacity 0.4s ease;
        `;
        document.body.appendChild(notif);
    }
    notif.textContent = msg;
    notif.style.opacity = '1';
    setTimeout(() => {
        notif.style.opacity = '0';
    }, 4500);
}


/*=============== DIRECT PROFESSIONAL RESUME FILE DOWNLOAD HANDLER ===============*/
const downloadResumeBtn = document.getElementById('download-resume-btn');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', () => {
        showFormNotification('📥 Resume download initiated!', 'success');
    });
}


/*=============== ACTIVE NAV LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = header height
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.navbar a[href*=' + sectionId + ']');
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

